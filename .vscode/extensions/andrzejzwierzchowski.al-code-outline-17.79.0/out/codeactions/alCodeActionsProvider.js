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
exports.ALCodeActionsProvider = void 0;
const vscode = __importStar(require("vscode"));
const alAddPageFieldsCodeCommand_1 = require("./addFields/alAddPageFieldsCodeCommand");
const alAddQueryFieldsCodeCommand_1 = require("./addFields/alAddQueryFieldsCodeCommand");
const alAddReportFieldsCodeCommand_1 = require("./addFields/alAddReportFieldsCodeCommand");
const alAddXmlPortFieldsCodeCommand_1 = require("./addFields/alAddXmlPortFieldsCodeCommand");
const alSortProceduresCodeCommand_1 = require("./sortSymbols/alSortProceduresCodeCommand");
const alSortReportColumnsCommand_1 = require("./sortSymbols/alSortReportColumnsCommand");
const alSortPropertiesCommand_1 = require("./sortSymbols/alSortPropertiesCommand");
const alCreateInterfaceCodeCommand_1 = require("./createObjects/alCreateInterfaceCodeCommand");
const azDocumentSymbolsLibrary_1 = require("../symbollibraries/azDocumentSymbolsLibrary");
const alSortVariablesCommand_1 = require("./sortSymbols/alSortVariablesCommand");
const alCodeCopFixAA0008_1 = require("./codeFixes/alCodeCopFixAA0008");
const alCodeCopFixAA0137_1 = require("./codeFixes/alCodeCopFixAA0137");
const alCodeCopFixAA0139_1 = require("./codeFixes/alCodeCopFixAA0139");
const alSortTableFieldsCommand_1 = require("./sortSymbols/alSortTableFieldsCommand");
const alSortPermissionsCommand_1 = require("./sortSymbols/alSortPermissionsCommand");
const alAddPermissionsCodeCommand_1 = require("./alAddPermissionsCodeCommand");
const alSortPermissionSetListCommand_1 = require("./sortSymbols/alSortPermissionSetListCommand");
const alReuseToolTipCodeCommand_1 = require("./alReuseToolTipCodeCommand");
const alSortCustomizationsCommand_1 = require("./sortSymbols/alSortCustomizationsCommand");
const alXmlPortHeadersCodeCommand_1 = require("./alXmlPortHeadersCodeCommand");
const toolsCollectWorkspaceCodeActionsRequest_1 = require("../langserver/toolsCollectWorkspaceCodeActionsRequest");
const textRange_1 = require("../symbollibraries/textRange");
const toolsWorkspaceCommandRequest_1 = require("../langserver/toolsWorkspaceCommandRequest");
const alSortUsingsCommand_1 = require("./sortSymbols/alSortUsingsCommand");
class ALCodeActionsProvider {
    _toolsExtensionContext;
    _codeCommands;
    constructor(context) {
        this._toolsExtensionContext = context;
        this._codeCommands = [
            //code actions
            new alAddPageFieldsCodeCommand_1.ALAddPageFieldsCodeCommand(this._toolsExtensionContext),
            new alAddQueryFieldsCodeCommand_1.ALAddQueryFieldsCodeCommand(this._toolsExtensionContext),
            new alAddReportFieldsCodeCommand_1.ALAddReportFieldsCodeCommand(this._toolsExtensionContext),
            new alAddXmlPortFieldsCodeCommand_1.ALAddXmlPortFieldsCodeCommand(this._toolsExtensionContext, 'fieldelement', 'Add multiple field elements (AZ AL Dev Tools)'),
            new alAddXmlPortFieldsCodeCommand_1.ALAddXmlPortFieldsCodeCommand(this._toolsExtensionContext, 'fieldattribute', 'Add multiple field attributes (AZ AL Dev Tools)'),
            new alAddPermissionsCodeCommand_1.ALAddPermissionsCodeCommand(this._toolsExtensionContext),
            new alReuseToolTipCodeCommand_1.ALReuseToolTipCodeCommand(this._toolsExtensionContext),
            new alXmlPortHeadersCodeCommand_1.ALXmlPortHeadersCodeCommand(this._toolsExtensionContext),
            //sorting
            new alSortTableFieldsCommand_1.ALSortTableFieldsCommand(this._toolsExtensionContext),
            new alSortVariablesCommand_1.ALSortVariablesCommand(this._toolsExtensionContext),
            new alSortReportColumnsCommand_1.ALSortReportColumnsCommand(this._toolsExtensionContext),
            new alSortPropertiesCommand_1.ALSortPropertiesCommand(this._toolsExtensionContext),
            new alSortProceduresCodeCommand_1.ALSortProceduresCodeCommand(this._toolsExtensionContext),
            new alSortPermissionsCommand_1.ALSortPermissionsCommand(this._toolsExtensionContext),
            new alSortPermissionSetListCommand_1.ALSortPermissionSetListCommand(this._toolsExtensionContext),
            new alSortCustomizationsCommand_1.ALSortCustomizationsCommand(this._toolsExtensionContext),
            new alSortUsingsCommand_1.ALSortUsingsCommand(this._toolsExtensionContext),
            new alCreateInterfaceCodeCommand_1.ALCreateInterfaceCodeCommand(this._toolsExtensionContext),
            //diagnostics fixes
            new alCodeCopFixAA0008_1.ALCodeCopFixAA0008(this._toolsExtensionContext),
            new alCodeCopFixAA0137_1.ALCodeCopFixAA0137(this._toolsExtensionContext),
            new alCodeCopFixAA0139_1.ALCodeCopFixAA0139(this._toolsExtensionContext)
        ];
        this.registerVSCodeCommands();
    }
    provideCodeActions(document, range, context, token) {
        //load diagnostics only if CodeCop fixes are enabled
        let settings = vscode.workspace.getConfiguration('alOutline', document.uri);
        let enableCodeCopFixes = !!settings.get('enableCodeCopFixes');
        let diagnostics;
        if (enableCodeCopFixes)
            diagnostics = vscode.languages.getDiagnostics(document.uri);
        else
            diagnostics = [];
        //collect code actions
        return this.collectCodeActions(document, range, diagnostics);
    }
    async collectCodeActions(document, range, diagnostic) {
        let actions = [];
        if (this._toolsExtensionContext.alLangProxy.version.major < 1)
            return actions;
        let docSymbols = await this.getDocumentSymbolsAsync(document);
        let symbol = docSymbols.findSymbolInRange(range);
        for (let i = 0; i < this._codeCommands.length; i++) {
            this._codeCommands[i].collectCodeActions(docSymbols, symbol, document, range, diagnostic, actions);
        }
        //create OnSave action
        let configuration = vscode.workspace.getConfiguration('alOutline', document.uri);
        let actionsList = configuration.get('codeActionsOnSave');
        if ((actionsList) && (actionsList.length > 0)) {
            //check if document can run actions on save
            if (ALCodeActionsProvider.canRunOnSaveOnFile(configuration, document)) {
                let actionKind = vscode.CodeActionKind.SourceFixAll.append('al');
                let action = new vscode.CodeAction("Fix document on save (AZ AL Dev Tools)", actionKind);
                action.command = {
                    title: "Fix document on save",
                    command: "azALDevTools.fixDocumentOnSave",
                    arguments: [
                        document
                    ]
                };
                actions.push(action);
            }
        }
        //collect workspace code actions
        let workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
        let workspaceCommandRange = textRange_1.TextRange.fromAny(range);
        if (workspaceFolder) {
            let workspaceActionsRequest = new toolsCollectWorkspaceCodeActionsRequest_1.ToolsCollectWorkspaceCodeActionsRequest(document.getText(), workspaceFolder.uri.fsPath, document.uri.fsPath, workspaceCommandRange);
            let workspaceActionsResponse = await this._toolsExtensionContext.toolsLangServerClient.collectWorkspaceCodeActions(workspaceActionsRequest);
            if ((workspaceActionsResponse) && (workspaceActionsResponse.codeActions)) {
                for (let i = 0; i < workspaceActionsResponse.codeActions.length; i++) {
                    let workspaceAction = workspaceActionsResponse.codeActions[i];
                    if ((workspaceAction.commandName) && (workspaceAction.description)) {
                        let description = workspaceAction.description + " (AZ AL Dev Tools)";
                        let allObjectsAction = new vscode.CodeAction(description, vscode.CodeActionKind.QuickFix);
                        allObjectsAction.command = {
                            command: "azALDevTools.runWorkspaceCodeAction",
                            title: description,
                            arguments: [workspaceAction.commandName, document, workspaceCommandRange, workspaceAction.range]
                        };
                        actions.push(allObjectsAction);
                    }
                }
            }
        }
        return actions;
    }
    static canRunOnSaveOnFile(configuration, document) {
        let ignorePatterns = configuration.get('codeActionsOnSaveIgnoreFiles');
        let wsFolder = vscode.workspace.getWorkspaceFolder(document.uri);
        if (!wsFolder)
            return false;
        if ((ignorePatterns) && (ignorePatterns.length > 0)) {
            let selectors = ignorePatterns.map(pattern => {
                if ((!pattern) || (pattern.startsWith("**")))
                    return {
                        language: 'al',
                        pattern: pattern
                    };
                if (pattern.startsWith("./"))
                    pattern = pattern.substring(2);
                return {
                    language: 'al',
                    pattern: new vscode.RelativePattern(wsFolder, pattern)
                };
            });
            let matchValue = vscode.languages.match(selectors, document);
            if (matchValue > 0)
                return false;
        }
        return true;
    }
    async getDocumentSymbolsAsync(document) {
        let docUri = this._toolsExtensionContext.activeDocumentSymbols.getUri();
        if ((docUri) && (docUri.fsPath == document.uri.fsPath))
            return this._toolsExtensionContext.activeDocumentSymbols;
        //parse document
        let source = document.getText();
        //get document symbols
        let library = new azDocumentSymbolsLibrary_1.AZDocumentSymbolsLibrary(this._toolsExtensionContext, document.uri, document);
        await library.loadAsync(false);
        return library;
    }
    registerVSCodeCommands() {
        this._toolsExtensionContext.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand("azALDevTools.runWorkspaceCodeAction", async (commandName, document, documentRange, commandRange) => {
            try {
                if (!commandName) {
                    commandName = documentRange;
                }
                //run workspace command with progress
                let workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
                let request = new toolsWorkspaceCommandRequest_1.ToolsWorkspaceCommandRequest(commandName, document.getText(), workspaceFolder.uri.fsPath, document.uri.fsPath, commandRange, {}, undefined, undefined);
                let response = await vscode.window.withProgress({
                    location: vscode.ProgressLocation.Notification,
                    title: "Runnung workspace code action"
                }, async (progress) => {
                    return await this._toolsExtensionContext.toolsLangServerClient.workspaceCommand(request);
                });
                //process result
                if (response) {
                    if (response.error) {
                        let errorMessage = response.errorMessage;
                        if (!errorMessage) {
                            errorMessage = "Unknown error";
                        }
                        vscode.window.showErrorMessage(errorMessage);
                    }
                    else if (response.source) {
                        let text = response.source;
                        const edit = new vscode.WorkspaceEdit();
                        var firstLine = document.lineAt(0);
                        var lastLine = document.lineAt(document.lineCount - 1);
                        var textRange = new vscode.Range(0, firstLine.range.start.character, document.lineCount - 1, lastLine.range.end.character);
                        edit.replace(document.uri, textRange, text);
                        await vscode.workspace.applyEdit(edit);
                    }
                }
            }
            catch (e) {
                vscode.window.showErrorMessage("Unknown error");
            }
        }));
    }
}
exports.ALCodeActionsProvider = ALCodeActionsProvider;
//# sourceMappingURL=alCodeActionsProvider.js.map