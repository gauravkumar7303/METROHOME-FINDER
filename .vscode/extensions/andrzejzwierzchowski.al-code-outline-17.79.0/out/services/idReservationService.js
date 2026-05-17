"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdReservationService = void 0;
const vscode = __importStar(require("vscode"));
const alObjectIdNinjaReservationProvider_1 = require("../idreservation/alObjectIdNinjaReservationProvider");
const LocalIdReservationProvider_1 = require("../idreservation/LocalIdReservationProvider");
const devToolsExtensionService_1 = require("./devToolsExtensionService");
class IdReservationService extends devToolsExtensionService_1.DevToolsExtensionService {
    _providers;
    _defaultProvider;
    constructor(context) {
        super(context);
        this._providers = [];
        this._defaultProvider = this.registerReservationProvider(new LocalIdReservationProvider_1.LocalIdReservationProvider(context));
        this.registerReservationProvider(new alObjectIdNinjaReservationProvider_1.ALObjectIdNinjaReservationProvider());
    }
    async suggestObjectId(providerName, uri, type) {
        let provider = this.getProviderOrDefault(providerName);
        if (!uri) {
            if ((!vscode.workspace.workspaceFolders) || (vscode.workspace.workspaceFolders.length == 0))
                return 0;
            uri = vscode.workspace.workspaceFolders[0].uri;
        }
        let id = await provider.suggestObjectId(uri, type);
        if (id)
            return id;
        return 0;
    }
    async reserveObjectId(providerName, uri, type, id) {
        let provider = this.getProviderOrDefault(providerName);
        if (!uri) {
            if ((!vscode.workspace.workspaceFolders) || (vscode.workspace.workspaceFolders.length == 0))
                return id;
            uri = vscode.workspace.workspaceFolders[0].uri;
        }
        let newId = await provider.reserveObjectId(uri, type, id);
        if (newId)
            return newId;
        return id;
    }
    registerReservationProvider(provider) {
        this._providers.push(provider);
        return provider;
    }
    getReservationProviders(uri) {
        let names = [];
        let settingsProviderName = this.getProviderNameFromSettings(uri);
        if (settingsProviderName) {
            let provider = this.getProvider(settingsProviderName);
            if (!provider) {
                vscode.window.showErrorMessage("AL ID Reservation provider " + settingsProviderName + " specified in the alOutline.idReservationProvider setting is not available. Using default local files provider.");
                settingsProviderName = this._defaultProvider.getName();
            }
            return [settingsProviderName];
        }
        for (let i = 0; i < this._providers.length; i++)
            if (this._providers[i].isAvailable())
                names.push(this._providers[i].getName());
        return names;
    }
    getDefaultProviderName() {
        return this._defaultProvider.getName();
    }
    getProviderNameFromSettings(uri) {
        let settings = vscode.workspace.getConfiguration('alOutline', uri);
        return settings.get('idReservationProvider');
    }
    getProviderOrDefault(name) {
        if (name) {
            let provider = this.getProvider(name);
            if ((provider) && (provider.isAvailable()))
                return provider;
            let defaultName = this._defaultProvider.getName();
            vscode.window.showErrorMessage("AL ID Reservation provider " + name + " is not available. Using default " + defaultName + " provider.");
        }
        return this._defaultProvider;
    }
    getProvider(name) {
        for (let i = 0; i < this._providers.length; i++)
            if ((this._providers[i].getName() === name) && (this._providers[i].isAvailable()))
                return this._providers[i];
        return undefined;
    }
}
exports.IdReservationService = IdReservationService;
//# sourceMappingURL=idReservationService.js.map