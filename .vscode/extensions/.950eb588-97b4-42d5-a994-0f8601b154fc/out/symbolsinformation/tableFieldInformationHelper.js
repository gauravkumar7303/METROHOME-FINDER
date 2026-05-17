"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFieldInformationHelper = void 0;
const tableFieldClass_1 = require("./tableFieldClass");
class TableFieldInformationHelper {
    static getFieldUIDesc(field) {
        let value = "(";
        if (field.dataType)
            value = value + field.dataType + ", ";
        value = value + TableFieldInformationHelper.getFieldClassName(field) + ")";
        return value;
    }
    static getFieldClassName(field) {
        switch (field.fieldClass) {
            case tableFieldClass_1.TableFieldClass.FlowField: return "FlowField";
            case tableFieldClass_1.TableFieldClass.FlowFilter: return "FlowFilter";
            default: return "Normal";
        }
    }
}
exports.TableFieldInformationHelper = TableFieldInformationHelper;
//# sourceMappingURL=tableFieldInformationHelper.js.map