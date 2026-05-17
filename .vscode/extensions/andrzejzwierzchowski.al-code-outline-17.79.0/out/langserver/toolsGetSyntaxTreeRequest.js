"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsGetSyntaxTreeRequest = void 0;
class ToolsGetSyntaxTreeRequest {
    source;
    path;
    projectPath;
    open;
    constructor(newSourceCode, newPath, newProjectPath, newOpen) {
        this.source = newSourceCode;
        this.path = newPath;
        this.projectPath = newProjectPath;
        this.open = newOpen;
    }
}
exports.ToolsGetSyntaxTreeRequest = ToolsGetSyntaxTreeRequest;
//# sourceMappingURL=toolsGetSyntaxTreeRequest.js.map