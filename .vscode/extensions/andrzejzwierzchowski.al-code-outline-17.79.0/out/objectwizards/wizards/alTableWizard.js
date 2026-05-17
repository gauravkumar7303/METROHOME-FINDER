'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALTableWizard = void 0;
const alObjectWizard_1 = require("./alObjectWizard");
const alTableWizardData_1 = require("./alTableWizardData");
const alTableWizardPage_1 = require("./alTableWizardPage");
class ALTableWizard extends alObjectWizard_1.ALObjectWizard {
    constructor(toolsExtensionContext, newLabel, newDescription, newDetails) {
        super(toolsExtensionContext, newLabel, newDescription, newDetails);
    }
    run(settings) {
        super.run(settings);
        this.runAsync(settings);
    }
    async runAsync(settings) {
        let wizardData = new alTableWizardData_1.ALTableWizardData();
        await this.initObjectIdFieldsAsync(wizardData, settings, "table");
        wizardData.objectName = '';
        this.onInitWizardData(wizardData);
        let wizardPage = new alTableWizardPage_1.ALTableWizardPage(this._toolsExtensionContext, settings, wizardData);
        wizardPage.show();
    }
}
exports.ALTableWizard = ALTableWizard;
//# sourceMappingURL=alTableWizard.js.map