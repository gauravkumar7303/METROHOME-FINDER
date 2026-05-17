"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALEnumSyntaxBuilder = void 0;
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
const alSyntaxHelper_1 = require("../../allanguage/alSyntaxHelper");
class ALEnumSyntaxBuilder {
    constructor() {
    }
    buildFromEnumWizardData(destUri, data) {
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter(destUri);
        writer.writeNamespace(data.objectNamespace);
        writer.writeUsings(data.objectUsings);
        writer.writeStartObject("enum", data.objectId, data.objectName);
        if (data.extensible) {
            writer.writeProperty("Extensible", "true");
        }
        writer.writeLine("");
        if ((data.valueList) && (data.valueList !== "")) {
            let values = alSyntaxHelper_1.ALSyntaxHelper.splitNamesList(data.valueList);
            let captions = alSyntaxHelper_1.ALSyntaxHelper.splitNamesList(data.captionList);
            if ((values) && (values.length > 0)) {
                for (let i = 0; i < values.length; i++) {
                    writer.writeStartNameSourceBlock("value", i.toString(), writer.encodeName(values[i]));
                    if (captions.length > i) {
                        writer.writeProperty("Caption", writer.encodeString(captions[i]));
                    }
                    else {
                        writer.writeProperty("Caption", writer.encodeString(values[i]));
                    }
                    writer.writeEndBlock();
                }
            }
        }
        writer.writeEndObject();
        return writer.toWizardGeneratedString();
    }
}
exports.ALEnumSyntaxBuilder = ALEnumSyntaxBuilder;
//# sourceMappingURL=alEnumSyntaxBuilder.js.map