'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALTableExtWizard = void 0;
const alObjectWizard_1 = require("./alObjectWizard");
const alTableExtWizardData_1 = require("./alTableExtWizardData");
const alTableExtWizardPage_1 = require("./alTableExtWizardPage");
class ALTableExtWizard extends alObjectWizard_1.ALObjectWizard {
    constructor(toolsExtensionContext, newLabel, newDescription, newDetails) {
        super(toolsExtensionContext, newLabel, newDescription, newDetails);
    }
    run(settings) {
        super.run(settings);
        this.runAsync(settings);
    }
    async runAsync(settings) {
        let wizardData = new alTableExtWizardData_1.ALTableExtWizardData();
        await this.initObjectIdFieldsAsync(wizardData, settings, "tableextension");
        wizardData.objectName = "";
        wizardData.selectedTable = "";
        wizardData.idRangeStart =
            this._toolsExtensionContext.alLangProxy.getIdRangeStart(settings.getDestDirectoryUri());
        this.onInitWizardData(wizardData);
        let wizardPage = new alTableExtWizardPage_1.ALTableExtWizardPage(this._toolsExtensionContext, settings, wizardData);
        wizardPage.show();
    }
}
exports.ALTableExtWizard = ALTableExtWizard;
//# sourceMappingURL=alTableExtWizard.js.map