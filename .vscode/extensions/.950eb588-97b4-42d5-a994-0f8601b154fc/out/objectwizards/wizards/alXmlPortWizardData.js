'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALXmlPortWizardData = void 0;
const alTableBasedWizardData_1 = require("./alTableBasedWizardData");
class ALXmlPortWizardData extends alTableBasedWizardData_1.ALTableBasedWizardData {
    fieldNodeType;
    createRequestPage;
    constructor() {
        super();
        this.fieldNodeType = "element";
        this.createRequestPage = true;
    }
}
exports.ALXmlPortWizardData = ALXmlPortWizardData;
//# sourceMappingURL=alXmlPortWizardData.js.map