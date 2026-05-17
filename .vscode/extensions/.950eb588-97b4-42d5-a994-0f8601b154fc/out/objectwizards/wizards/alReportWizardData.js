'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALReportWizardData = void 0;
const alTableBasedWizardData_1 = require("./alTableBasedWizardData");
class ALReportWizardData extends alTableBasedWizardData_1.ALTableBasedWizardData {
    createRequestPage;
    rdlcLayout;
    wordLayout;
    usageCategory;
    constructor() {
        super();
        this.createRequestPage = true;
        this.rdlcLayout = "";
        this.wordLayout = "";
        this.usageCategory = "";
    }
}
exports.ALReportWizardData = ALReportWizardData;
//# sourceMappingURL=alReportWizardData.js.map