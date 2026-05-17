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
exports.ALLangServerProxy = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const alSyntaxHelper_1 = require("./alSyntaxHelper");
const version_1 = require("../tools/version");
const appAreaMode_1 = require("../alsyntaxmodifiers/appAreaMode");
const alFieldToolTipsLocation_1 = require("./alFieldToolTipsLocation");
class ALLangServerProxy {
    //!!!private langClient : vscodelangclient.LanguageClient | undefined;
    extensionPath;
    version;
    alEditorService;
    constructor() {
        this.version = new version_1.Version();
        //!!!this.langClient = undefined;
        this.alEditorService = undefined;
        this.checkExtensionProperties();
    }
    getALExtension() {
        let alStoreExtension = vscode.extensions.getExtension("ms-dynamics-smb.al");
        let alFileExtension = vscode.extensions.getExtension("Microsoft.al");
        if ((alStoreExtension) && (alFileExtension)) {
            if (alStoreExtension.isActive)
                return alStoreExtension;
            if (alFileExtension.isActive)
                return alFileExtension;
            return alStoreExtension;
        }
        if (alStoreExtension)
            return alStoreExtension;
        return alFileExtension;
    }
    checkExtensionProperties() {
        let alExtension = this.getALExtension();
        if (alExtension) {
            this.extensionPath = alExtension.extensionPath;
            if (alExtension.packageJSON)
                this.version.parse(alExtension.packageJSON.version);
        }
    }
    checkLanguageClient() {
        if (!this.alEditorService) {
            let alExtension = this.getALExtension();
            if ((!alExtension) || (!alExtension.isActive))
                return false;
            if (alExtension.exports) {
                //find editor service
                if (alExtension.exports.services) {
                    let alServices = alExtension.exports.services;
                    for (let sidx = 0; (sidx < alServices.length) && (!this.alEditorService); sidx++) {
                        if (alServices[sidx].setActiveWorkspace)
                            this.alEditorService = alServices[sidx];
                    }
                }
            }
        }
        return true;
    }
    getWorkspaceSettings(resourceUri, workspacePath) {
        if (!resourceUri)
            resourceUri = vscode.Uri.file(workspacePath);
        let alConfig = vscode.workspace.getConfiguration('al', resourceUri);
        let alPackages = alConfig.get("packageCachePath");
        if (alPackages) {
            if (typeof (alPackages) != 'string') {
                if (alPackages.length > 0)
                    alPackages = alPackages[0];
                else
                    alPackages = undefined;
            }
        }
        return {
            workspacePath: workspacePath,
            alResourceConfigurationSettings: {
                assemblyProbingPaths: alConfig.get("assemblyProbingPaths"),
                codeAnalyzers: alConfig.get("codeAnalyzers"),
                enableCodeAnalysis: alConfig.get("enableCodeAnalysis"),
                backgroundCodeAnalysis: alConfig.get("backgroundCodeAnalysis"),
                packageCachePath: alPackages,
                ruleSetPath: alConfig.get("ruleSetPath"),
                enableCodeActions: alConfig.get("enableCodeActions"),
                incrementalBuild: alConfig.get("incrementalBuild"),
            },
            setActiveWorkspace: true,
            dependencyParentWorkspacePath: undefined
        };
    }
    getCurrentWorkspaceFolderPath() {
        if ((!vscode.workspace.workspaceFolders) || (vscode.workspace.workspaceFolders.length == 0))
            return undefined;
        if (vscode.workspace.workspaceFolders.length > 1) {
            this.checkLanguageClient();
            if (this.alEditorService) {
                if (this.alEditorService.lastActiveWorkspacePath)
                    return this.alEditorService.lastActiveWorkspacePath;
            }
        }
        return vscode.workspace.workspaceFolders[0].uri.fsPath;
    }
    getSymbolLabels(list, kind) {
        let out = [];
        if (list && list.items) {
            for (let i = 0; i < list.items.length; i++) {
                let item = list.items[i];
                if (item.kind === kind) {
                    out.push(alSyntaxHelper_1.ALSyntaxHelper.fromNameText(item.label.toString()));
                }
            }
        }
        return out;
    }
    async getWorkspaceSymbol(objectType, objectName) {
        let list = await vscode.commands.executeCommand('vscode.executeWorkspaceSymbolProvider', objectName);
        if ((!list) || (list.length == 0))
            return undefined;
        let fullName = objectType + ' ' + objectName;
        fullName = fullName.toLowerCase();
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            if (((item.kind == vscode.SymbolKind.Class) || (item.kind == vscode.SymbolKind.Object)) && (item.name.toLowerCase() == fullName) && (item.location)) {
                return item.location;
            }
        }
        return undefined;
    }
    /*
    !!!
    async getDefinitionLocationFromDocument(docUri: string, pos: vscode.Position) : Promise<vscode.Location | undefined> {
        let docPos : vscode.Location | undefined = undefined;
        try {
            this.checkLanguageClient();
            if (!this.langClient)
                return undefined;

            let tokenSource : vscode.CancellationTokenSource = new vscode.CancellationTokenSource();
            let token : vscode.CancellationToken = tokenSource.token;
            let launchConfiguration = await this.getLaunchConfiguration();

            if (launchConfiguration) {

                let docPosTemp : any = await this.langClient.sendRequest<any>('al/gotodefinition', {
                    launchConfiguration : launchConfiguration,
                    textDocumentPositionParams : {
                        textDocument : {
                            uri : docUri.toString()
                        },
                        position : {
                            line : pos.line,
                            character : pos.character
                        }
                    },
                    context : undefined
                }, token);

                if (docPosTemp) {
                    docPos = new vscode.Location(
                        vscode.Uri.parse(docPosTemp.uri),
                        new vscode.Range(docPosTemp.range.start.line, docPosTemp.range.start.character,
                            docPosTemp.range.end.line, docPosTemp.range.end.character));
                }

            }
        }
        catch (e) {
            return undefined;
        }

        return docPos;
    }
    */
    async getLaunchConfiguration() {
        if ((!vscode.workspace.workspaceFolders) || (vscode.workspace.workspaceFolders.length == 0))
            return undefined;
        let launchFilePath = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, '.vscode/launch.json');
        let config = vscode.workspace.getConfiguration("launch", vscode.Uri.file(launchFilePath));
        let allConfigList = config.get("configurations");
        if (!allConfigList)
            return undefined;
        let configList = allConfigList.filter(p => p.type === 'al');
        if ((!configList) || (configList.length == 0))
            return undefined;
        if (configList.length == 1)
            return configList[0];
        //select configuration from drop down list
        let configItems = [];
        for (let i = 0; i < configList.length; i++) {
            if (configList[i].name)
                configItems.push(configList[i].name);
        }
        let selectedItem = await vscode.window.showQuickPick(configItems, {
            placeHolder: 'Please select launch configuration'
        });
        if (selectedItem) {
            for (let i = 0; i < configList.length; i++) {
                if (configList[i].name == selectedItem)
                    return configList[i];
            }
        }
        return undefined;
    }
    getAppManifest(resourceUri) {
        let folder;
        if (resourceUri)
            folder = vscode.workspace.getWorkspaceFolder(resourceUri);
        else if (vscode.workspace.workspaceFolders)
            folder = vscode.workspace.workspaceFolders[0];
        if (folder) {
            //load app.json
            let appFilePath = path.join(folder.uri.fsPath, "app.json");
            try {
                let fs = require('fs');
                let content = fs.readFileSync(appFilePath, 'utf8');
                //remove BOM from UTF-8
                if ((content) && (content.length > 0) && (content.charCodeAt(0) === 0xFEFF)) {
                    content = content.substr(1);
                }
                return JSON.parse(content);
            }
            catch (e) {
            }
        }
        return undefined;
    }
    getRuntimeVersion(resourceUri) {
        let version = new version_1.Version();
        let appData = this.getAppManifest(resourceUri);
        if ((appData) && (appData.runtime)) {
            version.parse(appData.runtime);
        }
        return version;
    }
    getIdRangeStart(resourceUri) {
        let val = 0;
        let appData = this.getAppManifest(resourceUri);
        if (appData) {
            if ((appData.idRange) && (appData.idRange.from)) {
                val = Number.parseInt(appData.idRange.from);
                if (!isNaN(val))
                    return val;
            }
            if ((appData.idRanges) && (appData.idRanges.length)) {
                for (let i = 0; i < appData.idRanges.length; i++) {
                    if (appData.idRanges[i].from) {
                        val = Number.parseInt(appData.idRanges[i].from);
                        if (!isNaN(val))
                            return val;
                    }
                }
            }
        }
        return 0;
    }
    supportsInterfaces(resourceUri) {
        let runtimeVersion = this.getRuntimeVersion(resourceUri);
        let interfacesVersion = version_1.Version.create("5.0");
        return runtimeVersion.isGreaterOrEqual(interfacesVersion);
    }
    supportsAppAreasInheritance(resourceUri) {
        let runtimeVersion = this.getRuntimeVersion(resourceUri);
        let inheritAppAreasMinVersion = version_1.Version.create("10.0");
        return runtimeVersion.isGreaterOrEqual(inheritAppAreasMinVersion);
    }
    getAppAreaMode(resourceUri) {
        if (!this.supportsAppAreasInheritance(resourceUri))
            return appAreaMode_1.AppAreaMode.addToAllControls;
        let settings = vscode.workspace.getConfiguration('alOutline', resourceUri);
        let appAreaModeValue = settings.get('appAreaMode');
        if ((appAreaModeValue) && (appAreaModeValue != '')) {
            let type = appAreaMode_1.AppAreaMode[appAreaModeValue];
            if (type !== undefined)
                return type;
        }
        return appAreaMode_1.AppAreaMode.inheritFromMainObject;
    }
    fieldToolTipsLocation(resourceUri) {
        let settings = vscode.workspace.getConfiguration('alOutline', resourceUri);
        let locationValue = settings.get('fieldToolTipsLocation');
        let location = alFieldToolTipsLocation_1.ALFieldToolTipsLocation.page;
        if ((locationValue) && (locationValue === 'table')) {
            let runtimeVersion = this.getRuntimeVersion(resourceUri);
            let tableToolTipsMinVersion = version_1.Version.create("13.0");
            if (runtimeVersion.isGreaterOrEqual(tableToolTipsMinVersion)) {
                location = alFieldToolTipsLocation_1.ALFieldToolTipsLocation.table;
            }
        }
        return location;
    }
}
exports.ALLangServerProxy = ALLangServerProxy;
//# sourceMappingURL=alLangServerProxy.js.map