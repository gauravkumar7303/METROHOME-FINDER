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
exports.DuplicateCodeService = void 0;
const vscode = __importStar(require("vscode"));
const duplicateCodeSortMode_1 = require("../duplicatecode/duplicateCodeSortMode");
const duplicateCodeTreeProvider_1 = require("../duplicatecode/duplicateCodeTreeProvider");
const toolsFindDuplicateCodeRequest_1 = require("../langserver/toolsFindDuplicateCodeRequest");
const alObsoleteState_1 = require("../symbollibraries/alObsoleteState");
const quickPickHelper_1 = require("../tools/quickPickHelper");
const typedQuickPickItem_1 = require("../tools/typedQuickPickItem");
const devToolsExtensionService_1 = require("./devToolsExtensionService");
class DuplicateCodeService extends devToolsExtensionService_1.DevToolsExtensionService {
    _treeProvider;
    _treeView;
    _minAllowedNoOfStatements;
    constructor(newContext) {
        //initialize
        super(newContext);
        this._minAllowedNoOfStatements = 3;
        this._treeProvider = new duplicateCodeTreeProvider_1.DuplicateCodeTreeProvider(newContext);
        this._context.vscodeExtensionContext.subscriptions.push(vscode.window.registerTreeDataProvider('azALDevTools.DuplicateCodeTreeProvider', this._treeProvider));
        this._treeView = vscode.window.createTreeView('azALDevTools.DuplicateCodeTreeProvider', {
            treeDataProvider: this._treeProvider
        });
        //register commands
        this.registerCommands();
    }
    registerCommands() {
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.findDuplicateCode', () => this.findDuplicates()));
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.showDuplicateCode', (documentRange) => this.showDuplicateCode(documentRange)));
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.refreshDuplicateCodePanel', () => this.findDuplicates()));
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.hideDuplicateCodePanel', () => this.hideDuplicateCodePanel()));
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.sortDuplicatesByNoOfStatements', () => this.sortBy(duplicateCodeSortMode_1.DuplicateCodeSortMode.noOfStatements)));
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.sortDuplicatesByType', () => this.sortBy(duplicateCodeSortMode_1.DuplicateCodeSortMode.codeBlockType)));
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.sortDuplicatesByNoOfDuplicates', () => this.sortBy(duplicateCodeSortMode_1.DuplicateCodeSortMode.noOfDuplicates)));
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.sortDuplicatesByTypeNoOfDuplicates', () => this.sortBy(duplicateCodeSortMode_1.DuplicateCodeSortMode.codeBlockTypeNoOfDuplicates)));
    }
    sortBy(sortMode) {
        this._treeProvider.sortDuplicates(sortMode, false);
    }
    async findDuplicates() {
        let selectedFolder = await quickPickHelper_1.QuickPickHelper.pickWorkspaceFolder(true);
        if (!selectedFolder)
            return;
        let duplicatesPath = (selectedFolder.folder) ? selectedFolder.folder.uri.fsPath : undefined;
        let minNoOfStatements = await this.getMinNoOfStatements();
        if (minNoOfStatements <= 0)
            return;
        let skipObsoleteCodeLevel = await this.getObsoleteStateLevel();
        if (skipObsoleteCodeLevel === undefined)
            return;
        let response = await this._context.toolsLangServerClient.findDuplicateCode(new toolsFindDuplicateCodeRequest_1.ToolsFindDuplicateCodeRequest(minNoOfStatements, skipObsoleteCodeLevel, duplicatesPath));
        if (!response)
            return;
        if (response.isError) {
            vscode.window.showErrorMessage(response.message ? response.message : 'Unknown error');
            return;
        }
        if ((!response.duplicates) || (response.duplicates.length == 0)) {
            this._treeProvider.setDuplicates([]);
            vscode.window.showInformationMessage('No duplicates found');
            return;
        }
        vscode.commands.executeCommand('setContext', 'azALDevTools.findDuplicateCodeActive', true);
        this._treeProvider.setDuplicates(response.duplicates);
        let firstDuplicate = this._treeProvider.getFirstDuplicateNode();
        if (firstDuplicate)
            this._treeView.reveal(firstDuplicate, {
                select: true,
                focus: true,
                expand: true
            });
    }
    async showDuplicateCode(documentRange) {
        if (!documentRange.filePath)
            return;
        let vscodeRange = new vscode.Range(documentRange.start.line, documentRange.start.character, documentRange.end.line, documentRange.end.character);
        let document = await vscode.workspace.openTextDocument(documentRange.filePath);
        let editor = await vscode.window.showTextDocument(document, {
            preview: true
        });
        editor.revealRange(vscodeRange, vscode.TextEditorRevealType.Default);
        editor.selection = new vscode.Selection(vscodeRange.start, vscodeRange.end);
        vscode.commands.executeCommand('workbench.action.focusActiveEditorGroup');
    }
    hideDuplicateCodePanel() {
        this._treeProvider.setDuplicates([]);
        vscode.commands.executeCommand('setContext', 'azALDevTools.findDuplicateCodeActive', false);
    }
    async getMinNoOfStatements() {
        let defaultValue = this.getDefaultMinNoOfStatements();
        let valueString = await vscode.window.showInputBox({
            prompt: "Min. no of statements",
            value: defaultValue.toString(),
            validateInput: (text) => {
                if (text) {
                    let value = Number.parseInt(text);
                    if ((value) && (!Number.isNaN(value)) && (value >= this._minAllowedNoOfStatements))
                        return undefined;
                }
                return 'Min. no of statements must be a number greate or equal 3';
            }
        });
        if (valueString) {
            let value = Number.parseInt(valueString);
            if ((value) && (!Number.isNaN(value)) && (value >= this._minAllowedNoOfStatements)) {
                this.setDefaultMinNoOfStatements(value);
                return value;
            }
        }
        return 0;
    }
    async getObsoleteStateLevel() {
        let defaultValue = this.getDefaultObsoleteState();
        let obsoleteStatesList = [
            new typedQuickPickItem_1.TypedQuickPickItem('None', alObsoleteState_1.ALObsoleteState.None, defaultValue == alObsoleteState_1.ALObsoleteState.None),
            new typedQuickPickItem_1.TypedQuickPickItem('Pending', alObsoleteState_1.ALObsoleteState.Pending, defaultValue == alObsoleteState_1.ALObsoleteState.Pending),
            new typedQuickPickItem_1.TypedQuickPickItem('Removed', alObsoleteState_1.ALObsoleteState.Removed, defaultValue == alObsoleteState_1.ALObsoleteState.Removed)
        ];
        //ask for obsolete state level
        let obsoleteState = await vscode.window.showQuickPick(obsoleteStatesList, {
            canPickMany: false,
            placeHolder: 'Select obsolete state level to ignore'
        });
        if (!obsoleteState)
            return undefined;
        this.setDefaultObsoleteState(obsoleteState.value);
        return obsoleteState.value;
    }
    getDefaultMinNoOfStatements() {
        let value = this._context.vscodeExtensionContext.globalState.get("azALDevTools.duplCode.minNoOfStatements");
        if ((value) && (value >= this._minAllowedNoOfStatements))
            return value;
        return this._minAllowedNoOfStatements;
    }
    setDefaultMinNoOfStatements(value) {
        this._context.vscodeExtensionContext.globalState.update("azALDevTools.duplCode.minNoOfStatements", value);
    }
    getDefaultObsoleteState() {
        let value = this._context.vscodeExtensionContext.globalState.get("azALDevTools.duplCode.obsoleteState");
        if (value === undefined)
            return alObsoleteState_1.ALObsoleteState.None;
        return value;
    }
    setDefaultObsoleteState(value) {
        this._context.vscodeExtensionContext.globalState.update("azALDevTools.duplCode.obsoleteState", value);
    }
}
exports.DuplicateCodeService = DuplicateCodeService;
//# sourceMappingURL=duplicateCodeService.js.map