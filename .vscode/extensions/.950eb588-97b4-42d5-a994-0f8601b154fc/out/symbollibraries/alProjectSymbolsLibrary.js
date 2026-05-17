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
exports.ALProjectSymbolsLibrary = void 0;
const vscode = __importStar(require("vscode"));
const toolsProjectSymbolsRequest_1 = require("../langserver/toolsProjectSymbolsRequest");
const azSymbolInformation_1 = require("./azSymbolInformation");
const azSymbolKind_1 = require("./azSymbolKind");
const alBaseServerSideLibrary_1 = require("./alBaseServerSideLibrary");
class ALProjectSymbolsLibrary extends alBaseServerSideLibrary_1.ALBaseServerSideLibrary {
    _projectPath;
    _projectUri;
    _includeDependencies;
    constructor(context, newIncludeDependencies, newProjectPath) {
        super(context);
        this._projectPath = newProjectPath;
        this._projectUri = vscode.Uri.file(this._projectPath);
        this._includeDependencies = newIncludeDependencies;
        this.displayName = "Project Symbols";
    }
    async loadInternalAsync(forceReload) {
        try {
            let alPackagesPath = vscode.workspace.getConfiguration('al', null).get('packageCachePath');
            if (alPackagesPath) {
                if (typeof (alPackagesPath) != 'string') {
                    if (alPackagesPath.length > 0)
                        alPackagesPath = alPackagesPath[0];
                    else
                        alPackagesPath = undefined;
                }
            }
            if (!alPackagesPath)
                alPackagesPath = ".alpackages";
            let workspaceFoldersPaths = [];
            let folders = vscode.workspace.workspaceFolders;
            if (folders) {
                for (let i = 0; i < folders.length; i++) {
                    if (folders[i].uri)
                        workspaceFoldersPaths.push(folders[i].uri.fsPath);
                }
            }
            let request = new toolsProjectSymbolsRequest_1.ToolsProjectSymbolsRequest(this._includeDependencies, this._projectPath, alPackagesPath, workspaceFoldersPaths);
            let response = await this._context.toolsLangServerClient.getProjectSymbols(request);
            if ((response) && (response.root))
                this.rootSymbol = azSymbolInformation_1.AZSymbolInformation.fromAny(response.root);
            else
                this.rootSymbol = azSymbolInformation_1.AZSymbolInformation.create(azSymbolKind_1.AZSymbolKind.ProjectDefinition, this.displayName);
            if (response) {
                this._libraryId = response.libraryId;
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
        let msg = 'Loading project symbols failed.';
        if (errorMessage)
            msg = msg + ' (' + errorMessage + ')';
        else
            msg = msg + ' (UNDEFINED ERROR)';
        vscode.window.showErrorMessage(msg);
    }
    getUri() {
        return this._projectUri;
    }
}
exports.ALProjectSymbolsLibrary = ALProjectSymbolsLibrary;
//# sourceMappingURL=alProjectSymbolsLibrary.js.map