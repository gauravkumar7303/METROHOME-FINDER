"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALTableExtSyntaxBuilder = void 0;
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
class ALTableExtSyntaxBuilder {
    constructor() {
    }
    buildFromTableExtWizardData(destUri, data) {
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter(destUri);
        writer.writeNamespace(data.objectNamespace);
        writer.writeUsings(data.objectUsings);
        writer.writeStartExtensionObject("tableextension", data.objectId, data.objectName, data.selectedTable);
        //write fields here
        writer.writeStartFields();
        for (let i = 0; i < data.fields.length; i++) {
            writer.writeTableField(data.fields[i].id, data.fields[i].name, data.fields[i].type, data.fields[i].length, data.fields[i].dataClassification, undefined);
        }
        writer.writeEndFields();
        writer.writeEndObject();
        return writer.toWizardGeneratedString();
    }
}
exports.ALTableExtSyntaxBuilder = ALTableExtSyntaxBuilder;
//# sourceMappingURL=alTableExtSyntaxBuilder.js.map