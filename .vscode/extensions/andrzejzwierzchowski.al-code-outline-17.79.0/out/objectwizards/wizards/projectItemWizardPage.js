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
exports.ProjectItemWizardPage = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const baseWebViewEditor_1 = require("../../webviews/baseWebViewEditor");
const crsAlLangExtHelper_1 = require("../../crsAlLangExtHelper");
const fileBuilder_1 = require("../fileBuilder");
const toolsGetProjectSettingsRequest_1 = require("../../langserver/toolsGetProjectSettingsRequest");
const toolsGetNewFileRequiredInterfacesRequest_1 = require("../../langserver/toolsGetNewFileRequiredInterfacesRequest");
class ProjectItemWizardPage extends baseWebViewEditor_1.BaseWebViewEditor {
    _toolsExtensionContext;
    _settings;
    _objectWizardData;
    constructor(toolsExtensionContext, title, settings, data) {
        super(toolsExtensionContext.vscodeExtensionContext, title);
        this._toolsExtensionContext = toolsExtensionContext;
        this._settings = settings;
        this._objectWizardData = data;
    }
    processWebViewMessage(message) {
        if (super.processWebViewMessage(message))
            return true;
        switch (message.command) {
            case 'idProviderChanged':
                this.onIdProviderChanged(message.data);
                return true;
            case 'finishClick':
                this.onFinish(message.data);
                return true;
            case 'cancelClick':
                this.onCancel();
                return true;
        }
        return false;
    }
    async finishWizard(data) {
        return false;
    }
    async onIdProviderChanged(data) {
        if ((data) && (data.idResProviderName)) {
            this._objectWizardData.idResProviderName = data.idResProviderName;
            let objectId = await this._toolsExtensionContext.idReservationService.suggestObjectId(this._objectWizardData.idResProviderName, this._objectWizardData.uri, this._objectWizardData.idResObjectType);
            if (objectId) {
                this._objectWizardData.objectId = objectId.toString();
                this.sendMessage({
                    command: 'setIdProvider',
                    data: {
                        idResProviderName: this._objectWizardData.idResProviderName,
                        objectId: this._objectWizardData.objectId
                    }
                });
            }
        }
    }
    async finishObjectIdReservation(data) {
        let objectId = Number.parseInt(data.objectId);
        if (!Number.isNaN(objectId)) {
            objectId = await this._toolsExtensionContext.idReservationService.reserveObjectId(data.idResProviderName, data.uri, data.idResObjectType, objectId);
            if (objectId)
                data.objectId = objectId.toString();
        }
    }
    async onFinish(data) {
        if (await this.finishWizard(data))
            this.close();
    }
    onCancel() {
        this.close();
    }
    async getObjectFileName(objectType, objectId, objectName) {
        let crsExtensionApi = await crsAlLangExtHelper_1.CRSALLangExtHelper.GetCrsAlLangExt();
        if (crsExtensionApi)
            return crsExtensionApi.ObjectNamesApi.GetObjectFileName(objectType, objectId, objectName);
        else
            return objectName + ".al";
    }
    async getExtObjectFileName(objectType, objectId, objectName, extendedObjectName) {
        let crsExtensionApi = await crsAlLangExtHelper_1.CRSALLangExtHelper.GetCrsAlLangExt();
        if (crsExtensionApi)
            return crsExtensionApi.ObjectNamesApi.GetObjectExtensionFileName(objectType, objectId, objectName, "", extendedObjectName);
        else
            return objectName + ".al";
    }
    async createObjectFile(objectType, objectId, objectName, content) {
        let fileName = await this.getObjectFileName(objectType, objectId, objectName);
        let destPath = this.getDestFilePath(this._settings.destDirectoryPath, objectType);
        if (destPath) {
            let fullPath = fileBuilder_1.FileBuilder.generateObjectFileInDir(destPath, fileName, content);
            if (fullPath)
                fileBuilder_1.FileBuilder.showFile(fullPath);
        }
    }
    async createObjectExtensionFile(objectType, objectId, objectName, extendedObjectName, content) {
        let fileName = await this.getExtObjectFileName(objectType, objectId, objectName, extendedObjectName);
        let destPath = this.getDestFilePath(this._settings.destDirectoryPath, objectType);
        if (destPath) {
            let fullPath = fileBuilder_1.FileBuilder.generateObjectFileInDir(destPath, fileName, content);
            if (fullPath) {
                fileBuilder_1.FileBuilder.showFile(fullPath);
            }
        }
    }
    async getNamespacesInformation(objectType, referencedObjects) {
        //get namespaces information
        let destFilePath = this.getDestFilePath(this._settings.destDirectoryPath, objectType);
        if (!destFilePath) {
            return undefined;
        }
        destFilePath = path.join(destFilePath, "newFile.al"); //this file won't be saved, it is just temporary name
        let alSettings = vscode.workspace.getConfiguration("al", vscode.Uri.file(destFilePath));
        let rootNamespace = alSettings.get("rootNamespace");
        return await this._toolsExtensionContext.toolsLangServerClient.getNewFileRequiredInterfaces(new toolsGetNewFileRequiredInterfacesRequest_1.ToolsGetNewFileRequiredInterfacesRequest(true, destFilePath, rootNamespace, referencedObjects));
    }
    getDestFilePath(targetPath, objectType) {
        //target path has been specified - do not use crs reorganize settings
        if (targetPath) {
            return targetPath;
        }
        let workspacePathSelected = false;
        //no path - select current workspace folder
        if (!targetPath) {
            targetPath = this._toolsExtensionContext.alLangProxy.getCurrentWorkspaceFolderPath();
            if (!targetPath) {
                return undefined;
            }
            workspacePathSelected = true;
        }
        //get crs settings        
        let settings = vscode.workspace.getConfiguration('CRS', vscode.Uri.file(targetPath));
        let saveFileAction = settings.get('OnSaveAlFileAction');
        if ((!saveFileAction) || (saveFileAction.toLowerCase() != 'reorganize'))
            return targetPath;
        //reorganize is active - find destination path
        if (!workspacePathSelected)
            targetPath = this._toolsExtensionContext.alLangProxy.getCurrentWorkspaceFolderPath();
        if (!targetPath)
            return undefined;
        let alPath = settings.get('AlSubFolderName');
        if (alPath)
            targetPath = path.join(targetPath, alPath);
        targetPath = path.join(targetPath, objectType.toLowerCase());
        return targetPath;
    }
    async getProjectSettings() {
        let uri = this._settings.getDestDirectoryUri();
        if (!uri) {
            let folders = vscode.workspace.workspaceFolders;
            if ((folders) && (folders.length > 0))
                uri = folders[0].uri;
        }
        //get project settings
        if (uri)
            return await this._toolsExtensionContext.toolsLangServerClient.getProjectSettings(new toolsGetProjectSettingsRequest_1.ToolsGetProjectSettingsRequest(uri.fsPath));
        return undefined;
    }
}
exports.ProjectItemWizardPage = ProjectItemWizardPage;
//# sourceMappingURL=projectItemWizardPage.js.map