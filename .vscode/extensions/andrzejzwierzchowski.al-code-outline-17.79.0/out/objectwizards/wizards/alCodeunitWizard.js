"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALCodeunitWizard = void 0;
const alObjectWizard_1 = require("./alObjectWizard");
const alCodeunitWizardData_1 = require("./alCodeunitWizardData");
const alCodeunitWizardPage_1 = require("./alCodeunitWizardPage");
class ALCodeunitWizard extends alObjectWizard_1.ALObjectWizard {
    constructor(toolsExtensionContext, newLabel, newDescription, newDetails) {
        super(toolsExtensionContext, newLabel, newDescription, newDetails);
    }
    run(settings) {
        super.run(settings);
        this.runAsync(settings);
    }
    async runAsync(settings) {
        let wizardData = new alCodeunitWizardData_1.ALCodeunitWizardData();
        await this.initObjectIdFieldsAsync(wizardData, settings, "Codeunit");
        wizardData.objectName = ''; //settings.getInputNameVariable();
        this.onInitWizardData(wizardData);
        let wizardPage = new alCodeunitWizardPage_1.ALCodeunitWizardPage(this._toolsExtensionContext, settings, wizardData);
        wizardPage.show();
    }
}
exports.ALCodeunitWizard = ALCodeunitWizard;
//# sourceMappingURL=alCodeunitWizard.js.map