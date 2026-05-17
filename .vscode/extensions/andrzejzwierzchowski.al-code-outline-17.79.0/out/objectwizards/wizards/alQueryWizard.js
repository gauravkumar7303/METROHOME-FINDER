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
exports.ALQueryWizard = void 0;
const vscode = __importStar(require("vscode"));
const alObjectWizard_1 = require("./alObjectWizard");
const alQueryWizardData_1 = require("./alQueryWizardData");
const alQueryWizardPage_1 = require("./alQueryWizardPage");
const stringHelper_1 = require("../../tools/stringHelper");
class ALQueryWizard extends alObjectWizard_1.ALObjectWizard {
    constructor(toolsExtensionContext, newLabel, newDescription, newDetails) {
        super(toolsExtensionContext, newLabel, newDescription, newDetails);
    }
    run(settings) {
        super.run(settings);
        this.runAsync(settings);
    }
    async runAsync(settings) {
        let config = vscode.workspace.getConfiguration('alOutline', settings.getDestDirectoryUri());
        let wizardData = new alQueryWizardData_1.ALQueryWizardData();
        await this.initObjectIdFieldsAsync(wizardData, settings, "Query");
        wizardData.objectName = '';
        wizardData.apiPublisher = stringHelper_1.StringHelper.defaultIfEmpty(config.get('defaultApiPublisher'), wizardData.apiPublisher);
        wizardData.apiGroup = stringHelper_1.StringHelper.defaultIfEmpty(config.get('defaultApiGroup'), wizardData.apiGroup);
        wizardData.apiVersion = stringHelper_1.StringHelper.defaultIfEmpty(config.get('defaultApiVersion'), wizardData.apiVersion);
        this.onInitWizardData(wizardData);
        let wizardPage = new alQueryWizardPage_1.ALQueryWizardPage(this._toolsExtensionContext, settings, wizardData);
        wizardPage.show();
    }
}
exports.ALQueryWizard = ALQueryWizard;
//# sourceMappingURL=alQueryWizard.js.map