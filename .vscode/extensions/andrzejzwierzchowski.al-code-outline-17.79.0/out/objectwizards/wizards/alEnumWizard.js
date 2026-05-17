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
exports.ALEnumWizard = void 0;
const vscode = __importStar(require("vscode"));
const alObjectWizard_1 = require("./alObjectWizard");
const alEnumWizardData_1 = require("./alEnumWizardData");
const alEnumWizardPage_1 = require("./alEnumWizardPage");
class ALEnumWizard extends alObjectWizard_1.ALObjectWizard {
    constructor(toolsExtensionContext, newLabel, newDescription, newDetails) {
        super(toolsExtensionContext, newLabel, newDescription, newDetails);
    }
    run(settings) {
        super.run(settings);
        this.runAsync(settings);
    }
    async runAsync(settings) {
        let uri = settings.getDestDirectoryUri();
        let vscodeSettings = vscode.workspace.getConfiguration('alOutline', uri);
        let wizardData = new alEnumWizardData_1.ALEnumWizardData();
        wizardData.limitNameLength = !!vscodeSettings.get('limitEnumNameLength');
        await this.initObjectIdFieldsAsync(wizardData, settings, "enum");
        wizardData.objectName = '';
        this.onInitWizardData(wizardData);
        let wizardPage = new alEnumWizardPage_1.ALEnumWizardPage(this._toolsExtensionContext, settings, wizardData);
        wizardPage.show();
    }
}
exports.ALEnumWizard = ALEnumWizard;
//# sourceMappingURL=alEnumWizard.js.map