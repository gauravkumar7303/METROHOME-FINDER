"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeFlowFieldsReadOnlyModifier = void 0;
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
class MakeFlowFieldsReadOnlyModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    constructor(context) {
        super(context, "Make FlowFields Read-Only", "makeFlowFieldsReadOnly");
    }
}
exports.MakeFlowFieldsReadOnlyModifier = MakeFlowFieldsReadOnlyModifier;
//# sourceMappingURL=makeFlowFieldsReadOnlyModifier.js.map