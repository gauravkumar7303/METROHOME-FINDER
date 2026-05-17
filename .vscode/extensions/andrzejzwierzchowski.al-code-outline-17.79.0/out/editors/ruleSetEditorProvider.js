"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleSetEditorProvider = void 0;
const ruleSetEditor_1 = require("./ruleSetEditor");
class RuleSetEditorProvider {
    _devToolsContext;
    constructor(devToolsContext) {
        this._devToolsContext = devToolsContext;
    }
    async resolveCustomTextEditor(document, webviewPanel, token) {
        let editor = new ruleSetEditor_1.RuleSetEditor(this._devToolsContext);
        editor.resolveCustomTextEditor(document, webviewPanel);
    }
}
exports.RuleSetEditorProvider = RuleSetEditorProvider;
//# sourceMappingURL=ruleSetEditorProvider.js.map