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
exports.ALCompletionProvider = void 0;
const vscode = __importStar(require("vscode"));
const toolsCodeCompletionRequest_1 = require("../langserver/codeCompletion/toolsCodeCompletionRequest");
const textPosition_1 = require("../symbollibraries/textPosition");
class ALCompletionProvider {
    _context;
    constructor(context) {
        this._context = context;
    }
    async provideCompletionItems(document, position, token, context) {
        let completionItems = [];
        if (document.uri?.fsPath) {
            let configuration = vscode.workspace.getConfiguration('alOutline', document.uri);
            let completionProviders = configuration.get('completionProviders');
            let keepVariableNamesAffixes = !!configuration.get('keepVariableNamesCompletionAffixes');
            if ((completionProviders) && (completionProviders.length > 0)) {
                await this._context.activeDocumentSymbols.loadAsync(false);
                let textPosition = new textPosition_1.TextPosition();
                textPosition.set(position.line, position.character);
                let request = new toolsCodeCompletionRequest_1.ToolsCodeCompletionRequest(textPosition, document.uri.fsPath, completionProviders, {
                    keepVariableNamesAffixes: keepVariableNamesAffixes
                });
                let response = await this._context.toolsLangServerClient.codeCompletion(request);
                if ((response) && (response.completionItems)) {
                    for (let i = 0; i < response.completionItems.length; i++)
                        if (response.completionItems[i].label)
                            completionItems.push(this.createCompletionItem(response.completionItems[i]));
                }
            }
        }
        return completionItems;
    }
    createCompletionItem(source) {
        let item = new vscode.CompletionItem({
            label: source.label,
            detail: source.detail,
            description: source.description
        }, source.kind);
        item.filterText = source.filterText;
        if (source.tags) {
            item.tags = source.tags;
        }
        if (source.insertText) {
            item.insertText = source.insertText;
        }
        if (source.detail) {
            item.detail = source.detail;
        }
        if (source.commitCharacters) {
            item.commitCharacters = source.commitCharacters;
        }
        if (source.additionalTextEdits) {
            item.additionalTextEdits = this.createTextEdits(source.additionalTextEdits);
        }
        return item;
    }
    createTextEdits(source) {
        let textEdits = [];
        if (source) {
            for (let i = 0; i < source.length; i++) {
                let textEdit = this.createTextEdit(source[i]);
                if (textEdit) {
                    textEdits.push(textEdit);
                }
            }
        }
        return textEdits;
    }
    createTextEdit(source) {
        if ((source.range) && (source.newText)) {
            let range = new vscode.Range(source.range.start.line, source.range.start.character, source.range.end.line, source.range.end.character);
            let textEdit = new vscode.TextEdit(range, source.newText);
            return textEdit;
        }
        return undefined;
    }
}
exports.ALCompletionProvider = ALCompletionProvider;
//# sourceMappingURL=alCompletionProvider.js.map