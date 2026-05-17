"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALEnumExtWizardData = void 0;
const alEnumWizardData_1 = require("./alEnumWizardData");
'use strict';
class ALEnumExtWizardData extends alEnumWizardData_1.ALEnumWizardData {
    firstValueId;
    baseEnum;
    baseEnumList;
    constructor() {
        super();
        this.firstValueId = 0;
        this.baseEnum = "";
        this.baseEnumList = [];
    }
}
exports.ALEnumExtWizardData = ALEnumExtWizardData;
//# sourceMappingURL=alEnumExtWizardData.js.map