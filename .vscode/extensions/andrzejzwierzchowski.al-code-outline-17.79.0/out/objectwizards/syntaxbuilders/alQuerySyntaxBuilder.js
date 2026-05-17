"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALQuerySyntaxBuilder = void 0;
const alSyntaxHelper_1 = require("../../allanguage/alSyntaxHelper");
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
class ALQuerySyntaxBuilder {
    constructor() {
    }
    buildFromQueryWizardData(destUri, data) {
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter(destUri);
        let isApi = (data.queryType.toLowerCase() === "api");
        writer.writeNamespace(data.objectNamespace);
        writer.writeUsings(data.objectUsings);
        writer.writeStartObject("query", data.objectId, data.objectName);
        writer.addProperty("QueryType", data.queryType);
        if (isApi) {
            writer.addProperty("APIPublisher", writer.encodeString(data.apiPublisher));
            writer.addProperty("APIGroup", writer.encodeString(data.apiGroup));
            writer.addProperty("APIVersion", writer.encodeString(data.apiVersion));
            writer.addProperty("EntityName", writer.encodeString(data.entityName));
            writer.addProperty("EntitySetName", writer.encodeString(data.entitySetName));
        }
        else {
            writer.addProperty("Caption", writer.encodeString(alSyntaxHelper_1.ALSyntaxHelper.removePrefixSuffix(data.objectName, data.projectSettings)));
        }
        writer.writeProperties();
        writer.writeLine("");
        //write dataset
        this.writeDataSet(writer, data, isApi);
        //write triggers
        writer.writeLine("");
        writer.writeLine("trigger OnBeforeOpen()");
        writer.writeLine("begin");
        writer.writeLine("");
        writer.writeLine("end;");
        writer.writeEndObject();
        return writer.toWizardGeneratedString();
    }
    writeDataSet(writer, data, isApi) {
        let dataItemName = isApi ? writer.createApiName(data.selectedTable) : writer.createName(data.selectedTable);
        writer.writeStartNamedBlock("elements");
        writer.writeStartNameSourceBlock("dataitem", writer.encodeName(dataItemName), writer.encodeName(data.selectedTable));
        if (data.selectedFieldList) {
            for (let i = 0; i < data.selectedFieldList.length; i++) {
                let columnName = isApi ? writer.createApiName(data.selectedFieldList[i].name) : writer.createName(data.selectedFieldList[i].name);
                writer.writeNameSourceBlock("column", writer.encodeName(columnName), writer.encodeName(data.selectedFieldList[i].name));
            }
        }
        writer.writeEndBlock();
        writer.writeEndBlock();
    }
}
exports.ALQuerySyntaxBuilder = ALQuerySyntaxBuilder;
//# sourceMappingURL=alQuerySyntaxBuilder.js.map