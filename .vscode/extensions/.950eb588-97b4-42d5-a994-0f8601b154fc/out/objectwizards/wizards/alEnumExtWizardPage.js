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
exports.ALEnumExtWizardPage = void 0;
const path = __importStar(require("path"));
const projectItemWizardPage_1 = require("./projectItemWizardPage");
const alEnumExtSyntaxBuilder_1 = require("../syntaxbuilders/alEnumExtSyntaxBuilder");
const smbolWithNameInformation_1 = require("../../symbolsinformation/smbolWithNameInformation");
class ALEnumExtWizardPage extends projectItemWizardPage_1.ProjectItemWizardPage {
    _enumExtWizardData;
    constructor(toolsExtensionContext, settings, data) {
        super(toolsExtensionContext, "AL Enum Extension Wizard", settings, data);
        this._enumExtWizardData = data;
    }
    //initialize wizard
    onDocumentLoaded() {
        //send data to the web view
        this.sendMessage({
            command: 'setData',
            data: this._enumExtWizardData
        });
        //load base enums
        if ((this._enumExtWizardData.baseEnumList == null) || (this._enumExtWizardData.baseEnumList.length == 0))
            this.loadBaseEnums();
    }
    async loadBaseEnums() {
        let response = await this._toolsExtensionContext.toolsLangServerClient.getEnumsList({
            path: this._settings.getDestDirectoryPath(), includeNonAccessible: false
        });
        if (response)
            this._enumExtWizardData.baseEnumList = smbolWithNameInformation_1.SymbolWithNameInformation.toNamesList(response.symbols);
        else
            this._enumExtWizardData.baseEnumList = [];
        //this._enumExtWizardData.baseEnumList = await this._toolsExtensionContext.alLangProxy.getEnumList(this._settings.getDestDirectoryUri());
        this.sendMessage({
            command: "setEnums",
            data: this._enumExtWizardData.baseEnumList
        });
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'alenumextwizard', 'alenumextwizard.html');
    }
    getViewType() {
        return "azALDevTools.ALEnumExtWizard";
    }
    async finishWizard(data) {
        //build parameters
        this._enumExtWizardData.objectId = data.objectId;
        this._enumExtWizardData.objectName = data.objectName;
        this._enumExtWizardData.baseEnum = data.baseEnum;
        this._enumExtWizardData.valueList = data.valueList;
        this._enumExtWizardData.captionList = data.captionList;
        let firstValueId = Number.parseInt(data.firstValueId);
        if (Number.isNaN(firstValueId))
            this._enumExtWizardData.firstValueId = 0;
        else
            this._enumExtWizardData.firstValueId = firstValueId;
        await this.finishObjectIdReservation(this._enumExtWizardData);
        //get namespaces information
        let referencedObjects = [];
        if (this._enumExtWizardData.baseEnum) {
            referencedObjects.push({
                nameWithNamespaceOrId: this._enumExtWizardData.baseEnum,
                typeName: 'Enum'
            });
        }
        let fileNamespaces = await this.getNamespacesInformation('EnumExtension', referencedObjects);
        if (fileNamespaces) {
            this._enumExtWizardData.objectNamespace = fileNamespaces.namespaceName;
            this._enumExtWizardData.objectUsings = fileNamespaces.usings;
        }
        //build new object
        let builder = new alEnumExtSyntaxBuilder_1.ALEnumExtSyntaxBuilder();
        let source = builder.buildFromEnumExtWizardData(this._settings.getDestDirectoryUri(), this._enumExtWizardData);
        this.createObjectExtensionFile('EnumExtension', this._enumExtWizardData.objectId, this._enumExtWizardData.objectName, this._enumExtWizardData.baseEnum, source);
        return true;
    }
}
exports.ALEnumExtWizardPage = ALEnumExtWizardPage;
//# sourceMappingURL=alEnumExtWizardPage.js.map