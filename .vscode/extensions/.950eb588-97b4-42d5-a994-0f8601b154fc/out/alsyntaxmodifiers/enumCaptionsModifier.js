"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumCaptionsModifier = void 0;
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
class EnumCaptionsModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    constructor(context) {
        super(context, "Add Enum Values Captions", "addEnumCaptions");
    }
    getParameters(uri) {
        let parameters = super.getParameters(uri);
        parameters.sortProperties = this.sortPropertiesOnSave(uri);
        return parameters;
    }
}
exports.EnumCaptionsModifier = EnumCaptionsModifier;
//# sourceMappingURL=enumCaptionsModifier.js.map