"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALEnumExtWizard = void 0;
const alObjectWizard_1 = require("./alObjectWizard");
const alEnumExtWizardData_1 = require("./alEnumExtWizardData");
const alEnumExtWizardPage_1 = require("./alEnumExtWizardPage");
class ALEnumExtWizard extends alObjectWizard_1.ALObjectWizard {
    constructor(toolsExtensionContext, newLabel, newDescription, newDetails) {
        super(toolsExtensionContext, newLabel, newDescription, newDetails);
    }
    run(settings) {
        super.run(settings);
        this.runAsync(settings);
    }
    async runAsync(settings) {
        let wizardData = new alEnumExtWizardData_1.ALEnumExtWizardData();
        await this.initObjectIdFieldsAsync(wizardData, settings, "enumextension");
        wizardData.objectName = '';
        wizardData.firstValueId = this._toolsExtensionContext.alLangProxy.getIdRangeStart(settings.getDestDirectoryUri());
        this.onInitWizardData(wizardData);
        let wizardPage = new alEnumExtWizardPage_1.ALEnumExtWizardPage(this._toolsExtensionContext, settings, wizardData);
        wizardPage.show();
    }
}
exports.ALEnumExtWizard = ALEnumExtWizard;
//# sourceMappingURL=alEnumExtWizard.js.map