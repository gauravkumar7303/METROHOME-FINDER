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
exports.BatchSyntaxModifier = void 0;
const vscode = __importStar(require("vscode"));
const syntaxModifier_1 = require("./syntaxModifier");
class BatchSyntaxModifier extends syntaxModifier_1.SyntaxModifier {
    _modifiers;
    constructor(context) {
        super(context, 'Code Cleanup');
        this._modifiers = undefined;
        this._progressMessage = '';
    }
    async runForWorkspaceWithoutUI(workspaceUri, forFiles) {
        if (this._showProgress) {
            return await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: this._progressMessage
            }, async (progress) => {
                return await this.runForWorkspaceWithoutUIWithProgress(workspaceUri, forFiles, progress);
            });
        }
        return await this.runForWorkspaceWithoutUIWithProgress(workspaceUri, forFiles, undefined);
    }
    async runForWorkspaceWithoutUIWithProgress(workspaceUri, forFiles, progress) {
        let allMessages = '';
        let hasError = false;
        if ((this._modifiers) && (this._modifiers.length > 0)) {
            let count = this._modifiers.length;
            let incVal = 100 / count;
            for (let i = 0; i < count; i++) {
                if (progress) {
                    progress.report({
                        message: 'Running Command ' + (i + 1).toString() + ' of ' + count.toString() + ': ' + this._modifiers[i].name,
                        increment: incVal
                    });
                }
                let result = await this._modifiers[i].runForWorkspaceWithoutUI(workspaceUri, forFiles);
                if ((!result) || (!result.success)) {
                    hasError = true;
                    allMessages = this.appendResult(allMessages, this._modifiers[i].name, result);
                }
            }
        }
        if (hasError) {
            return {
                success: false,
                message: 'One or more of actions failed: ' + allMessages,
                source: undefined
            };
        }
        return {
            success: true,
            message: 'All code cleanup actions completed',
            source: undefined
        };
    }
    async runForDocumentWithoutUI(text, workspaceUri, documentUri, range) {
        if (this._showProgress)
            return await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: this._progressMessage
            }, async (progress) => {
                return await this.runForDocumentWithoutUIWithProgress(text, workspaceUri, documentUri, range, progress);
            });
        return await this.runForDocumentWithoutUIWithProgress(text, workspaceUri, documentUri, range, undefined);
    }
    async runForDocumentWithoutUIWithProgress(text, workspaceUri, documentUri, range, progress) {
        let allMessages = '';
        let hasError = false;
        if (this._modifiers) {
            let count = this._modifiers.length;
            for (let i = 0; i < count; i++) {
                if (progress)
                    progress.report({
                        message: 'Running Command ' + (i + 1).toString() + ' of ' + count.toString() + ': ' + this._modifiers[i].name,
                        increment: (100 * i / count)
                    });
                let result = await this._modifiers[i].runForDocumentWithoutUI(text, workspaceUri, documentUri, range);
                if ((result) && (result.success) && (result.source) && (result.source != ''))
                    text = result.source;
                if ((!result) || (!result.success)) {
                    hasError = true;
                    allMessages = this.appendResult(allMessages, this._modifiers[i].name, result);
                }
            }
        }
        if (hasError)
            return {
                success: false,
                message: 'One or more of actions failed: ' + allMessages,
                source: undefined
            };
        return {
            success: true,
            message: 'All code cleanup actions completed',
            source: text
        };
    }
    async askForParameters(uri) {
        if (!this.collectModifiers(uri))
            return false;
        if ((this._modifiers) && (this._modifiers.length > 0)) {
            for (let i = 0; i < this._modifiers.length; i++) {
                let cont = await this._modifiers[i].loadDefaultOrAskForParameters(uri);
                if (!cont)
                    return false;
            }
            return true;
        }
        vscode.window.showErrorMessage('Please specify list of commands that you would like to run in the "alOutline.codeCleanupActions" setting.');
        return false;
    }
    appendResult(allMessages, name, result) {
        if (result) {
            allMessages = allMessages + name + ": ";
            if (result.success)
                allMessages = allMessages + "success";
            else
                allMessages = allMessages + "error";
            if (result.message)
                allMessages = allMessages + " - " + result.message;
            allMessages = allMessages + ", ";
        }
        return allMessages;
    }
    collectModifiers(uri) {
        let modifiersList = [];
        //get modifiers names
        let actionNames = vscode.workspace.getConfiguration('alOutline', uri).get('codeCleanupActions');
        if ((actionNames) && (actionNames.length > 0)) {
            for (let i = 0; i < actionNames.length; i++) {
                let modifier = this._context.alCodeTransformationService.getSyntaxModifier(actionNames[i]);
                if (modifier) {
                    modifier.hideProgress();
                    modifiersList.push(modifier);
                }
                else {
                    this._modifiers = [];
                    vscode.window.showErrorMessage('Uknnown command in "alOutline.codeCleanupActions" setting: ' + actionNames[i]);
                    return false;
                }
            }
        }
        this._modifiers = modifiersList;
        return true;
    }
}
exports.BatchSyntaxModifier = BatchSyntaxModifier;
//# sourceMappingURL=batchSyntaxModifier.js.map