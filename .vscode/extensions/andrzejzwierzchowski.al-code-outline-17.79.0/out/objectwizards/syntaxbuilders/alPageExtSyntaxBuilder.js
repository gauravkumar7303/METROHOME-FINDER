"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALPageExtSyntaxBuilder = void 0;
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
class ALPageExtSyntaxBuilder {
    constructor() {
    }
    buildFromPageExtWizardData(destUri, data) {
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter(destUri);
        writer.writeNamespace(data.objectNamespace);
        writer.writeUsings(data.objectUsings);
        writer.writeStartExtensionObject("pageextension", data.objectId, data.objectName, data.basePage);
        writer.writeEndObject();
        return writer.toWizardGeneratedString();
    }
}
exports.ALPageExtSyntaxBuilder = ALPageExtSyntaxBuilder;
//# sourceMappingURL=alPageExtSyntaxBuilder.js.map