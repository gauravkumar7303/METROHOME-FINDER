"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsGetTableBasedSymbolDetailsRequest = void 0;
const toolsSymbolInformationRequest_1 = require("./toolsSymbolInformationRequest");
class ToolsGetTableBasedSymbolDetailsRequest extends toolsSymbolInformationRequest_1.ToolsSymbolInformationRequest {
    symbolReference;
    getExistingFields;
    getAvailableFields;
    constructor(newPath, newSymbolReference, newGetExistingFields, newGetAvailableFields) {
        super(newPath, true);
        this.symbolReference = newSymbolReference;
        this.getExistingFields = newGetExistingFields;
        this.getAvailableFields = newGetAvailableFields;
    }
}
exports.ToolsGetTableBasedSymbolDetailsRequest = ToolsGetTableBasedSymbolDetailsRequest;
//# sourceMappingURL=toolsGetTableBasedSymbolDetailsRequest.js.map