"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsWorkspaceCommandRequest = void 0;
class ToolsWorkspaceCommandRequest {
    command;
    source;
    projectPath;
    filePath;
    range;
    parameters;
    excludeFiles;
    includeFiles;
    constructor(newCommand, newSource, newProjectPath, newFilePath, newRange, newParameters, newExcludeFiles, newIncludeFiles) {
        this.command = newCommand;
        this.source = newSource;
        this.projectPath = newProjectPath;
        this.filePath = newFilePath;
        this.range = newRange;
        this.parameters = newParameters;
        this.excludeFiles = newExcludeFiles;
        this.includeFiles = newIncludeFiles;
    }
}
exports.ToolsWorkspaceCommandRequest = ToolsWorkspaceCommandRequest;
//# sourceMappingURL=toolsWorkspaceCommandRequest.js.map