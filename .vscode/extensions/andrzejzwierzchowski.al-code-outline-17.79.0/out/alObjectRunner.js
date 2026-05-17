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
exports.ALObjectRunner = void 0;
const vscode = __importStar(require("vscode"));
const azSymbolKind_1 = require("./symbollibraries/azSymbolKind");
class ALObjectRunner {
    _context;
    constructor(context) {
        this._context = context;
    }
    async runSymbolAsync(alSymbolInfo) {
        if (alSymbolInfo.id > 0) {
            switch (alSymbolInfo.kind) {
                case azSymbolKind_1.AZSymbolKind.TableObject:
                    await this.runObjectAsync('Table', alSymbolInfo.id);
                    break;
                case azSymbolKind_1.AZSymbolKind.PageObject:
                    await this.runObjectAsync('Page', alSymbolInfo.id);
                    break;
                case azSymbolKind_1.AZSymbolKind.ReportObject:
                    await this.runObjectAsync('Report', alSymbolInfo.id);
                    break;
            }
        }
    }
    async runObjectAsync(objectType, objectId) {
        if ((objectType) && (objectId > 0)) {
            if (this._context.alLangProxy.version.major >= 3)
                await this.runObjectWithAL30Async(objectType, objectId);
            else
                await this.runObjectInWebClientAsync(objectType, objectId);
        }
    }
    async runObjectWithAL30Async(objectType, objectId) {
        if ((vscode.workspace.workspaceFolders) && (vscode.workspace.workspaceFolders.length > 0)) {
            let launchConfiguration = await this._context.alLangProxy.getLaunchConfiguration();
            if (!launchConfiguration)
                return;
            let workspaceFolder = vscode.workspace.workspaceFolders[0];
            let config = {
                name: launchConfiguration.name,
                type: 'al',
                request: 'launch',
                noDebug: false,
                isRad: false,
                justDebug: true,
                authentication: launchConfiguration.authentication,
                port: launchConfiguration.port,
                schemaUpdateMode: launchConfiguration.schemaUpdateMode,
                server: launchConfiguration.server,
                serverInstance: launchConfiguration.serverInstance,
                startupObjectId: objectId,
                startupObjectType: objectType,
                tenant: launchConfiguration.tenant,
                applicationFamily: launchConfiguration.applicationFamily,
                breakOnError: launchConfiguration.breakOnError,
                breakOnRecordWrite: launchConfiguration.breakOnRecordWrite,
                skipCodeunit1: launchConfiguration.skipCodeunit1,
                launchBrowser: launchConfiguration.launchBrowser,
                sandboxName: launchConfiguration.sandboxName
            };
            vscode.debug.startDebugging(workspaceFolder, config);
        }
    }
    async runObjectInWebClientAsync(objectType, objectId) {
        let launchConfiguration = await this._context.alLangProxy.getLaunchConfiguration();
        if (!launchConfiguration)
            return;
        let opn = require('opn');
        let webClientPort = vscode.workspace.getConfiguration('alOutline').get('webClientPort');
        //collect settings
        let serverName = launchConfiguration.server;
        let serverInstance = launchConfiguration.serverInstance;
        let tenant = launchConfiguration.tenant;
        //ask for web client port
        let newPortNoText = await vscode.window.showInputBox({
            value: webClientPort?.toString(),
            prompt: 'Please enter Web Client port number, use 0 for default http/https port.'
        });
        if (!newPortNoText)
            return;
        var newPortNo = parseInt(newPortNoText, 10);
        if (!isNaN(newPortNo))
            webClientPort = newPortNo;
        //build url
        if ((webClientPort) && (webClientPort != 0))
            serverName = serverName + ':' + webClientPort.toString();
        var webClientUrl = serverName + '/' + serverInstance + '/WebClient?';
        if ((tenant) && (tenant != ''))
            webClientUrl = webClientUrl + 'tenant=' + tenant + '&';
        webClientUrl = webClientUrl + objectType + '=' + objectId.toString();
        //open url in web client
        opn(webClientUrl);
    }
}
exports.ALObjectRunner = ALObjectRunner;
//# sourceMappingURL=alObjectRunner.js.map