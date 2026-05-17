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
exports.SymbolsTreeProvider = void 0;
const vscode = __importStar(require("vscode"));
const alOutlineTreeNode_1 = require("./alOutlineTreeNode");
const alOutlineSortMode_1 = require("./alOutlineSortMode");
const alOutlineTreeState_1 = require("./alOutlineTreeState");
class SymbolsTreeProvider {
    _toolsExtensionContext;
    _treeRoot;
    _sortMode;
    _state;
    _currDocState;
    _onDidChangeTreeData = new vscode.EventEmitter();
    onDidChangeTreeData = this._onDidChangeTreeData.event;
    constructor(context) {
        this._state = new alOutlineTreeState_1.ALOutlineTreeState();
        this._currDocState = undefined;
        this._sortMode = alOutlineSortMode_1.ALOutlineSortMode.position;
        this._toolsExtensionContext = context;
        this._toolsExtensionContext.activeDocumentSymbols.onSymbolsChanged(symbolsLib => this.onSymbolsChanged(symbolsLib));
        this.updateSortModeState();
    }
    onSymbolsChanged(library) {
        if (this._treeRoot)
            this._treeRoot.saveState(this._currDocState);
        if (library.rootSymbol) {
            let u = library.getUri();
            this._currDocState = this._state.getDocumentState(library.getSourceId());
            this._treeRoot = new alOutlineTreeNode_1.ALOutlineTreeItem(library.rootSymbol, this._toolsExtensionContext.vscodeExtensionContext, undefined, this._currDocState, this._currDocState.getId(), 0);
            this._treeRoot.sort(this._sortMode);
        }
        else {
            this._treeRoot = undefined;
            this._currDocState = undefined;
        }
        if (this._onDidChangeTreeData)
            this._onDidChangeTreeData.fire(null);
    }
    refresh() {
        this._toolsExtensionContext.activeDocumentSymbols.loadAsync(true);
    }
    collapseAll() {
        vscode.commands.executeCommand('workbench.actions.treeView.azALDevTools.SymbolsTreeProvider.collapseAll');
    }
    //#region TreeDataProvider implementation
    getTreeItem(element) {
        return element;
    }
    async getChildren(element) {
        if ((element) && (element.childNodes))
            return element.childNodes;
        if ((!element) && (this._treeRoot) && (this._treeRoot.childNodes))
            return this._treeRoot.childNodes;
        return [];
    }
    getParent(element) {
        return element.parent;
    }
    //#endregion
    getNodeAtPosition(position) {
        if (this._treeRoot)
            return this._treeRoot.findNodeAtPosition(position, false);
        return undefined;
    }
    setSortMode(mode) {
        if (this._sortMode != mode) {
            this._sortMode = mode;
            if (this._treeRoot) {
                this._treeRoot.sort(this._sortMode);
                if (this._onDidChangeTreeData)
                    this._onDidChangeTreeData.fire(null);
            }
        }
        this.updateSortModeState();
    }
    updateSortModeState() {
        let state = alOutlineSortMode_1.ALOutlineSortMode[this._sortMode];
        vscode.commands.executeCommand('setContext', 'azALDevTools:alOutlineSortMode', state);
    }
    saveState() {
    }
}
exports.SymbolsTreeProvider = SymbolsTreeProvider;
//# sourceMappingURL=symbolsTreeProvider.js.map