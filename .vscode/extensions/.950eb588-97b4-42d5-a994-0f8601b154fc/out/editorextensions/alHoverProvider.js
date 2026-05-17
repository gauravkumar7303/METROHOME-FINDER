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
exports.ALHoverProvider = void 0;
const vscode = __importStar(require("vscode"));
const toolsDocumentPositionRequest_1 = require("../langserver/toolsDocumentPositionRequest");
class ALHoverProvider {
    _context;
    constructor(context) {
        this._context = context;
    }
    async provideHover(document, position, token) {
        let isActive = (vscode.window.activeTextEditor?.document?.uri.fsPath === document.uri.fsPath);
        let source = undefined;
        if (!isActive)
            source = document.getText();
        else
            await this._context.activeDocumentSymbols.loadAsync(false);
        let request = new toolsDocumentPositionRequest_1.ToolsDocumentPositionRequest(isActive, source, position);
        let response = await this._context.toolsLangServerClient.provideHover(request);
        if ((response) && (response.hover) && (response.hover.length > 0))
            return new vscode.Hover(response.hover);
        return undefined;
    }
}
exports.ALHoverProvider = ALHoverProvider;
//# sourceMappingURL=alHoverProvider.js.map