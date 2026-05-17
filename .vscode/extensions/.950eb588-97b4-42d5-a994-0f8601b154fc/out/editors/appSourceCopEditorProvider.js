"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSourceCopEditorProvider = void 0;
const appSourceCopEditor_1 = require("./appSourceCopEditor");
class AppSourceCopEditorProvider {
    _devToolsContext;
    constructor(devToolsContext) {
        this._devToolsContext = devToolsContext;
    }
    async resolveCustomTextEditor(document, webviewPanel, token) {
        let editor = new appSourceCopEditor_1.AppSourceCopEditor(this._devToolsContext);
        editor.resolveCustomTextEditor(document, webviewPanel);
    }
}
exports.AppSourceCopEditorProvider = AppSourceCopEditorProvider;
//# sourceMappingURL=appSourceCopEditorProvider.js.map