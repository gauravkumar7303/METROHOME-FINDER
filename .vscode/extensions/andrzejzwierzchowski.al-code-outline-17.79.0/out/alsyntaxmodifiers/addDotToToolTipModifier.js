"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDotToToolTipModifier = void 0;
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
class AddDotToToolTipModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    constructor(context) {
        super(context, "Add Missing Dot to ToolTips", "addTooTipsEndingDots");
    }
}
exports.AddDotToToolTipModifier = AddDotToToolTipModifier;
//# sourceMappingURL=addDotToToolTipModifier.js.map