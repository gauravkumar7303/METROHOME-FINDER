"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALPageExtWizardData = void 0;
const alObjectWizardData_1 = require("./alObjectWizardData");
class ALPageExtWizardData extends alObjectWizardData_1.ALObjectWizardData {
    objectName;
    pageList;
    basePage;
    constructor() {
        super();
        this.objectName = '';
        this.pageList = undefined;
        this.basePage = "";
    }
}
exports.ALPageExtWizardData = ALPageExtWizardData;
//# sourceMappingURL=alPageExtWizardData.js.map