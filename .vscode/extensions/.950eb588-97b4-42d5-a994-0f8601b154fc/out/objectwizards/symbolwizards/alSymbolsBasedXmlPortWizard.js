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
exports.ALSymbolsBasedXmlPortWizard = void 0;
const vscode = __importStar(require("vscode"));
const fileBuilder_1 = require("../fileBuilder");
const azSymbolKind_1 = require("../../symbollibraries/azSymbolKind");
const alSymbolsBasedWizard_1 = require("./alSymbolsBasedWizard");
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
class ALSymbolsBasedXmlPortWizard extends alSymbolsBasedWizard_1.ALSymbolsBasedWizard {
    constructor(context) {
        super(context);
    }
    //#region Wizards with UI
    async showWizard(tableSymbols) {
        if (tableSymbols.length == 1)
            await this.showXmlPortWizard(tableSymbols[0]);
        else
            await this.showMultiXmlPortWizard(tableSymbols);
    }
    async showMultiXmlPortWizard(tableSymbols) {
        if (!fileBuilder_1.FileBuilder.checkCrsExtensionFileNamePatternRequired())
            return;
        const objType = azSymbolKind_1.AZSymbolKind.XmlPortObject;
        let relativeFileDir = await this.getRelativeFileDir(objType);
        let startObjectId = await this.getObjectId(relativeFileDir, "xmlport", `Please enter a starting ID for the xmlport objects.`, 0);
        if (startObjectId < 0) {
            return;
        }
        let fieldsAsElements = await this.promptForFieldsAsElements();
        if (fieldsAsElements === undefined) {
            return;
        }
        for (let i = 0; i < tableSymbols.length; i++) {
            let tableSymbol = tableSymbols[i];
            let objectId = startObjectId + i;
            let objectName = this.getDefaultXmlPortName(tableSymbol);
            await this.createAndShowNewXmlPort(tableSymbol, objType, objectId, objectName, fieldsAsElements, relativeFileDir);
        }
    }
    async showXmlPortWizard(tableSymbol) {
        if (!fileBuilder_1.FileBuilder.checkCrsFileNamePatternRequired())
            return;
        const objType = azSymbolKind_1.AZSymbolKind.XmlPortObject;
        let relativeFileDir = await this.getRelativeFileDir(objType);
        let objectId = await this.getObjectId(relativeFileDir, "xmlport", "Please enter an ID for the xmlport object.", 0);
        if (objectId < 0) {
            return;
        }
        let objectName = await this.getObjectName("Please enter a name for the xmlport object.", this.getDefaultXmlPortName(tableSymbol));
        if (!objectName)
            return;
        let fieldsAsElements = await this.promptForFieldsAsElements();
        if (fieldsAsElements === undefined) {
            return;
        }
        await this.createAndShowNewXmlPort(tableSymbol, objType, objectId, objectName, fieldsAsElements, relativeFileDir);
    }
    async createAndShowNewXmlPort(tableSymbol, objType, objectId, objectName, fieldsAsElements, relativeFileDir) {
        let fileName = await fileBuilder_1.FileBuilder.getPatternGeneratedFullObjectFileName(objType, objectId, objectName);
        this.showNewDocument(this.buildXmlPortForTable(tableSymbol, objectId, objectName, fieldsAsElements), fileName, relativeFileDir);
    }
    //#endregion
    //#region Report builders
    buildXmlPortForTable(tableSymbol, objectId, objectName, fieldsAsElements) {
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter(undefined);
        writer.writeStartObject("xmlport", objectId.toString(), objectName);
        //write dataset
        this.appendSchema(writer, tableSymbol, fieldsAsElements);
        //write report request page suggetsion
        this.appendReportRequestPage(writer);
        writer.writeEndObject();
        return writer.toWizardGeneratedString();
    }
    appendSchema(writer, tableSymbol, fieldsAsElements) {
        var tableElementName = writer.createName(tableSymbol.name);
        var fieldNodeName;
        if (fieldsAsElements)
            fieldNodeName = "fieldelement";
        else
            fieldNodeName = "fieldattribute";
        writer.writeStartNamedBlock("schema");
        writer.writeStartGroup("textelement", "RootNodeName");
        writer.writeStartNameSourceBlock("tableelement", tableElementName, writer.encodeName(tableSymbol.name));
        let fieldList = [];
        tableSymbol.collectChildSymbols(azSymbolKind_1.AZSymbolKind.Field, true, fieldList);
        fieldList.forEach(item => {
            writer.writeNameSourceBlock(fieldNodeName, writer.createName(item.name), tableElementName + "." + writer.encodeName(item.name));
        });
        writer.writeEndBlock();
        writer.writeEndBlock();
        writer.writeEndBlock();
    }
    appendReportRequestPage(writer) {
        writer.writeStartNamedBlock("requestpage");
        //layout
        writer.writeStartLayout();
        writer.writeStartGroup("area", "Content");
        writer.writeStartGroup("group", "GroupName");
        writer.writeEndBlock();
        writer.writeEndBlock();
        writer.writeEndLayout();
        //actions
        writer.writeStartNamedBlock("actions");
        writer.writeStartGroup("area", "Processing");
        writer.writeEndBlock();
        writer.writeEndBlock();
        writer.writeEndBlock();
    }
    //#endregion
    //#region Helper Methods
    async promptForFieldsAsElements() {
        let fieldAsAttributeText = "Table fields as xml attributes";
        let fieldAsElementText = "Table fields as xml elements";
        let fieldNodeTypes = [
            {
                label: fieldAsAttributeText,
                description: ""
            },
            {
                label: fieldAsElementText,
                description: ""
            }
        ];
        let selectedNodeType = await vscode.window.showQuickPick(fieldNodeTypes);
        if ((!selectedNodeType) || (!selectedNodeType.label)) {
            return undefined;
        }
        return (selectedNodeType.label == fieldAsElementText);
    }
    getDefaultXmlPortName(tableSymbol) {
        return `${tableSymbol.name.trim()} XmlPort`;
    }
}
exports.ALSymbolsBasedXmlPortWizard = ALSymbolsBasedXmlPortWizard;
//# sourceMappingURL=alSymbolsBasedXmlPortWizard.js.map