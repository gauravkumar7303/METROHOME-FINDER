"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsWorkspaceFoldersChangeRequest = void 0;
const toolsALProjectSource_1 = require("./toolsALProjectSource");
class ToolsWorkspaceFoldersChangeRequest {
    added;
    removed;
    constructor(addedFolders, removedFolders) {
        this.added = this.getProjectSources(addedFolders);
        this.removed = this.getFolders(removedFolders);
    }
    getProjectSources(wsFolders) {
        if (wsFolders) {
            let folders = [];
            for (let i = 0; i < wsFolders.length; i++) {
                if ((wsFolders[i].uri) && (wsFolders[i].uri.fsPath))
                    folders.push(new toolsALProjectSource_1.ToolsALProjectSource(wsFolders[i].uri));
            }
            return folders;
        }
        return undefined;
    }
    getFolders(wsFolders) {
        if (wsFolders) {
            let folders = [];
            for (let i = 0; i < wsFolders.length; i++) {
                if ((wsFolders[i].uri) && (wsFolders[i].uri.fsPath))
                    folders.push(wsFolders[i].uri.fsPath);
            }
            return folders;
        }
        return undefined;
    }
}
exports.ToolsWorkspaceFoldersChangeRequest = ToolsWorkspaceFoldersChangeRequest;
//# sourceMappingURL=toolsWorkspaceFoldersChangeRequest.js.map