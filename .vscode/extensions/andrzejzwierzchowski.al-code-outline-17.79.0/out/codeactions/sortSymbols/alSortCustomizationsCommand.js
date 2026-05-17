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
exports.ALSortCustomizationsCommand = void 0;
const vscode = __importStar(require("vscode"));
const azSymbolKind_1 = require("../../symbollibraries/azSymbolKind");
const alCodeAction_1 = require("../alCodeAction");
class ALSortCustomizationsCommand extends alCodeAction_1.ALCodeAction {
    constructor(context) {
        super(context, "SortCustomizations");
    }
    collectCodeActions(docSymbols, symbol, document, range, diagnostics, actions) {
        if (!this.canRunOnSave(document)) {
            let edit = undefined;
            //collect list of objects in selection range
            if ((symbol) &&
                (symbol.kind == azSymbolKind_1.AZSymbolKind.Property) &&
                (symbol.name) &&
                (symbol.name.toLowerCase() == "customizations") &&
                (!symbol.containsDiagnostics) &&
                (symbol.selectionRange) &&
                (symbol.selectionRange.start.line == range.start.line)) {
                let action = new vscode.CodeAction("Sort customizations (AZ AL Dev Tools)", vscode.CodeActionKind.QuickFix);
                action.command = {
                    command: "azALDevTools.sortCustomizations",
                    title: "Sort Customizations",
                    arguments: [document, symbol.range]
                };
                actions.push(action);
            }
        }
    }
}
exports.ALSortCustomizationsCommand = ALSortCustomizationsCommand;
//# sourceMappingURL=alSortCustomizationsCommand.js.map