"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsFileRenameDetailsRequest = void 0;
class ToolsFileRenameDetailsRequest {
    oldPath;
    newPath;
    constructor(oldFile, newFile) {
        if (oldFile)
            this.oldPath = oldFile.fsPath;
        if (newFile)
            this.newPath = newFile.fsPath;
    }
}
exports.ToolsFileRenameDetailsRequest = ToolsFileRenameDetailsRequest;
//# sourceMappingURL=toolsFilesRenameDetailsRequest.js.map