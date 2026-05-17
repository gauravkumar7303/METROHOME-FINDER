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
exports.GitClientService = void 0;
const vscode = __importStar(require("vscode"));
const devToolsExtensionService_1 = require("./devToolsExtensionService");
class GitClientService extends devToolsExtensionService_1.DevToolsExtensionService {
    _gitApi;
    constructor(newContext) {
        super(newContext);
    }
    async getUncommitedFiles(uri) {
        await this.loadGitExtension();
        if ((this._gitApi?.repositories) && (this._gitApi.repositories.length > 0)) {
            let repository = undefined;
            if (uri) {
                let uriPath = uri.fsPath.toLowerCase();
                repository = this._gitApi.repositories.find(repo => uriPath.startsWith(repo.rootUri.fsPath.toLowerCase()));
            }
            else {
                repository = this._gitApi.repositories[0];
            }
            if (repository) {
                const changes = repository.state.workingTreeChanges;
                let files = [];
                for (let i = 0; i < changes.length; i++) {
                    let filePath = changes[i].uri.fsPath;
                    if (filePath.toLowerCase().endsWith('.al')) {
                        files.push(filePath);
                    }
                }
                return files;
            }
        }
        return [];
    }
    async loadGitExtension() {
        if (!this._gitApi) {
            const gitExtension = vscode.extensions.getExtension('vscode.git');
            if (gitExtension) {
                if (!gitExtension.isActive) {
                    await gitExtension.activate();
                }
                const gitExtensionExports = gitExtension.exports;
                this._gitApi = gitExtensionExports.getAPI(1);
            }
        }
    }
}
exports.GitClientService = GitClientService;
//# sourceMappingURL=gitClientService.js.map