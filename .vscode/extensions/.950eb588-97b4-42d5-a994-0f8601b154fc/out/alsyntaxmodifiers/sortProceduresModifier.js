"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortProceduresModifier = void 0;
const sortProceduresOrTriggersModifier_1 = require("./sortProceduresOrTriggersModifier");
class SortProceduresModifier extends sortProceduresOrTriggersModifier_1.SortProceduresOrTriggersModifier {
    constructor(context) {
        super(context, "Sort Procedures", "sortProcedures");
    }
}
exports.SortProceduresModifier = SortProceduresModifier;
//# sourceMappingURL=sortProceduresModifier.js.map