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
exports.ALReportWizardPage = void 0;
const path = __importStar(require("path"));
const alTableBasedWizardPage_1 = require("./alTableBasedWizardPage");
const alReportSyntaxBuilder_1 = require("../syntaxbuilders/alReportSyntaxBuilder");
class ALReportWizardPage extends alTableBasedWizardPage_1.ALTableBasedWizardPage {
    _reportWizardData;
    constructor(toolsExtensionContext, settings, data) {
        super(toolsExtensionContext, "AL Report Wizard", settings, data);
        this._reportWizardData = data;
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'alreportwizard', 'alreportwizard.html');
    }
    getViewType() {
        return "azALDevTools.ALReportWizard";
    }
    async finishWizard(data) {
        //build parameters
        this._reportWizardData.objectId = data.objectId;
        this._reportWizardData.objectName = data.objectName;
        this._reportWizardData.selectedTable = data.selectedTable;
        this._reportWizardData.applicationArea = data.applicationArea;
        this._reportWizardData.usageCategory = data.usageCategory;
        this._reportWizardData.selectedFieldList = [];
        if (data.fields) {
            for (var i = 0; i < data.fields.length; i++) {
                this._reportWizardData.selectedFieldList.push(data.fields[i]);
            }
        }
        await this.finishObjectIdReservation(this._reportWizardData);
        //get namespaces information
        let referencedObjects = [];
        if (this._reportWizardData.selectedTable) {
            referencedObjects.push({
                nameWithNamespaceOrId: this._reportWizardData.selectedTable,
                typeName: 'Table'
            });
        }
        let fileNamespaces = await this.getNamespacesInformation('Report', referencedObjects);
        if (fileNamespaces) {
            this._reportWizardData.objectNamespace = fileNamespaces.namespaceName;
            this._reportWizardData.objectUsings = fileNamespaces.usings;
        }
        //load project settings from the language server
        this._reportWizardData.projectSettings = await this.getProjectSettings();
        //build new object
        var builder = new alReportSyntaxBuilder_1.ALReportSyntaxBuilder();
        var source = builder.buildFromReportWizardData(this._settings.getDestDirectoryUri(), this._reportWizardData);
        this.createObjectFile('Report', this._reportWizardData.objectId, this._reportWizardData.objectName, source);
        return true;
    }
}
exports.ALReportWizardPage = ALReportWizardPage;
//# sourceMappingURL=alReportWizardPage.js.map