"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAllObjectsPermissionsModifier = void 0;
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
class AddAllObjectsPermissionsModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    constructor(context) {
        super(context, "addAllObjectsPermissions", "addAllObjectsPermissions");
    }
    getParameters(uri) {
        let parameters = super.getParameters(uri);
        parameters.excludeIncludedPermissionSetsPermissions = true;
        parameters.excludeExcludedPermissionSetsPermissions = true;
        return parameters;
    }
}
exports.AddAllObjectsPermissionsModifier = AddAllObjectsPermissionsModifier;
//# sourceMappingURL=addAllObjectsPermissionsModifier.js.map