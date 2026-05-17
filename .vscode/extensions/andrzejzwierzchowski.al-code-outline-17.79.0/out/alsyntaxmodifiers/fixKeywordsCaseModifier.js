"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixKeywordsCaseModifier = void 0;
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
class FixKeywordsCaseModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    constructor(context) {
        super(context, "Fix Keywords Case", "fixKeywordsCase");
    }
}
exports.FixKeywordsCaseModifier = FixKeywordsCaseModifier;
//# sourceMappingURL=fixKeywordsCaseModifier.js.map