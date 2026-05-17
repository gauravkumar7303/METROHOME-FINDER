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
exports.ALPermissionSetExtensionWizardPage = void 0;
const path = __importStar(require("path"));
const alPermissionSetExtensionSyntaxBuilder_1 = require("../syntaxbuilders/alPermissionSetExtensionSyntaxBuilder");
const alPermissionSetWizardPage_1 = require("./alPermissionSetWizardPage");
class ALPermissionSetExtensionWizardPage extends alPermissionSetWizardPage_1.ALPermissionSetWizardPage {
    _permissionSetExtensionWizardData;
    constructor(toolsExtensionContext, settings, data) {
        super(toolsExtensionContext, "AL Perm. Set Ext. Wizard", settings, data);
        this._permissionSetExtensionWizardData = data;
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'alpermissionsetextwizard', 'alpermissionsetextwizard.html');
    }
    getViewType() {
        return "azALDevTools.ALPermissionSetExtensionWizard";
    }
    async setBuilderData(data) {
        this._permissionSetExtensionWizardData.basePermissionSet = data.basePermissionSet;
        await super.setBuilderData(data);
    }
    collectReferencedObjects() {
        let referencedObjects = super.collectReferencedObjects();
        if (this._permissionSetExtensionWizardData.basePermissionSet) {
            referencedObjects.push({
                nameWithNamespaceOrId: this._permissionSetExtensionWizardData.basePermissionSet,
                typeName: 'PermissionSet'
            });
        }
        return referencedObjects;
    }
    getWizardObjectType() {
        return 'PermissionSetExtension';
    }
    runBuilder() {
        //build new object
        var builder = new alPermissionSetExtensionSyntaxBuilder_1.ALPermissionSetExtensionSyntaxBuilder();
        var source = builder.buildFromPermissionSetExtWizardData(this._settings.getDestDirectoryUri(), this._permissionSetExtensionWizardData);
        this.createObjectExtensionFile('PermissionSetExtension', this._permissionSetExtensionWizardData.objectId, this._permissionSetExtensionWizardData.objectName, this._permissionSetExtensionWizardData.basePermissionSet, source);
    }
}
exports.ALPermissionSetExtensionWizardPage = ALPermissionSetExtensionWizardPage;
//# sourceMappingURL=alPermissionSetExtensionWizardPage.js.map