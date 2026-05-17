"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALSymbolsBasedInterfaceWizard = void 0;
const alSymbolsBasedWizard_1 = require("./alSymbolsBasedWizard");
const fileBuilder_1 = require("../fileBuilder");
const azSymbolKind_1 = require("../../symbollibraries/azSymbolKind");
const alInterfaceSyntaxBuilder_1 = require("../syntaxbuilders/alInterfaceSyntaxBuilder");
const alInterfaceWizardData_1 = require("../wizards/alInterfaceWizardData");
class ALSymbolsBasedInterfaceWizard extends alSymbolsBasedWizard_1.ALSymbolsBasedWizard {
    constructor(context) {
        super(context);
    }
    //#region Wizards with UI
    async showWizard(sourceSymbols) {
        if (sourceSymbols.length == 1)
            await this.showInterfaceWizard(sourceSymbols[0]);
        else
            await this.showMultiInterfaceWizard(sourceSymbols);
    }
    async showMultiInterfaceWizard(sourceSymbols) {
        if (!fileBuilder_1.FileBuilder.checkCrsExtensionFileNamePatternRequired())
            return;
        const objType = azSymbolKind_1.AZSymbolKind.Interface;
        let relativeFileDir = await this.getRelativeFileDir(objType);
        for (let i = 0; i < sourceSymbols.length; i++) {
            let sourceSymbol = sourceSymbols[i];
            let objectName = this.getDefaultInterfaceName(sourceSymbol);
            await this.createAndShowNewInterface(sourceSymbol, objectName, relativeFileDir);
        }
    }
    async showInterfaceWizard(sourceSymbol) {
        if (!fileBuilder_1.FileBuilder.checkCrsFileNamePatternRequired())
            return;
        const objType = azSymbolKind_1.AZSymbolKind.Interface;
        let objectName = await this.getObjectName("Please enter a name for the new object.", this.getDefaultInterfaceName(sourceSymbol));
        if (!objectName)
            return;
        let relativeFileDir = await this.getRelativeFileDir(objType);
        await this.createAndShowNewInterface(sourceSymbol, objectName, relativeFileDir);
    }
    async createAndShowNewInterface(sourceSymbol, objectName, relativeFileDir) {
        let fileName = await fileBuilder_1.FileBuilder.getPatternGeneratedFullObjectFileName(azSymbolKind_1.AZSymbolKind.Interface, 0, objectName);
        let sourceCode = await this.buildInterfaceAsync(sourceSymbol, objectName);
        this.showNewDocument(sourceCode, fileName, relativeFileDir);
    }
    //#endregion
    //#region Interface builders
    async buildInterfaceAsync(sourceSymbol, objectName) {
        let syntaxBuilder = new alInterfaceSyntaxBuilder_1.ALInterfaceSyntaxBuilder(this._toolsExtensionContext);
        let settings = new alInterfaceWizardData_1.ALInterfaceWizardData();
        settings.objectName = objectName;
        settings.baseCodeunitName = sourceSymbol.name;
        return await syntaxBuilder.buildFromInterfaceWizardDataAsync(undefined, settings);
    }
    //#endregion
    //#region Helper Methods
    getDefaultInterfaceName(sourceSymbol) {
        return 'I' + sourceSymbol.name.trim();
    }
}
exports.ALSymbolsBasedInterfaceWizard = ALSymbolsBasedInterfaceWizard;
//# sourceMappingURL=alSymbolsBasedInterfaceWizard.js.map