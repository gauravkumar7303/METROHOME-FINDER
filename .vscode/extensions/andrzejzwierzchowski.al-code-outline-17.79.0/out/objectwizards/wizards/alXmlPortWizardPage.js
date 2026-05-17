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
exports.ALXmlPortWizardPage = void 0;
const path = __importStar(require("path"));
const alTableBasedWizardPage_1 = require("./alTableBasedWizardPage");
const alXmlPortSyntaxBuilder_1 = require("../syntaxbuilders/alXmlPortSyntaxBuilder");
class ALXmlPortWizardPage extends alTableBasedWizardPage_1.ALTableBasedWizardPage {
    _xmlPortWizardData;
    constructor(toolsExtensionContext, settings, data) {
        super(toolsExtensionContext, "AL XmlPort Wizard", settings, data);
        this._xmlPortWizardData = data;
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'alxmlportwizard', 'alxmlportwizard.html');
    }
    getViewType() {
        return "azALDevTools.ALXmlPortWizard";
    }
    async finishWizard(data) {
        //build parameters
        this._xmlPortWizardData.objectId = data.objectId;
        this._xmlPortWizardData.objectName = data.objectName;
        this._xmlPortWizardData.selectedTable = data.selectedTable;
        this._xmlPortWizardData.fieldNodeType = data.fieldNodeType;
        this._xmlPortWizardData.selectedFieldList = [];
        if (data.fields) {
            for (var i = 0; i < data.fields.length; i++) {
                this._xmlPortWizardData.selectedFieldList.push(data.fields[i]);
            }
        }
        await this.finishObjectIdReservation(this._xmlPortWizardData);
        //get namespaces information
        let referencedObjects = [];
        if (this._xmlPortWizardData.selectedTable) {
            referencedObjects.push({
                nameWithNamespaceOrId: this._xmlPortWizardData.selectedTable,
                typeName: 'Table'
            });
        }
        let fileNamespaces = await this.getNamespacesInformation('XmlPort', referencedObjects);
        if (fileNamespaces) {
            this._xmlPortWizardData.objectNamespace = fileNamespaces.namespaceName;
            this._xmlPortWizardData.objectUsings = fileNamespaces.usings;
        }
        //load project settings from the language server
        this._xmlPortWizardData.projectSettings = await this.getProjectSettings();
        //build new object
        var builder = new alXmlPortSyntaxBuilder_1.ALXmlPortSyntaxBuilder();
        var source = builder.buildFromXmlPortWizardData(this._settings.getDestDirectoryUri(), this._xmlPortWizardData);
        this.createObjectFile('XmlPort', this._xmlPortWizardData.objectId, this._xmlPortWizardData.objectName, source);
        return true;
    }
}
exports.ALXmlPortWizardPage = ALXmlPortWizardPage;
//# sourceMappingURL=alXmlPortWizardPage.js.map