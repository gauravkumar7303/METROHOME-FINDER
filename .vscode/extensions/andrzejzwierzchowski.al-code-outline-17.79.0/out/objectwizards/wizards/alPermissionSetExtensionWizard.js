"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALPermissionSetExtensionWizard = void 0;
const alObjectWizard_1 = require("./alObjectWizard");
const alPermissionSetExtensionWizardData_1 = require("./alPermissionSetExtensionWizardData");
const alPermissionSetExtensionWizardPage_1 = require("./alPermissionSetExtensionWizardPage");
class ALPermissionSetExtensionWizard extends alObjectWizard_1.ALObjectWizard {
    constructor(toolsExtensionContext, newLabel, newDescription, newDetails) {
        super(toolsExtensionContext, newLabel, newDescription, newDetails);
    }
    run(settings) {
        super.run(settings);
        this.runAsync(settings);
    }
    async runAsync(settings) {
        let wizardData = new alPermissionSetExtensionWizardData_1.ALPermissionSetExtensionWizardData();
        await this.initObjectIdFieldsAsync(wizardData, settings, "permissionsetextension");
        wizardData.objectName = '';
        this.onInitWizardData(wizardData);
        let wizardPage = new alPermissionSetExtensionWizardPage_1.ALPermissionSetExtensionWizardPage(this._toolsExtensionContext, settings, wizardData);
        wizardPage.show();
    }
}
exports.ALPermissionSetExtensionWizard = ALPermissionSetExtensionWizard;
//# sourceMappingURL=alPermissionSetExtensionWizard.js.map