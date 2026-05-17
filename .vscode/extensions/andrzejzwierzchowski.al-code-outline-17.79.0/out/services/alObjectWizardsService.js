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
exports.ALObjectWizardsService = void 0;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const alPageWizard_1 = require("../objectwizards/wizards/alPageWizard");
const alXmlPortWizard_1 = require("../objectwizards/wizards/alXmlPortWizard");
const alReportWizard_1 = require("../objectwizards/wizards/alReportWizard");
const alQueryWizard_1 = require("../objectwizards/wizards/alQueryWizard");
const alEnumWizard_1 = require("../objectwizards/wizards/alEnumWizard");
const alEnumExtWizard_1 = require("../objectwizards/wizards/alEnumExtWizard");
const alObjectWizardSettings_1 = require("../objectwizards/wizards/alObjectWizardSettings");
const alTableWizard_1 = require("../objectwizards/wizards/alTableWizard");
const alCodeunitWizard_1 = require("../objectwizards/wizards/alCodeunitWizard");
const alInterfaceWizard_1 = require("../objectwizards/wizards/alInterfaceWizard");
const alTableExtWizard_1 = require("../objectwizards/wizards/alTableExtWizard");
const alPageExtWizard_1 = require("../objectwizards/wizards/alPageExtWizard");
const alReportExtWizard_1 = require("../objectwizards/wizards/alReportExtWizard");
const devToolsExtensionService_1 = require("./devToolsExtensionService");
const alPermissionSetWizard_1 = require("../objectwizards/wizards/alPermissionSetWizard");
const alPermissionSetExtensionWizard_1 = require("../objectwizards/wizards/alPermissionSetExtensionWizard");
class ALObjectWizardsService extends devToolsExtensionService_1.DevToolsExtensionService {
    _wizards;
    constructor(context) {
        //initialize
        super(context);
        //create list of wizards
        this._wizards = [];
        this._wizards.push(new alTableWizard_1.ALTableWizard(context, 'Table', 'New AL Table Wizard', 'Allows to select table name and enter list of fields'));
        this._wizards.push(new alTableExtWizard_1.ALTableExtWizard(context, 'Table Extension', 'New AL Table Extension Wizard', 'Allows to add list of fields to existing table'));
        this._wizards.push(new alPageWizard_1.ALPageWizard(context, 'Page', 'New AL Page Wizard', 'Allows to select page type, fast tabs, source table and fields.'));
        this._wizards.push(new alPageExtWizard_1.ALPageExtWizard(context, 'Page Extension', 'New AL Page Extension Wizard', 'Allows to add layout and action controls to existing page'));
        this._wizards.push(new alCodeunitWizard_1.ALCodeunitWizard(context, 'Codeunit', 'New AL Codeunit Wizard', 'Allows to create simple codeunits and interface implementations'));
        this._wizards.push(new alInterfaceWizard_1.ALInterfaceWizard(context, 'Interface', 'New AL Interface Wizard', 'Allows to create a new interface and copy public procedures from a codeunit'));
        this._wizards.push(new alXmlPortWizard_1.ALXmlPortWizard(context, 'XmlPort', 'New AL XmlPort Wizard', 'Allows to select source table and fields'));
        this._wizards.push(new alReportWizard_1.ALReportWizard(context, 'Report', 'New AL Report Wizard', 'Allows to select source table and fields'));
        this._wizards.push(new alReportExtWizard_1.ALReportExtWizard(context, 'Report Extension', 'New AL Report Extension Wizard', 'Allows to add dataitems and columns to existing reports'));
        this._wizards.push(new alQueryWizard_1.ALQueryWizard(context, 'Query', 'New AL Query Wizard', 'Allows to select query type, source table and fields'));
        this._wizards.push(new alEnumWizard_1.ALEnumWizard(context, 'Enum', 'New AL Enum Wizard', 'Allows to select list of enum values and captions'));
        this._wizards.push(new alEnumExtWizard_1.ALEnumExtWizard(context, 'Enum Extension', 'New AL Enum Extension Wizard', 'Allows to add list of enum values and captions to existing enum'));
        this._wizards.push(new alPermissionSetWizard_1.ALPermissionSetWizard(context, 'PermissionSet', 'New AL PermissionSet Wizard', 'Allows to create permission set for extension objects'));
        this._wizards.push(new alPermissionSetExtensionWizard_1.ALPermissionSetExtensionWizard(context, 'PermissionSetExtension', 'New AL PermissionSetExtension Wizard', 'Allows to create permission set extension for extension objects'));
        //register commands
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand('azALDevTools.newALFile', (fileUri) => {
            this.runALWizards(fileUri);
        }));
    }
    async runALWizards(fileUri) {
        let settings = new alObjectWizardSettings_1.ALObjectWizardSettings();
        //try to detect destination folder
        if (!fileUri) {
            if ((vscode.window.activeTextEditor) && (vscode.window.activeTextEditor.document) && (vscode.window.activeTextEditor.document.uri))
                fileUri = vscode.window.activeTextEditor.document.uri;
            else if ((vscode.workspace.workspaceFolders) && (vscode.workspace.workspaceFolders.length > 0))
                fileUri = vscode.workspace.workspaceFolders[0].uri;
        }
        if (!fileUri) {
            await vscode.window.showErrorMessage('File cannot be created. Cannot detect destination folder.');
            return;
        }
        let fullPath = fileUri.fsPath;
        if (fs.lstatSync(fullPath).isDirectory()) {
            settings.destDirectoryPath = fullPath;
        }
        else {
            let parsedPath = path.parse(fullPath);
            settings.destDirectoryPath = parsedPath.dir;
        }
        //select wizard
        let wizard = await vscode.window.showQuickPick(this._wizards, {
            placeHolder: 'Select wizard type'
        });
        if (!wizard)
            return;
        //run wizard
        wizard.run(settings);
    }
}
exports.ALObjectWizardsService = ALObjectWizardsService;
//# sourceMappingURL=alObjectWizardsService.js.map