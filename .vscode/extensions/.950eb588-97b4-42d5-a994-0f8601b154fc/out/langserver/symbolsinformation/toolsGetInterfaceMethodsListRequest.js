"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolsGetInterfaceMethodsListRequest = void 0;
const toolsSymbolInformationRequest_1 = require("./toolsSymbolInformationRequest");
class toolsGetInterfaceMethodsListRequest extends toolsSymbolInformationRequest_1.ToolsSymbolInformationRequest {
    symbolReference;
    constructor(newPath, newSymbolReference) {
        super(newPath, true);
        this.symbolReference = newSymbolReference;
    }
}
exports.toolsGetInterfaceMethodsListRequest = toolsGetInterfaceMethodsListRequest;
//# sourceMappingURL=toolsGetInterfaceMethodsListRequest.js.map