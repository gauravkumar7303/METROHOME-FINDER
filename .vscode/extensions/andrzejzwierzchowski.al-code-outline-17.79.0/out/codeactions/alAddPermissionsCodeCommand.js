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
exports.ALAddPermissionsCodeCommand = void 0;
const vscode = __importStar(require("vscode"));
const azSymbolKind_1 = require("../symbollibraries/azSymbolKind");
const alCodeAction_1 = require("./alCodeAction");
class ALAddPermissionsCodeCommand extends alCodeAction_1.ALCodeAction {
    constructor(context) {
        super(context, "AddAllObjectsPermissions");
    }
    collectCodeActions(docSymbols, symbol, document, range, diagnostics, actions) {
        let edit = undefined;
        //collect list of objects in selection range
        if ((symbol) &&
            (symbol.selectionRange) &&
            (symbol.selectionRange.start.line == range.start.line)) {
            let isPermissionsNode = (symbol.kind == azSymbolKind_1.AZSymbolKind.Property) &&
                (symbol.name) &&
                (symbol.name.toLowerCase() == "permissions") &&
                (!symbol.containsDiagnostics);
            let isALObject = symbol.isALObject();
            if (isPermissionsNode || isALObject) {
                let appObject = symbol.findParentObject();
                if (appObject) {
                    switch (appObject.kind) {
                        case azSymbolKind_1.AZSymbolKind.PermissionSet:
                        case azSymbolKind_1.AZSymbolKind.PermissionSetExtension:
                            let allObjectsAction = new vscode.CodeAction("Add all extension objects permissions (AZ AL Dev Tools)", vscode.CodeActionKind.QuickFix);
                            allObjectsAction.command = {
                                command: "azALDevTools.addAllObjectsPermissions",
                                title: "Add All Extension Objects Permissions",
                                arguments: [document, symbol.range]
                            };
                            actions.push(allObjectsAction);
                            break;
                        case azSymbolKind_1.AZSymbolKind.CodeunitObject:
                        case azSymbolKind_1.AZSymbolKind.ReportObject:
                        case azSymbolKind_1.AZSymbolKind.PageObject:
                        case azSymbolKind_1.AZSymbolKind.XmlPortObject:
                        case azSymbolKind_1.AZSymbolKind.QueryObject:
                        case azSymbolKind_1.AZSymbolKind.TableObject:
                            let usedObjectsAction = new vscode.CodeAction("Add permissions to all tables used by this object (AZ AL Dev Tools)", vscode.CodeActionKind.QuickFix);
                            usedObjectsAction.command = {
                                command: "azALDevTools.addReferencedTablesPermissions",
                                title: "Add Used Tables Permissions",
                                arguments: [document, appObject.range]
                            };
                            actions.push(usedObjectsAction);
                            break;
                    }
                }
            }
        }
    }
}
exports.ALAddPermissionsCodeCommand = ALAddPermissionsCodeCommand;
//# sourceMappingURL=alAddPermissionsCodeCommand.js.map