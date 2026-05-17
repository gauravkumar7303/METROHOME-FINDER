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
exports.SyntaxTreeView = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const azSymbolInformation_1 = require("../symbollibraries/azSymbolInformation");
const toolsGetSyntaxTreeRequest_1 = require("../langserver/toolsGetSyntaxTreeRequest");
const textEditorHelper_1 = require("../tools/textEditorHelper");
const toolsGetSyntaxTreeSymbolRequest_1 = require("../langserver/toolsGetSyntaxTreeSymbolRequest");
const toolsCloseSyntaxTreeRequest_1 = require("../langserver/toolsCloseSyntaxTreeRequest");
const baseSymbolsWebView_1 = require("../webviews/baseSymbolsWebView");
const syntaxTreeViewMode_1 = require("./syntaxTreeViewMode");
class SyntaxTreeView extends baseSymbolsWebView_1.BaseSymbolsWebView {
    _firstLoad;
    _viewMode;
    constructor(devToolsContext, documentUri) {
        super(devToolsContext, undefined, documentUri);
        this._firstLoad = true;
        this._viewMode = syntaxTreeViewMode_1.SyntaxTreeViewMode.ClassView;
        this._disposables.push(vscode.workspace.onDidChangeTextDocument(e => {
            if ((e.document) && (this._documentUri) &&
                (e.document.uri.fsPath == this._documentUri.fsPath))
                this.loadSymbols();
        }));
        vscode.window.onDidChangeActiveTextEditor(editor => {
            this.loadSymbols();
        });
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'syntaxtreeview', 'syntaxtreeview.html');
    }
    getViewType() {
        return 'azALDevTools.SyntaxTreeView';
    }
    sendSetDataMessage() {
        this.sendMessage({
            command: 'setData',
            data: this._rootSymbol,
            viewMode: this._viewMode,
            selected: this._selectedSymbolPath
        });
    }
    async loadSymbols() {
        if (!this._documentUri) {
            return;
        }
        let editor = textEditorHelper_1.TextEditorHelper.findDocumentEditor(this._documentUri);
        let source = '';
        let projectPath = undefined;
        if (editor) {
            source = editor.document.getText();
            projectPath = editor.document.uri.fsPath;
        }
        let request = new toolsGetSyntaxTreeRequest_1.ToolsGetSyntaxTreeRequest(source, this._documentUri.fsPath, projectPath, this._firstLoad);
        this._firstLoad = false;
        let response = undefined;
        switch (this._viewMode) {
            case syntaxTreeViewMode_1.SyntaxTreeViewMode.TreeView:
                response = await this._devToolsContext.toolsLangServerClient.getSyntaxTree(request);
                break;
            case syntaxTreeViewMode_1.SyntaxTreeViewMode.ClassView:
                response = await this._devToolsContext.toolsLangServerClient.getRawSyntaxTree(request);
                break;
        }
        if ((response) && (response.root)) {
            let rootSymbol = azSymbolInformation_1.AZSymbolInformation.fromAny(response.root);
            rootSymbol.updateTree(true, false);
            this.setSymbols(rootSymbol, undefined);
        }
        else
            this.setSymbols(undefined, undefined);
    }
    async onSymbolSelected(symbolPath) {
        if (!this._documentUri)
            return;
        let request = new toolsGetSyntaxTreeSymbolRequest_1.ToolsGetSyntaxTreeSymbolsRequest(this._documentUri.fsPath, symbolPath);
        let response = await this._devToolsContext.toolsLangServerClient.getRawSyntaxTreeSymbol(request);
        if (response) {
            this.setSymbolInfo(response.symbol);
            if (response.symbol) {
                let editor = textEditorHelper_1.TextEditorHelper.findDocumentEditor(this._documentUri);
                if (editor) {
                    editor.selection = new vscode.Selection(response.symbol.range.start.line, response.symbol.range.start.character, response.symbol.range.end.line, response.symbol.range.end.character);
                    editor.revealRange(editor.selection);
                }
            }
        }
        else
            this.setSymbolInfo(undefined);
    }
    setSymbolInfo(symbol) {
        this.sendMessage({
            command: 'setSymbolInfo',
            data: symbol
        });
    }
    onPanelClosed() {
        super.onPanelClosed();
        if (this._documentUri) {
            let request = new toolsCloseSyntaxTreeRequest_1.ToolsCloseSyntaxTreeRequest(this._documentUri.fsPath);
            this._devToolsContext.toolsLangServerClient.closeRawSyntaxTree(request);
        }
    }
    processWebViewMessage(message) {
        if (super.processWebViewMessage(message)) {
            return true;
        }
        if (message) {
            switch (message.command) {
                case 'treeview':
                    this.setView(syntaxTreeViewMode_1.SyntaxTreeViewMode.TreeView);
                    return true;
                case 'classview':
                    this.setView(syntaxTreeViewMode_1.SyntaxTreeViewMode.ClassView);
                    return true;
            }
        }
        return false;
    }
    setView(newViewMode) {
        if (this._viewMode !== newViewMode) {
            this._viewMode = newViewMode;
            this.loadSymbols();
        }
    }
}
exports.SyntaxTreeView = SyntaxTreeView;
//# sourceMappingURL=syntaxTreeView.js.map