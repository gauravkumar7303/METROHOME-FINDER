'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALReportWizard = void 0;
const alObjectWizard_1 = require("./alObjectWizard");
const alReportWizardData_1 = require("./alReportWizardData");
const alReportWizardPage_1 = require("./alReportWizardPage");
class ALReportWizard extends alObjectWizard_1.ALObjectWizard {
    constructor(toolsExtensionContext, newLabel, newDescription, newDetails) {
        super(toolsExtensionContext, newLabel, newDescription, newDetails);
    }
    run(settings) {
        super.run(settings);
        this.runAsync(settings);
    }
    async runAsync(settings) {
        let wizardData = new alReportWizardData_1.ALReportWizardData();
        await this.initObjectIdFieldsAsync(wizardData, settings, "Report");
        wizardData.objectName = '';
        //build relative path
        wizardData.rdlcLayout = '';
        this.onInitWizardData(wizardData);
        let wizardPage = new alReportWizardPage_1.ALReportWizardPage(this._toolsExtensionContext, settings, wizardData);
        wizardPage.show();
    }
}
exports.ALReportWizard = ALReportWizard;
//# sourceMappingURL=alReportWizard.js.map