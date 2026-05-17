"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveEmptyLinesModifier = void 0;
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
class RemoveEmptyLinesModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    constructor(context) {
        super(context, "Remove Empty Lines", "removeEmptyLines");
    }
}
exports.RemoveEmptyLinesModifier = RemoveEmptyLinesModifier;
//# sourceMappingURL=removeEmptyLinesModifier.js.map