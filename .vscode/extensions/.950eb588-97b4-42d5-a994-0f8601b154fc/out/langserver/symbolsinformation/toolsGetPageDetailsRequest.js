"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsGetPageDetailsRequest = void 0;
const toolsGetTableBasedSymbolDetailsRequest_1 = require("./toolsGetTableBasedSymbolDetailsRequest");
class ToolsGetPageDetailsRequest extends toolsGetTableBasedSymbolDetailsRequest_1.ToolsGetTableBasedSymbolDetailsRequest {
    getToolTips;
    toolTipsSourceDependencies;
    constructor(newPath, newSymbolReference, newGetExistingFields, newGetAvailableFields, newGetToolTips, newToolTipsSourceDependencies) {
        super(newPath, newSymbolReference, newGetExistingFields, newGetAvailableFields);
        this.getToolTips = newGetToolTips;
        this.toolTipsSourceDependencies = newToolTipsSourceDependencies;
    }
}
exports.ToolsGetPageDetailsRequest = ToolsGetPageDetailsRequest;
//# sourceMappingURL=toolsGetPageDetailsRequest.js.map