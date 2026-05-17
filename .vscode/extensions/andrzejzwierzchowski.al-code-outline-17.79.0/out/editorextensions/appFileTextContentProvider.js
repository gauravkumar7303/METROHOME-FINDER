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
exports.AppFileTextContentProvider = void 0;
const vscode = __importStar(require("vscode"));
const toolsGetALAppContentRequest_1 = require("../langserver/toolsGetALAppContentRequest");
class AppFileTextContentProvider {
    static scheme = 'alOutlineApp';
    onDidChange;
    onDidChangeEmitter;
    _context;
    constructor(context) {
        this._context = context;
        this.onDidChangeEmitter = new vscode.EventEmitter();
        this.onDidChange = this.onDidChangeEmitter.event;
    }
    async provideTextDocumentContent(uri, token) {
        let fullPath = uri.path;
        let pos = fullPath.indexOf('::');
        let appPath = fullPath.substr(0, pos);
        let filePath = fullPath.substr(pos + 2);
        let fileContentResponse = await this._context.toolsLangServerClient.getALAppContent(new toolsGetALAppContentRequest_1.ToolsGetALAppContentRequest(appPath, filePath));
        if ((fileContentResponse) && (fileContentResponse.source))
            return fileContentResponse.source;
        return '';
    }
    appFileChanged(appFileUri) {
        let appPathPart = appFileUri.fsPath + '::';
        let docList = vscode.workspace.textDocuments;
        for (let i = 0; i < docList.length; i++) {
            let docUri = docList[i].uri;
            if ((docUri.scheme == AppFileTextContentProvider.scheme) && (docUri.path.startsWith(appPathPart)))
                this.onDidChangeEmitter.fire(docUri);
        }
    }
}
exports.AppFileTextContentProvider = AppFileTextContentProvider;
//# sourceMappingURL=appFileTextContentProvider.js.map