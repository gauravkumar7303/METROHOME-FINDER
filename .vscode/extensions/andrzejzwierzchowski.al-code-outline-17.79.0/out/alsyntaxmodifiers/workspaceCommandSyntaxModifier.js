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
exports.WorkspaceCommandSyntaxModifier = void 0;
const vscode = __importStar(require("vscode"));
const toolsWorkspaceCommandRequest_1 = require("../langserver/toolsWorkspaceCommandRequest");
const numberHelper_1 = require("../tools/numberHelper");
const syntaxModifier_1 = require("./syntaxModifier");
class WorkspaceCommandSyntaxModifier extends syntaxModifier_1.SyntaxModifier {
    _commandName;
    constructor(context, newName, commandName) {
        super(context, newName);
        this._commandName = commandName;
    }
    async runForWorkspaceWithoutUI(workspaceUri, forFiles) {
        let request = new toolsWorkspaceCommandRequest_1.ToolsWorkspaceCommandRequest(this._commandName, '', workspaceUri.fsPath, undefined, undefined, this.getParameters(workspaceUri), this.getExcludedFiles(workspaceUri), forFiles);
        let response = await this.runWorkspaceCommand(request);
        if (response) {
            if ((response.error) && (response.errorMessage)) {
                let errorMessage = response.errorMessage;
                if (response.parameters) {
                    errorMessage = numberHelper_1.NumberHelper.zeroIfNotDef(response.parameters.noOfChangedFiles).toString() + " file(s) modified. " + errorMessage;
                }
                return {
                    success: false,
                    message: errorMessage,
                    source: undefined
                };
            }
            else {
                return {
                    success: true,
                    message: this.getSuccessWorkspaceMessage(response),
                    source: undefined
                };
            }
        }
        return undefined;
    }
    async runForDocumentWithoutUI(text, workspaceUri, documentUri, range) {
        let request = new toolsWorkspaceCommandRequest_1.ToolsWorkspaceCommandRequest(this._commandName, text, workspaceUri.fsPath, documentUri.fsPath, range, this.getParameters(documentUri), this.getExcludedFiles(documentUri), undefined);
        let response = await this.runWorkspaceCommand(request);
        if (response) {
            if (response.error) {
                return {
                    success: false,
                    message: response.errorMessage,
                    source: undefined
                };
            }
            if ((response.source) && (response.source !== text)) {
                return {
                    success: true,
                    message: this.getSuccessDocumentMessage(response),
                    source: response.source
                };
            }
        }
        return {
            success: true,
            message: 'There was nothing to change',
            source: undefined
        };
    }
    async runWorkspaceCommand(request) {
        if (this._showProgress)
            return await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: this._progressMessage
            }, async (progress) => {
                return await this._context.toolsLangServerClient.workspaceCommand(request);
            });
        return await this._context.toolsLangServerClient.workspaceCommand(request);
    }
    getSuccessWorkspaceMessage(response) {
        return numberHelper_1.NumberHelper.zeroIfNotDef(response.parameters.noOfChangedFiles).toString() +
            ' file(s) modified';
    }
    getSuccessDocumentMessage(response) {
        return 'Command completed';
    }
    addStringArrayToParameters(parameters, parameterPrefix, values) {
        if (values)
            for (let i = 0; i < values.length; i++) {
                let name = parameterPrefix + i.toString();
                parameters[name] = values[i];
            }
    }
}
exports.WorkspaceCommandSyntaxModifier = WorkspaceCommandSyntaxModifier;
//# sourceMappingURL=workspaceCommandSyntaxModifier.js.map