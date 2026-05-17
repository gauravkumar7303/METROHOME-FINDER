"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMissingParenthesesModifier = void 0;
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
class AddMissingParenthesesModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    constructor(context) {
        super(context, "Add Parentheses", "addParentheses");
    }
}
exports.AddMissingParenthesesModifier = AddMissingParenthesesModifier;
//# sourceMappingURL=addMissingParenthesesModifier.js.map