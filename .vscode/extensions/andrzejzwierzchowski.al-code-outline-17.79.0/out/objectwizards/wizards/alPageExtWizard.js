"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALPageExtWizard = void 0;
const alObjectWizard_1 = require("./alObjectWizard");
const alPageExtWizardPage_1 = require("./alPageExtWizardPage");
const alPageExtWizardData_1 = require("./alPageExtWizardData");
class ALPageExtWizard extends alObjectWizard_1.ALObjectWizard {
    constructor(toolsExtensionContext, newLabel, newDescription, newDetails) {
        super(toolsExtensionContext, newLabel, newDescription, newDetails);
    }
    run(settings) {
        super.run(settings);
        this.runAsync(settings);
    }
    async runAsync(settings) {
        let wizardData = new alPageExtWizardData_1.ALPageExtWizardData();
        await this.initObjectIdFieldsAsync(wizardData, settings, "pageextension");
        wizardData.objectName = '';
        wizardData.basePage = '';
        this.onInitWizardData(wizardData);
        let wizardPage = new alPageExtWizardPage_1.ALPageExtWizardPage(this._toolsExtensionContext, settings, wizardData);
        wizardPage.show();
    }
}
exports.ALPageExtWizard = ALPageExtWizard;
//# sourceMappingURL=alPageExtWizard.js.map