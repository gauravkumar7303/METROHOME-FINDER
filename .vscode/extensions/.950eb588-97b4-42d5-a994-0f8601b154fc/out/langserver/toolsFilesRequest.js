"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsFilesRequest = void 0;
class ToolsFilesRequest {
    files;
    constructor(newFiles) {
        this.files = [];
        if (newFiles)
            for (let i = 0; i < newFiles.length; i++) {
                if (newFiles[i].fsPath)
                    this.files.push(newFiles[i].fsPath);
            }
    }
}
exports.ToolsFilesRequest = ToolsFilesRequest;
//# sourceMappingURL=toolsFilesRequest.js.map