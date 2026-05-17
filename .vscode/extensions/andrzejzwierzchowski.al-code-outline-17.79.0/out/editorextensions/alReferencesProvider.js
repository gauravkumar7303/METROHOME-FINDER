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
exports.ALReferencesProvider = void 0;
const vscode = __importStar(require("vscode"));
const toolsDocumentPositionRequest_1 = require("../langserver/toolsDocumentPositionRequest");
class ALReferencesProvider {
    _context;
    constructor(context) {
        this._context = context;
    }
    async provideReferences(document, position, context, token) {
        let isActive = (vscode.window.activeTextEditor?.document?.uri.fsPath === document.uri.fsPath);
        let source = undefined;
        if (!isActive)
            source = document.getText();
        else
            await this._context.activeDocumentSymbols.loadAsync(false);
        let request = new toolsDocumentPositionRequest_1.ToolsDocumentPositionRequest(isActive, source, position);
        let response = await this._context.toolsLangServerClient.provideReferences(request);
        if ((response) && (response.references) && (response.references.length > 0)) {
            let locations = [];
            for (let i = 0; i < response.references.length; i++) {
                let ref = response.references[i];
                if ((ref.filePath) && (ref.start) && (ref.end))
                    locations.push(new vscode.Location(vscode.Uri.file(ref.filePath), new vscode.Range(ref.start.line, ref.start.character, ref.end.line, ref.end.character)));
            }
            return locations;
        }
        return undefined;
    }
}
exports.ALReferencesProvider = ALReferencesProvider;
//# sourceMappingURL=alReferencesProvider.js.map