"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALObjectWizard = void 0;
class ALObjectWizard {
    description;
    detail;
    label;
    _toolsExtensionContext;
    onInitWizardData = () => { };
    constructor(newToolsExtensionContext, newLabel, newDescription, newDetails) {
        this._toolsExtensionContext = newToolsExtensionContext;
        this.label = newLabel;
        this.description = newDescription;
        this.detail = newDetails;
    }
    run(settings) {
    }
    async initObjectIdFieldsAsync(data, settings, type) {
        let uri = settings.getDestDirectoryUri();
        let idProviders = this._toolsExtensionContext.idReservationService.getReservationProviders(uri);
        let idProviderName = ((idProviders) && (idProviders.length === 1)) ? idProviders[0] : this._toolsExtensionContext.idReservationService.getDefaultProviderName();
        let objectId = await this._toolsExtensionContext.idReservationService.suggestObjectId(idProviderName, settings.getDestDirectoryUri(), type);
        data.uri = uri;
        data.objectId = objectId.toString();
        data.idResProviders = idProviders;
        data.idResProviderName = idProviderName;
        data.idResObjectType = type;
    }
}
exports.ALObjectWizard = ALObjectWizard;
//# sourceMappingURL=alObjectWizard.js.map