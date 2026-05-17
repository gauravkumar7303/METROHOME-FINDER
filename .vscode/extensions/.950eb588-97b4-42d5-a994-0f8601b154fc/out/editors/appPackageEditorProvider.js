"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppPackageEditorProvider = void 0;
const appPackageDocument_1 = require("./appPackageDocument");
const alSymbolsBrowser_1 = require("../alsymbolsbrowser/alSymbolsBrowser");
const alAppSymbolsLibrary_1 = require("../symbollibraries/alAppSymbolsLibrary");
class AppPackageEditorProvider {
    _devToolsContext;
    constructor(devToolsContext) {
        this._devToolsContext = devToolsContext;
    }
    openCustomDocument(uri, openContext, token) {
        return new appPackageDocument_1.AppPackageDocument(uri);
    }
    resolveCustomEditor(document, webviewPanel, token) {
        let library = new alAppSymbolsLibrary_1.ALAppSymbolsLibrary(this._devToolsContext, document.uri.fsPath);
        let symbolsBrowser = new alSymbolsBrowser_1.ALSymbolsBrowser(this._devToolsContext, library);
        symbolsBrowser.attachToWebView(webviewPanel);
    }
}
exports.AppPackageEditorProvider = AppPackageEditorProvider;
//# sourceMappingURL=appPackageEditorProvider.js.map