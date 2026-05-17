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
exports.ALBaseAddFieldsCodeCommand = void 0;
const vscode = __importStar(require("vscode"));
const alCodeCommand_1 = require("../alCodeCommand");
const azSymbolKind_1 = require("../../symbollibraries/azSymbolKind");
const alSyntaxHelper_1 = require("../../allanguage/alSyntaxHelper");
const toolsGetTableFieldsListRequest_1 = require("../../langserver/symbolsinformation/toolsGetTableFieldsListRequest");
class ALBaseAddFieldsCodeCommand extends alCodeCommand_1.ALCodeCommand {
    constructor(context, shortName, commandName) {
        super(context, shortName, commandName);
    }
    async getTableFields(tableReference) {
        let uri = this.getDocumentUri();
        let configuration = vscode.workspace.getConfiguration('alOutline', uri);
        let reuseToolTips = !configuration.get('doNotReuseToolTipsFromOtherPages');
        let toolTipsSource = configuration.get('reuseToolTipsFromDependencies');
        let response = await this._toolsExtensionContext.toolsLangServerClient.getTableFieldsList(new toolsGetTableFieldsListRequest_1.ToolsGetTableFieldsListRequest(uri?.fsPath, tableReference, false, false, true, true, true, reuseToolTips, toolTipsSource));
        if (!response)
            return;
        return response.symbols;
    }
    removeExistingFields(fields, existingFields, existingFieldKind, noFieldsMessage) {
        if (!fields)
            return undefined;
        if (existingFields) {
            for (let i = 0; i < existingFields.length; i++) {
                let srcName = existingFields[i].source;
                if ((existingFields[i].kind == existingFieldKind) && (srcName)) {
                    //detect fields declared as rec.
                    if (srcName.toLowerCase().startsWith("rec."))
                        srcName = alSyntaxHelper_1.ALSyntaxHelper.fromNameText(srcName.substr(4));
                    let idx = this.getFieldIndex(fields, srcName);
                    if (idx >= 0) {
                        if (idx < (fields.length - 1))
                            fields[idx] = fields[fields.length - 1];
                        fields.pop();
                    }
                }
            }
        }
        if (fields.length == 0) {
            vscode.window.showWarningMessage(noFieldsMessage);
            return undefined;
        }
        return this.sortFields(fields);
    }
    sortFields(fields) {
        return fields.sort((a, b) => {
            if (a.name > b.name)
                return 1;
            if (a.name < b.name)
                return -1;
            return 0;
        });
    }
    getFieldIndex(fields, name) {
        name = name.toLowerCase();
        for (let i = 0; i < fields.length; i++) {
            if ((fields[i].name) && (fields[i].name?.toLowerCase() == name))
                return i;
        }
        return -1;
    }
    async insertSymbolContentAsync(symbol, content, range) {
        if (!vscode.window.activeTextEditor)
            return;
        let eol = vscode.window.activeTextEditor.document.eol === vscode.EndOfLine.CRLF ? "\r\n" : "\n";
        let line = 0;
        let column = 0;
        if ((symbol.kind == azSymbolKind_1.AZSymbolKind.PageField) ||
            (symbol.kind == azSymbolKind_1.AZSymbolKind.PageUserControl) ||
            (symbol.kind == azSymbolKind_1.AZSymbolKind.QueryColumn) ||
            (symbol.kind == azSymbolKind_1.AZSymbolKind.ReportColumn) ||
            (symbol.kind == azSymbolKind_1.AZSymbolKind.XmlPortFieldElement) ||
            (symbol.kind == azSymbolKind_1.AZSymbolKind.XmlPortFieldAttribute)) {
            if (symbol.range) {
                //check if position before first token - insert before
                if ((symbol.tokensRange) && (range) &&
                    ((symbol.tokensRange.start.line > range.start.line) ||
                        ((symbol.tokensRange.start.line === range.start.line) && (symbol.tokensRange.start.character > range.start.character)))) {
                    line = symbol.range.start.line;
                    column = symbol.range.start.character;
                    //content = eol + content; 
                }
                else {
                    line = symbol.range.end.line;
                    column = symbol.range.end.character;
                }
            }
        }
        else if (symbol.contentRange) {
            line = symbol.contentRange.end.line;
            let nextSymbolColumn = symbol.contentRange.end.character;
            if ((symbol.childSymbols) && (symbol.childSymbols.length > 0)) {
                for (let i = 0; i < symbol.childSymbols.length; i++) {
                    if ((symbol.childSymbols[i].kind !== azSymbolKind_1.AZSymbolKind.PropertyList) && (symbol.childSymbols[i].range) && (symbol.childSymbols[i].range.start.line < line)) {
                        line = symbol.childSymbols[i].range.start.line;
                        nextSymbolColumn = symbol.childSymbols[i].range.start.character;
                    }
                }
            }
            //is insert in the first content line?
            if (line == symbol.contentRange.start.line) {
                column = nextSymbolColumn;
                content = eol + content;
            }
            ;
        }
        await vscode.window.activeTextEditor.edit(editBuilder => {
            editBuilder.insert(new vscode.Position(line, column), content);
        });
    }
}
exports.ALBaseAddFieldsCodeCommand = ALBaseAddFieldsCodeCommand;
//# sourceMappingURL=alBaseAddFieldsCodeCommand.js.map