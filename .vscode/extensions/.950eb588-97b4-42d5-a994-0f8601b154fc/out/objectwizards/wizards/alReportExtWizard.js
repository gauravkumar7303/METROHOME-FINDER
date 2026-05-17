"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALReportExtWizard = void 0;
const alObjectWizard_1 = require("./alObjectWizard");
const alReportExtWizardPage_1 = require("./alReportExtWizardPage");
const alReportExtWizardData_1 = require("./alReportExtWizardData");
class ALReportExtWizard extends alObjectWizard_1.ALObjectWizard {
    constructor(toolsExtensionContext, newLabel, newDescription, newDetails) {
        super(toolsExtensionContext, newLabel, newDescription, newDetails);
    }
    run(settings) {
        super.run(settings);
        this.runAsync(settings);
    }
    async runAsync(settings) {
        let wizardData = new alReportExtWizardData_1.ALReportExtWizardData();
        await this.initObjectIdFieldsAsync(wizardData, settings, "reportextension");
        wizardData.objectName = '';
        wizardData.baseReport = '';
        this.onInitWizardData(wizardData);
        let wizardPage = new alReportExtWizardPage_1.ALReportExtWizardPage(this._toolsExtensionContext, settings, wizardData);
        wizardPage.show();
    }
}
exports.ALReportExtWizard = ALReportExtWizard;
//# sourceMappingURL=alReportExtWizard.js.map