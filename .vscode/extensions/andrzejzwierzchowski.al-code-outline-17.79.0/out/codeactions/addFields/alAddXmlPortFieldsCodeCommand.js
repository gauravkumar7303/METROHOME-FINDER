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
exports.ALAddXmlPortFieldsCodeCommand = void 0;
const vscode = __importStar(require("vscode"));
const alBaseAddFieldsCodeCommand_1 = require("./alBaseAddFieldsCodeCommand");
const azSymbolKind_1 = require("../../symbollibraries/azSymbolKind");
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
const tableFieldsSelector_1 = require("./tableFieldsSelector");
const toolsGetXmlPortTableElementDetailsRequest_1 = require("../../langserver/symbolsinformation/toolsGetXmlPortTableElementDetailsRequest");
class ALAddXmlPortFieldsCodeCommand extends alBaseAddFieldsCodeCommand_1.ALBaseAddFieldsCodeCommand {
    elementType;
    commandTitle;
    constructor(context, newElementType, newCommandTitle) {
        super(context, 'AddXmlPort' + newElementType, 'AZDevTools.ALAddXmlPort' + newElementType + 'CodeCommand');
        this.elementType = newElementType;
        this.commandTitle = newCommandTitle;
    }
    collectCodeActions(docSymbols, symbol, document, range, diagnostics, actions) {
        if ((symbol) &&
            ((symbol.kind == azSymbolKind_1.AZSymbolKind.XmlPortTableElement) ||
                (symbol.kind == azSymbolKind_1.AZSymbolKind.XmlPortFieldElement) ||
                (symbol.kind == azSymbolKind_1.AZSymbolKind.XmlPortFieldAttribute))) {
            let action = new vscode.CodeAction(this.commandTitle, vscode.CodeActionKind.QuickFix);
            action.command = {
                command: this.name,
                title: this.commandTitle + '...',
                arguments: [docSymbols, document, range]
            };
            actions.push(action);
        }
    }
    async runAsync(docSymbols, document, range) {
        //get required details from document source code
        let symbol = this._toolsExtensionContext.activeDocumentSymbols.findSymbolInRange(range);
        if (!symbol)
            return;
        let isFieldSymbol = ((symbol.kind == azSymbolKind_1.AZSymbolKind.XmlPortFieldElement) || (symbol.kind == azSymbolKind_1.AZSymbolKind.XmlPortFieldAttribute));
        let dataItemSymbol = symbol;
        if (isFieldSymbol)
            dataItemSymbol = symbol.findParentByKind(azSymbolKind_1.AZSymbolKind.XmlPortTableElement);
        if ((!dataItemSymbol) ||
            (!dataItemSymbol.source) ||
            (!dataItemSymbol.contentRange) ||
            ((isFieldSymbol) && (!symbol.range)))
            return;
        let xmlPortSymbol = dataItemSymbol.findParentByKind(azSymbolKind_1.AZSymbolKind.XmlPortObject);
        if (!xmlPortSymbol)
            return;
        //get list of fields
        let response = await this._toolsExtensionContext.toolsLangServerClient.getXmlPortTableElementDetails(new toolsGetXmlPortTableElementDetailsRequest_1.ToolsGetXmlPortTableElementDetailsRequest(document.uri.fsPath, {
            namespaceName: xmlPortSymbol.namespaceName,
            name: xmlPortSymbol.name,
            id: xmlPortSymbol.id
        }, dataItemSymbol.name, false, true));
        if ((!response) || (!response.symbol) || (!response.symbol.availableTableFields))
            return;
        let fields = response.symbol.availableTableFields;
        //ask for fields
        let fieldsSelector = new tableFieldsSelector_1.TableFieldsSelector(this._toolsExtensionContext);
        let selectedFields = await fieldsSelector.selectFields('Select table fields', fields);
        if (!selectedFields)
            return;
        let indent = dataItemSymbol.contentRange.start.character + 3;
        //insert fields
        let writer = new alSyntaxWriter_1.ALSyntaxWriter(document.uri);
        writer.setIndent(indent);
        for (let i = 0; i < selectedFields.length; i++) {
            writer.writeNameSourceBlock(this.elementType, writer.createName(selectedFields[i].name), dataItemSymbol.name + '.' + writer.encodeName(selectedFields[i].name));
        }
        let source = writer.toString();
        await this.insertSymbolContentAsync(symbol, source, range);
    }
}
exports.ALAddXmlPortFieldsCodeCommand = ALAddXmlPortFieldsCodeCommand;
//# sourceMappingURL=alAddXmlPortFieldsCodeCommand.js.map