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
exports.ALTableWizardPage = void 0;
const path = __importStar(require("path"));
const projectItemWizardPage_1 = require("./projectItemWizardPage");
const alTableSyntaxBuilder_1 = require("../syntaxbuilders/alTableSyntaxBuilder");
const wizardTableFieldHelper_1 = require("./wizardTableFieldHelper");
class ALTableWizardPage extends projectItemWizardPage_1.ProjectItemWizardPage {
    _tableWizardData;
    constructor(toolsExtensionContext, settings, data) {
        super(toolsExtensionContext, "AL Table Wizard", settings, data);
        this._tableWizardData = data;
    }
    //initialize wizard
    onDocumentLoaded() {
        //send data to the web view
        this.sendMessage({
            command: 'setData',
            data: this._tableWizardData
        });
        //load enums
        this.loadTypes();
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'altablewizard', 'altablewizard.html');
    }
    getViewType() {
        return "azALDevTools.ALTableWizard";
    }
    async finishWizard(data) {
        //build parameters
        this._tableWizardData.objectId = data.objectId;
        this._tableWizardData.objectName = data.objectName;
        this._tableWizardData.dataClassification = data.dataClassification;
        this._tableWizardData.dataPerCompany = !!data.dataPerCompany;
        this._tableWizardData.fields = wizardTableFieldHelper_1.WizardTableFieldHelper.validateFields(data.fields);
        //load project settings from the language server
        this._tableWizardData.projectSettings = await this.getProjectSettings();
        await this.finishObjectIdReservation(this._tableWizardData);
        //build new object
        var builder = new alTableSyntaxBuilder_1.ALTableSyntaxBuilder();
        var source = builder.buildFromTableWizardData(this._settings.getDestDirectoryUri(), this._tableWizardData);
        this.createObjectFile('Table', this._tableWizardData.objectId, this._tableWizardData.objectName, source);
        return true;
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
exports.ALTableWizardPage = ALTableWizardPage;
//# sourceMappingURL=alTableWizardPage.js.map