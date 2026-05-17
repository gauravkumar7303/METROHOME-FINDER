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
exports.CARulesViewer = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const baseWebViewEditor_1 = require("../webviews/baseWebViewEditor");
const textEditorHelper_1 = require("../tools/textEditorHelper");
const stringHelper_1 = require("../tools/stringHelper");
const caRulesCollection_1 = require("./caRulesCollection");
class CARulesViewer extends baseWebViewEditor_1.BaseWebViewEditor {
    _devToolsContext;
    _rulesCollection;
    constructor(devToolsContext) {
        super(devToolsContext.vscodeExtensionContext, "Code Analyzers");
        this._devToolsContext = devToolsContext;
        this._rulesCollection = new caRulesCollection_1.CARulesCollection(devToolsContext);
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'carulesviewer', 'carulesviewer.html');
    }
    getViewType() {
        return 'azALDevTools.CARulesViewer';
    }
    async loadRules() {
        await this._rulesCollection.loadRules();
        this.sendMessage({
            command: 'setRules',
            data: this._rulesCollection.rules
        });
    }
    async onDocumentLoaded() {
        //send list of analyzers to the webview
        this.sendMessage({
            command: 'setAnalyzers',
            data: this._rulesCollection.analyzers
        });
        //send analyzers rules to the web view
        await this.loadRules();
    }
    processWebViewMessage(message) {
        if (super.processWebViewMessage(message))
            return true;
        if (message) {
            switch (message.command) {
                case 'newruleset':
                    this.newRuleSet(message.selrules);
                    return true;
                case 'copyrules':
                    this.copyRules(message.selrules);
                    return true;
                case 'copytable':
                    this.copyTable(message.selrules);
                    return true;
            }
        }
        return false;
    }
    newRuleSet(rulesIndexes) {
        let eol = stringHelper_1.StringHelper.getDefaultEndOfLine(undefined);
        let ruleSetText = '{' +
            eol + '    "name": "Name",' +
            eol + '    "description": "Description",' +
            eol + '    "rules": [' +
            this.getRulesAsString(rulesIndexes, '        ') +
            eol + '    ],' +
            eol + '}';
        textEditorHelper_1.TextEditorHelper.showNewDocument(ruleSetText, 'json');
    }
    copyRules(rulesIndexes) {
        let rulesText = this.getRulesAsString(rulesIndexes, '');
        vscode.env.clipboard.writeText(rulesText);
    }
    copyTable(rulesIndexes) {
        let eol = stringHelper_1.StringHelper.getDefaultEndOfLine(undefined);
        let rulesText = 'Id\tTitle\tDefault Severity\tAnalyzer';
        if (this._rulesCollection.rules) {
            for (let i = 0; i < rulesIndexes.length; i++) {
                let rule = this._rulesCollection.rules[rulesIndexes[i]];
                rulesText += (eol + rule.id + '\t' +
                    rule.title + '\t' +
                    rule.defaultSeverity + '\t' +
                    rule.analyzer);
            }
        }
        vscode.env.clipboard.writeText(rulesText);
    }
    getRulesAsString(rulesIndexes, indentText) {
        let eol = stringHelper_1.StringHelper.getDefaultEndOfLine(undefined);
        let rules = '';
        if (this._rulesCollection.rules) {
            for (let i = 0; i < rulesIndexes.length; i++) {
                let ruleDef = this._rulesCollection.rules[rulesIndexes[i]];
                if (i > 0)
                    rules += ',';
                rules += (eol + '// Rule: ' + ruleDef.title);
                rules += (eol + '//       Default action: ' + ruleDef.defaultSeverity);
                rules += (eol + JSON.stringify({
                    id: ruleDef.id,
                    action: ruleDef.defaultSeverity,
                    justification: 'Justification'
                }, undefined, 4));
            }
            if (indentText.length > 0) {
                if (eol == '\n')
                    rules = rules.replace(/\n/g, eol + indentText);
                else
                    rules = rules.replace(/\r\n/g, eol + indentText);
            }
        }
        return rules;
    }
    onPanelClosed() {
        super.onPanelClosed();
        this._devToolsContext.codeAnalyzersService.onCodeAnalyzersViewerClosed();
    }
}
exports.CARulesViewer = CARulesViewer;
//# sourceMappingURL=caRulesViewer.js.map