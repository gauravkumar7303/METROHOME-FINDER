"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveBeginEndModifier = void 0;
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
class RemoveBeginEndModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    constructor(context) {
        super(context, "Remove begin..end around single statements", "removeBeginEnd");
    }
}
exports.RemoveBeginEndModifier = RemoveBeginEndModifier;
//# sourceMappingURL=removeBeginEndModifier.js.map