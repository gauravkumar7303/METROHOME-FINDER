'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALXmlPortWizard = void 0;
const alObjectWizard_1 = require("./alObjectWizard");
const alXmlPortWizardData_1 = require("./alXmlPortWizardData");
const alXmlPortWizardPage_1 = require("./alXmlPortWizardPage");
class ALXmlPortWizard extends alObjectWizard_1.ALObjectWizard {
    constructor(toolsExtensionContext, newLabel, newDescription, newDetails) {
        super(toolsExtensionContext, newLabel, newDescription, newDetails);
    }
    run(settings) {
        super.run(settings);
        this.runAsync(settings);
    }
    async runAsync(settings) {
        let wizardData = new alXmlPortWizardData_1.ALXmlPortWizardData();
        await this.initObjectIdFieldsAsync(wizardData, settings, "XmlPort");
        wizardData.objectName = '';
        this.onInitWizardData(wizardData);
        let wizardPage = new alXmlPortWizardPage_1.ALXmlPortWizardPage(this._toolsExtensionContext, settings, wizardData);
        wizardPage.show();
    }
}
exports.ALXmlPortWizard = ALXmlPortWizard;
//# sourceMappingURL=alXmlPortWizard.js.map