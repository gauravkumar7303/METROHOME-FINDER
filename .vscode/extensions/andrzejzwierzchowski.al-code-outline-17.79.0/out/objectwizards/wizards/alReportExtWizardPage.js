"use strict";
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
exports.ALReportExtWizardPage = void 0;
const path = __importStar(require("path"));
const alReportExtSyntaxBuilder_1 = require("../syntaxbuilders/alReportExtSyntaxBuilder");
const projectItemWizardPage_1 = require("./projectItemWizardPage");
const toolsSymbolInformationRequest_1 = require("../../langserver/symbolsinformation/toolsSymbolInformationRequest");
const smbolWithNameInformation_1 = require("../../symbolsinformation/smbolWithNameInformation");
const toolsGetReportDetailsRequest_1 = require("../../langserver/symbolsinformation/toolsGetReportDetailsRequest");
const alReportExtWizardDataItemData_1 = require("./alReportExtWizardDataItemData");
class ALReportExtWizardPage extends projectItemWizardPage_1.ProjectItemWizardPage {
    _reportExtWizardData;
    constructor(toolsExtensionContext, settings, data) {
        super(toolsExtensionContext, "AL Report Extension Wizard", settings, data);
        this._reportExtWizardData = data;
    }
    //initialize wizard
    onDocumentLoaded() {
        //send data to the web view
        this.sendMessage({
            command: 'setData',
            data: this._reportExtWizardData
        });
        this.loadReports();
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'alreportextwizard', 'alreportextwizard.html');
    }
    getViewType() {
        return "azALDevTools.ALReportExtWizard";
    }
    processWebViewMessage(message) {
        if (super.processWebViewMessage(message)) {
            return true;
        }
        switch (message.command) {
            case 'loadReports':
                this.loadReports();
                return true;
            case 'selectReport':
                this.loadBaseReport(message.baseReport);
                return true;
        }
        return false;
    }
    anyToDataItem(data) {
        let dataItem = new alReportExtWizardDataItemData_1.ALReportExtWizardDataItemData(data.name);
        if (data.fields) {
            for (var i = 0; i < data.fields.length; i++) {
                dataItem.fields.push(data.fields[i]);
            }
        }
        return dataItem;
    }
    async finishWizard(data) {
        //build parameters
        this._reportExtWizardData.objectId = data.objectId;
        this._reportExtWizardData.objectName = data.objectName;
        this._reportExtWizardData.baseReport = data.baseReport;
        this._reportExtWizardData.dataItems = [];
        if ((data.dataItems) && (data.dataItems.length > 0)) {
            for (let i = 0; i < data.dataItems.length; i++) {
                this._reportExtWizardData.dataItems.push(this.anyToDataItem(data.dataItems[i]));
            }
        }
        await this.finishObjectIdReservation(this._reportExtWizardData);
        //get namespaces information
        let referencedObjects = [];
        if (this._reportExtWizardData.baseReport) {
            referencedObjects.push({
                nameWithNamespaceOrId: this._reportExtWizardData.baseReport,
                typeName: 'Report'
            });
        }
        let fileNamespaces = await this.getNamespacesInformation('ReportExtension', referencedObjects);
        if (fileNamespaces) {
            this._reportExtWizardData.objectNamespace = fileNamespaces.namespaceName;
            this._reportExtWizardData.objectUsings = fileNamespaces.usings;
        }
        //build new object
        let builder = new alReportExtSyntaxBuilder_1.ALReportExtSyntaxBuilder();
        let source = await builder.buildFromReportExtWizardData(this._settings.getDestDirectoryUri(), this._reportExtWizardData);
        this.createObjectExtensionFile('ReportExtension', this._reportExtWizardData.objectId, this._reportExtWizardData.objectName, this._reportExtWizardData.baseReport, source);
        return true;
    }
    async loadReports() {
        let response = await this._toolsExtensionContext.toolsLangServerClient.getReportsList(new toolsSymbolInformationRequest_1.ToolsSymbolInformationRequest(this._settings.getDestDirectoryPath(), false));
        if (response)
            this._reportExtWizardData.reportList = smbolWithNameInformation_1.SymbolWithNameInformation.toNamesList(response.symbols);
        if ((this._reportExtWizardData.reportList) && (this._reportExtWizardData.reportList.length > 0)) {
            this.sendMessage({
                command: "setReports",
                data: this._reportExtWizardData.reportList
            });
        }
    }
    async loadBaseReport(baseReport) {
        if (!baseReport)
            return;
        let reportReference = {
            name: baseReport
        };
        let response = await this._toolsExtensionContext.toolsLangServerClient.getReportDetails(new toolsGetReportDetailsRequest_1.ToolsGetReportDetailsRequest(this._settings.getDestDirectoryPath(), reportReference, true, true));
        if ((response) && (response.symbol)) {
            this.sendMessage({
                command: 'setBaseReport',
                data: response.symbol
            });
        }
    }
}
exports.ALReportExtWizardPage = ALReportExtWizardPage;
//# sourceMappingURL=alReportExtWizardPage.js.map