'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALTableBasedWizardData = void 0;
const appAreaMode_1 = require("../../alsyntaxmodifiers/appAreaMode");
const alObjectWizardData_1 = require("./alObjectWizardData");
class ALTableBasedWizardData extends alObjectWizardData_1.ALObjectWizardData {
    objectName;
    tableList;
    selectedTable;
    fieldList;
    flowFiltersList;
    selectedFieldList;
    selectedFlowFilterList;
    fixedTable;
    applicationArea;
    applicationAreaMode;
    projectSettings;
    constructor() {
        super();
        this.objectName = "";
        this.tableList = undefined;
        this.selectedTable = "";
        this.fieldList = undefined;
        this.selectedFieldList = undefined;
        this.fixedTable = false;
        this.applicationArea = "All";
        this.applicationAreaMode = appAreaMode_1.AppAreaMode.addToAllControls;
        this.projectSettings = undefined;
    }
}
exports.ALTableBasedWizardData = ALTableBasedWizardData;
//# sourceMappingURL=alTableBasedWizardData.js.map