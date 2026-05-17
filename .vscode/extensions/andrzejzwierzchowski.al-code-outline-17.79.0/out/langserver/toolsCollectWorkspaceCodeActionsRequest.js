"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsCollectWorkspaceCodeActionsRequest = void 0;
class ToolsCollectWorkspaceCodeActionsRequest {
    source;
    projectPath;
    filePath;
    range;
    constructor(newSource, newProjectPath, newFilePath, newRange) {
        this.source = newSource;
        this.projectPath = newProjectPath;
        this.filePath = newFilePath;
        this.range = newRange;
    }
}
exports.ToolsCollectWorkspaceCodeActionsRequest = ToolsCollectWorkspaceCodeActionsRequest;
//# sourceMappingURL=toolsCollectWorkspaceCodeActionsRequest.js.map