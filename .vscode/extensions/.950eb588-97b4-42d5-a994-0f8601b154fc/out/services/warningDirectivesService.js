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
exports.WarningDirectivesService = void 0;
const vscode = __importStar(require("vscode"));
const warningDirectivesTreeProvider_1 = require("../codeanalyzers/warningDirectivesTreeProvider");
const toolsGetWarningDirectivesRequest_1 = require("../langserver/symbolsinformation/toolsGetWarningDirectivesRequest");
const warningDirectiveInfoKind_1 = require("../symbolsinformation/warningDirectiveInfoKind");
const devToolsExtensionService_1 = require("./devToolsExtensionService");
class WarningDirectivesService extends devToolsExtensionService_1.DevToolsExtensionService {
    _treeProvider;
    _treeView;
    constructor(newContext) {
        //initialize
        super(newContext);
        this._treeProvider = new warningDirectivesTreeProvider_1.WarningDirectivesTreeProvider(newContext);
        this._context.vscodeExtensionContext.subscriptions.push(vscode.window.registerTreeDataProvider('azALDevTools.WarningDirectivesTreeView', this._treeProvider));
        this._treeView = vscode.window.createTreeView('azALDevTools.WarningDirectivesTreeView', {
            treeDataProvider: this._treeProvider
        });
        //register commands
        this.registerCommands();
    }
    registerCommands() {
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.showWarningDirectives', () => this.showWarningDirectives()));
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.showWarningDirectiveItem', (node) => this.showWarningDirectiveItem(node)));
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.refreshWarningDirectivesPanel', () => this.showWarningDirectives()));
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.hideWarningDirectivesPanel', () => this.hideWarningDirectives()));
    }
    async showWarningDirectives() {
        var request = new toolsGetWarningDirectivesRequest_1.ToolsGetWarningDirectivesRequest(undefined);
        let response = await this._context.toolsLangServerClient.getWarningDirectives(request);
        vscode.commands.executeCommand('setContext', 'azALDevTools.warningDirectivesActive', true);
        if (response)
            this._treeProvider.setWarningDirectives(response.directives);
        let firstNode = this._treeProvider.getFirstNode();
        if (firstNode)
            this._treeView.reveal(firstNode, {
                select: true,
                focus: true,
                expand: true
            });
    }
    hideWarningDirectives() {
        this._treeProvider.setWarningDirectives(undefined);
        vscode.commands.executeCommand('setContext', 'azALDevTools.warningDirectivesActive', false);
    }
    async showWarningDirectiveItem(node) {
        let fsPath = undefined;
        let range = undefined;
        if (node.directiveInfo) {
            switch (node.directiveInfo.kind) {
                case warningDirectiveInfoKind_1.WarningDirectiveInfoKind.File:
                    fsPath = node.directiveInfo.fullPath;
                    break;
                case warningDirectiveInfoKind_1.WarningDirectiveInfoKind.DirectiveLocation:
                    if ((node.parent) && (node.parent.directiveInfo))
                        fsPath = node.parent.directiveInfo.fullPath;
                    if (node.directiveInfo.range)
                        range = new vscode.Range(node.directiveInfo.range.start.line, node.directiveInfo.range.start.character, node.directiveInfo.range.end.line, node.directiveInfo.range.end.character);
                    break;
            }
        }
        if (fsPath) {
            let document = await vscode.workspace.openTextDocument(fsPath);
            let editor = await vscode.window.showTextDocument(document, {
                preview: true
            });
            if (range) {
                editor.revealRange(range, vscode.TextEditorRevealType.Default);
                editor.selection = new vscode.Selection(range.start, range.end);
            }
            //vscode.commands.executeCommand('workbench.action.focusActiveEditorGroup');
        }
    }
}
exports.WarningDirectivesService = WarningDirectivesService;
//# sourceMappingURL=warningDirectivesService.js.map