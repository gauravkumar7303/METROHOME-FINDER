"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceFolderQuickPickItem = void 0;
class WorkspaceFolderQuickPickItem {
    label;
    description;
    detail;
    picked;
    alwaysShow;
    folder;
    constructor(newFolder) {
        this.folder = newFolder;
        if (this.folder) {
            this.label = this.folder.name;
            this.description = this.folder.uri.fsPath;
        }
        else {
            this.label = "All workspace folders";
            this.description = undefined;
        }
    }
}
exports.WorkspaceFolderQuickPickItem = WorkspaceFolderQuickPickItem;
//# sourceMappingURL=workspaceFolderQuickPickItem.js.map