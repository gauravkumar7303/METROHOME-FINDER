"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALEnumWizardData = void 0;
const alObjectWizardData_1 = require("./alObjectWizardData");
class ALEnumWizardData extends alObjectWizardData_1.ALObjectWizardData {
    objectName;
    valueList;
    captionList;
    extensible;
    limitNameLength;
    constructor() {
        super();
        this.objectName = "";
        this.valueList = "";
        this.captionList = "";
        this.extensible = true;
        this.limitNameLength = false;
    }
}
exports.ALEnumWizardData = ALEnumWizardData;
//# sourceMappingURL=alEnumWizardData.js.map