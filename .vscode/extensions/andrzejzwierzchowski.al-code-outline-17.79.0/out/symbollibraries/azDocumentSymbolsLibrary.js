'use strict';
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
exports.AZDocumentSymbolsLibrary = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const azSymbolsLibrary_1 = require("./azSymbolsLibrary");
const azSymbolKind_1 = require("./azSymbolKind");
const toolsDocumentSymbolsRequest_1 = require("../langserver/toolsDocumentSymbolsRequest");
const textRange_1 = require("./textRange");
const azSymbolInformation_1 = require("./azSymbolInformation");
const textEditorHelper_1 = require("../tools/textEditorHelper");
class AZDocumentSymbolsLibrary extends azSymbolsLibrary_1.AZSymbolsLibrary {
    _docUri;
    _reloadRequired;
    _context;
    _document;
    _documentContent;
    constructor(context, docUri, document) {
        super();
        this._twoWayTree = true;
        this._documentContent = undefined;
        this._context = context;
        this._docUri = docUri;
        this._document = document;
        this._reloadRequired = true;
        if (this._docUri) {
            this.name = this._docUri.fsPath;
            this.displayName = path.basename(this._docUri.fsPath);
        }
    }
    isActiveDocument(document) {
        return ((!!vscode.window.activeTextEditor) &&
            (!!document) &&
            (vscode.window.activeTextEditor.document.uri.fsPath == document.uri.fsPath));
    }
    setUri(newUri) {
        this._docUri = newUri;
        this._reloadRequired = true;
    }
    getUri() {
        return this._docUri;
    }
    getDocUri() {
        return this._docUri;
    }
    async GetDocumentAsync() {
        if (this._document)
            return this._document;
        let editor = textEditorHelper_1.TextEditorHelper.findDocumentEditor(this._docUri);
        if (editor)
            return editor.document;
        if (this._docUri)
            return await vscode.workspace.openTextDocument(this._docUri);
        return undefined;
    }
    async loadInternalAsync(forceReload) {
        if ((!forceReload) && (!this._reloadRequired))
            return false;
        let newRootSymbol = undefined;
        //get document symbols
        let document = await this.GetDocumentAsync();
        if ((document) && (document.languageId == "al")) {
            let source = document.getText();
            this._reloadRequired = (this._reloadRequired) || (!this._documentContent) || (this._documentContent != source);
            this._documentContent = source;
        }
        if (document) {
            if (document.uri)
                this._docUri = document.uri;
            if (document.languageId == "al") {
                //al language - use our special language server to parse source code
                let documentPath = "";
                let projectPath = undefined;
                if ((this._docUri) && (this._docUri.fsPath)) {
                    documentPath = this._docUri.fsPath;
                    let workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
                    if (workspaceFolder) {
                        projectPath = workspaceFolder.uri.fsPath;
                    }
                }
                let active = this.isActiveDocument(document);
                let request = new toolsDocumentSymbolsRequest_1.ToolsDocumentSymbolsRequest(this._documentContent, documentPath, projectPath, true, active);
                let response = await this._context.toolsLangServerClient.getALDocumentSymbols(request);
                if ((response) && (response.root))
                    newRootSymbol = azSymbolInformation_1.AZSymbolInformation.fromAny(response.root);
                else
                    newRootSymbol = azSymbolInformation_1.AZSymbolInformation.create(azSymbolKind_1.AZSymbolKind.Document, this.displayName);
            }
            else {
                //use standard visual studio code symbols functionality to load symbols
                newRootSymbol = azSymbolInformation_1.AZSymbolInformation.create(azSymbolKind_1.AZSymbolKind.Document, this.displayName);
                let symbols = undefined;
                try {
                    symbols = await vscode.commands.executeCommand('vscode.executeDocumentSymbolProvider', this._docUri);
                }
                catch (e) {
                    symbols = undefined;
                }
                //vscode.commands.executeCommand<vscode.SymbolInformation[] | vscode.DocumentSymbol[]>('vscode.executeDocumentSymbolProvider', this._docUri);
                if ((symbols) && (symbols.length > 0)) {
                    if (this.isDocumentSymbolsList(symbols))
                        this.loadDocumentSymbols(newRootSymbol, symbols);
                    else
                        this.loadSymbolsInformation(newRootSymbol, symbols);
                }
            }
            this.rootSymbol = newRootSymbol;
        }
        return true;
    }
    //#region standard vscode symbols processing
    isDocumentSymbolsList(symbols) {
        for (let i = 0; i < symbols.length; i++) {
            if (symbols[i].children)
                return true;
        }
        return false;
    }
    loadDocumentSymbols(parent, vsSymbols) {
        for (let i = 0; i < vsSymbols.length; i++) {
            let vsSymbol = vsSymbols[i];
            let symbol = azSymbolInformation_1.AZSymbolInformation.create(this.vsSymbolKindToazSymbolKind(vsSymbol.kind), vsSymbol.name);
            symbol.range = textRange_1.TextRange.fromAny(vsSymbol.range);
            symbol.selectionRange = textRange_1.TextRange.fromAny(vsSymbol.selectionRange);
            if ((vsSymbol.children) && (vsSymbol.children.length > 0))
                this.loadDocumentSymbols(symbol, vsSymbol.children);
            parent.addChildItem(symbol);
        }
    }
    loadSymbolsInformation(parent, vsSymbols) {
        for (let i = 0; i < vsSymbols.length; i++) {
            let symbol = azSymbolInformation_1.AZSymbolInformation.create(this.vsSymbolKindToazSymbolKind(vsSymbols[i].kind), vsSymbols[i].name);
            if ((vsSymbols[i].location) && (vsSymbols[i].location.range)) {
                symbol.range = textRange_1.TextRange.fromAny(vsSymbols[i].location.range);
                symbol.selectionRange = symbol.range;
            }
            parent.addChildItem(symbol);
        }
    }
    vsSymbolKindToazSymbolKind(kind) {
        switch (kind) {
            case vscode.SymbolKind.File: return azSymbolKind_1.AZSymbolKind.Document;
            case vscode.SymbolKind.Module: return azSymbolKind_1.AZSymbolKind.CodeunitObject;
            case vscode.SymbolKind.Namespace: return azSymbolKind_1.AZSymbolKind.Namespace;
            case vscode.SymbolKind.Package: return azSymbolKind_1.AZSymbolKind.Package;
            case vscode.SymbolKind.Class: return azSymbolKind_1.AZSymbolKind.Class;
            case vscode.SymbolKind.Method: return azSymbolKind_1.AZSymbolKind.MethodDeclaration;
            case vscode.SymbolKind.Property: return azSymbolKind_1.AZSymbolKind.Property;
            case vscode.SymbolKind.Field: return azSymbolKind_1.AZSymbolKind.Field;
            case vscode.SymbolKind.Constructor: return azSymbolKind_1.AZSymbolKind.Constructor;
            case vscode.SymbolKind.Enum: return azSymbolKind_1.AZSymbolKind.EnumType;
            case vscode.SymbolKind.Interface: return azSymbolKind_1.AZSymbolKind.Interface;
            case vscode.SymbolKind.Function: return azSymbolKind_1.AZSymbolKind.LocalMethodDeclaration;
            case vscode.SymbolKind.Variable: return azSymbolKind_1.AZSymbolKind.VariableDeclaration;
            case vscode.SymbolKind.Constant: return azSymbolKind_1.AZSymbolKind.Constant;
            case vscode.SymbolKind.String: return azSymbolKind_1.AZSymbolKind.String;
            case vscode.SymbolKind.Number: return azSymbolKind_1.AZSymbolKind.Number;
            case vscode.SymbolKind.Boolean: return azSymbolKind_1.AZSymbolKind.Boolean;
            case vscode.SymbolKind.Array: return azSymbolKind_1.AZSymbolKind.Array;
            case vscode.SymbolKind.Object: return azSymbolKind_1.AZSymbolKind.Object;
            case vscode.SymbolKind.Key: return azSymbolKind_1.AZSymbolKind.Key;
            case vscode.SymbolKind.Null: return azSymbolKind_1.AZSymbolKind.Null;
            case vscode.SymbolKind.EnumMember: return azSymbolKind_1.AZSymbolKind.EnumValue;
            case vscode.SymbolKind.Struct: return azSymbolKind_1.AZSymbolKind.Struct;
            case vscode.SymbolKind.Event: return azSymbolKind_1.AZSymbolKind.EventDeclaration;
            case vscode.SymbolKind.Operator: return azSymbolKind_1.AZSymbolKind.Operator;
            case vscode.SymbolKind.TypeParameter: return azSymbolKind_1.AZSymbolKind.Parameter;
        }
    }
}
exports.AZDocumentSymbolsLibrary = AZDocumentSymbolsLibrary;
//# sourceMappingURL=azDocumentSymbolsLibrary.js.map