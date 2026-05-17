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
exports.SyntaxModifier = void 0;
const vscode = __importStar(require("vscode"));
const textEditorHelper_1 = require("../tools/textEditorHelper");
class SyntaxModifier {
    _context;
    _showProgress;
    _progressMessage;
    name;
    constructor(context, newName) {
        this._context = context;
        this._showProgress = true;
        this._progressMessage = "Processing project files. Please wait...";
        this.name = newName;
    }
    async runForFiles() {
        let confirmation = await this.confirmRunForFiles();
        if (!confirmation)
            return;
        let workspaceUri = textEditorHelper_1.TextEditorHelper.getActiveWorkspaceFolderUri();
        vscode.workspace.saveAll();
        if (!workspaceUri)
            return;
        let cont = await this.askForParameters(workspaceUri);
        if (!cont) {
            vscode.window.showInformationMessage("Command cancelled");
            return;
        }
        let forFiles = await this.getFilesToUpdate(workspaceUri);
        let result = await this.runForWorkspaceWithoutUI(workspaceUri, forFiles);
        if ((result) && (result.message)) {
            if (result.success)
                vscode.window.showInformationMessage(result.message);
            else
                vscode.window.showErrorMessage(result.message);
        }
    }
    async runForWorkspace() {
        let confirmation = await this.confirmRunForWorkspace();
        if (!confirmation)
            return;
        let workspaceUri = textEditorHelper_1.TextEditorHelper.getActiveWorkspaceFolderUri();
        vscode.workspace.saveAll();
        if (!workspaceUri)
            return;
        let cont = await this.askForParameters(workspaceUri);
        if (!cont) {
            vscode.window.showInformationMessage("Command cancelled");
            return;
        }
        let result = await this.runForWorkspaceWithoutUI(workspaceUri, undefined);
        if ((result) && (result.message)) {
            if (result.success)
                vscode.window.showInformationMessage(result.message);
            else
                vscode.window.showErrorMessage(result.message);
        }
    }
    async runForWorkspaceWithoutUI(workspaceUri, forFiles) {
        return undefined;
    }
    async confirmRunForWorkspace() {
        let confirmation = await vscode.window.showInformationMessage('Do you want to run this command for all files in the current project folder?', 'Yes', 'No');
        return (confirmation === 'Yes');
    }
    async confirmRunForFiles() {
        let confirmation = await vscode.window.showInformationMessage('Do you want to run this command for all uncommited files in the current project folder?', 'Yes', 'No');
        return (confirmation === 'Yes');
    }
    getExcludedFiles(uri) {
        let configuration = vscode.workspace.getConfiguration('alOutline', uri);
        return configuration.get('codeTransformationIgnoreFiles');
    }
    getParameters(uri) {
        let values = {};
        return values;
    }
    async runForActiveEditor() {
        if (!vscode.window.activeTextEditor)
            return;
        await this.runForDocument(vscode.window.activeTextEditor.document, undefined, true);
    }
    async runForDocumentSymbol(document, symbol, withUI) {
        await this.runForDocument(document, symbol.range, withUI);
    }
    async runForDocument(document, range, withUI) {
        let text = document.getText();
        if (!text)
            return;
        let workspaceUri = textEditorHelper_1.TextEditorHelper.getActiveWorkspaceFolderUri();
        if ((!workspaceUri) || (!document.uri) || (!document.uri.fsPath))
            return;
        let cont = await this.askForParameters(document.uri);
        if (!cont) {
            vscode.window.showInformationMessage("Command cancelled");
            return;
        }
        let result = await this.runForDocumentWithoutUI(text, workspaceUri, document.uri, range);
        if (result) {
            if (!result.success) {
                if ((withUI) && (result.message))
                    vscode.window.showErrorMessage(result.message);
            }
            else {
                if ((result.source) && (result.source != text)) {
                    text = result.source;
                    const edit = new vscode.WorkspaceEdit();
                    var firstLine = document.lineAt(0);
                    var lastLine = document.lineAt(document.lineCount - 1);
                    var textRange = new vscode.Range(0, firstLine.range.start.character, document.lineCount - 1, lastLine.range.end.character);
                    edit.replace(document.uri, textRange, text);
                    await vscode.workspace.applyEdit(edit);
                }
                if ((withUI) && (result.message))
                    vscode.window.showInformationMessage(result.message);
            }
        }
        else if (withUI)
            vscode.window.showInformationMessage('There was nothing to change.');
    }
    loadDefaultParameters(uri) {
        return false;
    }
    async runForDocumentWithoutUI(text, workspaceUri, documentUri, range) {
        return undefined;
    }
    async loadDefaultOrAskForParameters(uri) {
        if (this.loadDefaultParameters(uri))
            return true;
        return await this.askForParameters(uri);
    }
    async askForParameters(uri) {
        return true;
    }
    hideProgress() {
        this._showProgress = false;
    }
    sortPropertiesOnSave(uri) {
        let settings = vscode.workspace.getConfiguration('alOutline', uri);
        let actionsOnSave = settings.get('codeActionsOnSave');
        if (actionsOnSave) {
            for (let i = 0; i < actionsOnSave.length; i++) {
                if (actionsOnSave[i] === 'SortProperties') {
                    return true;
                }
            }
        }
        return false;
    }
    getFilesToUpdate(workspaceUri) {
        return this._context.gitService.getUncommitedFiles(workspaceUri);
    }
}
exports.SyntaxModifier = SyntaxModifier;
//# sourceMappingURL=syntaxModifier.js.map