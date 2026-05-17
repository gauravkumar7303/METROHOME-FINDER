"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALInterfaceSyntaxBuilder = void 0;
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
const toolsGetCodeunitMethodsListRequest_1 = require("../../langserver/symbolsinformation/toolsGetCodeunitMethodsListRequest");
const azSymbolAccessModifier_1 = require("../../symbollibraries/azSymbolAccessModifier");
class ALInterfaceSyntaxBuilder {
    _toolsExtensionContext;
    constructor(toolsExtensionContext) {
        this._toolsExtensionContext = toolsExtensionContext;
    }
    async buildFromInterfaceWizardDataAsync(destUri, data) {
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter(destUri);
        writer.writeNamespace(data.objectNamespace);
        writer.writeUsings(data.objectUsings);
        writer.writeStartInterface(data.objectName);
        writer.writeLine("");
        if ((data.baseCodeunitName) && (data.baseCodeunitName != '')) {
            let methodsResponse = await this._toolsExtensionContext.toolsLangServerClient.getCodeunitMethodsList(new toolsGetCodeunitMethodsListRequest_1.toolsGetCodeunitMethodsListRequest(destUri?.fsPath, {
                nameWithNamespaceOrId: data.baseCodeunitName
            }));
            if ((methodsResponse) && (methodsResponse.symbols) && (methodsResponse.symbols.length > 0)) {
                for (let i = 0; i < methodsResponse.symbols.length; i++) {
                    if ((methodsResponse.symbols[i].header) && ((!methodsResponse.symbols[i].accessModifier) || (methodsResponse.symbols[i].accessModifier == azSymbolAccessModifier_1.AZSymbolAccessModifier.Public)))
                        writer.writeLine(methodsResponse.symbols[i].header + ";");
                }
                writer.writeLine("");
            }
        }
        //finish object
        writer.writeEndObject();
        return writer.toWizardGeneratedString();
    }
}
exports.ALInterfaceSyntaxBuilder = ALInterfaceSyntaxBuilder;
//# sourceMappingURL=alInterfaceSyntaxBuilder.js.map