"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsFilesRenameRequest = void 0;
const toolsFilesRenameDetailsRequest_1 = require("./toolsFilesRenameDetailsRequest");
class ToolsFilesRenameRequest {
    files;
    constructor(newFiles) {
        this.files = [];
        if (newFiles)
            for (let i = 0; i < newFiles.length; i++) {
                this.files.push(new toolsFilesRenameDetailsRequest_1.ToolsFileRenameDetailsRequest(newFiles[i].oldUri, newFiles[i].newUri));
            }
    }
}
exports.ToolsFilesRenameRequest = ToolsFilesRenameRequest;
//# sourceMappingURL=toolsFilesRenameRequest.js.map