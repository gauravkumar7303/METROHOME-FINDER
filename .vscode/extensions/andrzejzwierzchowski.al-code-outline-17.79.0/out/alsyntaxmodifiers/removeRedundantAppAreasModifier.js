"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveRedundantAppAreasModifier = void 0;
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
class RemoveRedundantAppAreasModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    constructor(context) {
        super(context, "Remove Redundant App Areas", "removeRedundantAppAreas");
    }
    async runForWorkspaceWithoutUI(workspaceUri, forFiles) {
        if (!this.canRun(workspaceUri))
            return this.getCannotRunResult();
        return await super.runForWorkspaceWithoutUI(workspaceUri, forFiles);
    }
    async runForDocumentWithoutUI(text, workspaceUri, documentUri, range) {
        if (!this.canRun(documentUri))
            return this.getCannotRunResult();
        return await super.runForDocumentWithoutUI(text, workspaceUri, documentUri, range);
    }
    canRun(resourceUri) {
        return this._context.alLangProxy.supportsAppAreasInheritance(resourceUri);
    }
    getCannotRunResult() {
        return {
            success: false,
            message: "Remove Redundant App Areas command can only be run for runtime 10.0 or greater",
            source: undefined
        };
    }
}
exports.RemoveRedundantAppAreasModifier = RemoveRedundantAppAreasModifier;
//# sourceMappingURL=removeRedundantAppAreasModifier.js.map