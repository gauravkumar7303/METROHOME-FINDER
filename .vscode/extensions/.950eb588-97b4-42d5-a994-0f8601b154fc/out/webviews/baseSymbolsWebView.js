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
exports.BaseSymbolsWebView = void 0;
const vscode = __importStar(require("vscode"));
const docToolsWebView_1 = require("./docToolsWebView");
const azSymbolsLibrary_1 = require("../symbollibraries/azSymbolsLibrary");
const azSymbolKind_1 = require("../symbollibraries/azSymbolKind");
const textEditorHelper_1 = require("../tools/textEditorHelper");
class BaseSymbolsWebView extends docToolsWebView_1.DocToolsWebView {
    _sourceSymbolsLibrary;
    _sourceRootSymbol;
    _rootSymbol;
    _copySymbols;
    _selectedSymbolPath;
    constructor(devToolsContext, documentName, documentUri) {
        super(devToolsContext, documentName, documentUri);
        this._sourceSymbolsLibrary = new azSymbolsLibrary_1.AZSymbolsLibrary();
        this._rootSymbol = undefined;
        this._copySymbols = false;
        this._selectedSymbolPath = undefined;
    }
    setSymbols(rootSymbol, rootSymbolName) {
        let sourceId = '';
        if ((rootSymbol) && (this._copySymbols)) {
            this._rootSymbol = rootSymbol.createCopy(true);
            if (rootSymbolName)
                this._rootSymbol.fullName = rootSymbolName;
        }
        else
            this._rootSymbol = rootSymbol;
        if (this._rootSymbol)
            sourceId = this._rootSymbol.name;
        this._sourceSymbolsLibrary.setRootSymbol(rootSymbol, sourceId);
        this.updateView();
    }
    updateView() {
        if (!this._loaded)
            return;
        this.sendSetDataMessage();
        if (this._rootSymbol)
            this._selectedSymbolPath = undefined;
    }
    sendSetDataMessage() {
        this.sendMessage({
            command: 'setData',
            data: this._rootSymbol,
            selected: this._selectedSymbolPath
        });
    }
    async onDocumentLoaded() {
        this._loaded = true;
        if (this._documentUri)
            await this.loadSymbols();
        else
            await this.updateView();
    }
    async loadSymbols() {
    }
    processWebViewMessage(message) {
        if (super.processWebViewMessage(message))
            return true;
        if (message) {
            switch (message.command) {
                case 'definition':
                    if (message.path)
                        this.goToDefinition(message.path);
                    return true;
                case 'symbolselected':
                    if (message.path)
                        this.onSymbolSelected(message.path);
                    return true;
                case 'refresh':
                    this.loadSymbols();
                    return true;
                case 'sync':
                    this.selectSymbolAtCursor();
                    return true;
            }
        }
        return false;
    }
    async onSymbolSelected(symbolPath) {
        this._selectedSymbolPath = symbolPath;
    }
    async goToDefinition(nodePath) {
        if ((nodePath) && (this._documentUri)) {
            let symbolList = await this._sourceSymbolsLibrary.getSymbolsListByPathAsync([nodePath], azSymbolKind_1.AZSymbolKind.Undefined);
            if ((symbolList) && (symbolList.length > 0) && (symbolList[0].selectionRange)) {
                textEditorHelper_1.TextEditorHelper.openEditor(this._documentUri, true, true, new vscode.Position(symbolList[0].selectionRange.start.line, symbolList[0].selectionRange.start.character));
            }
        }
    }
    selectSymbolInRange(range) {
        this._selectedSymbolPath = this._sourceSymbolsLibrary.findSymbolPathInRange(range);
        if (this._selectedSymbolPath) {
            this.sendMessage({
                command: 'selectSymbol',
                selected: this._selectedSymbolPath
            });
        }
    }
    selectSymbolAtCursor() {
        if (this._documentUri) {
            let editor = textEditorHelper_1.TextEditorHelper.findDocumentEditor(this._documentUri);
            if (editor)
                this.selectSymbolInRange(editor.selection);
        }
    }
}
exports.BaseSymbolsWebView = BaseSymbolsWebView;
//# sourceMappingURL=baseSymbolsWebView.js.map