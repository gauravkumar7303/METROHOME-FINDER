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
exports.ALCodeunitWizardPage = void 0;
const path = __importStar(require("path"));
const alTableBasedWizardPage_1 = require("./alTableBasedWizardPage");
const alCodeunitSyntaxBuilder_1 = require("../syntaxbuilders/alCodeunitSyntaxBuilder");
const toolsSymbolInformationRequest_1 = require("../../langserver/symbolsinformation/toolsSymbolInformationRequest");
const smbolWithNameInformation_1 = require("../../symbolsinformation/smbolWithNameInformation");
class ALCodeunitWizardPage extends alTableBasedWizardPage_1.ALTableBasedWizardPage {
    _codeunitWizardData;
    constructor(toolsExtensionContext, settings, data) {
        super(toolsExtensionContext, "AL Codeunit Wizard", settings, data);
        this._codeunitWizardData = data;
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'alcodeunitwizard', 'alcodeunitwizard.html');
    }
    getViewType() {
        return "azALDevTools.ALCodeunitWizard";
    }
    processWebViewMessage(message) {
        if (super.processWebViewMessage(message))
            return true;
        switch (message.command) {
            case 'loadInterfaces':
                this.loadInterfaces();
                return true;
        }
        return false;
    }
    async finishWizard(data) {
        //build parameters
        this._codeunitWizardData.objectId = data.objectId;
        this._codeunitWizardData.objectName = data.objectName;
        this._codeunitWizardData.selectedTable = data.selectedTable;
        this._codeunitWizardData.interfaceName = data.interfaceName;
        await this.finishObjectIdReservation(this._codeunitWizardData);
        //get namespaces information
        let referencedObjects = [];
        if (this._codeunitWizardData.selectedTable) {
            referencedObjects.push({
                nameWithNamespaceOrId: this._codeunitWizardData.selectedTable,
                typeName: 'Table'
            });
        }
        if (this._codeunitWizardData.interfaceName) {
            referencedObjects.push({
                nameWithNamespaceOrId: this._codeunitWizardData.interfaceName,
                typeName: 'Interface'
            });
        }
        let fileNamespaces = await this.getNamespacesInformation('Codeunit', referencedObjects);
        if (fileNamespaces) {
            this._codeunitWizardData.objectNamespace = fileNamespaces.namespaceName;
            this._codeunitWizardData.objectUsings = fileNamespaces.usings;
        }
        //build new object
        let builder = new alCodeunitSyntaxBuilder_1.ALCodeunitSyntaxBuilder(this._toolsExtensionContext);
        let source = await builder.buildFromCodeunitWizardDataAsync(this._settings.getDestDirectoryUri(), this._codeunitWizardData);
        this.createObjectFile('Codeunit', this._codeunitWizardData.objectId, this._codeunitWizardData.objectName, source);
        return true;
    }
    async loadInterfaces() {
        let resourceUri = this._settings.getDestDirectoryUri();
        if (this._toolsExtensionContext.alLangProxy.supportsInterfaces(resourceUri)) {
            let response = await this._toolsExtensionContext.toolsLangServerClient.getInterfacesList(new toolsSymbolInformationRequest_1.ToolsSymbolInformationRequest(this._settings.getDestDirectoryPath(), false));
            if (response) {
                this._codeunitWizardData.interfaceList = smbolWithNameInformation_1.SymbolWithNameInformation.toNamesList(response.symbols);
            }
            //this._codeunitWizardData.interfaceList = await this._toolsExtensionContext.alLangProxy.getInterfaceList(resourceUri);
            if ((this._codeunitWizardData.interfaceList) && (this._codeunitWizardData.interfaceList.length > 0)) {
                this.sendMessage({
                    command: "setInterfaces",
                    data: this._codeunitWizardData.interfaceList
                });
            }
        }
    }
}
exports.ALCodeunitWizardPage = ALCodeunitWizardPage;
//# sourceMappingURL=alCodeunitWizardPage.js.map