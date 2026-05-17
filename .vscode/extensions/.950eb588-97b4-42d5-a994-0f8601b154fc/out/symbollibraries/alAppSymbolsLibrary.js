'use strict';
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
exports.ALAppSymbolsLibrary = void 0;
const path = __importStar(require("path"));
const vscode = __importStar(require("vscode"));
const toolsPackageSymbolsRequest_1 = require("../langserver/toolsPackageSymbolsRequest");
const azSymbolInformation_1 = require("./azSymbolInformation");
const azSymbolKind_1 = require("./azSymbolKind");
const alBaseServerSideLibrary_1 = require("./alBaseServerSideLibrary");
const numberHelper_1 = require("../tools/numberHelper");
class ALAppSymbolsLibrary extends alBaseServerSideLibrary_1.ALBaseServerSideLibrary {
    filePath;
    _fileUri;
    constructor(context, sourceFilePath) {
        super(context);
        this.filePath = sourceFilePath;
        this._fileUri = vscode.Uri.file(this.filePath);
        this.displayName = path.parse(sourceFilePath).base;
    }
    async loadInternalAsync(forceReload) {
        try {
            let request = new toolsPackageSymbolsRequest_1.ToolsPackageSymbolsRequest(this.filePath);
            let response = await this._context.toolsLangServerClient.getAppPackageSymbols(request);
            if ((response) && (response.root))
                this.rootSymbol = azSymbolInformation_1.AZSymbolInformation.fromAny(response.root);
            else
                this.rootSymbol = azSymbolInformation_1.AZSymbolInformation.create(azSymbolKind_1.AZSymbolKind.Document, this.displayName);
            if (response) {
                this._libraryId = numberHelper_1.NumberHelper.zeroIfNotDef(response.libraryId);
                if (response.error) {
                    this.showLoadError(response.errorMessage);
                    return false;
                }
            }
        }
        catch (e) {
            this.showLoadError(e.message);
            return false;
        }
        return true;
    }
    showLoadError(errorMessage) {
        let msg = 'Loading symbols from file "' + this.filePath + '" failed.';
        if (errorMessage)
            msg = msg + ' (' + errorMessage + ')';
        else
            msg = msg + ' (UNDEFINED ERROR)';
        vscode.window.showErrorMessage(msg);
    }
    getUri() {
        return this._fileUri;
    }
}
exports.ALAppSymbolsLibrary = ALAppSymbolsLibrary;
//# sourceMappingURL=alAppSymbolsLibrary.js.map