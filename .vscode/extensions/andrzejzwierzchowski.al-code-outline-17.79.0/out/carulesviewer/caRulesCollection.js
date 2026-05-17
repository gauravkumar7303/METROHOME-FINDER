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
exports.CARulesCollection = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const codeAnalyzerInfo_1 = require("../codeanalyzers/codeAnalyzerInfo");
const toolsGetCodeAnalyzersRulesRequest_1 = require("../langserver/toolsGetCodeAnalyzersRulesRequest");
class CARulesCollection {
    _context;
    _analyzerFolderPrefix = '${analyzerFolder}';
    rules;
    analyzers;
    constructor(devToolsContext) {
        this._context = devToolsContext;
        this.analyzers = [];
        this.loadCodeAnalyzers();
    }
    async loadRules() {
        this.rules = [];
        for (let analyzerIdx = 0; analyzerIdx < this.analyzers.length; analyzerIdx++) {
            let request = new toolsGetCodeAnalyzersRulesRequest_1.ToolsGetCodeAnalyzersRulesRequest(this.analyzers[analyzerIdx].value);
            let response = await this._context.toolsLangServerClient.getCodeAnalyzersRules(request);
            if ((response) && (response.rules)) {
                for (let ruleIdx = 0; ruleIdx < response.rules.length; ruleIdx++) {
                    response.rules[ruleIdx].analyzer = this.analyzers[analyzerIdx].label;
                    this.rules.push(response.rules[ruleIdx]);
                }
            }
        }
    }
    loadCodeAnalyzers() {
        this.addAnalyzer('${AppSourceCop}');
        this.addAnalyzer('${CodeCop}');
        this.addAnalyzer('${PerTenantExtensionCop}');
        this.addAnalyzer('${UICop}');
        this.addAnalyzer(this._analyzerFolderPrefix + 'BusinessCentral.LinterCop.dll');
        this.addAnalyzer('Compiler');
        let folders = vscode.workspace.workspaceFolders;
        if (folders) {
            for (let folderIdx = 0; folderIdx < folders.length; folderIdx++) {
                this.loadCodeAnalyzersForUri(folders[folderIdx].uri);
            }
        }
        this.loadCodeAnalyzersForUri(undefined);
    }
    loadCodeAnalyzersForUri(uri) {
        let alConfig = vscode.workspace.getConfiguration('al', uri);
        let codeAnalyzersSetting = alConfig.get("codeAnalyzers");
        if (codeAnalyzersSetting) {
            for (let analyzerIdx = 0; analyzerIdx < codeAnalyzersSetting.length; analyzerIdx++) {
                let analyzerName = codeAnalyzersSetting[analyzerIdx].trim();
                this.addAnalyzer(analyzerName);
            }
        }
    }
    addAnalyzer(name) {
        let fullName = name;
        //convert to full path
        if ((name.toLowerCase().startsWith(this._analyzerFolderPrefix.toLowerCase())) && (this._context.alLangProxy.extensionPath)) {
            let fileName = name.substring(this._analyzerFolderPrefix.length);
            fullName = path.join(this._context.alLangProxy.extensionPath, 'bin', 'Analyzers', fileName);
        }
        //check if analyzer file exists and parse name from path
        if ((!fullName.startsWith('${')) && (fullName !== 'Compiler')) {
            if (!fs.existsSync(fullName)) {
                return;
            }
            name = path.parse(fullName).name;
        }
        let analyzerInfo = this.getAnalyzerInfo(fullName);
        if (!analyzerInfo) {
            this.analyzers.push(new codeAnalyzerInfo_1.CodeAnalyzerInfo(name, fullName, true));
        }
    }
    getAnalyzerInfo(value) {
        value = value.toLowerCase();
        for (let i = 0; i < this.analyzers.length; i++) {
            if (this.analyzers[i].value.toLowerCase() === value) {
                return this.analyzers[i];
            }
        }
        return undefined;
    }
}
exports.CARulesCollection = CARulesCollection;
//# sourceMappingURL=caRulesCollection.js.map