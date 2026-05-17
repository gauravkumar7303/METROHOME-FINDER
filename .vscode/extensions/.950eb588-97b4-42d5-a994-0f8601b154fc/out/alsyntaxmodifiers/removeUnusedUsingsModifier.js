"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveUnusedUsingsModifier = void 0;
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
class RemoveUnusedUsingsModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    constructor(context) {
        super(context, "Remove unused usings", "updateUsingsList");
    }
    getParameters(uri) {
        let parameters = super.getParameters(uri);
        parameters.removeUnusedUsings = true;
        parameters.addMissingUsings = false;
        return parameters;
    }
}
exports.RemoveUnusedUsingsModifier = RemoveUnusedUsingsModifier;
//# sourceMappingURL=removeUnusedUsingsModifier.js.map