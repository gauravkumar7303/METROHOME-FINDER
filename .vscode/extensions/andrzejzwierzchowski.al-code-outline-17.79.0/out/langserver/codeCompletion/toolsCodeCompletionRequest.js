"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsCodeCompletionRequest = void 0;
class ToolsCodeCompletionRequest {
    position;
    path;
    providers;
    parameters;
    constructor(newPosition, newPath, newProviders, newParameters) {
        this.position = newPosition;
        this.path = newPath;
        this.providers = newProviders;
        this.parameters = newParameters;
    }
}
exports.ToolsCodeCompletionRequest = ToolsCodeCompletionRequest;
//# sourceMappingURL=toolsCodeCompletionRequest.js.map