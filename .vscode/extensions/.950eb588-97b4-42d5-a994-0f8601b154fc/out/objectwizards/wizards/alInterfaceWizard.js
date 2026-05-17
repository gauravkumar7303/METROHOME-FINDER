"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALInterfaceWizard = void 0;
const alObjectWizard_1 = require("./alObjectWizard");
const alInterfaceWizardData_1 = require("./alInterfaceWizardData");
const alIterfaceWizardPage_1 = require("./alIterfaceWizardPage");
class ALInterfaceWizard extends alObjectWizard_1.ALObjectWizard {
    constructor(toolsExtensionContext, newLabel, newDescription, newDetails) {
        super(toolsExtensionContext, newLabel, newDescription, newDetails);
    }
    run(settings) {
        super.run(settings);
        this.runAsync(settings);
    }
    async runAsync(settings) {
        let wizardData = new alInterfaceWizardData_1.ALInterfaceWizardData();
        wizardData.objectName = ''; //settings.getInputNameVariable();
        this.onInitWizardData(wizardData);
        let wizardPage = new alIterfaceWizardPage_1.ALInterfaceWizardPage(this._toolsExtensionContext, settings, wizardData);
        wizardPage.show();
    }
}
exports.ALInterfaceWizard = ALInterfaceWizard;
//# sourceMappingURL=alInterfaceWizard.js.map