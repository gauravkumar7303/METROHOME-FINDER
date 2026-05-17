"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALOutlineTreeState = void 0;
const alOutlineTreeDocumentState_1 = require("./alOutlineTreeDocumentState");
class ALOutlineTreeState {
    _documents;
    _nextId;
    constructor() {
        this._nextId = 0;
        this._documents = {};
    }
    getDocumentState(sourceId) {
        let state = this._documents[sourceId];
        if (state === undefined) {
            this._nextId++;
            state = new alOutlineTreeDocumentState_1.ALOutlineTreeDocumentState(this._nextId.toString(), sourceId);
            this._documents[sourceId] = state;
        }
        return state;
    }
}
exports.ALOutlineTreeState = ALOutlineTreeState;
//# sourceMappingURL=alOutlineTreeState.js.map