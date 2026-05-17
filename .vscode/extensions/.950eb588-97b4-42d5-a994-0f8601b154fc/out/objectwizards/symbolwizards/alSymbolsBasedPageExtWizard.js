"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALSymbolsBasedPageExtWizard = void 0;
const fileBuilder_1 = require("../fileBuilder");
const azSymbolKind_1 = require("../../symbollibraries/azSymbolKind");
const alSymbolsBasedWizard_1 = require("./alSymbolsBasedWizard");
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
class ALSymbolsBasedPageExtWizard extends alSymbolsBasedWizard_1.ALSymbolsBasedWizard {
    constructor(context) {
        super(context);
    }
    //#region Wizards with UI
    async showWizard(symbols) {
        if (symbols.length == 1)
            await this.showPageExtWizard(symbols[0]);
        else
            await this.showMultiPageExtWizard(symbols);
    }
    async showMultiPageExtWizard(pageSymbols) {
        if (!fileBuilder_1.FileBuilder.checkCrsExtensionFileNamePatternRequired() || !fileBuilder_1.FileBuilder.checkCrsExtensionObjectNamePatternRequired(true))
            return;
        const extObjType = azSymbolKind_1.AZSymbolKind.PageExtensionObject;
        let relativeFileDir = await this.getRelativeFileDir(extObjType);
        let startObjectId = await this.getObjectId(relativeFileDir, "pageextension", "Please enter a starting ID for the page extensions.", 0);
        if (startObjectId < 0) {
            return;
        }
        for (let i = 0; i < pageSymbols.length; i++) {
            let pageSymbol = pageSymbols[i];
            let extObjectId = startObjectId + i;
            let extObjectName = await fileBuilder_1.FileBuilder.getPatternGeneratedExtensionObjectName(extObjType, extObjectId, pageSymbol);
            await this.createAndShowNewPageExtension(pageSymbol, extObjType, extObjectId, extObjectName, relativeFileDir);
        }
    }
    async showPageExtWizard(pageSymbol) {
        if (!fileBuilder_1.FileBuilder.checkCrsExtensionFileNamePatternRequired() || !fileBuilder_1.FileBuilder.checkCrsExtensionObjectNamePatternRequired(false))
            return;
        const extObjType = azSymbolKind_1.AZSymbolKind.PageExtensionObject;
        let relativeFileDir = await this.getRelativeFileDir(extObjType);
        let extObjectId = await this.getObjectId(relativeFileDir, "pageextension", "Please enter an ID for the page extension.", 0);
        if (extObjectId < 0) {
            return;
        }
        let extObjectName = await fileBuilder_1.FileBuilder.getPatternGeneratedExtensionObjectName(extObjType, extObjectId, pageSymbol);
        if (!extObjectName)
            extObjectName = pageSymbol.name + ' Extension';
        extObjectName = await this.getObjectName("Please enter a name for the page extension.", extObjectName);
        if (!extObjectName) {
            return;
        }
        await this.createAndShowNewPageExtension(pageSymbol, extObjType, extObjectId, extObjectName, relativeFileDir);
    }
    async createAndShowNewPageExtension(pageSymbol, extObjType, extObjectId, extObjectName, relativeFileDir) {
        let fileName = await fileBuilder_1.FileBuilder.getPatternGeneratedExtensionObjectFileName(extObjType, extObjectId, extObjectName, pageSymbol);
        this.showNewDocument(this.buildPageExtForPage(pageSymbol, extObjectId, extObjectName), fileName, relativeFileDir);
    }
    //#endregion
    //#region Page Extension builders
    buildPageExtForPage(pageSymbol, objectId, extObjectName) {
        let writer = new alSyntaxWriter_1.ALSyntaxWriter(undefined);
        writer.writeStartExtensionObject("pageextension", objectId.toString(), extObjectName, pageSymbol.name);
        writer.writeStartLayout();
        writer.writeLine("");
        writer.writeEndLayout();
        writer.writeLine("");
        writer.writeStartActions();
        writer.writeLine("");
        writer.writeEndActions();
        writer.writeEndObject();
        return writer.toWizardGeneratedString();
    }
}
exports.ALSymbolsBasedPageExtWizard = ALSymbolsBasedPageExtWizard;
//# sourceMappingURL=alSymbolsBasedPageExtWizard.js.map