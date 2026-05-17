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
exports.EditorsService = void 0;
const vscode = __importStar(require("vscode"));
const jsonEditorProvider_1 = require("../editors/jsonEditorProvider");
const appPackageEditorProvider_1 = require("../editors/appPackageEditorProvider");
const devToolsExtensionService_1 = require("./devToolsExtensionService");
//import { AppJsonEditorProvider } from '../editors/appJsonEditorProvider';
//import { RuleSetEditorProvider } from '../editors/ruleSetEditorProvider';
//import { AppSourceCopEditorProvider } from '../editors/appSourceCopEditorProvider';
class EditorsService extends devToolsExtensionService_1.DevToolsExtensionService {
    constructor(newContext) {
        super(newContext);
        this.registerEditors();
    }
    registerEditors() {
        let options = {
            webviewOptions: {
                retainContextWhenHidden: true
            }
        };
        this._context.vscodeExtensionContext.subscriptions.push(vscode.window.registerCustomEditorProvider('azALDevTools.appPackageEditor', new appPackageEditorProvider_1.AppPackageEditorProvider(this._context), options));
        this._context.vscodeExtensionContext.subscriptions.push(vscode.window.registerCustomEditorProvider('azALDevTools.jsonEditor', new jsonEditorProvider_1.JsonEditorProvider(this._context), options));
        //This code is disabled because of a bug in visual studio code
        //VS Code does not allow to have different default editors for files
        //with the same extension
        /*
        this._context.vscodeExtensionContext.subscriptions.push(
            vscode.window.registerCustomEditorProvider('azALDevTools.appJsonEditor',
                new AppJsonEditorProvider(this._context)));
        
        this._context.vscodeExtensionContext.subscriptions.push(
            vscode.window.registerCustomEditorProvider('azALDevTools.ruleSetEditor',
                new RuleSetEditorProvider(this._context)));

        this._context.vscodeExtensionContext.subscriptions.push(
            vscode.window.registerCustomEditorProvider('azALDevTools.appSourceCopEditor',
                new AppSourceCopEditorProvider(this._context)));
        */
    }
}
exports.EditorsService = EditorsService;
//# sourceMappingURL=editorsService.js.map