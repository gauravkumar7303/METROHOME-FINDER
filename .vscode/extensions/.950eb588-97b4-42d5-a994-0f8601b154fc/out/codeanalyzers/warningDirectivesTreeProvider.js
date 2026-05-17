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
exports.WarningDirectivesTreeProvider = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const warningDirectiveInfoKind_1 = require("../symbolsinformation/warningDirectiveInfoKind");
const warningDirectivesTreeNode_1 = require("./warningDirectivesTreeNode");
class WarningDirectivesTreeProvider {
    _toolsExtensionContext;
    _warningDirectives;
    _onDidChangeTreeData = new vscode.EventEmitter();
    onDidChangeTreeData = this._onDidChangeTreeData.event;
    constructor(context) {
        this._toolsExtensionContext = context;
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (element) {
            if ((element.childNodes) && (element.childNodes.length > 0))
                return element.childNodes;
            return undefined;
        }
        return this._warningDirectives;
    }
    getParent(element) {
        return element.parent;
    }
    setWarningDirectives(directivesInfo) {
        this._warningDirectives = this.createDirectivesTree(directivesInfo);
        if (this._onDidChangeTreeData)
            this._onDidChangeTreeData.fire(null);
    }
    createDirectivesTree(directivesInfo) {
        if ((directivesInfo) && (directivesInfo.length == 1) && (directivesInfo[0].kind == warningDirectiveInfoKind_1.WarningDirectiveInfoKind.Project))
            directivesInfo = directivesInfo[0].childItems;
        if (!directivesInfo)
            return undefined;
        let directives = [];
        for (let i = 0; i < directivesInfo.length; i++)
            directives.push(this.createTreeNode(directivesInfo[i], undefined));
        return directives;
    }
    getNodeIcon(info) {
        switch (info.kind) {
            case warningDirectiveInfoKind_1.WarningDirectiveInfoKind.Project:
                return this.getIcon("tree-project.svg");
            case warningDirectiveInfoKind_1.WarningDirectiveInfoKind.Rule:
                return this.getIcon("tree-rule.svg");
            case warningDirectiveInfoKind_1.WarningDirectiveInfoKind.File:
                return this.getIcon("tree-file.svg");
            case warningDirectiveInfoKind_1.WarningDirectiveInfoKind.DirectiveLocation:
                if (info.disabled)
                    return this.getIcon("tree-ruledisabled.svg");
                return this.getIcon("tree-ruleenabled.svg");
        }
        return undefined;
    }
    getIcon(fileName) {
        return {
            light: this._toolsExtensionContext.vscodeExtensionContext.asAbsolutePath(path.join("resources", "images", "light", fileName)),
            dark: this._toolsExtensionContext.vscodeExtensionContext.asAbsolutePath(path.join("resources", "images", "dark", fileName))
        };
    }
    createTreeNode(info, parent) {
        let directiveNode = new warningDirectivesTreeNode_1.WarningDirectivesTreeNode(info.title, (info.childItems) ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None);
        directiveNode.directiveInfo = info;
        directiveNode.parent = parent;
        if (info.fullPath)
            directiveNode.resourceUri = vscode.Uri.file(info.fullPath);
        directiveNode.iconPath = this.getNodeIcon(directiveNode.directiveInfo);
        if (info.childItems) {
            directiveNode.childNodes = [];
            for (let i = 0; i < info.childItems.length; i++)
                directiveNode.childNodes.push(this.createTreeNode(info.childItems[i], directiveNode));
        }
        if ((info.kind == warningDirectiveInfoKind_1.WarningDirectiveInfoKind.File) || (info.kind == warningDirectiveInfoKind_1.WarningDirectiveInfoKind.DirectiveLocation)) {
            directiveNode.command = {
                title: "Show code",
                command: "azALDevTools.showWarningDirectiveItem",
                arguments: [directiveNode]
            };
        }
        return directiveNode;
    }
    getFirstNode() {
        if ((this._warningDirectives) && (this._warningDirectives.length > 0))
            return this._warningDirectives[0];
        return undefined;
    }
}
exports.WarningDirectivesTreeProvider = WarningDirectivesTreeProvider;
//# sourceMappingURL=warningDirectivesTreeProvider.js.map