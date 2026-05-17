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
exports.ALCompletionService = void 0;
const vscode = __importStar(require("vscode"));
const alCompletionProvider_1 = require("../editorextensions/alCompletionProvider");
const alDocCommentsProvider_1 = require("../editorextensions/alDocCommentsProvider");
const syntaxFilesContentProvider_1 = require("../fileproviders/syntaxFilesContentProvider");
const devToolsExtensionService_1 = require("./devToolsExtensionService");
class ALCompletionService extends devToolsExtensionService_1.DevToolsExtensionService {
    _alDocCommentsProvider;
    constructor(context) {
        super(context);
        //documentation completion provider
        if (this._context.alLangProxy.version.major < 6) {
            this._alDocCommentsProvider = new alDocCommentsProvider_1.ALDocCommentsProvider(this._context);
            this._context.vscodeExtensionContext.subscriptions.push(vscode.languages.registerCompletionItemProvider('al', this._alDocCommentsProvider, '/'));
        }
        //language server based completion provider
        vscode.languages.registerCompletionItemProvider('al', new alCompletionProvider_1.ALCompletionProvider(context));
        //json files completion implemented by providing additional file schemas
        let syntaxProvider = new syntaxFilesContentProvider_1.SyntaxFilesContentProvider(this._context);
        this._context.vscodeExtensionContext.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(syntaxProvider.scheme, syntaxProvider));
    }
}
exports.ALCompletionService = ALCompletionService;
//# sourceMappingURL=alCompletionService.js.map