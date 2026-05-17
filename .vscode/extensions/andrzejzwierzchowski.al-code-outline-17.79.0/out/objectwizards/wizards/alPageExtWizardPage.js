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
exports.ALPageExtWizardPage = void 0;
const path = __importStar(require("path"));
const alPageExtSyntaxBuilder_1 = require("../syntaxbuilders/alPageExtSyntaxBuilder");
const projectItemWizardPage_1 = require("./projectItemWizardPage");
const toolsSymbolInformationRequest_1 = require("../../langserver/symbolsinformation/toolsSymbolInformationRequest");
const smbolWithNameInformation_1 = require("../../symbolsinformation/smbolWithNameInformation");
class ALPageExtWizardPage extends projectItemWizardPage_1.ProjectItemWizardPage {
    _pageExtWizardData;
    constructor(toolsExtensionContext, settings, data) {
        super(toolsExtensionContext, "AL Page Extension Wizard", settings, data);
        this._pageExtWizardData = data;
    }
    //initialize wizard
    onDocumentLoaded() {
        //send data to the web view
        this.sendMessage({
            command: 'setData',
            data: this._pageExtWizardData
        });
        this.loadPages();
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'alpageextwizard', 'alpageextwizard.html');
    }
    getViewType() {
        return "azALDevTools.ALPageExtWizard";
    }
    processWebViewMessage(message) {
        if (super.processWebViewMessage(message)) {
            return true;
        }
        switch (message.command) {
            case 'loadPages':
                this.loadPages();
                return true;
        }
        return false;
    }
    async finishWizard(data) {
        //build parameters
        this._pageExtWizardData.objectId = data.objectId;
        this._pageExtWizardData.objectName = data.objectName;
        this._pageExtWizardData.basePage = data.basePage;
        await this.finishObjectIdReservation(this._pageExtWizardData);
        //get namespaces information
        let referencedObjects = [];
        if (this._pageExtWizardData.basePage) {
            referencedObjects.push({
                nameWithNamespaceOrId: this._pageExtWizardData.basePage,
                typeName: 'Page'
            });
        }
        let fileNamespaces = await this.getNamespacesInformation('PageExtension', referencedObjects);
        if (fileNamespaces) {
            this._pageExtWizardData.objectNamespace = fileNamespaces.namespaceName;
            this._pageExtWizardData.objectUsings = fileNamespaces.usings;
        }
        //build new object
        let builder = new alPageExtSyntaxBuilder_1.ALPageExtSyntaxBuilder();
        let source = await builder.buildFromPageExtWizardData(this._settings.getDestDirectoryUri(), this._pageExtWizardData);
        this.createObjectExtensionFile('PageExtension', this._pageExtWizardData.objectId, this._pageExtWizardData.objectName, this._pageExtWizardData.basePage, source);
        return true;
    }
    async loadPages() {
        let response = await this._toolsExtensionContext.toolsLangServerClient.getPagesList(new toolsSymbolInformationRequest_1.ToolsSymbolInformationRequest(this._settings.getDestDirectoryPath(), false));
        if (response)
            this._pageExtWizardData.pageList = smbolWithNameInformation_1.SymbolWithNameInformation.toNamesList(response.symbols);
        //let resourceUri = this._settings.getDestDirectoryUri();
        //this._pageExtWizardData.pageList = await this._toolsExtensionContext.alLangProxy.getPageList(resourceUri);
        if ((this._pageExtWizardData.pageList) && (this._pageExtWizardData.pageList.length > 0)) {
            this.sendMessage({
                command: "setPages",
                data: this._pageExtWizardData.pageList
            });
        }
    }
}
exports.ALPageExtWizardPage = ALPageExtWizardPage;
//# sourceMappingURL=alPageExtWizardPage.js.map