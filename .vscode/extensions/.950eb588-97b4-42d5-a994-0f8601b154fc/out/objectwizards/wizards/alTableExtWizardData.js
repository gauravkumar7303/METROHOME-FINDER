'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALTableExtWizardData = void 0;
//import * as vscode from 'vscode';
const alTableBasedWizardData_1 = require("./alTableBasedWizardData");
class ALTableExtWizardData extends alTableBasedWizardData_1.ALTableBasedWizardData {
    fields;
    idRangeStart;
    constructor() {
        super();
        this.fields = [];
        this.idRangeStart = 0;
    }
}
exports.ALTableExtWizardData = ALTableExtWizardData;
//# sourceMappingURL=alTableExtWizardData.js.map