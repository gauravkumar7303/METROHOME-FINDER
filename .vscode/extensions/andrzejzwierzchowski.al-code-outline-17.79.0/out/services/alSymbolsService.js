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
exports.ALSymbolsService = void 0;
const vscode = __importStar(require("vscode"));
const appFileTextContentProvider_1 = require("../editorextensions/appFileTextContentProvider");
const alAppSymbolsLibrary_1 = require("../symbollibraries/alAppSymbolsLibrary");
const alProjectSymbolsLibrary_1 = require("../symbollibraries/alProjectSymbolsLibrary");
const azDocumentSymbolsLibrary_1 = require("../symbollibraries/azDocumentSymbolsLibrary");
const devToolsExtensionService_1 = require("./devToolsExtensionService");
class ALSymbolsService extends devToolsExtensionService_1.DevToolsExtensionService {
    _appFilteTextContentProvider;
    constructor(context) {
        super(context);
        this._appFilteTextContentProvider = new appFileTextContentProvider_1.AppFileTextContentProvider(this._context);
        this.registerServices();
    }
    registerServices() {
        //register app document provider
        this._context.vscodeExtensionContext.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(appFileTextContentProvider_1.AppFileTextContentProvider.scheme, this._appFilteTextContentProvider));
        //register commands
        //al app viewer
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.viewALApp', (fileUri) => {
            let uri = fileUri;
            let lib;
            if (this._context.toolsLangServerClient.isEnabled()) {
                lib = new alAppSymbolsLibrary_1.ALAppSymbolsLibrary(this._context, uri.fsPath);
                this._context.showSymbolsBrowser(lib);
            }
        }));
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.showAllProjectSymbols', () => {
            let workspacePath = this._context.alLangProxy.getCurrentWorkspaceFolderPath();
            if (workspacePath) {
                let lib = new alProjectSymbolsLibrary_1.ALProjectSymbolsLibrary(this._context, true, workspacePath);
                this._context.showSymbolsBrowser(lib);
            }
        }));
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.showProjectSymbolsWithoutDep', () => {
            let workspacePath = this._context.alLangProxy.getCurrentWorkspaceFolderPath();
            if (workspacePath) {
                let lib = new alProjectSymbolsLibrary_1.ALProjectSymbolsLibrary(this._context, false, workspacePath);
                this._context.showSymbolsBrowser(lib);
            }
        }));
    }
    async loadDocumentSymbols(docUri) {
        let symbolsLibrary = new azDocumentSymbolsLibrary_1.AZDocumentSymbolsLibrary(this._context, docUri);
        await symbolsLibrary.loadAsync(false);
        return symbolsLibrary;
    }
    appFileChanged(uri) {
        this._appFilteTextContentProvider.appFileChanged(uri);
    }
}
exports.ALSymbolsService = ALSymbolsService;
//# sourceMappingURL=alSymbolsService.js.map