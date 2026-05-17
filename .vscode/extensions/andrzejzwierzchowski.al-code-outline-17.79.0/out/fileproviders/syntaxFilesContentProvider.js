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
exports.SyntaxFilesContentProvider = void 0;
const vscode = __importStar(require("vscode"));
const appJsonSyntaxProvider_1 = require("./appJsonSyntaxProvider");
const rulesetSyntaxProvider_1 = require("./rulesetSyntaxProvider");
class SyntaxFilesContentProvider {
    onDidChange;
    _onDidChangeEmitter;
    _context;
    _providers;
    scheme;
    constructor(context) {
        this._context = context;
        this._onDidChangeEmitter = new vscode.EventEmitter();
        this.onDidChange = this._onDidChangeEmitter.event;
        this._providers = [];
        this.scheme = "aloutlinesyntax";
        this.createProviders();
    }
    createProviders() {
        this._providers.push(new appJsonSyntaxProvider_1.AppJsonSyntaxProvider(this._context));
        this._providers.push(new rulesetSyntaxProvider_1.RulesetSyntaxProvider(this._context));
    }
    findProvider(name) {
        for (let i = 0; i < this._providers.length; i++)
            if (this._providers[i].name == name)
                return this._providers[i];
        return undefined;
    }
    async provideTextDocumentContent(uri, token) {
        let provider = this.findProvider(uri.path);
        if (provider)
            return await provider.provideTextDocumentContent(uri, token);
        return "{}";
    }
}
exports.SyntaxFilesContentProvider = SyntaxFilesContentProvider;
//# sourceMappingURL=syntaxFilesContentProvider.js.map