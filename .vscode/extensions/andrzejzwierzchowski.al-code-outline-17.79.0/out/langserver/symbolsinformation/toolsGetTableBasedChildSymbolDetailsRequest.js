"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsGetTableBasedChildSymbolDetailsRequest = void 0;
const toolsGetTableBasedSymbolDetailsRequest_1 = require("./toolsGetTableBasedSymbolDetailsRequest");
class ToolsGetTableBasedChildSymbolDetailsRequest extends toolsGetTableBasedSymbolDetailsRequest_1.ToolsGetTableBasedSymbolDetailsRequest {
    childSymbolName;
    constructor(newPath, newSymbolReference, newChildSymbolName, newGetExistingFields, newGetAvailableFields) {
        super(newPath, newSymbolReference, newGetExistingFields, newGetAvailableFields);
        this.childSymbolName = newChildSymbolName;
    }
}
exports.ToolsGetTableBasedChildSymbolDetailsRequest = ToolsGetTableBasedChildSymbolDetailsRequest;
//# sourceMappingURL=toolsGetTableBasedChildSymbolDetailsRequest.js.map