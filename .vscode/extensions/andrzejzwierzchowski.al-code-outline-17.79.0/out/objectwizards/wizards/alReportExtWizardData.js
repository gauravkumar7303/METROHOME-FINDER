"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALReportExtWizardData = void 0;
const alObjectWizardData_1 = require("./alObjectWizardData");
class ALReportExtWizardData extends alObjectWizardData_1.ALObjectWizardData {
    objectName;
    reportList;
    baseReport;
    dataItems;
    constructor() {
        super();
        this.objectName = '';
        this.reportList = undefined;
        this.baseReport = "";
        this.dataItems = undefined;
    }
}
exports.ALReportExtWizardData = ALReportExtWizardData;
//# sourceMappingURL=alReportExtWizardData.js.map