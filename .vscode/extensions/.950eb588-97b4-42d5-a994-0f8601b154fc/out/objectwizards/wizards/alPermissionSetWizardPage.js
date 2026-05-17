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
exports.ALPermissionSetWizardPage = void 0;
const path = __importStar(require("path"));
const toolsGetObjectsListRequest_1 = require("../../langserver/symbolsinformation/toolsGetObjectsListRequest");
const toolsSymbolInformationRequest_1 = require("../../langserver/symbolsinformation/toolsSymbolInformationRequest");
const smbolWithNameInformation_1 = require("../../symbolsinformation/smbolWithNameInformation");
const alPermissionSetSyntaxBuilder_1 = require("../syntaxbuilders/alPermissionSetSyntaxBuilder");
const projectItemWizardPage_1 = require("./projectItemWizardPage");
class ALPermissionSetWizardPage extends projectItemWizardPage_1.ProjectItemWizardPage {
    _permissionSetWizardData;
    constructor(toolsExtensionContext, title, settings, data) {
        if (!title)
            title = "AL Permission Set Wizard";
        super(toolsExtensionContext, title, settings, data);
        this._permissionSetWizardData = data;
    }
    onDocumentLoaded() {
        //send data to the web view
        this.sendMessage({
            command: 'setData',
            data: this._permissionSetWizardData
        });
        this.loadPermissionSets();
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'alpermissionsetwizard', 'alpermissionsetwizard.html');
    }
    getViewType() {
        return "azALDevTools.ALPermissionSetWizard";
    }
    async finishWizard(data) {
        await this.setBuilderData(data);
        this.runBuilder();
        return true;
    }
    getWizardObjectType() {
        return 'PermissionSet';
    }
    async setBuilderData(data) {
        //build parameters
        this._permissionSetWizardData.objectId = data.objectId;
        this._permissionSetWizardData.objectName = data.objectName;
        this._permissionSetWizardData.objectCaption = data.objectCaption;
        this._permissionSetWizardData.inclAllObjects = data.inclAllObjects;
        this._permissionSetWizardData.selectedPermissionSetList = data.selectedPermissionSetList;
        //load project settings from the language server
        this._permissionSetWizardData.projectSettings = await this.getProjectSettings();
        await this.finishObjectIdReservation(this._permissionSetWizardData);
        //get all extension objects
        if (this._permissionSetWizardData.inclAllObjects) {
            let getObjectsRequest = new toolsGetObjectsListRequest_1.ToolsGetObjectsListRequest(this._settings.getDestDirectoryPath());
            getObjectsRequest.setIncludeObjectsWithPermissions();
            let getObjectsResponse = await this._toolsExtensionContext.toolsLangServerClient.getObjectsList(getObjectsRequest);
            if ((getObjectsResponse) && (getObjectsResponse.symbols)) {
                this._permissionSetWizardData.selectedObjectsList = this.removeObjectsWithFullInherentPermissions(getObjectsResponse.symbols);
            }
        }
        //get namespaces information
        let referencedObjects = this.collectReferencedObjects();
        let fileNamespaces = await this.getNamespacesInformation(this.getWizardObjectType(), referencedObjects);
        if (fileNamespaces) {
            this._permissionSetWizardData.objectNamespace = fileNamespaces.namespaceName;
            this._permissionSetWizardData.objectUsings = fileNamespaces.usings;
            this.addReferencedObjectsNamespaces();
        }
    }
    collectReferencedObjects() {
        let referencedObjects = [];
        if (this._permissionSetWizardData.selectedPermissionSetList) {
            for (let i = 0; i < this._permissionSetWizardData.selectedPermissionSetList.length; i++) {
                referencedObjects.push({
                    nameWithNamespaceOrId: this._permissionSetWizardData.selectedPermissionSetList[i],
                    typeName: 'PermissionSet'
                });
            }
        }
        return referencedObjects;
    }
    addReferencedObjectsNamespaces() {
        //collect unique namespaces from namespace property of elements of this._permissionSetWizardData.selectedObjectsList array
        if ((this._permissionSetWizardData.objectNamespace) && (this._permissionSetWizardData.objectNamespace !== "") && (this._permissionSetWizardData.selectedObjectsList)) {
            if (!this._permissionSetWizardData.objectUsings) {
                this._permissionSetWizardData.objectUsings = [];
            }
            for (let i = 0; i < this._permissionSetWizardData.selectedObjectsList.length; i++) {
                let namespaceName = this._permissionSetWizardData.selectedObjectsList[i].namespace;
                if ((namespaceName) && (namespaceName !== this._permissionSetWizardData.objectNamespace) && (this._permissionSetWizardData.objectUsings.indexOf(namespaceName) < 0)) {
                    this._permissionSetWizardData.objectUsings.push(namespaceName);
                }
            }
        }
    }
    removeObjectsWithFullInherentPermissions(allObjects) {
        let objects = [];
        for (let i = 0; i < allObjects.length; i++) {
            if (!allObjects[i].fullInherentPermissions) {
                objects.push(allObjects[i]);
            }
        }
        return objects;
    }
    runBuilder() {
        //build new object
        var builder = new alPermissionSetSyntaxBuilder_1.ALPermissionSetSyntaxBuilder();
        var source = builder.buildFromPermissionSetWizardData(this._settings.getDestDirectoryUri(), this._permissionSetWizardData);
        this.createObjectFile('PermissionSet', '', this._permissionSetWizardData.objectName, source);
    }
    async loadPermissionSets() {
        let response = await this._toolsExtensionContext.toolsLangServerClient.getPermissionSetsList(new toolsSymbolInformationRequest_1.ToolsSymbolInformationRequest(this._settings.getDestDirectoryPath(), false));
        if (response)
            this._permissionSetWizardData.permissionSetList = smbolWithNameInformation_1.SymbolWithNameInformation.toNamesList(response.symbols);
        //let resourceUri = this._settings.getDestDirectoryUri();
        //this._wizardData.codeunitList = await this._toolsExtensionContext.alLangProxy.getCodeunitList(resourceUri);
        if ((this._permissionSetWizardData.permissionSetList) && (this._permissionSetWizardData.permissionSetList.length > 0))
            this.sendMessage({
                command: "setPermissionSets",
                data: this._permissionSetWizardData.permissionSetList
            });
    }
}
exports.ALPermissionSetWizardPage = ALPermissionSetWizardPage;
//# sourceMappingURL=alPermissionSetWizardPage.js.map