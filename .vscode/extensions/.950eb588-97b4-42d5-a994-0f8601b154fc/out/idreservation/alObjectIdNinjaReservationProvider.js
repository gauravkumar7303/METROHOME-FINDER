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
exports.ALObjectIdNinjaReservationProvider = void 0;
const vscode = __importStar(require("vscode"));
class ALObjectIdNinjaReservationProvider {
    _idNinjaApi;
    getName() {
        return "ALObjectIdNinja";
    }
    isAvailable() {
        if (this._idNinjaApi)
            return true;
        let idNinjaExtension = vscode.extensions.getExtension("vjeko.vjeko-al-objid");
        return ((!!idNinjaExtension) && (!!idNinjaExtension.isActive) && (!!idNinjaExtension.exports));
    }
    async suggestObjectId(uri, type) {
        try {
            if (await this.loadIdNinjaApi()) {
                type = type.toLowerCase();
                let ids = await this._idNinjaApi.suggestIds(uri, type);
                if (ids)
                    for (let idx = 0; idx < ids.length; idx++)
                        if (ids[idx] > 0)
                            return ids[idx];
            }
        }
        catch (e) {
        }
        return 0;
    }
    async reserveObjectId(uri, type, id) {
        try {
            if (await this.loadIdNinjaApi()) {
                type = type.toLowerCase();
                let newId = await this._idNinjaApi.reserveId(uri, type, id);
                if (newId > 0)
                    return newId;
            }
        }
        catch (e) {
        }
        return id;
    }
    async loadIdNinjaApi() {
        if (!this._idNinjaApi) {
            let idNinjaExtension = vscode.extensions.getExtension("vjeko.vjeko-al-objid");
            if (idNinjaExtension) {
                if (!idNinjaExtension.isActive)
                    await idNinjaExtension.activate();
                this._idNinjaApi = idNinjaExtension.exports;
            }
        }
        return !!this._idNinjaApi;
    }
}
exports.ALObjectIdNinjaReservationProvider = ALObjectIdNinjaReservationProvider;
//# sourceMappingURL=alObjectIdNinjaReservationProvider.js.map