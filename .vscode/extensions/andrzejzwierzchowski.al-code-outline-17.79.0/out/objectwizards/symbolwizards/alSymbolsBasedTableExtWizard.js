"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALSymbolsBasedTableExtWizard = void 0;
const fileBuilder_1 = require("../fileBuilder");
const azSymbolKind_1 = require("../../symbollibraries/azSymbolKind");
const alSymbolsBasedWizard_1 = require("./alSymbolsBasedWizard");
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
class ALSymbolsBasedTableExtWizard extends alSymbolsBasedWizard_1.ALSymbolsBasedWizard {
    constructor(context) {
        super(context);
    }
    //#region Wizards with UI
    async showWizard(tableSymbols) {
        if (tableSymbols.length == 1)
            await this.showTableExtWizard(tableSymbols[0]);
        else
            await this.showMultiTableExtWizard(tableSymbols);
    }
    async showMultiTableExtWizard(tableSymbols) {
        if (!fileBuilder_1.FileBuilder.checkCrsExtensionFileNamePatternRequired() || !fileBuilder_1.FileBuilder.checkCrsExtensionObjectNamePatternRequired(true))
            return;
        const extObjType = azSymbolKind_1.AZSymbolKind.TableExtensionObject;
        let relativeFileDir = await this.getRelativeFileDir(extObjType);
        let startObjectId = await this.getObjectId(relativeFileDir, "tableextension", "Please enter a starting ID for the table extensions.", 0);
        if (startObjectId < 0) {
            return;
        }
        for (let i = 0; i < tableSymbols.length; i++) {
            let tableSymbol = tableSymbols[i];
            let extObjectId = startObjectId + i;
            let extObjectName = await fileBuilder_1.FileBuilder.getPatternGeneratedExtensionObjectName(extObjType, extObjectId, tableSymbol);
            await this.createAndShowNewTableExtension(tableSymbol, extObjType, extObjectId, extObjectName, relativeFileDir);
        }
    }
    async showTableExtWizard(tableSymbol) {
        if (!fileBuilder_1.FileBuilder.checkCrsExtensionFileNamePatternRequired() || !fileBuilder_1.FileBuilder.checkCrsExtensionObjectNamePatternRequired(false))
            return;
        const extObjType = azSymbolKind_1.AZSymbolKind.TableExtensionObject;
        let relativeFileDir = await this.getRelativeFileDir(extObjType);
        let extObjectId = await this.getObjectId(relativeFileDir, "tableextension", "Please enter an ID for the table extension.", 0);
        if (extObjectId < 0) {
            return;
        }
        let extObjectName = await fileBuilder_1.FileBuilder.getPatternGeneratedExtensionObjectName(extObjType, extObjectId, tableSymbol);
        if (!extObjectName)
            extObjectName = tableSymbol.name + ' Extension';
        extObjectName = await this.getObjectName("Please enter a name for the table extension.", extObjectName);
        if (!extObjectName) {
            return;
        }
        await this.createAndShowNewTableExtension(tableSymbol, extObjType, extObjectId, extObjectName, relativeFileDir);
    }
    async createAndShowNewTableExtension(tableSymbol, extObjType, extObjectId, extObjectName, relativeFileDir) {
        let fileName = await fileBuilder_1.FileBuilder.getPatternGeneratedExtensionObjectFileName(extObjType, extObjectId, extObjectName, tableSymbol);
        this.showNewDocument(this.buildTableExtForTable(tableSymbol, extObjectId, extObjectName), fileName, relativeFileDir);
    }
    //#endregion
    //#region Table Extension builders
    buildTableExtForTable(tableSymbol, objectId, extObjectName) {
        let writer = new alSyntaxWriter_1.ALSyntaxWriter(undefined);
        writer.writeStartExtensionObject("tableextension", objectId.toString(), extObjectName, tableSymbol.name);
        writer.writeStartFields();
        writer.writeLine("");
        writer.writeEndFields();
        writer.writeEndObject();
        return writer.toWizardGeneratedString();
    }
}
exports.ALSymbolsBasedTableExtWizard = ALSymbolsBasedTableExtWizard;
//# sourceMappingURL=alSymbolsBasedTableExtWizard.js.map