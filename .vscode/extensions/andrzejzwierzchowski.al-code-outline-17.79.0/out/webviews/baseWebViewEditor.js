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
exports.BaseWebViewEditor = void 0;
const vscode = __importStar(require("vscode"));
class BaseWebViewEditor {
    _htmlContent;
    _extensionContext;
    _panel;
    _extensionPath;
    _documentLoaded;
    _title;
    _viewColumn;
    _disposables = [];
    constructor(context, title) {
        //initialize variables
        this._documentLoaded = false;
        if (title)
            this._title = title;
        else
            this._title = "";
        this._extensionContext = context;
        this._extensionPath = this._extensionContext.extensionPath;
        this._panel = undefined;
        this._viewColumn = vscode.ViewColumn.Active;
        //load html content
        this._htmlContent = undefined;
    }
    dispose() {
        // Clean up our resources
        if (this._panel)
            this._panel.dispose();
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }
    show() {
        this.createWebView();
    }
    reveal() {
        if (this._panel)
            this._panel.reveal();
    }
    getViewType() {
        return "BaseWebViewEditor";
    }
    getHtmlContentPath() {
        return "";
    }
    loadHtmlContent() {
        //let fullExtensionPath = vscode.Uri.file(this._extensionPath).with({ scheme: 'vscode-resource' });
        let fs = require('fs');
        let filePath = this._extensionContext.asAbsolutePath(this.getHtmlContentPath());
        let content = fs.readFileSync(filePath, 'utf8');
        //process resources
        let startString = '##EXTENSIONPATH##/';
        let startStringLen = startString.length;
        let pos = content.indexOf(startString);
        while (pos > 0) {
            let endPos = content.indexOf('"', pos + startStringLen);
            if (endPos > 0) {
                let resPathPart = content.substring(pos + startStringLen, endPos);
                let resUri = this._panel.webview.asWebviewUri(vscode.Uri.file(this._extensionContext.asAbsolutePath(resPathPart))).toString();
                content = content.substr(0, pos) + resUri + content.substr(endPos);
                pos = content.indexOf(startString, pos + resUri.length);
            }
            else
                pos = -1;
        }
        return content.replace(new RegExp('##CSPSOURCE##', 'g'), this._panel.webview.cspSource);
    }
    getWebviewPanelOptions() {
        return {
            // Enable javascript in the webview
            enableScripts: true,
            retainContextWhenHidden: true,
            // And restric the webview to only loading content from our extension's `media` directory.
            localResourceRoots: [
                vscode.Uri.file(this._extensionPath)
            ]
        };
    }
    attachToWebView(panel) {
        this._panel = panel;
        this._panel.webview.options = this.getWebviewPanelOptions();
        this.initializeWebView();
    }
    createWebView() {
        this._panel = vscode.window.createWebviewPanel(this.getViewType(), this._title, this._viewColumn, this.getWebviewPanelOptions());
        this.initializeWebView();
    }
    initializeWebView() {
        if (!this._panel)
            return;
        this.reloadWebViewContent();
        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        // Update the content based on view changes
        this._panel.onDidChangeViewState(e => {
            if ((this._panel) && (this._panel.visible)) {
                this.reloadWebViewContent();
            }
        }, null, this._disposables);
        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(message => {
            this.processWebViewMessage(message);
        }, null, this._disposables);
        this._panel.onDidDispose(e => {
            this.onPanelClosed();
        });
    }
    onPanelClosed() {
    }
    resetViewView() {
        this._htmlContent = undefined;
        this.reloadWebViewContent();
    }
    reloadWebViewContent() {
        this._documentLoaded = false;
        if (this._panel) {
            if (!this._htmlContent)
                this._htmlContent = this.loadHtmlContent();
            this._panel.webview.html = this._htmlContent;
        }
    }
    sendMessage(message) {
        if (this._panel)
            this._panel.webview.postMessage(message);
    }
    processWebViewMessage(message) {
        if (message) {
            switch (message.command) {
                case 'documentLoaded':
                    this._documentLoaded = true;
                    this.onDocumentLoaded();
                    return true;
                case 'showInformation':
                    vscode.window.showInformationMessage(message.message);
                    return true;
                case 'showError':
                    vscode.window.showErrorMessage(message.message);
                    return true;
            }
        }
        return false;
    }
    onDocumentLoaded() {
    }
    close() {
        if (this._panel)
            this._panel.dispose();
    }
}
exports.BaseWebViewEditor = BaseWebViewEditor;
//# sourceMappingURL=baseWebViewEditor.js.map