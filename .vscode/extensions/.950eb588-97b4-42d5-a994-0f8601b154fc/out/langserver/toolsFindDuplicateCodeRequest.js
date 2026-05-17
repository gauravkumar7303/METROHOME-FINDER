"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsFindDuplicateCodeRequest = void 0;
class ToolsFindDuplicateCodeRequest {
    minNoOfStatements;
    skipObsoleteCodeLevel;
    path;
    constructor(newMinNoOfStatements, newSkipObsoleteCodeLevel, newPath) {
        this.minNoOfStatements = newMinNoOfStatements;
        this.skipObsoleteCodeLevel = newSkipObsoleteCodeLevel;
        this.path = newPath;
    }
}
exports.ToolsFindDuplicateCodeRequest = ToolsFindDuplicateCodeRequest;
//# sourceMappingURL=toolsFindDuplicateCodeRequest.js.map