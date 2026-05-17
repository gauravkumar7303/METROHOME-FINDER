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
exports.ALAddPageFieldsCodeCommand = void 0;
const vscode = __importStar(require("vscode"));
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
const azSymbolKind_1 = require("../../symbollibraries/azSymbolKind");
const alBaseAddFieldsCodeCommand_1 = require("./alBaseAddFieldsCodeCommand");
const toolsGetPageDetailsRequest_1 = require("../../langserver/symbolsinformation/toolsGetPageDetailsRequest");
const tableFieldsSelector_1 = require("./tableFieldsSelector");
const appAreaMode_1 = require("../../alsyntaxmodifiers/appAreaMode");
const alFieldToolTipsLocation_1 = require("../../allanguage/alFieldToolTipsLocation");
class ALAddPageFieldsCodeCommand extends alBaseAddFieldsCodeCommand_1.ALBaseAddFieldsCodeCommand {
    constructor(context) {
        super(context, 'AddPageFields', 'AZDevTools.ALAddPageFieldsCodeCommand');
    }
    collectCodeActions(docSymbols, symbol, document, range, diagnostics, actions) {
        if ((symbol) &&
            ((symbol.kind == azSymbolKind_1.AZSymbolKind.PageGroup) ||
                (symbol.kind == azSymbolKind_1.AZSymbolKind.PageRepeater) ||
                (symbol.kind == azSymbolKind_1.AZSymbolKind.PageArea) ||
                (symbol.kind == azSymbolKind_1.AZSymbolKind.ControlAddChange) ||
                (symbol.kind == azSymbolKind_1.AZSymbolKind.PageField) ||
                (symbol.kind == azSymbolKind_1.AZSymbolKind.PageUserControl))) {
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
        if (!symbol) {
            return;
        }
        let config = vscode.workspace.getConfiguration('alOutline', document.uri);
        let parentKind = [azSymbolKind_1.AZSymbolKind.PageObject, azSymbolKind_1.AZSymbolKind.PageExtensionObject];
        let pageSymbol = symbol.findParentByKindList(parentKind);
        let isFieldSymbol = ((symbol.kind === azSymbolKind_1.AZSymbolKind.PageField) || (symbol.kind === azSymbolKind_1.AZSymbolKind.PageUserControl));
        let fieldToolTipsLocation = this._toolsExtensionContext.alLangProxy.fieldToolTipsLocation(document.uri);
        let addToolTips = (!!config.get('addToolTipsToPageFields')) && (fieldToolTipsLocation === alFieldToolTipsLocation_1.ALFieldToolTipsLocation.page);
        let useTableFieldCaptionsInApi = !!config.get('useTableFieldCaptionsInApiFields');
        let reuseToolTips = !config.get('doNotReuseToolTipsFromOtherPages');
        let toolTipsSource = config.get('reuseToolTipsFromDependencies');
        if ((!pageSymbol) ||
            ((!isFieldSymbol) && (!symbol.contentRange)) ||
            ((isFieldSymbol) && (!symbol.range)) ||
            ((!pageSymbol.source) && (!pageSymbol.extends))) {
            return;
        }
        let isApiPage = ((!!pageSymbol.subtype) && (pageSymbol.subtype.toLowerCase() === 'api'));
        let pageReference = (pageSymbol.kind === azSymbolKind_1.AZSymbolKind.PageExtensionObject) ? {
            usings: pageSymbol.usings,
            nameWithNamespaceOrId: pageSymbol.extends
        } : {
            namespaceName: pageSymbol.namespaceName,
            name: pageSymbol.name,
            id: pageSymbol.id
        };
        //get available fields from the language server
        let response = await this._toolsExtensionContext.toolsLangServerClient.getPageDetails(new toolsGetPageDetailsRequest_1.ToolsGetPageDetailsRequest(document.uri.fsPath, pageReference, false, true, reuseToolTips, toolTipsSource));
        if ((!response) || (!response.symbol) || (!response.symbol.availableTableFields))
            return;
        let fieldNames = response.symbol.availableTableFields;
        //ask for fields
        let fieldsSelector = new tableFieldsSelector_1.TableFieldsSelector(this._toolsExtensionContext);
        let selectedFields = await fieldsSelector.selectFields('Select table fields', fieldNames);
        if (!selectedFields)
            return;
        let indent = 0;
        let fieldsContainer = symbol;
        if (isFieldSymbol)
            fieldsContainer = symbol.parent;
        if ((fieldsContainer) && (fieldsContainer.contentRange))
            indent = fieldsContainer.contentRange.start.character + 3;
        else if (symbol.range)
            indent = symbol.range.start.character + 3;
        //insert fields        
        let writer = new alSyntaxWriter_1.ALSyntaxWriter(document.uri);
        writer.applicationAreaMode = appAreaMode_1.AppAreaMode.addToAllControls;
        if ((pageSymbol.kind == azSymbolKind_1.AZSymbolKind.PageObject) && (response.symbol.applicationArea) && (response.symbol.applicationArea != '')) {
            writer.applicationArea = response.symbol.applicationArea;
            writer.applicationAreaMode = this._toolsExtensionContext.alLangProxy.getAppAreaMode(document.uri);
        }
        writer.setIndent(indent);
        for (let i = 0; i < selectedFields.length; i++) {
            if (isApiPage)
                writer.writeApiPageField(selectedFields[i].name, selectedFields[i].caption, selectedFields[i].captionLabel?.comment, useTableFieldCaptionsInApi);
            else
                writer.writePageField(selectedFields[i].name, selectedFields[i].caption, selectedFields[i].captionLabel?.comment, selectedFields[i].description, addToolTips, selectedFields[i].toolTips);
        }
        let source = writer.toString();
        await this.insertSymbolContentAsync(symbol, source, range);
    }
}
exports.ALAddPageFieldsCodeCommand = ALAddPageFieldsCodeCommand;
//# sourceMappingURL=alAddPageFieldsCodeCommand.js.map