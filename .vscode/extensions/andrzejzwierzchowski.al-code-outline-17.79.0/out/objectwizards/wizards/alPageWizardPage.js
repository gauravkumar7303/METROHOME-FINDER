'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALPageWizardPage = void 0;
const path = __importStar(require("path"));
const alTableBasedWizardPage_1 = require("./alTableBasedWizardPage");
const alPageWizardFastTabData_1 = require("./alPageWizardFastTabData");
const alPageSyntaxBuilder_1 = require("../syntaxbuilders/alPageSyntaxBuilder");
const alFieldToolTipsLocation_1 = require("../../allanguage/alFieldToolTipsLocation");
class ALPageWizardPage extends alTableBasedWizardPage_1.ALTableBasedWizardPage {
    _pageWizardData;
    constructor(toolsExtensionContext, settings, data) {
        super(toolsExtensionContext, "AL Page Wizard", settings, data);
        this._pageWizardData = data;
        this._includeToolTips = data.reuseToolTips;
        this._toolTipsSourceDependencies = data.toolTipsSource;
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'alpagewizard', 'alpagewizard.html');
    }
    getViewType() {
        return "azALDevTools.ALPageWizard";
    }
    async finishWizard(data) {
        let destDirectoryUri = this._settings.getDestDirectoryUri();
        let fieldToolTipsLocation = this._toolsExtensionContext.alLangProxy.fieldToolTipsLocation(destDirectoryUri);
        //build parameters
        this._pageWizardData.objectId = data.objectId;
        this._pageWizardData.objectName = data.objectName;
        this._pageWizardData.selectedTable = data.selectedTable;
        this._pageWizardData.pageType = data.pageType;
        this._pageWizardData.fastTabs = data.fastTabs;
        this._pageWizardData.applicationArea = data.applicationArea;
        this._pageWizardData.applicationAreaMode = this._toolsExtensionContext.alLangProxy.getAppAreaMode(destDirectoryUri);
        this._pageWizardData.usageCategory = data.usageCategory;
        this._pageWizardData.caption = data.caption;
        this._pageWizardData.apiPublisher = data.apiPublisher;
        this._pageWizardData.apiGroup = data.apiGroup;
        this._pageWizardData.apiVersion = data.apiVersion;
        this._pageWizardData.entityName = data.entityName;
        this._pageWizardData.entitySetName = data.entitySetName;
        this._pageWizardData.createTooltips = (!!data.createTooltips) && (fieldToolTipsLocation === alFieldToolTipsLocation_1.ALFieldToolTipsLocation.page);
        //information about selected fields
        this._pageWizardData.selectedFieldList = [];
        if (data.fields) {
            for (var i = 0; i < data.fields.length; i++) {
                this._pageWizardData.selectedFieldList.push(data.fields[i]);
            }
        }
        this._pageWizardData.selectedFlowFilterList = [];
        if (data.flowFilters) {
            for (var i = 0; i < data.flowFilters.length; i++) {
                this._pageWizardData.selectedFlowFilterList.push(data.flowFilters[i]);
            }
        }
        //information about fast tabs
        this._pageWizardData.fastTabsData = [];
        if (data.fastTabsData) {
            for (var i = 0; i < data.fastTabsData.length; i++) {
                var sourceFastTabDetails = data.fastTabsData[i];
                var fastTabDetails = new alPageWizardFastTabData_1.ALPageWizardFastTabData(sourceFastTabDetails.name);
                if (sourceFastTabDetails.fields) {
                    for (var fld = 0; fld < sourceFastTabDetails.fields.length; fld++)
                        fastTabDetails.fields.push(sourceFastTabDetails.fields[fld]);
                }
                this._pageWizardData.fastTabsData.push(fastTabDetails);
            }
        }
        await this.finishObjectIdReservation(this._pageWizardData);
        //load project settings from the language server
        this._pageWizardData.projectSettings = await this.getProjectSettings();
        //get namespaces information
        let referencedObjects = [];
        if (this._pageWizardData.selectedTable) {
            referencedObjects.push({
                nameWithNamespaceOrId: this._pageWizardData.selectedTable,
                typeName: 'Table'
            });
        }
        let fileNamespaces = await this.getNamespacesInformation('Page', referencedObjects);
        if (fileNamespaces) {
            this._pageWizardData.objectNamespace = fileNamespaces.namespaceName;
            this._pageWizardData.objectUsings = fileNamespaces.usings;
        }
        //build new object
        let builder = new alPageSyntaxBuilder_1.ALPageSyntaxBuilder();
        let source = builder.buildFromPageWizardData(destDirectoryUri, this._pageWizardData);
        this.createObjectFile('Page', this._pageWizardData.objectId, this._pageWizardData.objectName, source);
        return true;
    }
}
exports.ALPageWizardPage = ALPageWizardPage;
//# sourceMappingURL=alPageWizardPage.js.map