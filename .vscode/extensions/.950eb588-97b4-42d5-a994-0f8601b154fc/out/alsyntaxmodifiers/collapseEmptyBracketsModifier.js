"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollapseEmptyBracketsModifier = void 0;
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
class CollapseEmptyBracketsModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    constructor(context) {
        super(context, "Collapse Empty Brackets", "collapseEmptyBrackets");
    }
}
exports.CollapseEmptyBracketsModifier = CollapseEmptyBracketsModifier;
//# sourceMappingURL=collapseEmptyBracketsModifier.js.map