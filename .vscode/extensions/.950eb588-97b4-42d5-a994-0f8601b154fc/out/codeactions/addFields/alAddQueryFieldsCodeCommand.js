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
exports.ALAddQueryFieldsCodeCommand = void 0;
const vscode = __importStar(require("vscode"));
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
const azSymbolKind_1 = require("../../symbollibraries/azSymbolKind");
const alBaseAddFieldsCodeCommand_1 = require("./alBaseAddFieldsCodeCommand");
const tableFieldsSelector_1 = require("./tableFieldsSelector");
const toolsGetQueryDataItemDetailsRequest_1 = require("../../langserver/symbolsinformation/toolsGetQueryDataItemDetailsRequest");
class ALAddQueryFieldsCodeCommand extends alBaseAddFieldsCodeCommand_1.ALBaseAddFieldsCodeCommand {
    constructor(context) {
        super(context, 'AddQueryFields', 'AZDevTools.ALAddQueryFieldsCodeCommand');
    }
    collectCodeActions(docSymbols, symbol, document, range, diagnostics, actions) {
        if ((symbol) &&
            ((symbol.kind == azSymbolKind_1.AZSymbolKind.QueryDataItem) ||
                (symbol.kind == azSymbolKind_1.AZSymbolKind.QueryColumn))) {
            let action = new vscode.CodeAction("Add multiple fields (AZ AL Dev Tools)", vscode.CodeActionKind.QuickFix);
            action.command = {
                command: this.name,
                title: 'Add multiple fields...',
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
        let isFieldSymbol = (symbol.kind == azSymbolKind_1.AZSymbolKind.QueryColumn);
        let dataItemSymbol = symbol;
        if (isFieldSymbol)
            dataItemSymbol = symbol.findParentByKind(azSymbolKind_1.AZSymbolKind.QueryDataItem);
        if ((!symbol) ||
            (!dataItemSymbol) ||
            (!dataItemSymbol.source) ||
            (!dataItemSymbol.contentRange) ||
            ((isFieldSymbol) && (!symbol.range)))
            return;
        let objectSymbol = dataItemSymbol.findParentByKind(azSymbolKind_1.AZSymbolKind.QueryObject);
        if (!objectSymbol)
            return;
        let isApi = ((!!objectSymbol.subtype) && (objectSymbol.subtype.toLowerCase() == 'api'));
        //get list of fields
        let response = await this._toolsExtensionContext.toolsLangServerClient.getQueryDataItemDetails(new toolsGetQueryDataItemDetailsRequest_1.ToolsGetQueryDataItemDetailsRequest(document.uri.fsPath, {
            namespaceName: objectSymbol.namespaceName,
            name: objectSymbol.name,
            id: objectSymbol.id
        }, dataItemSymbol.name, false, true));
        if ((!response) || (!response.symbol) || (!response.symbol.availableTableFields))
            return;
        let fields = response.symbol.availableTableFields;
        /*
        //get list of fields
        let fields = await this.getTableFields(dataItemSymbol.source);

        //remove existing fields from the list
        fields = this.removeExistingFields(fields, dataItemSymbol.childSymbols, AZSymbolKind.QueryColumn, 'All available table fields have already been added to the query.');
        if (!fields)
            return;
        */
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
            let columnName = isApi ? writer.createApiName(selectedFields[i].name) : writer.createName(selectedFields[i].name);
            writer.writeNameSourceBlock("column", writer.encodeName(columnName), writer.encodeName(selectedFields[i].name));
        }
        let source = writer.toString();
        await this.insertSymbolContentAsync(symbol, source, range);
    }
}
exports.ALAddQueryFieldsCodeCommand = ALAddQueryFieldsCodeCommand;
//# sourceMappingURL=alAddQueryFieldsCodeCommand.js.map