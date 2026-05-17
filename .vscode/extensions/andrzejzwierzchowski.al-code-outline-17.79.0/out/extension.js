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
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const devToolsExtensionContext_1 = require("./devToolsExtensionContext");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    const toolsExtensionContext = new devToolsExtensionContext_1.DevToolsExtensionContext(context);
    toolsExtensionContext.activeDocumentSymbols.initializeContent();
    context.subscriptions.push(toolsExtensionContext);
    vscode.commands.executeCommand('setContext', 'azALDevTools.extensionActive', true);
    return toolsExtensionContext;
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() {
    vscode.commands.executeCommand('setContext', 'azALDevTools.extensionActive', false);
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map