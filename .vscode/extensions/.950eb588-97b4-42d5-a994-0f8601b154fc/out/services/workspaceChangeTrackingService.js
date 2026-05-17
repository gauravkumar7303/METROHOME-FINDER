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
exports.WorkspaceChangeTrackingService = void 0;
const vscode = __importStar(require("vscode"));
const toolsALProjectSource_1 = require("../langserver/toolsALProjectSource");
const toolsConfigurationChangeRequest_1 = require("../langserver/toolsConfigurationChangeRequest");
const toolsDocumentChangeRequest_1 = require("../langserver/toolsDocumentChangeRequest");
const toolsDocumentContentChangeRequest_1 = require("../langserver/toolsDocumentContentChangeRequest");
const toolsFileSystemFileChangeRequest_1 = require("../langserver/toolsFileSystemFileChangeRequest");
const toolsWorkspaceFoldersChangeRequest_1 = require("../langserver/toolsWorkspaceFoldersChangeRequest");
const devToolsExtensionService_1 = require("./devToolsExtensionService");
class WorkspaceChangeTrackingService extends devToolsExtensionService_1.DevToolsExtensionService {
    constructor(context) {
        super(context);
        this.registerEventHandlers();
        this.initializeWorkspace();
    }
    registerEventHandlers() {
        //workspace folders events
        this._context.vscodeExtensionContext.subscriptions.push(vscode.workspace.onDidChangeWorkspaceFolders(e => {
            this._context.toolsLangServerClient.workspaceFolderChange(new toolsWorkspaceFoldersChangeRequest_1.ToolsWorkspaceFoldersChangeRequest(e.added, e.removed));
        }));
        //document events
        this._context.vscodeExtensionContext.subscriptions.push(vscode.workspace.onDidOpenTextDocument(e => {
            this._context.toolsLangServerClient.documentOpen(new toolsDocumentChangeRequest_1.ToolsDocumentChangeRequest(e.uri.fsPath, undefined));
        }));
        this._context.vscodeExtensionContext.subscriptions.push(vscode.workspace.onDidChangeTextDocument(async (e) => {
            if ((e.document) && (e.document.uri)) {
                let buildSymbols = (this._context.activeDocumentSymbols.isActiveDocument(e.document)) && (e.document.languageId == "al");
                let response = await this._context.toolsLangServerClient.documentChange(new toolsDocumentContentChangeRequest_1.ToolsDocumentContentChangeRequest(e.document.uri.fsPath, e.document.getText(), buildSymbols));
                if ((buildSymbols) && (response))
                    this._context.activeDocumentSymbols.loadFromAny(response.root);
            }
        }));
        this._context.vscodeExtensionContext.subscriptions.push(vscode.workspace.onDidCloseTextDocument(e => {
            this._context.toolsLangServerClient.documentClose(new toolsDocumentChangeRequest_1.ToolsDocumentChangeRequest(e.uri.fsPath, undefined));
        }));
        let watcher = vscode.workspace.createFileSystemWatcher("**/*"); //we are tracking all file changes to handle folders  .{al,app,json}");
        watcher.onDidChange(e => {
            this._context.toolsLangServerClient.fileSystemFileChange(new toolsFileSystemFileChangeRequest_1.ToolsFileSystemFileChangeRequest(e.fsPath));
            //notify symbols service that the app file has changed and any files extracted from this file should be refreshed
            if (e.path.endsWith('.app'))
                this._context.symbolsService.appFileChanged(e);
        });
        watcher.onDidCreate(e => {
            this._context.toolsLangServerClient.fileSystemFileCreate(new toolsFileSystemFileChangeRequest_1.ToolsFileSystemFileChangeRequest(e.fsPath));
        });
        watcher.onDidDelete(e => {
            this._context.toolsLangServerClient.fileSystemFileDelete(new toolsFileSystemFileChangeRequest_1.ToolsFileSystemFileChangeRequest(e.fsPath));
        });
        this._context.vscodeExtensionContext.subscriptions.push(watcher);
        this._context.vscodeExtensionContext.subscriptions.push(vscode.workspace.onDidChangeConfiguration(configChange => {
            this.onConfigurationChange(configChange);
        }));
    }
    initializeWorkspace() {
        this._context.toolsLangServerClient.workspaceFolderChange(new toolsWorkspaceFoldersChangeRequest_1.ToolsWorkspaceFoldersChangeRequest(vscode.workspace.workspaceFolders, undefined));
    }
    onConfigurationChange(configChange) {
        //collect configuration changes        
        let folders = vscode.workspace.workspaceFolders;
        if ((folders) && (folders.length > 0)) {
            let projectSources = [];
            for (let i = 0; i < folders.length; i++)
                if ((configChange.affectsConfiguration('al.packageCachePath', folders[i].uri)) ||
                    (configChange.affectsConfiguration('al.codeAnalyzers', folders[i].uri)) ||
                    (configChange.affectsConfiguration('alOutline.additionalMandatoryAffixesPatterns', folders[i].uri)))
                    projectSources.push(new toolsALProjectSource_1.ToolsALProjectSource(folders[i].uri));
            if (projectSources.length > 0)
                this._context.toolsLangServerClient.configurationChange(new toolsConfigurationChangeRequest_1.ToolsConfigurationChangeRequest(projectSources));
        }
    }
}
exports.WorkspaceChangeTrackingService = WorkspaceChangeTrackingService;
//# sourceMappingURL=workspaceChangeTrackingService.js.map