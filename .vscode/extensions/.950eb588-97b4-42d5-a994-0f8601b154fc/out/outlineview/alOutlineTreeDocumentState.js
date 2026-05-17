"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALOutlineTreeDocumentState = void 0;
class ALOutlineTreeDocumentState {
    _id;
    _sourceId;
    _state;
    constructor(id, sourceId) {
        this._id = id;
        this._sourceId = sourceId;
        this._state = {};
    }
    getState(nodeId, defaultState) {
        let state = this._state[nodeId];
        if (state === undefined)
            return defaultState;
        return state;
    }
    setState(nodeId, state) {
        this._state[nodeId] = state;
    }
    getId() {
        return this._id;
    }
}
exports.ALOutlineTreeDocumentState = ALOutlineTreeDocumentState;
//# sourceMappingURL=alOutlineTreeDocumentState.js.map