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
exports.JsonEditorProvider = void 0;
const path = __importStar(require("path"));
const appJsonEditor_1 = require("./appJsonEditor");
const ruleSetEditor_1 = require("./ruleSetEditor");
const appSourceCopEditor_1 = require("./appSourceCopEditor");
//This class has been created beacuse of a bug in visual sudio code
//VS Code allows to definde different file patterns for custom editors
//but when one of these editors is set as default, it becomes default
//for all files with the same extension and we need separate editors
//for app.json and *.ruleset.json files
class JsonEditorProvider {
    _devToolsContext;
    constructor(devToolsContext) {
        this._devToolsContext = devToolsContext;
    }
    async resolveCustomTextEditor(document, webviewPanel, token) {
        let filePath = path.parse(document.uri.fsPath);
        let fileName = filePath.base.toLowerCase();
        let editor = undefined;
        if (fileName == "app.json")
            editor = new appJsonEditor_1.AppJsonEditor(this._devToolsContext);
        else if ((fileName.endsWith(".ruleset.json")) || (fileName == "ruleset.json"))
            editor = new ruleSetEditor_1.RuleSetEditor(this._devToolsContext);
        else if (fileName == "appsourcecop.json")
            editor = new appSourceCopEditor_1.AppSourceCopEditor(this._devToolsContext);
        if (editor)
            editor.resolveCustomTextEditor(document, webviewPanel);
    }
}
exports.JsonEditorProvider = JsonEditorProvider;
//# sourceMappingURL=jsonEditorProvider.js.map