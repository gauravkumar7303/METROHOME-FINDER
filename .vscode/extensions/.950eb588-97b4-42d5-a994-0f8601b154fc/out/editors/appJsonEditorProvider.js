"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppJsonEditorProvider = void 0;
const appJsonEditor_1 = require("./appJsonEditor");
class AppJsonEditorProvider {
    _devToolsContext;
    constructor(devToolsContext) {
        this._devToolsContext = devToolsContext;
    }
    async resolveCustomTextEditor(document, webviewPanel, token) {
        let editor = new appJsonEditor_1.AppJsonEditor(this._devToolsContext);
        editor.resolveCustomTextEditor(document, webviewPanel);
    }
}
exports.AppJsonEditorProvider = AppJsonEditorProvider;
//# sourceMappingURL=appJsonEditorProvider.js.map