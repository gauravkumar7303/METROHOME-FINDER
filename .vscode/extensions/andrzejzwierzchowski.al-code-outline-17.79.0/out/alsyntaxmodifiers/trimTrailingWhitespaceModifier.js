"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrimTrailingWhitespaceModifier = void 0;
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
class TrimTrailingWhitespaceModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    constructor(context) {
        super(context, "Trim Trailing Whitespace", "trimTrailingWhitespace");
    }
}
exports.TrimTrailingWhitespaceModifier = TrimTrailingWhitespaceModifier;
//# sourceMappingURL=trimTrailingWhitespaceModifier.js.map