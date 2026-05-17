"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsProjectSymbolsRequest = void 0;
class ToolsProjectSymbolsRequest {
    includeDependencies;
    projectPath;
    packagesFolder;
    workspaceFolders;
    constructor(newIncludeDependencies, newProjectPath, newPackagesFolder, newWorkspaceFolders) {
        this.includeDependencies = newIncludeDependencies;
        this.projectPath = newProjectPath;
        this.packagesFolder = newPackagesFolder;
        this.workspaceFolders = newWorkspaceFolders;
    }
}
exports.ToolsProjectSymbolsRequest = ToolsProjectSymbolsRequest;
//# sourceMappingURL=toolsProjectSymbolsRequest.js.map