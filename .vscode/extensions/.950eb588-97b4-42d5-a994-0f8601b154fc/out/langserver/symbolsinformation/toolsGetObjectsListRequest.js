"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsGetObjectsListRequest = void 0;
const toolsSymbolInformationRequest_1 = require("./toolsSymbolInformationRequest");
class ToolsGetObjectsListRequest extends toolsSymbolInformationRequest_1.ToolsSymbolInformationRequest {
    includeTables;
    includePages;
    includeReports;
    includeXmlPorts;
    includeQueries;
    includeCodeunits;
    includeControlAddIns;
    includePageExtensions;
    includeTableExtensions;
    includePofiles;
    includePageCustomizations;
    includeDotNetPackages;
    includeEnumTypes;
    includeEnumExtensionTypes;
    includeInterfaces;
    includeReportExtensions;
    includePermissionSets;
    includePermissionSetExtensions;
    includeDependencies;
    includeObsolete;
    constructor(newPath) {
        super(newPath, false);
        this.includeTables = false;
        this.includePages = false;
        this.includeReports = false;
        this.includeXmlPorts = false;
        this.includeQueries = false;
        this.includeCodeunits = false;
        this.includeControlAddIns = false;
        this.includePageExtensions = false;
        this.includeTableExtensions = false;
        this.includePofiles = false;
        this.includePageCustomizations = false;
        this.includeDotNetPackages = false;
        this.includeEnumTypes = false;
        this.includeEnumExtensionTypes = false;
        this.includeInterfaces = false;
        this.includeReportExtensions = false;
        this.includePermissionSets = false;
        this.includePermissionSetExtensions = false;
        this.includeDependencies = false;
        this.includeObsolete = false;
    }
    setIncludeAll() {
        this.includeTables = true;
        this.includePages = true;
        this.includeReports = true;
        this.includeXmlPorts = true;
        this.includeQueries = true;
        this.includeCodeunits = true;
        this.includeControlAddIns = true;
        this.includePageExtensions = true;
        this.includeTableExtensions = true;
        this.includePofiles = true;
        this.includePageCustomizations = true;
        this.includeDotNetPackages = true;
        this.includeEnumTypes = true;
        this.includeEnumExtensionTypes = true;
        this.includeInterfaces = true;
        this.includeReportExtensions = true;
        this.includePermissionSets = true;
        this.includePermissionSetExtensions = true;
    }
    setIncludeObjectsWithPermissions() {
        this.includeTables = true;
        this.includePages = true;
        this.includeReports = true;
        this.includeXmlPorts = true;
        this.includeQueries = true;
        this.includeCodeunits = true;
        this.includeControlAddIns = false;
        this.includePageExtensions = false;
        this.includeTableExtensions = false;
        this.includePofiles = false;
        this.includePageCustomizations = false;
        this.includeDotNetPackages = false;
        this.includeEnumTypes = false;
        this.includeEnumExtensionTypes = false;
        this.includeInterfaces = false;
        this.includeReportExtensions = false;
        this.includePermissionSets = false;
        this.includePermissionSetExtensions = false;
    }
}
exports.ToolsGetObjectsListRequest = ToolsGetObjectsListRequest;
//# sourceMappingURL=toolsGetObjectsListRequest.js.map