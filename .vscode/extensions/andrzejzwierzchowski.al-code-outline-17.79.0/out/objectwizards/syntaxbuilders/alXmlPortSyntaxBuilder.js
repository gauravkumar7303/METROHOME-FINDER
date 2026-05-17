"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALXmlPortSyntaxBuilder = void 0;
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
const alSyntaxHelper_1 = require("../../allanguage/alSyntaxHelper");
class ALXmlPortSyntaxBuilder {
    constructor() {
    }
    buildFromXmlPortWizardData(destUri, data) {
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter(destUri);
        writer.writeNamespace(data.objectNamespace);
        writer.writeUsings(data.objectUsings);
        writer.writeStartObject("xmlport", data.objectId, data.objectName);
        writer.addProperty("Caption", writer.encodeString(alSyntaxHelper_1.ALSyntaxHelper.removePrefixSuffix(data.objectName, data.projectSettings)));
        writer.writeProperties();
        //write dataset
        this.writeSchema(writer, data);
        //write report request page suggestion
        if (data.createRequestPage)
            this.writeRequestPage(writer);
        writer.writeEndObject();
        return writer.toWizardGeneratedString();
    }
    writeSchema(writer, data) {
        let tableElementName = writer.createName(data.selectedTable);
        let fieldNodeName;
        if (data.fieldNodeType == "element")
            fieldNodeName = "fieldelement";
        else
            fieldNodeName = "fieldattribute";
        writer.writeStartNamedBlock("schema");
        writer.writeStartGroup("textelement", "RootNodeName");
        writer.writeStartNameSourceBlock("tableelement", tableElementName, writer.encodeName(data.selectedTable));
        if (data.selectedFieldList) {
            for (let i = 0; i < data.selectedFieldList.length; i++) {
                writer.writeNameSourceBlock(fieldNodeName, writer.createName(data.selectedFieldList[i].name), tableElementName + "." + writer.encodeName(data.selectedFieldList[i].name));
            }
        }
        writer.writeEndBlock();
        writer.writeEndBlock();
        writer.writeEndBlock();
    }
    writeRequestPage(writer) {
        writer.writeStartNamedBlock("requestpage");
        //layout
        writer.writeStartLayout();
        writer.writeStartGroup("area", "Content");
        writer.writeStartGroup("group", "GroupName");
        writer.writeEndBlock();
        writer.writeEndBlock();
        writer.writeEndLayout();
        //actions
        writer.writeStartNamedBlock("actions");
        writer.writeStartGroup("area", "Processing");
        writer.writeEndBlock();
        writer.writeEndBlock();
        writer.writeEndBlock();
    }
}
exports.ALXmlPortSyntaxBuilder = ALXmlPortSyntaxBuilder;
//# sourceMappingURL=alXmlPortSyntaxBuilder.js.map