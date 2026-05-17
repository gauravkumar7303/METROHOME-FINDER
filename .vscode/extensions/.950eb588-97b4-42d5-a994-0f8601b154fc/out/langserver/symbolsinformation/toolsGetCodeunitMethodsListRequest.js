"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolsGetCodeunitMethodsListRequest = void 0;
const toolsSymbolInformationRequest_1 = require("./toolsSymbolInformationRequest");
class toolsGetCodeunitMethodsListRequest extends toolsSymbolInformationRequest_1.ToolsSymbolInformationRequest {
    symbolReference;
    constructor(newPath, newSymbolReference) {
        super(newPath, true);
        this.symbolReference = newSymbolReference;
    }
}
exports.toolsGetCodeunitMethodsListRequest = toolsGetCodeunitMethodsListRequest;
//# sourceMappingURL=toolsGetCodeunitMethodsListRequest.js.map