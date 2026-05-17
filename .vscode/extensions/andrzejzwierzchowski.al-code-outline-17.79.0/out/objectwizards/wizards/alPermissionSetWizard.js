"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALPermissionSetWizard = void 0;
const alObjectWizard_1 = require("./alObjectWizard");
const alPermissionSetWizardData_1 = require("./alPermissionSetWizardData");
const alPermissionSetWizardPage_1 = require("./alPermissionSetWizardPage");
class ALPermissionSetWizard extends alObjectWizard_1.ALObjectWizard {
    constructor(toolsExtensionContext, newLabel, newDescription, newDetails) {
        super(toolsExtensionContext, newLabel, newDescription, newDetails);
    }
    run(settings) {
        super.run(settings);
        this.runAsync(settings);
    }
    async runAsync(settings) {
        let wizardData = new alPermissionSetWizardData_1.ALPermissionSetWizardData();
        await this.initObjectIdFieldsAsync(wizardData, settings, "permissionset");
        wizardData.objectName = '';
        this.onInitWizardData(wizardData);
        let wizardPage = new alPermissionSetWizardPage_1.ALPermissionSetWizardPage(this._toolsExtensionContext, undefined, settings, wizardData);
        wizardPage.show();
    }
}
exports.ALPermissionSetWizard = ALPermissionSetWizard;
//# sourceMappingURL=alPermissionSetWizard.js.map