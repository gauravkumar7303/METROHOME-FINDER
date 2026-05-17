"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALCodeunitSyntaxBuilder = void 0;
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
const toolsGetInterfaceMethodsListRequest_1 = require("../../langserver/symbolsinformation/toolsGetInterfaceMethodsListRequest");
class ALCodeunitSyntaxBuilder {
    _toolsExtensionContext;
    constructor(toolsExtensionContext) {
        this._toolsExtensionContext = toolsExtensionContext;
    }
    async buildFromCodeunitWizardDataAsync(destUri, data) {
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter(destUri);
        writer.writeNamespace(data.objectNamespace);
        writer.writeUsings(data.objectUsings);
        writer.writeStartCodeunit(data.objectId, data.objectName, data.interfaceName);
        //write properties
        if ((data.selectedTable) && (data.selectedTable)) {
            writer.writeProperty("TableNo", writer.encodeName(data.selectedTable));
            writer.writeLine("");
            writer.writeLine("trigger OnRun()");
            writer.writeLine("begin");
            writer.writeLine("");
            writer.writeLine("end;");
        }
        writer.writeLine("");
        if ((data.interfaceName) && (data.interfaceName !== '')) {
            let methodsResponse = await this._toolsExtensionContext.toolsLangServerClient.getInterfaceMethodsList(new toolsGetInterfaceMethodsListRequest_1.toolsGetInterfaceMethodsListRequest(destUri?.fsPath, {
                nameWithNamespaceOrId: data.interfaceName
            }));
            if ((methodsResponse) && (methodsResponse.symbols) && (methodsResponse.symbols.length > 0)) {
                for (let i = 0; i < methodsResponse.symbols.length; i++) {
                    if (methodsResponse.symbols[i].header) {
                        writer.writeLine(methodsResponse.symbols[i].header);
                        writer.writeLine("begin");
                        writer.writeLine("end;");
                        writer.writeLine("");
                    }
                }
            }
        }
        //finish object
        writer.writeEndObject();
        return writer.toWizardGeneratedString();
    }
}
exports.ALCodeunitSyntaxBuilder = ALCodeunitSyntaxBuilder;
//# sourceMappingURL=alCodeunitSyntaxBuilder.js.map