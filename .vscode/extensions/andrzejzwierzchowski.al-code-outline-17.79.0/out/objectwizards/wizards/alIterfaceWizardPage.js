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
exports.ALInterfaceWizardPage = void 0;
const path = __importStar(require("path"));
const projectItemWizardPage_1 = require("./projectItemWizardPage");
const alInterfaceSyntaxBuilder_1 = require("../syntaxbuilders/alInterfaceSyntaxBuilder");
const toolsSymbolInformationRequest_1 = require("../../langserver/symbolsinformation/toolsSymbolInformationRequest");
const smbolWithNameInformation_1 = require("../../symbolsinformation/smbolWithNameInformation");
class ALInterfaceWizardPage extends projectItemWizardPage_1.ProjectItemWizardPage {
    _wizardData;
    constructor(toolsExtensionContext, settings, data) {
        super(toolsExtensionContext, "AL Interface Wizard", settings, data);
        this._wizardData = data;
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'alinterfacewizard', 'alinterfacewizard.html');
    }
    getViewType() {
        return "azALDevTools.ALInterfaceWizard";
    }
    onDocumentLoaded() {
        super.onDocumentLoaded();
        this.loadCodeunits();
    }
    async finishWizard(data) {
        //build parameters
        this._wizardData.objectName = data.objectName;
        this._wizardData.baseCodeunitName = data.baseCodeunitName;
        //get namespaces information
        let referencedObjects = [];
        let fileNamespaces = await this.getNamespacesInformation('Interface', referencedObjects);
        if (fileNamespaces) {
            this._wizardData.objectNamespace = fileNamespaces.namespaceName;
            this._wizardData.objectUsings = fileNamespaces.usings;
        }
        //build new object
        let builder = new alInterfaceSyntaxBuilder_1.ALInterfaceSyntaxBuilder(this._toolsExtensionContext);
        let source = await builder.buildFromInterfaceWizardDataAsync(this._settings.getDestDirectoryUri(), this._wizardData);
        this.createObjectFile('Interface', '', this._wizardData.objectName, source);
        return true;
    }
    async loadCodeunits() {
        let response = await this._toolsExtensionContext.toolsLangServerClient.getCodeunitsList(new toolsSymbolInformationRequest_1.ToolsSymbolInformationRequest(this._settings.getDestDirectoryPath(), false));
        if (response)
            this._wizardData.codeunitList = smbolWithNameInformation_1.SymbolWithNameInformation.toNamesList(response.symbols);
        //let resourceUri = this._settings.getDestDirectoryUri();
        //this._wizardData.codeunitList = await this._toolsExtensionContext.alLangProxy.getCodeunitList(resourceUri);
        if ((this._wizardData.codeunitList) && (this._wizardData.codeunitList.length > 0))
            this.sendMessage({
                command: "setCodeunits",
                data: this._wizardData.codeunitList
            });
    }
}
exports.ALInterfaceWizardPage = ALInterfaceWizardPage;
//# sourceMappingURL=alIterfaceWizardPage.js.map