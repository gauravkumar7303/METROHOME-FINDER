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
exports.ALOutlineService = void 0;
const vscode = __importStar(require("vscode"));
const symbolsTreeProvider_1 = require("../outlineview/symbolsTreeProvider");
const alSymbolsBasedPageWizard_1 = require("../objectwizards/symbolwizards/alSymbolsBasedPageWizard");
const alSymbolsBasedReportWizard_1 = require("../objectwizards/symbolwizards/alSymbolsBasedReportWizard");
const alSymbolsBasedXmlPortWizard_1 = require("../objectwizards/symbolwizards/alSymbolsBasedXmlPortWizard");
const alSymbolsBasedQueryWizard_1 = require("../objectwizards/symbolwizards/alSymbolsBasedQueryWizard");
const alOutlineSortMode_1 = require("../outlineview/alOutlineSortMode");
class ALOutlineService {
    context;
    symbolsTreeProvider;
    treeView;
    _selectionChange;
    _selectionChangedHandler;
    _followCursor;
    constructor(newContext) {
        //initialize
        this.context = newContext;
        this._selectionChange = false;
        this._selectionChangedHandler = undefined;
        this._followCursor = !!this.context.vscodeExtensionContext.globalState.get("azALDevTools.alOutlineFollowCursor");
        //register symbols tree provider
        this.symbolsTreeProvider = new symbolsTreeProvider_1.SymbolsTreeProvider(this.context);
        this.context.vscodeExtensionContext.subscriptions.push(vscode.window.registerTreeDataProvider('azALDevTools.SymbolsTreeProvider', this.symbolsTreeProvider));
        this.treeView = vscode.window.createTreeView('azALDevTools.SymbolsTreeProvider', {
            treeDataProvider: this.symbolsTreeProvider
        });
        //register commands
        this.registerCommands();
        //initialize follow cursor functionality
        this.setFollowCursor(this._followCursor);
    }
    registerCommands() {
        this.context.vscodeExtensionContext.subscriptions.push(this.treeView.onDidCollapseElement((e) => {
            e.element.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
        }));
        this.context.vscodeExtensionContext.subscriptions.push(this.treeView.onDidExpandElement((e) => {
            e.element.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
        }));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.alOutlineEnableFollowCursor', () => this.setFollowCursor(true)));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.alOutlineDisableFollowCursor', () => this.setFollowCursor(false)));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.refreshOutlineView', () => this.symbolsTreeProvider.refresh()));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.alOutlineCollapseAll', () => this.symbolsTreeProvider.collapseAll()));
        //al symbols commands
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('alOutline.createCardPage', offset => {
            let builder = new alSymbolsBasedPageWizard_1.ALSymbolsBasedPageWizard(this.context);
            builder.showPageWizard(offset.symbol, 'Card');
        }));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('alOutline.createListPage', offset => {
            let builder = new alSymbolsBasedPageWizard_1.ALSymbolsBasedPageWizard(this.context);
            builder.showPageWizard(offset.symbol, 'List');
        }));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('alOutline.createReport', offset => {
            let builder = new alSymbolsBasedReportWizard_1.ALSymbolsBasedReportWizard(this.context);
            builder.showReportWizard(offset.symbol);
        }));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('alOutline.createXmlPort', offset => {
            let builder = new alSymbolsBasedXmlPortWizard_1.ALSymbolsBasedXmlPortWizard(this.context);
            builder.showXmlPortWizard(offset.symbol);
        }));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('alOutline.createQuery', offset => {
            let builder = new alSymbolsBasedQueryWizard_1.ALSymbolsBasedQueryWizard(this.context);
            builder.showQueryWizard(offset.symbol);
        }));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('alOutline.runPage', offset => {
            this.context.objectRunner.runSymbolAsync(offset.symbol);
        }));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('alOutline.runTable', offset => {
            this.context.objectRunner.runSymbolAsync(offset.symbol);
        }));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('alOutline.runReport', offset => {
            this.context.objectRunner.runSymbolAsync(offset.symbol);
        }));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.selectDocumentText', (range) => {
            if ((!this._selectionChange) && (vscode.window.activeTextEditor)) {
                let vscodeRange = new vscode.Range(range.start.line, range.start.character, range.end.line, range.end.character);
                vscode.window.activeTextEditor.revealRange(vscodeRange, vscode.TextEditorRevealType.Default);
                vscode.window.activeTextEditor.selection = new vscode.Selection(vscodeRange.start, vscodeRange.end);
                vscode.commands.executeCommand('workbench.action.focusActiveEditorGroup');
            }
        }));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.sortOutlineViewByPosition', () => {
            this.symbolsTreeProvider.setSortMode(alOutlineSortMode_1.ALOutlineSortMode.position);
        }));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.sortOutlineViewByPositionNoAction', () => { }));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.sortOutlineViewByName', () => {
            this.symbolsTreeProvider.setSortMode(alOutlineSortMode_1.ALOutlineSortMode.name);
        }));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.sortOutlineViewByNameNoAction', () => { }));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.sortOutlineViewByCategory', () => {
            this.symbolsTreeProvider.setSortMode(alOutlineSortMode_1.ALOutlineSortMode.category);
        }));
        this.context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.sortOutlineViewByCategoryNoAction', () => { }));
    }
    setFollowCursor(value) {
        this._followCursor = value;
        if ((this._followCursor) && (!this._selectionChangedHandler)) {
            this._selectionChangedHandler = vscode.window.onDidChangeTextEditorSelection((e) => {
                this.onTextEditorSelectionChanged(e);
            });
        }
        else if ((!this._followCursor) && (this._selectionChangedHandler)) {
            this._selectionChangedHandler.dispose();
            this._selectionChangedHandler = undefined;
        }
        vscode.commands.executeCommand('setContext', 'azALDevTools:alOutlineFollowCursor', this._followCursor);
        this.context.vscodeExtensionContext.globalState.update("azALDevTools.alOutlineFollowCursor", this._followCursor);
    }
    async onTextEditorSelectionChanged(e) {
        if ((this.treeView.visible) && (e.selections.length > 0)) {
            let symbol = this.symbolsTreeProvider.getNodeAtPosition(e.selections[0].active);
            if (symbol) {
                this._selectionChange = true;
                await this.treeView.reveal(symbol, {
                    select: true,
                    focus: false,
                    expand: false
                });
                this._selectionChange = false;
            }
        }
    }
}
exports.ALOutlineService = ALOutlineService;
//# sourceMappingURL=alOutlineService.js.map