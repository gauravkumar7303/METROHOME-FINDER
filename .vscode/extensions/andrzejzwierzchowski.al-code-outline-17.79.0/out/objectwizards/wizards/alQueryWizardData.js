'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALQueryWizardData = void 0;
const alTableBasedWizardData_1 = require("./alTableBasedWizardData");
class ALQueryWizardData extends alTableBasedWizardData_1.ALTableBasedWizardData {
    createRequestPage;
    queryType;
    apiPublisher;
    apiGroup;
    apiVersion;
    entityName;
    entitySetName;
    constructor() {
        super();
        this.createRequestPage = false;
        this.queryType = "Normal";
        this.apiPublisher = "publisherName";
        this.apiGroup = "apiGroup";
        this.apiVersion = "v1.0";
        this.entityName = "entityName";
        this.entitySetName = "entitySetName";
    }
}
exports.ALQueryWizardData = ALQueryWizardData;
//# sourceMappingURL=alQueryWizardData.js.map