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
exports.ALPageWizard = void 0;
const vscode = __importStar(require("vscode"));
const alObjectWizard_1 = require("./alObjectWizard");
const alPageWizardData_1 = require("./alPageWizardData");
const alPageWizardPage_1 = require("./alPageWizardPage");
const stringHelper_1 = require("../../tools/stringHelper");
const alFieldToolTipsLocation_1 = require("../../allanguage/alFieldToolTipsLocation");
class ALPageWizard extends alObjectWizard_1.ALObjectWizard {
    constructor(toolsExtensionContext, newLabel, newDescription, newDetails) {
        super(toolsExtensionContext, newLabel, newDescription, newDetails);
    }
    run(settings) {
        super.run(settings);
        this.runAsync(settings);
    }
    async runAsync(settings) {
        let uri = settings.getDestDirectoryUri();
        let fieldToolTipsLocation = this._toolsExtensionContext.alLangProxy.fieldToolTipsLocation(uri);
        let config = vscode.workspace.getConfiguration('alOutline', uri);
        let wizardData = new alPageWizardData_1.ALPageWizardData();
        await this.initObjectIdFieldsAsync(wizardData, settings, "Page");
        wizardData.objectName = ''; //settings.getInputNameVariable();
        wizardData.showCreateTooltips = (fieldToolTipsLocation === alFieldToolTipsLocation_1.ALFieldToolTipsLocation.page);
        wizardData.createTooltips = (wizardData.showCreateTooltips) && (!!config.get('addToolTipsToPageFields'));
        wizardData.reuseToolTips = !config.get('doNotReuseToolTipsFromOtherPages');
        wizardData.toolTipsSource = config.get('reuseToolTipsFromDependencies');
        wizardData.applicationArea = stringHelper_1.StringHelper.defaultIfEmpty(config.get('defaultAppArea'), wizardData.applicationArea);
        wizardData.apiPublisher = stringHelper_1.StringHelper.defaultIfEmpty(config.get('defaultApiPublisher'), wizardData.apiPublisher);
        wizardData.apiGroup = stringHelper_1.StringHelper.defaultIfEmpty(config.get('defaultApiGroup'), wizardData.apiGroup);
        wizardData.apiVersion = stringHelper_1.StringHelper.defaultIfEmpty(config.get('defaultApiVersion'), wizardData.apiVersion);
        this.onInitWizardData(wizardData);
        let wizardPage = new alPageWizardPage_1.ALPageWizardPage(this._toolsExtensionContext, settings, wizardData);
        wizardPage.show();
    }
}
exports.ALPageWizard = ALPageWizard;
//# sourceMappingURL=alPageWizard.js.map