"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALPermissionSetSyntaxBuilder = void 0;
const alSyntaxHelper_1 = require("../../allanguage/alSyntaxHelper");
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
class ALPermissionSetSyntaxBuilder {
    buildFromPermissionSetWizardData(destUri, data) {
        let writer = new alSyntaxWriter_1.ALSyntaxWriter(destUri);
        writer.writeNamespace(data.objectNamespace);
        writer.writeUsings(data.objectUsings);
        writer.writeStartObject("permissionset", data.objectId, data.objectName);
        writer.addProperty("Assignable", "true");
        if ((data.objectCaption) && (data.objectCaption.length > 0))
            writer.addProperty("Caption", writer.encodeString(data.objectCaption) + ', MaxLength = 30');
        else
            writer.addProperty("Caption", writer.encodeString(alSyntaxHelper_1.ALSyntaxHelper.removePrefixSuffix(data.objectName, data.projectSettings)) + ', MaxLength = 30');
        writer.writeProperties();
        this.writeIncludePermissionSetList(writer, data.selectedPermissionSetList);
        this.writePermissions(writer, data.selectedObjectsList);
        //finish object
        writer.writeEndObject();
        return writer.toWizardGeneratedString();
    }
    writeIncludePermissionSetList(writer, list) {
        if ((list) && (list.length > 0)) {
            writer.writeStartProperty("IncludedPermissionSets");
            for (let i = 0; i < list.length; i++) {
                writer.writePropertyValue(alSyntaxHelper_1.ALSyntaxHelper.toNameText(list[i]), (i == (list.length - 1)));
            }
        }
    }
    writePermissions(writer, list) {
        if ((list) && (list.length > 0)) {
            writer.writeStartProperty("Permissions");
            for (let i = 0; i < list.length; i++) {
                this.writeObjectPermission(writer, list[i], (i === (list.length - 1)));
            }
        }
    }
    writeObjectPermission(writer, objectInformation, lastValue) {
        if ((objectInformation.name) && (objectInformation.type)) {
            let name = alSyntaxHelper_1.ALSyntaxHelper.toNameText(objectInformation.name);
            if (objectInformation.type == "Table") {
                this.writeObjectPermissionLine(writer, "table", name, "X", false);
                this.writeObjectPermissionLine(writer, "tabledata", name, "RMID", lastValue);
            }
            else {
                this.writeObjectPermissionLine(writer, objectInformation.type.toLowerCase(), name, "X", lastValue);
            }
        }
    }
    writeObjectPermissionLine(writer, type, name, permissions, lastValue) {
        writer.writePropertyValue(type + " " + name + " = " + permissions, lastValue);
    }
}
exports.ALPermissionSetSyntaxBuilder = ALPermissionSetSyntaxBuilder;
//# sourceMappingURL=alPermissionSetSyntaxBuilder.js.map