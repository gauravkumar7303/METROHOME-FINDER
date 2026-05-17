"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsGetProjectSymbolLocationRequest = void 0;
class ToolsGetProjectSymbolLocationRequest {
    projectPath;
    appFilePath;
    kind;
    name;
    constructor(newProjectPath, newAppFilePath, newKind, newName) {
        this.projectPath = newProjectPath;
        this.appFilePath = newAppFilePath;
        this.kind = newKind;
        this.name = newName;
    }
}
exports.ToolsGetProjectSymbolLocationRequest = ToolsGetProjectSymbolLocationRequest;
//# sourceMappingURL=toolsGetProjectSymbolLocationRequest.js.map