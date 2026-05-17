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
exports.SymbolsTreeView = void 0;
const path = __importStar(require("path"));
const azDocumentSymbolsLibrary_1 = require("../symbollibraries/azDocumentSymbolsLibrary");
const baseSymbolsWebView_1 = require("../webviews/baseSymbolsWebView");
class SymbolsTreeView extends baseSymbolsWebView_1.BaseSymbolsWebView {
    selectedSymbolRange;
    constructor(devToolsContext, documentName, documentUri) {
        super(devToolsContext, documentName, documentUri);
        this._copySymbols = true;
        if (this._documentUri)
            this._disposables.push(this._devToolsContext.activeDocumentSymbols.onSymbolsChanged(symbolsLib => this.onSymbolsChanged(symbolsLib)));
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'symbolstreeview', 'symbolstreeview.html');
    }
    getViewType() {
        return 'azALDevTools.SymbolsTreeView';
    }
    async loadSymbols() {
        if ((!this._documentUri) || (!this.selectedSymbolRange))
            return;
        let currDocUri = this._devToolsContext.activeDocumentSymbols.getDocUri();
        if ((currDocUri) && (currDocUri.toString() == this._documentUri.toString()) && (this._devToolsContext.activeDocumentSymbols.rootSymbol)) {
            this._selectedSymbolPath = this._devToolsContext.activeDocumentSymbols.findSymbolPathInSelectionRange(this.selectedSymbolRange);
            this.setSymbols(this._devToolsContext.activeDocumentSymbols.rootSymbol, this._title);
        }
        else {
            let library = new azDocumentSymbolsLibrary_1.AZDocumentSymbolsLibrary(this._devToolsContext, this._documentUri);
            await library.loadAsync(false);
            this._selectedSymbolPath = library.findSymbolPathInSelectionRange(this.selectedSymbolRange);
            this.setSymbols(library.rootSymbol, this._title);
        }
    }
    onSymbolsChanged(lib) {
        if (this._documentUri) {
            let docUri = this._devToolsContext.activeDocumentSymbols.getDocUri();
            if ((docUri) && (docUri.path == this._documentUri.path)) {
                this._selectedSymbolPath = undefined;
                this.setSymbols(this._devToolsContext.activeDocumentSymbols.rootSymbol, this._title);
            }
        }
    }
    onPanelClosed() {
        if (this._documentUri)
            this._devToolsContext.alSymbolsTreeService.removeUriSymbolsTreeView(this._documentUri);
    }
}
exports.SymbolsTreeView = SymbolsTreeView;
//# sourceMappingURL=symbolsTreeView.js.map