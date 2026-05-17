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
exports.ALCodeAction = void 0;
const vscode = __importStar(require("vscode"));
const alCodeActionsProvider_1 = require("./alCodeActionsProvider");
class ALCodeAction {
    _toolsExtensionContext;
    _shortName;
    constructor(context, shortName) {
        this._toolsExtensionContext = context;
        this._shortName = shortName;
    }
    collectCodeActions(docSymbols, symbol, document, range, diagnostics, actions) {
    }
    getDocumentUri() {
        return this._toolsExtensionContext.activeDocumentSymbols.getDocUri();
    }
    canRunOnSave(document) {
        if (!this._shortName)
            return false;
        let configuration = vscode.workspace.getConfiguration('alOutline', document.uri);
        if (!alCodeActionsProvider_1.ALCodeActionsProvider.canRunOnSaveOnFile(configuration, document))
            return false;
        let actionsList = configuration.get('codeActionsOnSave');
        if (actionsList)
            return (actionsList.indexOf(this._shortName) >= 0);
        return false;
    }
}
exports.ALCodeAction = ALCodeAction;
//# sourceMappingURL=alCodeAction.js.map