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
exports.ALCodeCopFixAA0137 = void 0;
const vscode = __importStar(require("vscode"));
const alCodeFix_1 = require("../alCodeFix");
const textRange_1 = require("../../symbollibraries/textRange");
class ALCodeCopFixAA0137 extends alCodeFix_1.ALCodeFix {
    constructor(context) {
        super(context, "AA0137");
    }
    createFix(document, diagnostic) {
        const fix = new vscode.CodeAction(`Remove Variable (AZ AL Dev Tools)`, vscode.CodeActionKind.QuickFix);
        let fixRange = textRange_1.TextRange.fromAny(diagnostic.range);
        fix.command = {
            command: "azALDevTools.removeVariable",
            title: "Remove variable",
            arguments: [document, fixRange]
        };
        /*
        fix.edit = new vscode.WorkspaceEdit();
        fix.diagnostics = [diagnostic];
        let currRange = diagnostic.range;
        let startPosition = new vscode.Position(currRange.start.line, currRange.start.character);
        let stopPosition = new vscode.Position(currRange.end.line + 1, 0)
        fix.edit.replace(document.uri, new vscode.Range(startPosition, stopPosition), "");
        */
        fix.isPreferred = true;
        return fix;
    }
}
exports.ALCodeCopFixAA0137 = ALCodeCopFixAA0137;
//# sourceMappingURL=alCodeCopFixAA0137.js.map