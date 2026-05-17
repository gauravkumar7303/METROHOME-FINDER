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
exports.ALAddReportFieldsCodeCommand = void 0;
const vscode = __importStar(require("vscode"));
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
const azSymbolKind_1 = require("../../symbollibraries/azSymbolKind");
const alBaseAddFieldsCodeCommand_1 = require("./alBaseAddFieldsCodeCommand");
const tableFieldsSelector_1 = require("./tableFieldsSelector");
const toolsGetReportDataItemDetailsRequest_1 = require("../../langserver/symbolsinformation/toolsGetReportDataItemDetailsRequest");
class ALAddReportFieldsCodeCommand extends alBaseAddFieldsCodeCommand_1.ALBaseAddFieldsCodeCommand {
    constructor(context) {
        super(context, 'AddReportFields', 'AZDevTools.ALAddReportFieldsCodeCommand');
    }
    collectCodeActions(docSymbols, symbol, document, range, diagnostics, actions) {
        if ((symbol) &&
            ((symbol.kind == azSymbolKind_1.AZSymbolKind.ReportDataItem) ||
                (symbol.kind == azSymbolKind_1.AZSymbolKind.ReportExtensionAddColumnChange) ||
                (symbol.kind == azSymbolKind_1.AZSymbolKind.ReportColumn))) {
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
        let settings = vscode.workspace.getConfiguration('alOutline', document.uri);
        let addDataItemName = settings.get('addDataItemToReportColumnName');
        let symbol = this._toolsExtensionContext.activeDocumentSymbols.findSymbolInRange(range);
        if (!symbol)
            return;
        let isFieldSymbol = (symbol.kind == azSymbolKind_1.AZSymbolKind.ReportColumn);
        let dataItemSymbol = symbol;
        if (isFieldSymbol) {
            let dataItemKind = [azSymbolKind_1.AZSymbolKind.ReportDataItem, azSymbolKind_1.AZSymbolKind.ReportExtensionAddColumnChange];
            dataItemSymbol = symbol.findParentByKindList(dataItemKind);
        }
        if ((!dataItemSymbol) ||
            //(!dataItemSymbol.source) || 
            (!dataItemSymbol.contentRange) ||
            ((isFieldSymbol) && (!symbol.range)))
            return;
        let parentKind = [azSymbolKind_1.AZSymbolKind.ReportObject, azSymbolKind_1.AZSymbolKind.ReportExtensionObject];
        let objectSymbol = dataItemSymbol.findParentByKindList(parentKind);
        if (!objectSymbol)
            return;
        let reportReference = (objectSymbol.kind === azSymbolKind_1.AZSymbolKind.ReportExtensionObject) ? {
            usings: objectSymbol.usings,
            nameWithNamespaceOrId: objectSymbol.extends
        } : {
            namespaceName: objectSymbol.namespaceName,
            name: objectSymbol.name,
            id: objectSymbol.id
        };
        let dataItemName = (dataItemSymbol.kind == azSymbolKind_1.AZSymbolKind.ReportExtensionAddColumnChange) ? dataItemSymbol.extends : dataItemSymbol.name;
        if (!dataItemName)
            return;
        //get list of fields
        let response = await this._toolsExtensionContext.toolsLangServerClient.getReportDataItemDetails(new toolsGetReportDataItemDetailsRequest_1.ToolsGetReportDataItemDetailsRequest(document.uri.fsPath, reportReference, dataItemName, false, true));
        if ((!response) || (!response.symbol) || (!response.symbol.availableTableFields))
            return;
        let fields = response.symbol.availableTableFields;
        /*
        //get list of fields
        let fields = await this.getTableFields(dataItemSymbol.source);
        
        //remove existing fields from the list
        fields = this.removeExistingFields(fields, dataItemSymbol.childSymbols, AZSymbolKind.ReportColumn, 'All available table fields have already been added to the report.');
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
            let columnName = writer.createName(selectedFields[i].name);
            if (dataItemName)
                columnName = columnName + "_" + writer.createName(dataItemName);
            writer.writeNameSourceBlock("column", columnName, writer.encodeName(selectedFields[i].name));
        }
        let source = writer.toString();
        await this.insertSymbolContentAsync(symbol, source, range);
    }
}
exports.ALAddReportFieldsCodeCommand = ALAddReportFieldsCodeCommand;
//# sourceMappingURL=alAddReportFieldsCodeCommand.js.map