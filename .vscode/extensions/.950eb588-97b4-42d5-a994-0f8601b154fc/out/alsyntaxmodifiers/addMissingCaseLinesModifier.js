"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMissingCaseLinesModifier = void 0;
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
class AddMissingCaseLinesModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    constructor(context) {
        super(context, "Add Missing Case Lines", "addMissingCaseLines");
    }
}
exports.AddMissingCaseLinesModifier = AddMissingCaseLinesModifier;
//# sourceMappingURL=addMissingCaseLinesModifier.js.map