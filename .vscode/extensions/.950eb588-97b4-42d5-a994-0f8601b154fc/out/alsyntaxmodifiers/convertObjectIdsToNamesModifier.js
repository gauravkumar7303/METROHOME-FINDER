"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertObjectIdsToNamesModifier = void 0;
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
class ConvertObjectIdsToNamesModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    constructor(context) {
        super(context, "Convert Object Ids to Names", "convertObjectIdsToNames");
    }
}
exports.ConvertObjectIdsToNamesModifier = ConvertObjectIdsToNamesModifier;
//# sourceMappingURL=convertObjectIdsToNamesModifier.js.map