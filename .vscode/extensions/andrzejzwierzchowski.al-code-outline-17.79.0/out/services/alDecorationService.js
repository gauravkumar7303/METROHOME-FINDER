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
exports.ALDecorationService = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const devToolsExtensionService_1 = require("./devToolsExtensionService");
const alConditionalCompilationParser_1 = require("../editorextensions/alConditionalCompilationParser");
const toolsGetFileContentRequest_1 = require("../langserver/toolsGetFileContentRequest");
class ALDecorationService extends devToolsExtensionService_1.DevToolsExtensionService {
    directiveDisabledCode = vscode.window.createTextEditorDecorationType({
        color: 'var(--vscode-editorCodeLens-foreground)',
        fontStyle: 'italic'
    });
    currentWorkspaceFolder;
    currentDirectives;
    constructor(context) {
        super(context);
        this._context.vscodeExtensionContext.subscriptions.push(vscode.workspace.onDidChangeTextDocument(event => {
            if (event.document.languageId === "al") {
                const openEditor = vscode.window.visibleTextEditors.filter(editor => editor.document.uri === event.document.uri)[0];
                this.applyDecorations(openEditor);
            }
        }));
        this._context.vscodeExtensionContext.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(editor => {
            if ((editor) && (editor.document.languageId === "al")) {
                this.applyDecorations(editor);
            }
        }));
        this._context.vscodeExtensionContext.subscriptions.push(vscode.workspace.onDidSaveTextDocument(document => {
            if ((document.uri.scheme === "file") && (document.uri.path.endsWith("app.json"))) {
                this.currentDirectives = undefined;
            }
        }));
        if ((vscode.window.activeTextEditor) && (vscode.window.activeTextEditor.document.languageId === "al")) {
            this.applyDecorations(vscode.window.activeTextEditor);
        }
    }
    async applyDecorations(editor) {
        let document = editor.document;
        let decorationsArray = [];
        await this.loadDirectives(document);
        let parser = new alConditionalCompilationParser_1.ALConditionalCompilationParser(this.currentDirectives);
        let sections = parser.parseDocument(document);
        this.createDecorations(sections, decorationsArray);
        editor.setDecorations(this.directiveDisabledCode, decorationsArray);
    }
    createDecorations(sections, decorations) {
        for (let i = 0; i < sections.length; i++) {
            let section = sections[i];
            if (section.enabled) {
                this.createDecorations(section.childSections, decorations);
            }
            else {
                let decoration = { range: new vscode.Range(new vscode.Position(section.start + 1, 0), new vscode.Position(section.end, 0)) };
                decorations.push(decoration);
            }
        }
    }
    async loadDirectives(document) {
        var folder = vscode.workspace.getWorkspaceFolder(document.uri);
        if ((folder) && ((!this.currentWorkspaceFolder) || (!this.currentDirectives) || (this.currentWorkspaceFolder !== folder.uri.fsPath))) {
            this.currentWorkspaceFolder = folder.uri.fsPath;
            try {
                let filePath = path.join(folder.uri.fsPath, "app.json");
                let fileContentResponse = await this._context.toolsLangServerClient.getFileContent(new toolsGetFileContentRequest_1.ToolsGetFileContentRequest(filePath));
                if ((fileContentResponse) && (fileContentResponse.content) && (fileContentResponse.content !== "")) {
                    let appJson = JSON.parse(fileContentResponse.content);
                    if ((appJson) && (appJson.preprocessorSymbols)) {
                        this.currentDirectives = [];
                        for (let i = 0; i < appJson.preprocessorSymbols.length; i++) {
                            this.currentDirectives?.push(appJson.preprocessorSymbols[i]);
                        }
                    }
                }
            }
            catch (e) {
                this.currentDirectives = [];
            }
        }
    }
}
exports.ALDecorationService = ALDecorationService;
//# sourceMappingURL=alDecorationService.js.map