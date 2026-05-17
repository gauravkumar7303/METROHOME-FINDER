'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALSyntaxHelper = void 0;
const azSymbolKind_1 = require("../symbollibraries/azSymbolKind");
class ALSyntaxHelper {
    static nameCharacters = '0123456789QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm-_"';
    static keyWords = '|action|actions|add|addafter|addbefore|addfirst|addlast|and|area|array|ascending|assembly|asserterror|automation|average|begin' +
        '|biginteger|bigtext|blob|boolean|break|byte|case|char|chartpart|clienttype|code|codeunit|column|completiontriggererrorlevel' +
        '|connectiontype|const|controladdin|count|cuegroup|customizes|database|dataclassification|dataitem|datascope|dataset|date|dateformula' +
        '|datetime|decimal|defaultlayout|descending|dialog|dictionary|div|do|dotnet|dotnetassembly|dotnettypedeclaration|downto|duration' +
        '|elements|else|end|entitlement|enum|enumextension|errorinfo|errortype|event|executioncontext|executionmode|exist|exit|extends' +
        '|field|fieldattribute|fieldclass|fieldelement|fieldgroup|fieldgroups|fieldref|fields|fieldtype|file|filter|filterpagebuilder|fixed' +
        '|for|foreach|function|grid|group|guid|httpclient|httpcontent|httpheaders|httprequestmessage|httpresponsemessage|if|implements|in' +
        '|indataset|instream|integer|interface|internal|joker|jsonarray|jsonobject|jsontoken|jsonvalue|key|keyref|keys|label|labels|layout|list' +
        '|local|lookup|max|min|mod|modify|moduledependencyinfo|moduleinfo|moveafter|movebefore|movefirst|movelast|none|not|notification' +
        '|notificationscope|objecttype|of|option|or|order|outstream|page|pagecustomization|pageextension|pageresult|part|permissionset' +
        '|permissionsetextension|procedure|profile|program|protected|query|record|recordid|recordref|repeat|repeater|report|reportextension' +
        '|reportformat|requestpage|runonclient|schema|securityfilter|securityfiltering|separator|sessionsettings|sorting|sum|suppressdispose' +
        '|systempart|table|tableconnectiontype|tabledata|tableelement|tableextension|tablefilter|temporary|testaction|testfield|testfilterfield' +
        '|testpage|testpermissions|testrequestpage|text|textattribute|textbuilder|textconst|textelement|textencoding|then|time|to|transactionmodel' +
        '|transactiontype|trigger|type|until|upperlimit|usercontrol|value|var|variant|verbosity|version|view|views|webserviceactioncontext' +
        '|webserviceactionresultcode|where|while|with|withevents|xmlattribute|xmlattributecollection|xmlcdata|xmlcomment|xmldeclaration' +
        '|xmldocument|xmldocumenttype|xmlelement|xmlnamespacemanager|xmlnametable|xmlnode|xmlnodelist|xmlport|xmlprocessinginstruction' +
        '|xmlreadoptions|xmltext|xmlwriteoptions|xor|';
    static isKeyword(name) {
        return (!!((name) && (ALSyntaxHelper.keyWords.indexOf("|" + name.toLowerCase() + "|") >= 0)));
    }
    static toNameText(name) {
        if ((name.match(/^[a-zA-Z_]\w*$/)) && (!ALSyntaxHelper.isKeyword(name)))
            return name;
        return "\"" + name.replace(new RegExp("\"", "g"), "\"\"") + "\"";
    }
    static toStringText(text) {
        return "'" + text.replace(new RegExp("'", "g"), "''") + "'";
    }
    static fromNameText(name) {
        name = name.trim();
        if ((name.length > 1) && (name.substr(0, 1) == "\"") && (name.substr(name.length - 1, 1) == "\"")) {
            name = name.substr(1, name.length - 2).replace(new RegExp("\"\"", "g"), "\"");
        }
        return name;
    }
    static fromStringText(text) {
        text = text.trim();
        if ((text.length > 1) && (text.substr(0, 1) == "'") && (text.substr(text.length - 1, 1) == "'")) {
            text = text.substr(1, text.length - 2).replace(new RegExp("''", "g"), "'");
        }
        return text;
    }
    static getNameFromString(text, startPos) {
        let endPos = startPos;
        let inName = false;
        //skip invalid characters
        while ((startPos < text.length) && (ALSyntaxHelper.spaceChar(text.charAt(startPos))))
            startPos++;
        //skip name
        inName = false;
        endPos = startPos;
        while ((endPos < text.length) && ((inName) || (ALSyntaxHelper.validNameChar(text.charAt(endPos))))) {
            if (text.charAt(endPos) == '"')
                inName = !inName;
            endPos++;
        }
        if (endPos > startPos)
            return ALSyntaxHelper.fromNameText(text.substr(startPos, endPos - startPos));
        return '';
    }
    static validNameChar(text) {
        return (ALSyntaxHelper.nameCharacters.indexOf(text) >= 0);
    }
    static spaceChar(text) {
        return (text <= ' ');
    }
    static removePrefixSuffix(text, projectSettings) {
        if (projectSettings) {
            //remove first suffix
            var data = ALSyntaxHelper.removeSuffix(text, projectSettings.mandatorySuffixes);
            if (data.found)
                return data.text;
            //remove first prefix
            data = ALSyntaxHelper.removePrefix(data.text, projectSettings.mandatoryPrefixes);
            if (data.found)
                return data.text;
            //remove first prefix/suffix
            data = ALSyntaxHelper.removeSuffix(data.text, projectSettings.mandatoryAffixes);
            if (data.found)
                return data.text;
            data = ALSyntaxHelper.removePrefix(data.text, projectSettings.mandatoryAffixes);
            if (data.found)
                return data.text;
        }
        return text;
    }
    static removePrefix(text, prefixes) {
        if (prefixes) {
            for (let i = 0; i < prefixes.length; i++) {
                if ((prefixes[i]) && (prefixes[i].trim().length > 0) && (text.startsWith(prefixes[i])))
                    return {
                        found: true,
                        text: text.substring(prefixes[i].length).trim()
                    };
            }
        }
        return {
            found: false,
            text: text
        };
    }
    static removeSuffix(text, suffixes) {
        if (suffixes) {
            for (let i = 0; i < suffixes.length; i++) {
                if ((suffixes[i]) && (suffixes[i].trim().length > 0) && (text.endsWith(suffixes[i])))
                    return {
                        found: true,
                        text: text.substring(0, text.length - suffixes[i].length).trim()
                    };
            }
        }
        return {
            found: false,
            text: text
        };
    }
    static kindToVariableType(kind) {
        switch (kind) {
            case azSymbolKind_1.AZSymbolKind.TableObject:
                return "record";
            case azSymbolKind_1.AZSymbolKind.CodeunitObject:
                return "codeunit";
            case azSymbolKind_1.AZSymbolKind.PageObject:
                return "page";
            case azSymbolKind_1.AZSymbolKind.ReportObject:
                return "report";
            case azSymbolKind_1.AZSymbolKind.QueryObject:
                return "query";
            case azSymbolKind_1.AZSymbolKind.XmlPortObject:
                return "xmlport";
            case azSymbolKind_1.AZSymbolKind.ControlAddInObject:
                return "usercontrol";
            case azSymbolKind_1.AZSymbolKind.EnumType:
                return "enum";
            case azSymbolKind_1.AZSymbolKind.Interface:
                return "interface";
        }
        return undefined;
    }
    static kindToWorkspaceSymbolType(kind) {
        switch (kind) {
            case azSymbolKind_1.AZSymbolKind.TableObject:
                return "Record";
            case azSymbolKind_1.AZSymbolKind.CodeunitObject:
                return "Codeunit";
            case azSymbolKind_1.AZSymbolKind.PageObject:
                return "Page";
            case azSymbolKind_1.AZSymbolKind.ReportObject:
                return "Report";
            case azSymbolKind_1.AZSymbolKind.QueryObject:
                return "Query";
            case azSymbolKind_1.AZSymbolKind.XmlPortObject:
                return "XmlPort";
            case azSymbolKind_1.AZSymbolKind.ControlAddInObject:
                return "UserControl";
            case azSymbolKind_1.AZSymbolKind.EnumType:
                return "Enum";
            case azSymbolKind_1.AZSymbolKind.TableExtensionObject:
                return "TableExtension";
            case azSymbolKind_1.AZSymbolKind.PageExtensionObject:
                return "PageExtension";
            case azSymbolKind_1.AZSymbolKind.PageCustomizationObject:
                return "PageCustomization";
            case azSymbolKind_1.AZSymbolKind.EnumExtensionType:
                return "EnumExtension";
            case azSymbolKind_1.AZSymbolKind.ProfileObject:
                return "Profile";
            case azSymbolKind_1.AZSymbolKind.Interface:
                return "Interface";
            case azSymbolKind_1.AZSymbolKind.ReportExtensionObject:
                return 'ReportExtension';
            case azSymbolKind_1.AZSymbolKind.PermissionSet:
                return 'PermissionSet';
            case azSymbolKind_1.AZSymbolKind.PermissionSetExtension:
                return 'PermissionSetExtension';
            case azSymbolKind_1.AZSymbolKind.Entitlement:
                return 'Entitlement';
        }
        return undefined;
    }
    static splitNamesList(valueList) {
        let values = [];
        if ((valueList) && (valueList.length > 0)) {
            let startPos = 0;
            let inName = false;
            for (let pos = 0; pos < valueList.length; pos++) {
                switch (valueList[pos]) {
                    case ',':
                        if (!inName) {
                            let valueString = valueList.substring(startPos, pos);
                            if ((values.length > 0) || (valueString !== " ")) {
                                valueString = ALSyntaxHelper.fromNameText(valueString.trim());
                            }
                            values.push(valueString);
                            startPos = pos + 1;
                        }
                        break;
                    case '"':
                        inName = !inName;
                        break;
                }
            }
            if (startPos < valueList.length) {
                let valueString = valueList.substring(startPos, valueList.length);
                if ((values.length > 0) || (valueString !== " ")) {
                    valueString = ALSyntaxHelper.fromNameText(valueString.trim());
                }
                values.push(valueString);
            }
        }
        return values;
    }
}
exports.ALSyntaxHelper = ALSyntaxHelper;
//# sourceMappingURL=alSyntaxHelper.js.map