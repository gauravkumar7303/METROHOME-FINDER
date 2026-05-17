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
exports.ALReuseToolTipCodeCommand = void 0;
const vscode = __importStar(require("vscode"));
const azSymbolKind_1 = require("../symbollibraries/azSymbolKind");
const alCodeAction_1 = require("./alCodeAction");
class ALReuseToolTipCodeCommand extends alCodeAction_1.ALCodeAction {
    constructor(context) {
        super(context, "SuggestToolTip");
    }
    collectCodeActions(docSymbols, symbol, document, range, diagnostics, actions) {
        let edit = undefined;
        //collect list of objects in selection range
        if ((symbol) &&
            (symbol.selectionRange) &&
            (symbol.selectionRange.start.line == range.start.line)) {
            let fieldSymbol = symbol;
            if (fieldSymbol.kind != azSymbolKind_1.AZSymbolKind.PageField) {
                if (fieldSymbol.kind == azSymbolKind_1.AZSymbolKind.Property)
                    if ((fieldSymbol.parent) && (fieldSymbol.parent.parent) && (fieldSymbol.parent.parent.kind == azSymbolKind_1.AZSymbolKind.PageField))
                        fieldSymbol = fieldSymbol.parent.parent;
            }
            if ((fieldSymbol.kind == azSymbolKind_1.AZSymbolKind.PageField) &&
                (fieldSymbol.source) &&
                (fieldSymbol.source != '') &&
                (!symbol.containsDiagnostics)) {
                let objectSymbol = symbol.findParentObject();
                if ((objectSymbol) &&
                    ((objectSymbol.kind == azSymbolKind_1.AZSymbolKind.PageObject) || (objectSymbol.kind == azSymbolKind_1.AZSymbolKind.PageExtensionObject))) {
                    let action = new vscode.CodeAction("Reuse ToolTip from other Pages (AZ AL Dev Tools)", vscode.CodeActionKind.QuickFix);
                    action.command = {
                        command: "azALDevTools.ReuseToolTipFromOtherPages",
                        title: "Reuse tooltip from other pages",
                        arguments: [document, symbol]
                    };
                    actions.push(action);
                }
            }
        }
    }
}
exports.ALReuseToolTipCodeCommand = ALReuseToolTipCodeCommand;
//# sourceMappingURL=alReuseToolTipCodeCommand.js.map