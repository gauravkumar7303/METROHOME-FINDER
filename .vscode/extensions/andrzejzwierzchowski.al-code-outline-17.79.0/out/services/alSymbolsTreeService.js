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
exports.ALSymbolsTreeService = void 0;
const vscode = __importStar(require("vscode"));
const symbolsTreeView_1 = require("../symbolstreeview/symbolsTreeView");
const syntaxTreeView_1 = require("../syntaxtreeview/syntaxTreeView");
const devToolsExtensionService_1 = require("./devToolsExtensionService");
class ALSymbolsTreeService extends devToolsExtensionService_1.DevToolsExtensionService {
    _uriSymbolTreeViews;
    constructor(newContext) {
        //initialize
        super(newContext);
        this._uriSymbolTreeViews = {};
        //register commands
        this.registerCommands();
    }
    registerCommands() {
        let that = this;
        //outline preview window
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.showDocumentSymbols', () => that.showEditorSymbolsTreeView()));
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.goToDefinitionSymbolTree', () => that.goToDefinitionSymbolTree()));
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.showSyntaxTree', () => that.showSyntaxTreeAnalyzer()));
    }
    showSyntaxTreeAnalyzer() {
        let editor = vscode.window.activeTextEditor;
        if ((editor) && (editor.document) && (editor.document.uri)) {
            let syntaxTree = new syntaxTreeView_1.SyntaxTreeView(this._context, editor.document.uri);
            syntaxTree.show();
        }
    }
    showEditorSymbolsTreeView() {
        let editor = vscode.window.activeTextEditor;
        if ((editor) && (editor.document) && (editor.document.uri))
            this.showDocumentSymbols(editor.document.uri, new vscode.Range(editor.selection.start, editor.selection.end));
    }
    async showDocumentSymbols(docUri, range) {
        let symbolsTreeView = this._uriSymbolTreeViews[docUri.toString()];
        if (!symbolsTreeView) {
            symbolsTreeView = new symbolsTreeView_1.SymbolsTreeView(this._context, undefined, docUri);
            symbolsTreeView.selectedSymbolRange = range;
            this.addUriSymbolsTreeView(docUri, symbolsTreeView);
            symbolsTreeView.show();
        }
        else {
            symbolsTreeView.reveal();
            if (range)
                symbolsTreeView.selectSymbolInRange(range);
        }
    }
    async goToDefinitionSymbolTree() {
        let editor = vscode.window.activeTextEditor;
        if ((editor) && (editor.document) && (editor.document.uri)) {
            let locationList = await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: 'Loading object definition'
            }, async (progress) => {
                return await vscode.commands.executeCommand('vscode.executeDefinitionProvider', editor.document.uri, editor.selection.start);
            });
            if ((locationList) && (locationList.length > 0)) {
                let range = locationList[0].range;
                this.showDocumentSymbols(locationList[0].uri, range);
            }
            else
                this.showDocumentSymbols(editor.document.uri, undefined);
        }
    }
    addUriSymbolsTreeView(uri, symbolsTreeView) {
        this._uriSymbolTreeViews[uri.toString()] = symbolsTreeView;
    }
    removeUriSymbolsTreeView(uri) {
        this._uriSymbolTreeViews[uri.toString()] = undefined;
    }
}
exports.ALSymbolsTreeService = ALSymbolsTreeService;
//# sourceMappingURL=alSymbolsTreeService.js.map