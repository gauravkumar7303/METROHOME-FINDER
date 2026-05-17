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
exports.TextEditorHelper = void 0;
const vscode = __importStar(require("vscode"));
class TextEditorHelper {
    static findDocumentEditor(docUri) {
        if (docUri) {
            let docUriString = docUri.toString();
            if ((vscode.window.activeTextEditor) &&
                (vscode.window.activeTextEditor.document) &&
                (vscode.window.activeTextEditor.document.uri) &&
                (vscode.window.activeTextEditor.document.uri.toString() == docUriString))
                return vscode.window.activeTextEditor;
            let editors = vscode.window.visibleTextEditors;
            for (let i = 0; i < editors.length; i++) {
                if ((editors[i].document) && (editors[i].document.uri)) {
                    let editorUri = editors[i].document.uri.toString();
                    if (editorUri == docUriString) {
                        return editors[i];
                    }
                }
            }
        }
        return undefined;
    }
    static async openEditor(docUri, reuseExisting, preview, position) {
        let editorViewColumn = undefined;
        if (reuseExisting) {
            let editor = this.findDocumentEditor(docUri);
            if (editor)
                editorViewColumn = editor.viewColumn;
        }
        try {
            let targetDoc = await vscode.workspace.openTextDocument(docUri);
            let targetEditor = await vscode.window.showTextDocument(targetDoc, {
                preview: preview,
                viewColumn: editorViewColumn
            });
            if (position) {
                targetEditor.selection = new vscode.Selection(position, position);
                targetEditor.revealRange(targetEditor.selection);
            }
            return targetEditor;
        }
        catch (e) {
            vscode.window.showErrorMessage(e.message);
        }
        return undefined;
    }
    static async showNewDocument(content, language) {
        try {
            let document = await vscode.workspace.openTextDocument({
                content: content,
                language: language
            });
            vscode.window.showTextDocument(document, {
                preview: false
            });
        }
        catch (e) {
            vscode.window.showErrorMessage(e.message);
        }
    }
    static getActiveWorkspaceFolderUri() {
        let folder = undefined;
        if ((vscode.window.activeTextEditor) && (vscode.window.activeTextEditor.document) && (vscode.window.activeTextEditor.document.uri)) {
            folder = vscode.workspace.getWorkspaceFolder(vscode.window.activeTextEditor.document.uri);
            if ((folder) && (folder.uri))
                return folder.uri;
        }
        let editors = vscode.window.visibleTextEditors;
        for (let i = 0; i < editors.length; i++) {
            if ((editors[i].document) && (editors[i].document.uri)) {
                folder = vscode.workspace.getWorkspaceFolder(editors[i].document.uri);
                if ((folder) && (folder.uri))
                    return folder.uri;
            }
        }
        if ((vscode.workspace.workspaceFolders) && (vscode.workspace.workspaceFolders.length > 0))
            return vscode.workspace.workspaceFolders[0].uri;
        return undefined;
    }
}
exports.TextEditorHelper = TextEditorHelper;
//# sourceMappingURL=textEditorHelper.js.map