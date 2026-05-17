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
exports.ALDocCommentsProvider = void 0;
const vscode = __importStar(require("vscode"));
const azSymbolKind_1 = require("../symbollibraries/azSymbolKind");
const xmlHelper_1 = require("../tools/xmlHelper");
class ALDocCommentsProvider {
    _context;
    constructor(context) {
        this._context = context;
    }
    provideCompletionItems(document, position, token, context) {
        let completionItems = [];
        let eol = document.eol;
        let docCommentsType = vscode.workspace.getConfiguration('alOutline', document.uri).get('docCommentsType');
        if (docCommentsType == 'xml') {
            //documentation completion
            let lineStart = document.getText(new vscode.Range(position.line, 0, position.line, position.character));
            if ((lineStart.trim() == '///') && (!this.hasXmlComments(document, position.line - 1)) && (!this.hasXmlComments(document, position.line + 1))) {
                let symbol = this._context.activeDocumentSymbols.findNextSymbol(position.line + 1);
                if (symbol) {
                    let documentationText = ' <summary>' + eol + '/// $1' + eol + '/// </summary>';
                    let snippetParamIdx = 1;
                    if ((symbol.kind == azSymbolKind_1.AZSymbolKind.MethodDeclaration) ||
                        (symbol.kind == azSymbolKind_1.AZSymbolKind.LocalMethodDeclaration) ||
                        (symbol.kind == azSymbolKind_1.AZSymbolKind.ProtectedMethodDeclaration) ||
                        (symbol.kind == azSymbolKind_1.AZSymbolKind.InternalMethodDeclaration) ||
                        (symbol.kind == azSymbolKind_1.AZSymbolKind.IntegrationEventDeclaration) ||
                        (symbol.kind == azSymbolKind_1.AZSymbolKind.BusinessEventDeclaration)) {
                        //function parameters
                        let parameters = [];
                        symbol.collectChildSymbols(azSymbolKind_1.AZSymbolKind.Parameter, true, parameters);
                        for (let idx = 0; idx < parameters.length; idx++) {
                            snippetParamIdx++;
                            documentationText = documentationText + eol + '/// <param name="' +
                                xmlHelper_1.XmlHelper.EncodeXmlAttributeValue(parameters[idx].name) +
                                '">$' + snippetParamIdx.toString() +
                                '</param>';
                        }
                        //function return value
                        let valPos = symbol.fullName.lastIndexOf(")");
                        if (valPos >= 0) {
                            let retTypeText = symbol.fullName.substr(valPos);
                            let typePos = retTypeText.indexOf(':');
                            if (typePos >= 0) {
                                snippetParamIdx++;
                                let retName = retTypeText.substr(1, typePos - 1).trim();
                                if (retName.length > 0)
                                    documentationText = documentationText + eol + '/// <returns name="' +
                                        xmlHelper_1.XmlHelper.EncodeXmlAttributeValue(retName) +
                                        '">$' + snippetParamIdx.toString() + '</returns>';
                                else
                                    documentationText = documentationText + eol + '/// <returns>$' + snippetParamIdx.toString() + '</returns>';
                            }
                        }
                    }
                    let item = new vscode.CompletionItem('Xml Documentation Comments', vscode.CompletionItemKind.Text);
                    item.insertText = new vscode.SnippetString(documentationText);
                    completionItems.push(item);
                }
            }
        }
        return completionItems;
    }
    hasXmlComments(document, line) {
        if (line < 0)
            return false;
        let text = document.getText(new vscode.Range(line, 0, line + 1, 0)).trim();
        return text.startsWith('///');
    }
}
exports.ALDocCommentsProvider = ALDocCommentsProvider;
//# sourceMappingURL=alDocCommentsProvider.js.map