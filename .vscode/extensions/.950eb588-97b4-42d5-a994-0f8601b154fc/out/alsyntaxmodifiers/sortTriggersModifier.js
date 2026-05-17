"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortTriggersModifier = void 0;
const sortProceduresOrTriggersModifier_1 = require("./sortProceduresOrTriggersModifier");
class SortTriggersModifier extends sortProceduresOrTriggersModifier_1.SortProceduresOrTriggersModifier {
    constructor(context) {
        super(context, "Sort Triggers", "sortTriggers");
    }
}
exports.SortTriggersModifier = SortTriggersModifier;
//# sourceMappingURL=sortTriggersModifier.js.map