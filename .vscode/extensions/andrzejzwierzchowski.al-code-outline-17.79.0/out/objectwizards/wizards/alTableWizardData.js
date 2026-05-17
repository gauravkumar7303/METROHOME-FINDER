"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALTableWizardData = void 0;
const alObjectWizardData_1 = require("./alObjectWizardData");
class ALTableWizardData extends alObjectWizardData_1.ALObjectWizardData {
    objectName;
    dataPerCompany;
    fields;
    dataClassification;
    projectSettings;
    constructor() {
        super();
        this.objectName = '';
        this.dataClassification = "ToBeClassified";
        this.dataPerCompany = true;
        this.fields = [];
        this.projectSettings = undefined;
    }
}
exports.ALTableWizardData = ALTableWizardData;
//# sourceMappingURL=alTableWizardData.js.map