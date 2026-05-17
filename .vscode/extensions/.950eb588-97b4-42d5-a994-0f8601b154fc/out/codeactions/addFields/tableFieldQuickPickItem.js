"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFieldQuickPickItem = void 0;
const tableFieldInformationHelper_1 = require("../../symbolsinformation/tableFieldInformationHelper");
class TableFieldQuickPickItem {
    fieldId;
    fieldInformation;
    label;
    description;
    detail;
    picked;
    alwaysShow;
    constructor(newFieldInformation) {
        this.fieldInformation = newFieldInformation;
        if (newFieldInformation.id)
            this.fieldId = newFieldInformation.id;
        else
            this.fieldId = 0;
        if (newFieldInformation.name)
            this.label = newFieldInformation.name;
        else
            this.label = '';
        this.description = tableFieldInformationHelper_1.TableFieldInformationHelper.getFieldUIDesc(newFieldInformation);
    }
}
exports.TableFieldQuickPickItem = TableFieldQuickPickItem;
//# sourceMappingURL=tableFieldQuickPickItem.js.map