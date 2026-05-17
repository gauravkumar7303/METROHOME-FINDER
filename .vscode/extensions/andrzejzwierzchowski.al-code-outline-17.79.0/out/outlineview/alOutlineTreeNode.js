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
exports.ALOutlineTreeItem = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const azSymbolKind_1 = require("../symbollibraries/azSymbolKind");
const alOutlineSortMode_1 = require("./alOutlineSortMode");
class ALOutlineTreeItem extends vscode.TreeItem {
    parent;
    childNodes;
    symbol;
    constructor(newSymbol, context, newParent, state, idPrefix, index) {
        super(newSymbol.fullName);
        this.symbol = newSymbol;
        this.parent = newParent;
        this.id = idPrefix + '_' + index.toString();
        this.createChildNodes(context, state, this.id);
        this.updateIcon(context);
        this.collapsibleState = this.getDefaultCollapsibleState(state);
        this.contextValue = azSymbolKind_1.AZSymbolKind[this.symbol.kind];
        if (this.symbol.selectionRange)
            this.command = {
                command: 'azALDevTools.selectDocumentText',
                title: '',
                arguments: [
                    this.symbol.selectionRange
                ]
            };
    }
    sort(sortMode) {
        if (this.childNodes) {
            if (this.childNodes.length > 1)
                switch (sortMode) {
                    case alOutlineSortMode_1.ALOutlineSortMode.position:
                        this.childNodes.sort((a, b) => {
                            if ((a.symbol.range) && (b.symbol.range))
                                return a.symbol.range.start.compare(b.symbol.range.start);
                            return 0;
                        });
                        break;
                    case alOutlineSortMode_1.ALOutlineSortMode.category:
                        this.childNodes.sort((a, b) => {
                            let aname = azSymbolKind_1.AZSymbolKind[a.symbol.kind];
                            let bname = azSymbolKind_1.AZSymbolKind[b.symbol.kind];
                            if (aname < bname)
                                return -1;
                            if (aname > bname)
                                return 1;
                            aname = a.label.toString().toLowerCase();
                            bname = b.label.toString().toLowerCase();
                            if (aname < bname)
                                return -1;
                            if (aname > bname)
                                return 1;
                            return 0;
                        });
                        break;
                    case alOutlineSortMode_1.ALOutlineSortMode.name:
                        this.childNodes.sort((a, b) => {
                            let aname = a.label.toString().toLowerCase();
                            let bname = b.label.toString().toLowerCase();
                            if (aname < bname)
                                return -1;
                            if (aname > bname)
                                return 1;
                            return 0;
                        });
                        break;
                }
            for (let i = 0; i < this.childNodes.length; i++) {
                this.childNodes[i].sort(sortMode);
            }
        }
    }
    createChildNodes(context, state, idPrefix) {
        if (this.symbol.childSymbols) {
            this.childNodes = [];
            for (let i = 0; i < this.symbol.childSymbols.length; i++) {
                let item = new ALOutlineTreeItem(this.symbol.childSymbols[i], context, this, state, idPrefix, i);
                this.childNodes.push(item);
            }
        }
    }
    updateIcon(context) {
        let icon = "tree-" + this.symbol.icon + ".svg";
        this.iconPath = {
            light: context.asAbsolutePath(path.join("resources", "images", "light", icon)),
            dark: context.asAbsolutePath(path.join("resources", "images", "dark", icon))
        };
    }
    getDefaultCollapsibleState(state) {
        if ((this.childNodes) && (this.childNodes.length > 0)) {
            switch (this.symbol.kind) {
                //AL Symbols
                case azSymbolKind_1.AZSymbolKind.MethodDeclaration:
                case azSymbolKind_1.AZSymbolKind.ParameterList:
                case azSymbolKind_1.AZSymbolKind.TriggerDeclaration:
                case azSymbolKind_1.AZSymbolKind.LocalMethodDeclaration:
                case azSymbolKind_1.AZSymbolKind.ProtectedMethodDeclaration:
                case azSymbolKind_1.AZSymbolKind.InternalMethodDeclaration:
                case azSymbolKind_1.AZSymbolKind.EventDeclaration:
                case azSymbolKind_1.AZSymbolKind.EventTriggerDeclaration:
                case azSymbolKind_1.AZSymbolKind.EventSubscriberDeclaration:
                case azSymbolKind_1.AZSymbolKind.BusinessEventDeclaration:
                case azSymbolKind_1.AZSymbolKind.ExternalBusinessEventDeclaration:
                case azSymbolKind_1.AZSymbolKind.IntegrationEventDeclaration:
                case azSymbolKind_1.AZSymbolKind.InternalEventDeclaration:
                case azSymbolKind_1.AZSymbolKind.PageHandlerDeclaration:
                case azSymbolKind_1.AZSymbolKind.ReportHandlerDeclaration:
                case azSymbolKind_1.AZSymbolKind.ConfirmHandlerDeclaration:
                case azSymbolKind_1.AZSymbolKind.MessageHandlerDeclaration:
                case azSymbolKind_1.AZSymbolKind.StrMenuHandlerDeclaration:
                case azSymbolKind_1.AZSymbolKind.HyperlinkHandlerDeclaration:
                case azSymbolKind_1.AZSymbolKind.ModalPageHandlerDeclaration:
                case azSymbolKind_1.AZSymbolKind.FilterPageHandlerDeclaration:
                case azSymbolKind_1.AZSymbolKind.RequestPageHandlerDeclaration:
                case azSymbolKind_1.AZSymbolKind.SessionSettingsHandlerDeclaration:
                case azSymbolKind_1.AZSymbolKind.SendNotificationHandlerDeclaration:
                case azSymbolKind_1.AZSymbolKind.TestDeclaration:
                case azSymbolKind_1.AZSymbolKind.Field:
                case azSymbolKind_1.AZSymbolKind.PageField:
                case azSymbolKind_1.AZSymbolKind.PageAction:
                case azSymbolKind_1.AZSymbolKind.PageLabel:
                case azSymbolKind_1.AZSymbolKind.PropertyList:
                case azSymbolKind_1.AZSymbolKind.VarSection:
                case azSymbolKind_1.AZSymbolKind.GlobalVarSection:
                case azSymbolKind_1.AZSymbolKind.Class:
                case azSymbolKind_1.AZSymbolKind.Field:
                case azSymbolKind_1.AZSymbolKind.Region:
                    return state.getState(this.id, vscode.TreeItemCollapsibleState.Collapsed);
                default:
                    return state.getState(this.id, vscode.TreeItemCollapsibleState.Expanded);
            }
        }
        else
            return vscode.TreeItemCollapsibleState.None;
    }
    findNodeAtPosition(position, incCurr) {
        if ((this.symbol.range) &&
            (this.symbol.range.start.compareVsPosition(position) <= 0) &&
            (this.symbol.range.end.compareVsPosition(position) >= 0)) {
            if (this.childNodes) {
                for (let i = 0; i < this.childNodes.length; i++) {
                    let symbol = this.childNodes[i].findNodeAtPosition(position, true);
                    if (symbol)
                        return symbol;
                }
            }
            if (incCurr)
                return this;
        }
        return undefined;
    }
    saveState(state) {
        if ((this.childNodes) && (this.childNodes.length > 0) && (this.collapsibleState !== undefined)) {
            state.setState(this.id, this.collapsibleState);
            for (let i = 0; i < this.childNodes.length; i++)
                this.childNodes[i].saveState(state);
        }
    }
}
exports.ALOutlineTreeItem = ALOutlineTreeItem;
//# sourceMappingURL=alOutlineTreeNode.js.map