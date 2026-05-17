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
exports.ALQueryWizardPage = void 0;
const path = __importStar(require("path"));
const alTableBasedWizardPage_1 = require("./alTableBasedWizardPage");
const alQuerySyntaxBuilder_1 = require("../syntaxbuilders/alQuerySyntaxBuilder");
class ALQueryWizardPage extends alTableBasedWizardPage_1.ALTableBasedWizardPage {
    _queryWizardData;
    constructor(toolsExtensionContext, settings, data) {
        super(toolsExtensionContext, "AL Query Wizard", settings, data);
        this._queryWizardData = data;
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'alquerywizard', 'alquerywizard.html');
    }
    getViewType() {
        return "azALDevTools.ALQueryWizard";
    }
    async finishWizard(data) {
        //build parameters
        this._queryWizardData.objectId = data.objectId;
        this._queryWizardData.objectName = data.objectName;
        this._queryWizardData.selectedTable = data.selectedTable;
        this._queryWizardData.queryType = data.queryType;
        this._queryWizardData.apiPublisher = data.apiPublisher;
        this._queryWizardData.apiGroup = data.apiGroup;
        this._queryWizardData.apiVersion = data.apiVersion;
        this._queryWizardData.entityName = data.entityName;
        this._queryWizardData.entitySetName = data.entitySetName;
        this._queryWizardData.selectedFieldList = [];
        if (data.fields) {
            for (var i = 0; i < data.fields.length; i++) {
                this._queryWizardData.selectedFieldList.push(data.fields[i]);
            }
        }
        await this.finishObjectIdReservation(this._queryWizardData);
        //get namespaces information
        let referencedObjects = [];
        if (this._queryWizardData.selectedTable) {
            referencedObjects.push({
                nameWithNamespaceOrId: this._queryWizardData.selectedTable,
                typeName: 'Table'
            });
        }
        let fileNamespaces = await this.getNamespacesInformation('Query', referencedObjects);
        if (fileNamespaces) {
            this._queryWizardData.objectNamespace = fileNamespaces.namespaceName;
            this._queryWizardData.objectUsings = fileNamespaces.usings;
        }
        //load project settings from the language server
        this._queryWizardData.projectSettings = await this.getProjectSettings();
        //build new object
        var builder = new alQuerySyntaxBuilder_1.ALQuerySyntaxBuilder();
        var source = builder.buildFromQueryWizardData(this._settings.getDestDirectoryUri(), this._queryWizardData);
        this.createObjectFile('Query', this._queryWizardData.objectId, this._queryWizardData.objectName, source);
        return true;
    }
}
exports.ALQueryWizardPage = ALQueryWizardPage;
//# sourceMappingURL=alQueryWizardPage.js.map