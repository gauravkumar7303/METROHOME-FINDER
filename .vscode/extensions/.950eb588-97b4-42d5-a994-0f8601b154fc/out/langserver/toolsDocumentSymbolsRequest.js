"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsDocumentSymbolsRequest = void 0;
class ToolsDocumentSymbolsRequest {
    source;
    path;
    projectPath;
    includeProperties;
    isActiveDocument;
    constructor(newSourceCode, newPath, newProjectPath, newIncludeProperties, newIsActiveDocument) {
        this.source = newSourceCode;
        this.path = newPath;
        this.projectPath = newProjectPath;
        this.includeProperties = newIncludeProperties;
        this.isActiveDocument = newIsActiveDocument;
    }
}
exports.ToolsDocumentSymbolsRequest = ToolsDocumentSymbolsRequest;
//# sourceMappingURL=toolsDocumentSymbolsRequest.js.map