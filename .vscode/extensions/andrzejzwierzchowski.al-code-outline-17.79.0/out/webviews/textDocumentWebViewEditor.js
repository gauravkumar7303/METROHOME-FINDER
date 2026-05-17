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
exports.TextDocumentWebViewEditor = void 0;
const vscode = __importStar(require("vscode"));
const baseWebViewEditor_1 = require("./baseWebViewEditor");
const stringHelper_1 = require("../tools/stringHelper");
class TextDocumentWebViewEditor extends baseWebViewEditor_1.BaseWebViewEditor {
    document;
    _devToolsContext;
    _inUpdateMode;
    constructor(devToolsContext, title) {
        super(devToolsContext.vscodeExtensionContext, title);
        this._devToolsContext = devToolsContext;
        this.document = undefined;
        this._inUpdateMode = false;
    }
    resolveCustomTextEditor(document, webviewPanel) {
        this.document = document;
        this.attachToWebView(webviewPanel);
        //register document events
        this._disposables.push(vscode.workspace.onDidChangeTextDocument(e => {
            if ((this.document) && (e.document.uri.toString() === this.document.uri.toString())) {
                if (!this._inUpdateMode)
                    this.onTextDocumentChanged();
            }
        }));
    }
    onTextDocumentChanged() {
    }
    async updateTextDocument(newText) {
        let success = true;
        if (this.document) {
            const edit = new vscode.WorkspaceEdit();
            //compute min. edit
            let docText = this.document.getText();
            let docLen = docText.length;
            let newLen = newText.length;
            let startEQ = stringHelper_1.StringHelper.equalStartLength(docText, newText);
            let endEQ = stringHelper_1.StringHelper.equalEndLength(docText, newText);
            if ((startEQ + endEQ) > docLen)
                endEQ = docLen - startEQ;
            if ((startEQ + endEQ) > newLen)
                endEQ = newLen - startEQ;
            if ((startEQ + endEQ) == docLen) {
                if (docLen != newLen)
                    edit.insert(this.document.uri, this.document.positionAt(startEQ), newText.substr(startEQ, newLen - startEQ - endEQ));
            }
            else if ((startEQ + endEQ) == newLen) {
                edit.delete(this.document.uri, new vscode.Range(this.document.positionAt(startEQ), this.document.positionAt(docLen - endEQ)));
            }
            else {
                edit.replace(this.document.uri, new vscode.Range(this.document.positionAt(startEQ), this.document.positionAt(docLen - endEQ)), newText.substr(startEQ, newLen - startEQ - endEQ));
            }
            // Just replace the entire document every time for this example extension.
            // A more complete extension should compute minimal edits instead.
            //            edit.replace(
            //                this.document.uri,
            //                new vscode.Range(0, 0, this.document.lineCount, 0),
            //                newText);
            this._inUpdateMode = true;
            success = await vscode.workspace.applyEdit(edit);
            this._inUpdateMode = false;
        }
        return success;
    }
    getTextDocumentAsJson() {
        if (!this.document)
            return undefined;
        const text = this.document.getText();
        if (text.trim().length === 0)
            return {};
        return JSON.parse(text);
    }
    updateTextDocumentFromJson(json) {
        this.updateTextDocument(JSON.stringify(json, null, 2));
    }
}
exports.TextDocumentWebViewEditor = TextDocumentWebViewEditor;
//# sourceMappingURL=textDocumentWebViewEditor.js.map