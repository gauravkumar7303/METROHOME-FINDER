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
exports.DuplicateCodeTreeProvider = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const duplicateCodeTreeNode_1 = require("./duplicateCodeTreeNode");
const codeBlockType_1 = require("./codeBlockType");
const duplicateCodeSortMode_1 = require("./duplicateCodeSortMode");
class DuplicateCodeTreeProvider {
    _toolsExtensionContext;
    _duplicates;
    _sortMode = duplicateCodeSortMode_1.DuplicateCodeSortMode.noOfStatements;
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
        return this._duplicates;
    }
    setDuplicates(duplicates) {
        this._duplicates = this.createDuplicatesTree(duplicates);
        this.sortDuplicates(this._sortMode, true);
    }
    sortDuplicates(sortMode, force) {
        if ((force) || (this._sortMode != sortMode)) {
            this._sortMode = sortMode;
            if ((this._duplicates) && (this._duplicates.length > 1)) {
                this._duplicates.sort((a, b) => {
                    return this.compareDuplicateGroup(a, b);
                });
            }
        }
        if (this._onDidChangeTreeData)
            this._onDidChangeTreeData.fire(null);
    }
    compareDuplicateGroup(a, b) {
        if ((this._sortMode == duplicateCodeSortMode_1.DuplicateCodeSortMode.codeBlockType) || (this._sortMode == duplicateCodeSortMode_1.DuplicateCodeSortMode.codeBlockTypeNoOfDuplicates)) {
            if (a.codeBlockType > b.codeBlockType)
                return 1;
            if (a.codeBlockType < b.codeBlockType)
                return -1;
        }
        if ((this._sortMode == duplicateCodeSortMode_1.DuplicateCodeSortMode.noOfDuplicates) || (this._sortMode == duplicateCodeSortMode_1.DuplicateCodeSortMode.codeBlockTypeNoOfDuplicates)) {
            let aCount = a.childNodes ? a.childNodes.length : 0;
            let bCount = b.childNodes ? b.childNodes.length : 0;
            if (aCount < bCount)
                return 1;
            if (aCount > bCount)
                return -1;
        }
        if (a.noOfStatements < b.noOfStatements)
            return 1;
        if (a.noOfStatements > b.noOfStatements)
            return -1;
        return 0;
    }
    createDuplicatesTree(duplicates) {
        let duplicatesTree = [];
        for (let i = 0; i < duplicates.length; i++) {
            let groupNode = this.createDuplicateTreeNodes(duplicates[i]);
            if (groupNode)
                duplicatesTree.push(groupNode);
        }
        return duplicatesTree;
    }
    getGroupCaption(info) {
        switch (info.codeBlockType) {
            case codeBlockType_1.CodeBlockType.Method:
                return 'Method';
            case codeBlockType_1.CodeBlockType.Trigger:
                return 'Trigger';
        }
        return 'Code';
    }
    getGroupIcon(info) {
        switch (info.codeBlockType) {
            case codeBlockType_1.CodeBlockType.Method:
                return this.getIcon('tree-method.svg');
            case codeBlockType_1.CodeBlockType.Trigger:
                return this.getIcon('tree-trigger.svg');
        }
        return this.getIcon('tree-block.svg');
    }
    createDuplicateTreeNodes(info) {
        if ((info.ranges) && (info.ranges.length > 1)) {
            let groupType = this.getGroupCaption(info);
            let groupTitle = groupType + ' (' + info.ranges.length.toString() + ' duplicates';
            let groupTooltip = 'Group of ' + info.ranges.length.toString() + ' duplicates';
            if (info.noOfStatements) {
                groupTitle = groupTitle + ', ' + info.noOfStatements.toString() + ' statements';
                groupTooltip = groupTooltip + '\n' + info.noOfStatements.toString() + ' statements in each duplicated range';
            }
            groupTitle = groupTitle + ')';
            let node = new duplicateCodeTreeNode_1.DuplicateCodeTreeNode(groupTitle, vscode.TreeItemCollapsibleState.Collapsed, info.noOfStatements, info.codeBlockType);
            node.tooltip = groupTooltip;
            node.iconPath = this.getGroupIcon(info);
            let childNodes = [];
            for (let i = 0; i < info.ranges.length; i++) {
                let filePath = (info.ranges[i].filePath) ? info.ranges[i].filePath : 'file';
                let fileName = path.parse(filePath).name;
                let codeBlockTree = new duplicateCodeTreeNode_1.DuplicateCodeTreeNode(fileName, vscode.TreeItemCollapsibleState.None, info.noOfStatements, info.codeBlockType);
                codeBlockTree.tooltip = filePath;
                codeBlockTree.parent = node;
                codeBlockTree.documentRange = info.ranges[i];
                if (info.ranges[i].filePath)
                    codeBlockTree.resourceUri = vscode.Uri.file(filePath);
                codeBlockTree.iconPath = this.getIcon("tree-file.svg");
                codeBlockTree.command = {
                    title: "Show code",
                    command: "azALDevTools.showDuplicateCode",
                    arguments: [codeBlockTree.documentRange]
                };
                childNodes.push(codeBlockTree);
            }
            node.childNodes = childNodes;
            return node;
        }
        return undefined;
    }
    getParent(element) {
        return element.parent;
    }
    getFirstDuplicateNode() {
        if ((this._duplicates) && (this._duplicates.length > 0))
            return this._duplicates[0];
        return undefined;
    }
    getIcon(fileName) {
        return {
            light: this._toolsExtensionContext.vscodeExtensionContext.asAbsolutePath(path.join("resources", "images", "light", fileName)),
            dark: this._toolsExtensionContext.vscodeExtensionContext.asAbsolutePath(path.join("resources", "images", "dark", fileName))
        };
    }
}
exports.DuplicateCodeTreeProvider = DuplicateCodeTreeProvider;
//# sourceMappingURL=duplicateCodeTreeProvider.js.map