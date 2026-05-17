"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALInterfaceWizardData = void 0;
const alObjectWizardData_1 = require("./alObjectWizardData");
class ALInterfaceWizardData extends alObjectWizardData_1.ALObjectWizardData {
    objectName;
    baseCodeunitName;
    codeunitList;
    constructor() {
        super();
        this.objectName = '';
        this.baseCodeunitName = '';
        this.codeunitList = undefined;
    }
}
exports.ALInterfaceWizardData = ALInterfaceWizardData;
//# sourceMappingURL=alInterfaceWizardData.js.map