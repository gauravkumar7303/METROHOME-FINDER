"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALPermissionSetExtensionSyntaxBuilder = void 0;
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
const alPermissionSetSyntaxBuilder_1 = require("./alPermissionSetSyntaxBuilder");
class ALPermissionSetExtensionSyntaxBuilder extends alPermissionSetSyntaxBuilder_1.ALPermissionSetSyntaxBuilder {
    buildFromPermissionSetExtWizardData(destUri, data) {
        let writer = new alSyntaxWriter_1.ALSyntaxWriter(destUri);
        writer.writeNamespace(data.objectNamespace);
        writer.writeUsings(data.objectUsings);
        writer.writeStartExtensionObject("permissionsetextension", data.objectId, data.objectName, data.basePermissionSet);
        this.writeIncludePermissionSetList(writer, data.selectedPermissionSetList);
        this.writePermissions(writer, data.selectedObjectsList);
        //finish object
        writer.writeEndObject();
        return writer.toWizardGeneratedString();
    }
}
exports.ALPermissionSetExtensionSyntaxBuilder = ALPermissionSetExtensionSyntaxBuilder;
//# sourceMappingURL=alPermissionSetExtensionSyntaxBuilder.js.map