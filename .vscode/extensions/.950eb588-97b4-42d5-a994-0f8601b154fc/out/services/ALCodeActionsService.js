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
exports.ALCodeActionsService = void 0;
const vscode = __importStar(require("vscode"));
const alCodeActionsProvider_1 = require("../codeactions/alCodeActionsProvider");
const devToolsExtensionService_1 = require("./devToolsExtensionService");
class ALCodeActionsService extends devToolsExtensionService_1.DevToolsExtensionService {
    constructor(context) {
        super(context);
        //code actions
        let alCodeActionsProvider = new alCodeActionsProvider_1.ALCodeActionsProvider(this._context);
        this._context.vscodeExtensionContext.subscriptions.push(vscode.languages.registerCodeActionsProvider('al', alCodeActionsProvider));
    }
}
exports.ALCodeActionsService = ALCodeActionsService;
//# sourceMappingURL=ALCodeActionsService.js.map