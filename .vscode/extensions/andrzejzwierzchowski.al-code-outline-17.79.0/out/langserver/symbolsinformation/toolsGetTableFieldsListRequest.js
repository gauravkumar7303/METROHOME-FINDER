"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsGetTableFieldsListRequest = void 0;
const toolsSymbolInformationRequest_1 = require("./toolsSymbolInformationRequest");
class ToolsGetTableFieldsListRequest extends toolsSymbolInformationRequest_1.ToolsSymbolInformationRequest {
    tableReference;
    includeDisabled;
    includeObsolete;
    includeNormal;
    includeFlowFields;
    includeFlowFilters;
    includeToolTips;
    toolTipsSourceDependencies;
    constructor(newPath, newTableReference, newIncludeDisabled, newIncludeObsolete, newIncludeNormal, newIncludeFlowFields, newIncludeFlowFilters, newIncludeToolTips, newToolTipsSourceDependencies) {
        super(newPath, true);
        this.tableReference = newTableReference;
        this.includeDisabled = newIncludeDisabled;
        this.includeObsolete = newIncludeObsolete;
        this.includeNormal = newIncludeNormal;
        this.includeFlowFields = newIncludeFlowFields;
        this.includeFlowFilters = newIncludeFlowFilters;
        this.includeToolTips = newIncludeToolTips;
        this.toolTipsSourceDependencies = newToolTipsSourceDependencies;
    }
}
exports.ToolsGetTableFieldsListRequest = ToolsGetTableFieldsListRequest;
//# sourceMappingURL=toolsGetTableFieldsListRequest.js.map