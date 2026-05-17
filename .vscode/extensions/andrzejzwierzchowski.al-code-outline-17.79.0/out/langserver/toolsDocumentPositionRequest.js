"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsDocumentPositionRequest = void 0;
const textPosition_1 = require("../symbollibraries/textPosition");
class ToolsDocumentPositionRequest {
    isActiveDocument;
    source;
    position;
    constructor(newIsActive, newSource, newPosition) {
        this.isActiveDocument = newIsActive;
        this.source = newSource;
        this.position = new textPosition_1.TextPosition();
        this.position.set(newPosition.line, newPosition.character);
    }
}
exports.ToolsDocumentPositionRequest = ToolsDocumentPositionRequest;
//# sourceMappingURL=toolsDocumentPositionRequest.js.map