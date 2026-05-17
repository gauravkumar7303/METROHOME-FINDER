"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneStatementPerLineModifier = void 0;
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
class OneStatementPerLineModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    constructor(context) {
        super(context, "One statement per line", "oneStatementPerLine");
    }
}
exports.OneStatementPerLineModifier = OneStatementPerLineModifier;
//# sourceMappingURL=oneStatementPerLineModifier.js.map