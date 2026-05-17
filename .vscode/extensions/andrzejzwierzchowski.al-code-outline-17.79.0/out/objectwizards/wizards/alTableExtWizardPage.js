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
exports.ALTableExtWizardPage = void 0;
const path = __importStar(require("path"));
const alTableExtSyntaxBuilder_1 = require("../syntaxbuilders/alTableExtSyntaxBuilder");
const alTableBasedWizardPage_1 = require("./alTableBasedWizardPage");
const wizardTableFieldHelper_1 = require("./wizardTableFieldHelper");
class ALTableExtWizardPage extends alTableBasedWizardPage_1.ALTableBasedWizardPage {
    _tableExtWizardData;
    constructor(toolsExtensionContext, settings, data) {
        super(toolsExtensionContext, "AL Table Extension Wizard", settings, data);
        this._tableExtWizardData = data;
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'altableextwizard', 'altableextwizard.html');
    }
    getViewType() {
        return "azALDevTools.ALTableExtWizard";
    }
    async finishWizard(data) {
        //build parameters
        this._tableExtWizardData.objectId = data.objectId;
        this._tableExtWizardData.objectName = data.objectName;
        this._tableExtWizardData.fields = wizardTableFieldHelper_1.WizardTableFieldHelper.validateFields(data.fields);
        this._tableExtWizardData.selectedTable = data.selectedTable;
        await this.finishObjectIdReservation(this._tableExtWizardData);
        //get namespaces information
        let referencedObjects = [];
        if (this._tableExtWizardData.selectedTable) {
            referencedObjects.push({
                nameWithNamespaceOrId: this._tableExtWizardData.selectedTable,
                typeName: 'Table'
            });
        }
        let fileNamespaces = await this.getNamespacesInformation('TableExtension', referencedObjects);
        if (fileNamespaces) {
            this._tableExtWizardData.objectNamespace = fileNamespaces.namespaceName;
            this._tableExtWizardData.objectUsings = fileNamespaces.usings;
        }
        //build new object
        var builder = new alTableExtSyntaxBuilder_1.ALTableExtSyntaxBuilder();
        var source = builder.buildFromTableExtWizardData(this._settings.getDestDirectoryUri(), this._tableExtWizardData);
        this.createObjectExtensionFile('TableExtension', this._tableExtWizardData.objectId, this._tableExtWizardData.objectName, this._tableExtWizardData.selectedTable, source);
        return true;
    }
    processWebViewMessage(message) {
        if (super.processWebViewMessage(message)) {
            return true;
        }
        switch (message.command) {
            case 'loadTypes':
                this.loadTypes();
                return true;
        }
        return false;
    }
    async loadTypes() {
        let types = await wizardTableFieldHelper_1.WizardTableFieldHelper.getAllFieldTypes(this._toolsExtensionContext, this._settings.getDestDirectoryUri());
        // update types
        if (types.length > 0) {
            this.sendMessage({
                command: 'setTypes',
                data: types
            });
        }
    }
}
exports.ALTableExtWizardPage = ALTableExtWizardPage;
//# sourceMappingURL=alTableExtWizardPage.js.map