"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALTableSyntaxBuilder = void 0;
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
const alSyntaxHelper_1 = require("../../allanguage/alSyntaxHelper");
class ALTableSyntaxBuilder {
    constructor() {
    }
    buildFromTableWizardData(destUri, data) {
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter(destUri);
        writer.writeNamespace(data.objectNamespace);
        writer.writeUsings(data.objectUsings);
        writer.writeStartObject("table", data.objectId, data.objectName);
        writer.addProperty("Caption", writer.encodeString(alSyntaxHelper_1.ALSyntaxHelper.removePrefixSuffix(data.objectName, data.projectSettings)));
        if (data.dataClassification)
            writer.addProperty("DataClassification", data.dataClassification);
        else
            writer.addProperty("DataClassification", "ToBeClassified");
        if (!data.dataPerCompany)
            writer.addProperty("DataPerCompany", "false");
        writer.writeProperties();
        writer.writeLine("");
        //write fields here
        writer.writeStartFields();
        for (let i = 0; i < data.fields.length; i++) {
            writer.writeTableField(data.fields[i].id, data.fields[i].name, data.fields[i].type, data.fields[i].length, data.fields[i].dataClassification, data.dataClassification);
        }
        writer.writeEndFields();
        //suggest keys
        writer.writeLine("keys");
        writer.writeStartBlock();
        if (data.fields.length > 0) {
            //collect primary keys
            let pkFields = "";
            let hasPKFields = false;
            data.fields.forEach((item, index) => {
                if (item.pk) {
                    if (hasPKFields)
                        pkFields = pkFields + ",";
                    pkFields = pkFields + writer.encodeName(item.name);
                    hasPKFields = true;
                }
            });
            if (!hasPKFields)
                pkFields = writer.encodeName(data.fields[0].name);
            writer.writeStartNameSourceBlock("key", "PK", pkFields);
            writer.writeProperty("Clustered", "true");
            writer.writeEndBlock();
        }
        writer.writeEndBlock();
        writer.writeEndObject();
        return writer.toWizardGeneratedString();
    }
}
exports.ALTableSyntaxBuilder = ALTableSyntaxBuilder;
//# sourceMappingURL=alTableSyntaxBuilder.js.map