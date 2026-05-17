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
exports.ALCreateInterfaceCodeCommand = void 0;
const vscode = __importStar(require("vscode"));
const alCodeCommand_1 = require("../alCodeCommand");
const azSymbolKind_1 = require("../../symbollibraries/azSymbolKind");
const alSymbolsBasedInterfaceWizard_1 = require("../../objectwizards/symbolwizards/alSymbolsBasedInterfaceWizard");
class ALCreateInterfaceCodeCommand extends alCodeCommand_1.ALCodeCommand {
    constructor(context) {
        super(context, 'CreateInterface', 'AZDevTools.ALCreateInterfaceCodeCommand');
    }
    collectCodeActions(docSymbols, symbol, document, range, diagnostics, actions) {
        if ((symbol) &&
            (symbol.kind == azSymbolKind_1.AZSymbolKind.CodeunitObject) &&
            (symbol.selectionRange) &&
            (symbol.selectionRange.start.line == range.start.line)) {
            let action = new vscode.CodeAction("Create interface (AZ AL Dev Tools)", vscode.CodeActionKind.QuickFix);
            action.command = {
                command: this.name,
                title: 'Create interface...',
                arguments: [docSymbols, document, range]
            };
            actions.push(action);
        }
    }
    async runAsync(docSymbols, document, range) {
        let symbol = this._toolsExtensionContext.activeDocumentSymbols.findSymbolInRange(range);
        if ((!symbol) || (symbol.kind != azSymbolKind_1.AZSymbolKind.CodeunitObject)) {
            return;
        }
        let wizard = new alSymbolsBasedInterfaceWizard_1.ALSymbolsBasedInterfaceWizard(this._toolsExtensionContext);
        await wizard.showInterfaceWizard(symbol);
    }
}
exports.ALCreateInterfaceCodeCommand = ALCreateInterfaceCodeCommand;
//# sourceMappingURL=alCreateInterfaceCodeCommand.js.map