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
exports.ALEnumWizardPage = void 0;
const path = __importStar(require("path"));
const projectItemWizardPage_1 = require("./projectItemWizardPage");
const alEnumSyntaxBuilder_1 = require("../syntaxbuilders/alEnumSyntaxBuilder");
class ALEnumWizardPage extends projectItemWizardPage_1.ProjectItemWizardPage {
    _enumWizardData;
    constructor(toolsExtensionContext, settings, data) {
        super(toolsExtensionContext, "AL Enum Wizard", settings, data);
        this._enumWizardData = data;
    }
    //initialize wizard
    onDocumentLoaded() {
        //send data to the web view
        this.sendMessage({
            command: 'setData',
            data: this._enumWizardData
        });
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'alenumwizard', 'alenumwizard.html');
    }
    getViewType() {
        return "azALDevTools.ALEnumWizard";
    }
    async finishWizard(data) {
        //build parameters
        this._enumWizardData.objectId = data.objectId;
        this._enumWizardData.objectName = data.objectName;
        this._enumWizardData.valueList = data.valueList;
        this._enumWizardData.captionList = data.captionList;
        this._enumWizardData.extensible = data.extensible;
        await this.finishObjectIdReservation(this._enumWizardData);
        //get namespaces information
        let referencedObjects = [];
        let fileNamespaces = await this.getNamespacesInformation('Enum', referencedObjects);
        if (fileNamespaces) {
            this._enumWizardData.objectNamespace = fileNamespaces.namespaceName;
            this._enumWizardData.objectUsings = fileNamespaces.usings;
        }
        //build new object
        var builder = new alEnumSyntaxBuilder_1.ALEnumSyntaxBuilder();
        var source = builder.buildFromEnumWizardData(this._settings.getDestDirectoryUri(), this._enumWizardData);
        this.createObjectFile('Enum', this._enumWizardData.objectId, this._enumWizardData.objectName, source);
        return true;
    }
}
exports.ALEnumWizardPage = ALEnumWizardPage;
//# sourceMappingURL=alEnumWizardPage.js.map