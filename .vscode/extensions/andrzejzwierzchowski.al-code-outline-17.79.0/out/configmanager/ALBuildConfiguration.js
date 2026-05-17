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
exports.ALBuildConfiguration = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
class ALBuildConfiguration {
    name;
    fileName;
    projectFolderUri;
    appJsonUri;
    uri;
    constructor(projectFolderUri, uri, name) {
        this.projectFolderUri = projectFolderUri;
        this.appJsonUri = vscode.Uri.file(path.join(projectFolderUri.fsPath, 'app.json'));
        this.uri = uri;
        this.name = name;
        this.fileName = path.parse(uri.fsPath).base;
    }
    async getContentAsync() {
        let content = await vscode.workspace.fs.readFile(this.uri);
        if (content) {
            return content.toString();
        }
        return undefined;
    }
    async initFromAppJsonAsync() {
        let content = await vscode.workspace.fs.readFile(this.appJsonUri);
        if ((content === undefined) || (content.length === 0)) {
            await this.copyFromAppJsonAsync();
        }
    }
    copyFromAppJsonAsync() {
        return vscode.workspace.fs.copy(this.appJsonUri, this.uri, { overwrite: true });
    }
    copyToAppJsonAsync() {
        return vscode.workspace.fs.copy(this.uri, this.appJsonUri, { overwrite: true });
    }
    deleteAsync() {
        return vscode.workspace.fs.delete(this.uri);
    }
}
exports.ALBuildConfiguration = ALBuildConfiguration;
//# sourceMappingURL=ALBuildConfiguration.js.map