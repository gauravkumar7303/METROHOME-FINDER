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
exports.CodeAnalyzersService = void 0;
const vscode = __importStar(require("vscode"));
const caRulesViewer_1 = require("../carulesviewer/caRulesViewer");
const devToolsExtensionService_1 = require("./devToolsExtensionService");
class CodeAnalyzersService extends devToolsExtensionService_1.DevToolsExtensionService {
    _codeAnalyzersViewer;
    constructor(newContext) {
        super(newContext);
        this._codeAnalyzersViewer = undefined;
        this.registerCommands();
    }
    registerCommands() {
        //code analyzers
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.showCodeAnalyzers', () => {
            this.showCodeAnalyzersRules();
        }));
    }
    showCodeAnalyzersRules() {
        if (!this._codeAnalyzersViewer) {
            this._codeAnalyzersViewer = new caRulesViewer_1.CARulesViewer(this._context);
            this._codeAnalyzersViewer.show();
        }
        else {
            this._codeAnalyzersViewer.reveal();
        }
    }
    onCodeAnalyzersViewerClosed() {
        this._codeAnalyzersViewer = undefined;
    }
}
exports.CodeAnalyzersService = CodeAnalyzersService;
//# sourceMappingURL=codeAnalyzersService.js.map