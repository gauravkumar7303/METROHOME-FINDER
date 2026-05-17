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
exports.ReuseSingleFieldToolTipModifier = void 0;
const vscode = __importStar(require("vscode"));
const toolsGetPageFieldAvailableToolTipsRequest_1 = require("../langserver/symbolsinformation/toolsGetPageFieldAvailableToolTipsRequest");
const azSymbolKind_1 = require("../symbollibraries/azSymbolKind");
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
const templateQuickPickItem_1 = require("../tools/templateQuickPickItem");
class ReuseSingleFieldToolTipModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    _toolTip;
    _availableToolTips;
    constructor(context) {
        super(context, "Reuse Field ToolTip from other Pages", "setPageFieldToolTip");
        this._toolTip = undefined;
        this._availableToolTips = undefined;
    }
    async runForDocumentSymbol(document, symbol, withUI) {
        //process symbol and get details
        if (!symbol) {
            return;
        }
        if (symbol.kind !== azSymbolKind_1.AZSymbolKind.PageField) {
            if (symbol.kind === azSymbolKind_1.AZSymbolKind.Property) {
                if ((symbol.parent) && (symbol.parent.parent) && (symbol.parent.parent.kind === azSymbolKind_1.AZSymbolKind.PageField)) {
                    symbol = symbol.parent.parent;
                }
            }
        }
        if ((symbol.kind != azSymbolKind_1.AZSymbolKind.PageField) ||
            (!symbol.source) ||
            (symbol.source == ''))
            return;
        //find parent page or page extension
        let objectSymbol = symbol.findParentObject();
        if ((!objectSymbol) ||
            ((objectSymbol.kind != azSymbolKind_1.AZSymbolKind.PageObject) && (objectSymbol.kind != azSymbolKind_1.AZSymbolKind.PageExtensionObject)))
            return;
        let objectType = (objectSymbol.kind == azSymbolKind_1.AZSymbolKind.PageExtensionObject) ? 'PageExtension' : 'Page';
        let sourceTable = '';
        if ((objectSymbol.kind == azSymbolKind_1.AZSymbolKind.PageObject) && (objectSymbol.source))
            sourceTable = objectSymbol.source;
        //download list of available tooltips
        let response = await this._context.toolsLangServerClient.getPageFieldAvailableToolTips(new toolsGetPageFieldAvailableToolTipsRequest_1.ToolsGetPageFieldAvailableToolTipsRequest(document.uri.fsPath, objectType, {
            id: objectSymbol.id,
            name: objectSymbol.name,
            namespaceName: objectSymbol.namespaceName
        }, {
            usings: objectSymbol.usings,
            nameWithNamespaceOrId: sourceTable
        }, symbol.source));
        if ((!response) || (!response.toolTips) || (response.toolTips.length == 0)) {
            vscode.window.showInformationMessage('Cannot find any tooltips for this field');
            return;
        }
        this._availableToolTips = response.toolTips;
        await this.runForDocument(document, symbol.range, withUI);
        this._availableToolTips = undefined;
        this._toolTip = undefined;
    }
    getParameters(uri) {
        let parameters = super.getParameters(uri);
        parameters.sortProperties = this.sortPropertiesOnSave(uri);
        if (this._toolTip) {
            parameters.toolTip = this._toolTip.value;
            parameters.comment = this._toolTip.comment;
        }
        return parameters;
    }
    async askForParameters(uri) {
        //ask for Application Area Type
        let quickPickItems = this._availableToolTips.map(x => new templateQuickPickItem_1.TemplateQuickPickItem(x.value, x, false));
        let selectedToolTip = await vscode.window.showQuickPick(quickPickItems, {
            canPickMany: false,
            placeHolder: 'Select tooltip for this field'
        });
        this._toolTip = selectedToolTip?.value;
        return ((!!this._toolTip) && (this._toolTip.value !== ''));
    }
}
exports.ReuseSingleFieldToolTipModifier = ReuseSingleFieldToolTipModifier;
//# sourceMappingURL=reuseSingleFieldToolTipModifier.js.map