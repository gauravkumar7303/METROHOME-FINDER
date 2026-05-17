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
exports.ALCodeCopFixAA0008 = void 0;
const vscode = __importStar(require("vscode"));
const alCodeFix_1 = require("../alCodeFix");
class ALCodeCopFixAA0008 extends alCodeFix_1.ALCodeFix {
    constructor(context) {
        super(context, "AA0008");
    }
    collectCodeActions(docSymbols, symbol, document, range, diagnostics, actions) {
        let settings = vscode.workspace.getConfiguration('alOutline', document.uri);
        let fixOnSave = !!settings.get('fixCodeCopMissingParenthesesOnSave');
        if (fixOnSave) {
            let onSaveEdit = undefined;
            for (let i = 0; i < diagnostics.length; i++) {
                let diagCode = diagnostics[i].code;
                if ((diagCode) && ((diagCode == this.diagnosticCode) || (diagCode.value == this.diagnosticCode))) {
                    if (!onSaveEdit)
                        onSaveEdit = new vscode.WorkspaceEdit();
                    onSaveEdit.insert(document.uri, diagnostics[i].range.end, '()');
                }
            }
            if (onSaveEdit) {
                let actionKind = vscode.CodeActionKind.SourceFixAll.append('al');
                let action = new vscode.CodeAction("Fix missing parentheses (AZ AL Dev Tools)", actionKind);
                action.edit = onSaveEdit;
                actions.push(action);
            }
        }
    }
}
exports.ALCodeCopFixAA0008 = ALCodeCopFixAA0008;
//# sourceMappingURL=alCodeCopFixAA0008.js.map