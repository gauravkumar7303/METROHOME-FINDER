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
exports.ALCodeCopFixAA0139 = void 0;
const vscode = __importStar(require("vscode"));
const alCodeFix_1 = require("../alCodeFix");
class ALCodeCopFixAA0139 extends alCodeFix_1.ALCodeFix {
    constructor(context) {
        super(context, "AA0139");
    }
    createFix(document, diagnostic) {
        const fix = new vscode.CodeAction(`Add CopyStr (AZ AL Dev Tools)`, vscode.CodeActionKind.QuickFix);
        fix.edit = new vscode.WorkspaceEdit();
        fix.diagnostics = [diagnostic];
        let currRange = diagnostic.range;
        let leftSideRange = new vscode.Range(currRange.start.line, 0, currRange.start.line, currRange.start.character);
        let leftSideText = document.getText(leftSideRange).trim();
        if (leftSideText.endsWith(':=')) {
            leftSideText = leftSideText.substr(0, leftSideText.length - 2).trim();
            if (leftSideText) {
                let stmt = "CopyStr(" + document.getText(currRange) + ", 1, MaxStrLen(" + leftSideText + "))";
                fix.edit.replace(document.uri, currRange, stmt);
                fix.isPreferred = true;
                return fix;
            }
        }
        return undefined;
    }
}
exports.ALCodeCopFixAA0139 = ALCodeCopFixAA0139;
//# sourceMappingURL=alCodeCopFixAA0139.js.map