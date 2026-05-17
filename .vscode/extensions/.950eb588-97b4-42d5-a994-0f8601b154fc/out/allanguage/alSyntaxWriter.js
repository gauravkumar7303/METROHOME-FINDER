"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALSyntaxWriter = void 0;
const vscode = __importStar(require("vscode"));
const alSyntaxHelper_1 = require("./alSyntaxHelper");
const stringHelper_1 = require("../tools/stringHelper");
const nameValue_1 = require("../tools/nameValue");
const appAreaMode_1 = require("../alsyntaxmodifiers/appAreaMode");
const apiFieldNameConversion_1 = require("./apiFieldNameConversion");
class ALSyntaxWriter {
    content;
    indentText;
    indentPart;
    applicationArea;
    applicationAreaMode;
    propertiesCache;
    fieldToolTip;
    fieldToolTipComment;
    useTableFieldDescriptionAsToolTip;
    noEmptyLinesAtTheEndOfWizardGeneratedFiles;
    eol;
    apiFieldNamesConversion;
    createApiFieldsCaptions;
    constructor(destUri) {
        let config = vscode.workspace.getConfiguration('alOutline', destUri);
        this.content = "";
        this.indentText = "";
        this.indentPart = "    ";
        this.applicationArea = stringHelper_1.StringHelper.emptyIfNotDef(config.get('defaultAppArea'));
        this.applicationAreaMode = appAreaMode_1.AppAreaMode.addToAllControls; //do not use settings, runtime version might override these settings
        this.fieldToolTip = stringHelper_1.StringHelper.emptyIfNotDef(config.get('pageFieldToolTip'));
        this.fieldToolTipComment = stringHelper_1.StringHelper.emptyIfNotDef(config.get('pageFieldToolTipComment'));
        this.useTableFieldDescriptionAsToolTip = !!config.get('useTableFieldDescriptionAsToolTip');
        this.noEmptyLinesAtTheEndOfWizardGeneratedFiles = !!config.get('noEmptyLinesAtTheEndOfWizardGeneratedFiles');
        this.createApiFieldsCaptions = !!config.get('createApiFieldsCaptions');
        this.propertiesCache = [];
        this.eol = stringHelper_1.StringHelper.getDefaultEndOfLine(destUri);
        this.apiFieldNamesConversion = [];
        this.prepareApiFieldNamesConversions(config.get("apiFieldNamesConversion"));
    }
    prepareApiFieldNamesConversions(apiConv) {
        if (apiConv)
            for (let i = 0; i < apiConv.length; i++)
                if ((apiConv[i].searchRegExp) && (apiConv[i].newValue)) {
                    try {
                        let item = new apiFieldNameConversion_1.ApiFieldNameConversion(apiConv[i].searchRegExp, apiConv[i].newValue);
                        this.apiFieldNamesConversion.push(item);
                    }
                    catch (e) {
                    }
                }
    }
    toString() {
        return this.content;
    }
    toWizardGeneratedString() {
        if (this.noEmptyLinesAtTheEndOfWizardGeneratedFiles)
            return this.removeEndingEmptyLines();
        return this.content;
    }
    removeEndingEmptyLines() {
        let len = this.content.length;
        let eolen = this.eol.length;
        while ((len > 0) && (this.content.substring(len - eolen, len) == this.eol)) {
            len -= eolen;
        }
        if (len > 0)
            return this.content.substring(0, len);
        return '';
    }
    incIndent() {
        this.indentText += this.indentPart;
    }
    decIndent() {
        if (this.indentText.length > this.indentPart.length)
            this.indentText = this.indentText.substr(0, this.indentText.length - this.indentPart.length);
        else
            this.indentText = "";
    }
    setIndent(value) {
        let text = " ";
        this.indentText = text.repeat(value);
    }
    writeLine(line) {
        this.content += (this.indentText + line + this.eol);
    }
    writeStartBlock() {
        this.writeLine("{");
        this.incIndent();
    }
    writeEndBlock() {
        this.decIndent();
        this.writeLine("}");
    }
    writeStartNamedBlock(name) {
        this.writeLine(name);
        this.writeStartBlock();
    }
    writeStartNameSourceBlock(blockName, propertyName, propertySource) {
        this.writeLine(blockName + "(" + propertyName + "; " + propertySource + ")");
        this.writeStartBlock();
    }
    writeNameSourceBlock(blockName, propertyName, propertySource) {
        this.writeStartNameSourceBlock(blockName, propertyName, propertySource);
        this.writeEndBlock();
    }
    writeNamespace(namespaceName) {
        if ((namespaceName) && (namespaceName !== "")) {
            this.writeLine("namespace " + namespaceName + ";");
            this.writeLine("");
        }
    }
    writeUsings(usings) {
        if ((usings) && (usings.length > 0)) {
            for (let i = 0; i < usings.length; i++) {
                this.writeLine("using " + usings[i] + ";");
            }
            this.writeLine("");
        }
    }
    writeStartObject(type, id, name) {
        var objectIdText;
        if ((id == '') || (id == '0'))
            objectIdText = 'id';
        else
            objectIdText = id.toString();
        name = alSyntaxHelper_1.ALSyntaxHelper.toNameText(name);
        this.writeLine(type + " " + objectIdText + " " + name);
        this.writeStartBlock();
    }
    writeStartInterface(name) {
        name = alSyntaxHelper_1.ALSyntaxHelper.toNameText(name);
        this.writeLine("interface " + name);
        this.writeStartBlock();
    }
    writeStartCodeunit(id, name, interfaceName) {
        var objectIdText;
        if ((id == '') || (id == '0'))
            objectIdText = 'id';
        else
            objectIdText = id.toString();
        name = alSyntaxHelper_1.ALSyntaxHelper.toNameText(name);
        let interfaceText = "";
        if ((interfaceName) && (interfaceName.length > 0))
            interfaceText = " implements " + alSyntaxHelper_1.ALSyntaxHelper.toNameText(interfaceName);
        this.writeLine("codeunit " + objectIdText + " " + name + interfaceText);
        this.writeStartBlock();
    }
    writeStartExtensionObject(type, id, extname, targetName) {
        var objectIdText;
        if ((id == '') || (id == '0'))
            objectIdText = 'id';
        else
            objectIdText = id.toString();
        extname = alSyntaxHelper_1.ALSyntaxHelper.toNameText(extname);
        targetName = alSyntaxHelper_1.ALSyntaxHelper.toNameText(targetName);
        this.writeLine(type + " " + objectIdText + " " + extname + " extends " + targetName);
        this.writeStartBlock();
    }
    writeEndObject() {
        this.writeEndBlock();
    }
    writeStartLayout() {
        this.writeLine("layout");
        this.writeStartBlock();
    }
    writeEndLayout() {
        this.writeEndBlock();
    }
    writeStartActions() {
        this.writeLine("actions");
        this.writeStartBlock();
    }
    writeEndActions() {
        this.writeEndBlock();
    }
    writeStartDataset() {
        this.writeLine("dataset");
        this.writeStartBlock();
    }
    writeEndDataset() {
        this.writeEndBlock();
    }
    writeStartRequestPage() {
        this.writeLine("requestpage");
        this.writeStartBlock();
    }
    writeEndRequestPage() {
        this.writeEndBlock();
    }
    writeStartFields() {
        this.writeLine("fields");
        this.writeStartBlock();
    }
    writeEndFields() {
        this.writeEndBlock();
    }
    writeStartAdd(name) {
        this.writeStartGroup("add", name);
    }
    writeStartGroup(type, name) {
        this.writeLine(type + "(" + name + ")");
        this.writeStartBlock();
    }
    writeProperty(name, value) {
        this.writeLine(name + " = " + value + ";");
    }
    writeStartProperty(name) {
        this.writeLine(name + " =");
        this.incIndent();
    }
    writePropertyValue(value, lastValue) {
        if (lastValue) {
            this.writeLine(value + ";");
            this.decIndent();
        }
        else
            this.writeLine(value + ",");
    }
    addProperty(name, value) {
        this.propertiesCache.push(new nameValue_1.NameValue(name, value));
    }
    writeProperties() {
        if (this.propertiesCache.length > 0) {
            this.propertiesCache.sort((propA, propB) => {
                return propA.name.localeCompare(propB.name, undefined, { numeric: true, sensitivity: 'base' });
            });
            for (let i = 0; i < this.propertiesCache.length; i++)
                this.writeProperty(this.propertiesCache[i].name, this.propertiesCache[i].value);
            this.propertiesCache = [];
        }
    }
    writeReportColumn(dataSetName, source, addDataItemName) {
        let columnName = this.createName(source);
        if (addDataItemName)
            columnName = columnName + "_" + this.createName(dataSetName);
        this.writeNameSourceBlock("column", columnName, this.encodeName(source));
    }
    writeTableField(fieldId, fieldName, fieldDataType, fieldLength, dataClassification, tableDataClassification) {
        let dataType = fieldDataType.toLowerCase();
        if ((fieldLength) && ((dataType == 'text') || (dataType == 'code')))
            fieldDataType = fieldDataType + '[' + fieldLength + ']';
        if ((dataType.startsWith("enum ")) && (dataType.length > 5)) {
            let enumType = fieldDataType.substr(5).trim();
            if (!enumType.startsWith('"'))
                enumType = alSyntaxHelper_1.ALSyntaxHelper.toNameText(enumType);
            fieldDataType = "Enum " + enumType;
        }
        this.writeLine("field(" + fieldId + "; " + alSyntaxHelper_1.ALSyntaxHelper.toNameText(fieldName) + "; " + fieldDataType + ")");
        this.writeStartBlock();
        this.writeProperty('Caption', alSyntaxHelper_1.ALSyntaxHelper.toStringText(fieldName));
        if (tableDataClassification) {
            if ((dataClassification) && (dataClassification === tableDataClassification))
                dataClassification = undefined;
        }
        else if (!dataClassification)
            dataClassification = 'ToBeClassified';
        if (dataClassification)
            this.writeProperty("DataClassification", dataClassification);
        this.writeEndBlock();
    }
    writePageField(fieldName, fieldCaption, fieldCaptionComment, fieldDescription, createToolTip, existingToolTips) {
        this.writeStartNameSourceBlock("field", this.encodeName(fieldName), 'Rec.' + this.encodeName(fieldName));
        if (this.applicationAreaMode == appAreaMode_1.AppAreaMode.addToAllControls)
            this.writeApplicationArea();
        if (createToolTip)
            this.writeTooltip(this.fieldToolTip, this.fieldToolTipComment, fieldCaption, fieldCaptionComment, fieldDescription, existingToolTips);
        this.writeEndBlock();
    }
    writeApiPageField(fieldName, fieldCaption, fieldCaptionComment, useTableFieldCaption) {
        let name = this.createApiName(fieldName);
        this.writeStartNameSourceBlock("field", this.encodeName(name), 'Rec.' + this.encodeName(fieldName));
        if (this.createApiFieldsCaptions) {
            if (useTableFieldCaption) {
                if ((!fieldCaption) || (fieldCaption === ''))
                    fieldCaption = fieldName;
                if ((fieldCaptionComment) && (fieldCaptionComment !== ''))
                    this.addProperty("Caption", this.encodeString(fieldCaption) + ', Comment = ' + this.encodeString(fieldCaptionComment));
                else
                    this.addProperty("Caption", this.encodeString(fieldCaption));
            }
            else
                this.addProperty("Caption", this.encodeString(name) + ', Locked = true');
        }
        this.writeProperties();
        this.writeEndBlock();
    }
    writeApplicationArea() {
        if ((this.applicationArea) && (this.applicationArea !== ""))
            this.writeProperty("ApplicationArea", this.applicationArea);
    }
    writeTooltip(captionTemplate, commentTemplate, value, comment, fieldDescription, existingToolTips) {
        let textValue = undefined;
        if ((this.useTableFieldDescriptionAsToolTip) && (fieldDescription) && (fieldDescription != ""))
            textValue = this.encodeString(fieldDescription);
        else if ((existingToolTips) && (existingToolTips.length > 0) && (existingToolTips[0].value) && (existingToolTips[0].value !== "")) {
            textValue = this.encodeString(existingToolTips[0].value);
            if ((existingToolTips[0].comment) && (existingToolTips[0].comment !== ""))
                textValue = textValue + ", Comment = " + this.encodeString(existingToolTips[0].comment);
        }
        else if ((captionTemplate) && (captionTemplate != "") && (value) && (value != "")) {
            textValue = this.applyCaptionTemplate(captionTemplate, value, comment);
            let commentValue = this.applyCaptionTemplate(commentTemplate, value, comment);
            textValue = this.encodeString(textValue);
            if ((commentValue) && (commentValue != ""))
                textValue = textValue + ", Comment = " + this.encodeString(commentValue);
        }
        if ((textValue) && (textValue != ""))
            this.writeProperty("ToolTip", textValue);
    }
    applyCaptionTemplate(template, value, comment) {
        if ((template) && (template != "")) {
            if (!value)
                value = "";
            if (!comment)
                comment = "";
            template = template.replace(new RegExp("%1", "g"), value);
            template = template.replace(new RegExp("%Caption%", "g"), value);
            template = template.replace(new RegExp("%Caption.Comment%", "g"), comment);
        }
        return template;
    }
    addApplicationAreaProperty() {
        if ((this.applicationArea) && (this.applicationArea !== ""))
            this.addProperty("ApplicationArea", this.applicationArea);
    }
    encodeString(text) {
        return alSyntaxHelper_1.ALSyntaxHelper.toStringText(text);
    }
    encodeName(name) {
        return alSyntaxHelper_1.ALSyntaxHelper.toNameText(name);
    }
    createName(source) {
        return source.replace(/\W/g, '');
    }
    createApiName(source) {
        let text = '';
        let toLower = true;
        let toUpper = false;
        source = source.trim();
        for (let i = 0; i < source.length; i++) {
            let character = source[i];
            let isLowerCaseLetterChar = ((character >= 'a') && (character <= 'z'));
            let isUpperCaseLetterChar = ((character >= 'A') && (character <= 'Z'));
            let isDigitChar = ((character >= '0') && (character <= '9'));
            let validCharacter = ((isLowerCaseLetterChar) || (isUpperCaseLetterChar) || ((isDigitChar) && (text !== '')));
            if ((text !== '') || (validCharacter)) {
                //if text starts with upperCase, conver all these characters to lowerCase
                if (isUpperCaseLetterChar) {
                    toUpper = false;
                    //do not convert to lowerCase if next character is lowerCase (i.e. EDIDocument => ediDocument), but only if it is not first character in the name (i.e. MyField => myField)
                    if ((text !== '') && (toLower) && (i < (source.length - 1))) {
                        let nextCharacter = source[i + 1];
                        if (((nextCharacter >= 'a') && (nextCharacter <= 'z')))
                            toLower = false;
                    }
                    if (toLower)
                        character = character.toLowerCase();
                }
                else {
                    toLower = false;
                    if ((isLowerCaseLetterChar) && (toUpper)) {
                        character = character.toUpperCase();
                        toUpper = false;
                    }
                    //if current character is not lowerCase letter, then convert next lowerCase letter to upperCase
                    if (!isLowerCaseLetterChar)
                        toUpper = true;
                }
                //append letters to text
                if (validCharacter)
                    text = text + character;
            }
        }
        text = this.convertApiName(text);
        return text;
    }
    convertApiName(name) {
        if ((name) && (this.apiFieldNamesConversion))
            for (let i = 0; i < this.apiFieldNamesConversion.length; i++) {
                let newValue = name.replace(this.apiFieldNamesConversion[i].searchRegExp, this.apiFieldNamesConversion[i].newValue);
                if (newValue != name)
                    return newValue;
            }
        return name;
    }
}
exports.ALSyntaxWriter = ALSyntaxWriter;
//# sourceMappingURL=alSyntaxWriter.js.map