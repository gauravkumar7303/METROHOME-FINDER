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
exports.QuickPickHelper = void 0;
const vscode = __importStar(require("vscode"));
const workspaceFolderQuickPickItem_1 = require("./workspaceFolderQuickPickItem");
class QuickPickHelper {
    static async pickWorkspaceFolder(selectAllIfOneFolder) {
        let folders = vscode.workspace.workspaceFolders;
        if ((folders) && (folders.length > 0)) {
            if (folders.length == 1) {
                if (selectAllIfOneFolder)
                    return new workspaceFolderQuickPickItem_1.WorkspaceFolderQuickPickItem(undefined);
                else
                    return new workspaceFolderQuickPickItem_1.WorkspaceFolderQuickPickItem(folders[0]);
            }
            else {
                let items = [];
                items.push(new workspaceFolderQuickPickItem_1.WorkspaceFolderQuickPickItem(undefined));
                for (let i = 0; i < folders.length; i++)
                    items.push(new workspaceFolderQuickPickItem_1.WorkspaceFolderQuickPickItem(folders[i]));
                let selectedFolder = await vscode.window.showQuickPick(items, {
                    placeHolder: "Select workspace folder"
                });
                return selectedFolder;
            }
        }
        return undefined;
    }
}
exports.QuickPickHelper = QuickPickHelper;
//# sourceMappingURL=quickPickHelper.js.map