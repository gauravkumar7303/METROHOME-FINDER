"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatDocumentModifier = void 0;
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
class FormatDocumentModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    constructor(context) {
        super(context, "Format Document", "formatDocument");
    }
}
exports.FormatDocumentModifier = FormatDocumentModifier;
//# sourceMappingURL=formatDocumentModifier.js.map