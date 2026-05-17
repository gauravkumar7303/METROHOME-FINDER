"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALPermissionSetWizardData = void 0;
const alObjectWizardData_1 = require("./alObjectWizardData");
class ALPermissionSetWizardData extends alObjectWizardData_1.ALObjectWizardData {
    objectName;
    objectCaption;
    inclAllObjects;
    projectSettings;
    permissionSetList;
    selectedPermissionSetList;
    selectedObjectsList;
    constructor() {
        super();
        this.objectName = '';
        this.objectCaption = '';
        this.inclAllObjects = true;
        this.projectSettings = undefined;
        this.permissionSetList = undefined;
        this.selectedPermissionSetList = undefined;
        this.selectedObjectsList = undefined;
    }
}
exports.ALPermissionSetWizardData = ALPermissionSetWizardData;
//# sourceMappingURL=alPermissionSetWizardData.js.map