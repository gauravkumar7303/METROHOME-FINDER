"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFieldNameConversion = void 0;
class ApiFieldNameConversion {
    searchRegExp;
    newValue;
    constructor(searchString, newValueString) {
        this.searchRegExp = new RegExp(searchString);
        this.newValue = newValueString;
    }
}
exports.ApiFieldNameConversion = ApiFieldNameConversion;
//# sourceMappingURL=apiFieldNameConversion.js.map