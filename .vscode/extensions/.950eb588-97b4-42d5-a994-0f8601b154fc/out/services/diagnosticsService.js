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
exports.DiagnosticsService = void 0;
const vscode = __importStar(require("vscode"));
const textEditorHelper_1 = require("../tools/textEditorHelper");
const devToolsExtensionService_1 = require("./devToolsExtensionService");
class DiagnosticsService extends devToolsExtensionService_1.DevToolsExtensionService {
    constructor(context) {
        super(context);
        this.registerCommands();
    }
    registerCommands() {
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.showExtensionLog', (fileUri) => {
            this.showErrorLog();
        }));
    }
    showErrorLog() {
        if (this._context.toolsLangServerClient.errorLogUri)
            textEditorHelper_1.TextEditorHelper.openEditor(this._context.toolsLangServerClient.errorLogUri, true, true, undefined);
        else
            vscode.window.showErrorMessage('Extension log file is not available');
    }
}
exports.DiagnosticsService = DiagnosticsService;
//# sourceMappingURL=diagnosticsService.js.map