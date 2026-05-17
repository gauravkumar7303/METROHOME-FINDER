"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalIdReservationProvider = void 0;
class LocalIdReservationProvider {
    _context;
    constructor(context) {
        this._context = context;
    }
    getName() {
        return "LocalFiles";
    }
    isAvailable() {
        return true;
    }
    async suggestObjectId(uri, type) {
        return await this._context.toolsLangServerClient.getNextObjectId(uri?.fsPath, type);
    }
    async reserveObjectId(uri, type, id) {
        return id;
    }
}
exports.LocalIdReservationProvider = LocalIdReservationProvider;
//# sourceMappingURL=LocalIdReservationProvider.js.map