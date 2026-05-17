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
exports.ALCodeTransformationService = void 0;
const vscode = __importStar(require("vscode"));
const appAreasModifier_1 = require("../alsyntaxmodifiers/appAreasModifier");
const toolTipsModifier_1 = require("../alsyntaxmodifiers/toolTipsModifier");
const dataClassificationModifier_1 = require("../alsyntaxmodifiers/dataClassificationModifier");
const onDocumentSaveModifier_1 = require("../alsyntaxmodifiers/onDocumentSaveModifier");
const withModifier_1 = require("../alsyntaxmodifiers/withModifier");
const fieldCaptionsModifier_1 = require("../alsyntaxmodifiers/fieldCaptionsModifier");
const pageControlsCaptionsModifier_1 = require("../alsyntaxmodifiers/pageControlsCaptionsModifier");
const objectCaptionsModifier_1 = require("../alsyntaxmodifiers/objectCaptionsModifier");
const devToolsExtensionService_1 = require("./devToolsExtensionService");
const fixKeywordsCaseModifier_1 = require("../alsyntaxmodifiers/fixKeywordsCaseModifier");
const fixIdentifiersCaseModifier_1 = require("../alsyntaxmodifiers/fixIdentifiersCaseModifier");
const convertObjectIdsToNamesModifier_1 = require("../alsyntaxmodifiers/convertObjectIdsToNamesModifier");
const removeUnusedVariablesModifier_1 = require("../alsyntaxmodifiers/removeUnusedVariablesModifier");
const addMissingParenthesesModifier_1 = require("../alsyntaxmodifiers/addMissingParenthesesModifier");
const sortProceduresModifier_1 = require("../alsyntaxmodifiers/sortProceduresModifier");
const sortPermissionsModifier_1 = require("../alsyntaxmodifiers/sortPermissionsModifier");
const sortPropertiesModifier_1 = require("../alsyntaxmodifiers/sortPropertiesModifier");
const sortReportColumnsModifier_1 = require("../alsyntaxmodifiers/sortReportColumnsModifier");
const sortTableFieldsModifier_1 = require("../alsyntaxmodifiers/sortTableFieldsModifier");
const sortVariablesModifier_1 = require("../alsyntaxmodifiers/sortVariablesModifier");
const sortPermissionSetListModifier_1 = require("../alsyntaxmodifiers/sortPermissionSetListModifier");
const batchSyntaxModifier_1 = require("../alsyntaxmodifiers/batchSyntaxModifier");
const workspaceCommandSyntaxModifier_1 = require("../alsyntaxmodifiers/workspaceCommandSyntaxModifier");
const lockRemovedFieldsCaptionsModifier_1 = require("../alsyntaxmodifiers/lockRemovedFieldsCaptionsModifier");
const formatDocumentModifier_1 = require("../alsyntaxmodifiers/formatDocumentModifier");
const trimTrailingWhitespaceModifier_1 = require("../alsyntaxmodifiers/trimTrailingWhitespaceModifier");
const removeBeginEndModifier_1 = require("../alsyntaxmodifiers/removeBeginEndModifier");
const refreshToolTipsModifier_1 = require("../alsyntaxmodifiers/refreshToolTipsModifier");
const reuseSingleFieldToolTipModifier_1 = require("../alsyntaxmodifiers/reuseSingleFieldToolTipModifier");
const removeEmptyLinesModifier_1 = require("../alsyntaxmodifiers/removeEmptyLinesModifier");
const removeEmptySectionsModifier_1 = require("../alsyntaxmodifiers/removeEmptySectionsModifier");
const sortCustomizationsModifier_1 = require("../alsyntaxmodifiers/sortCustomizationsModifier");
const removeStrSubstNoFromErrorModifier_1 = require("../alsyntaxmodifiers/removeStrSubstNoFromErrorModifier");
const removeEmptyTriggersModifier_1 = require("../alsyntaxmodifiers/removeEmptyTriggersModifier");
const makeFlowFieldsReadOnlyModifier_1 = require("../alsyntaxmodifiers/makeFlowFieldsReadOnlyModifier");
const removeRedundantAppAreasModifier_1 = require("../alsyntaxmodifiers/removeRedundantAppAreasModifier");
const enumCaptionsModifier_1 = require("../alsyntaxmodifiers/enumCaptionsModifier");
const addAllObjectsPermissionsModifier_1 = require("../alsyntaxmodifiers/addAllObjectsPermissionsModifier");
const addTableDataCaptionFieldsModifier_1 = require("../alsyntaxmodifiers/addTableDataCaptionFieldsModifier");
const AddDropDownFieldGroupsModifier_1 = require("../alsyntaxmodifiers/AddDropDownFieldGroupsModifier");
const addReferencedTablesPermissionsModifier_1 = require("../alsyntaxmodifiers/addReferencedTablesPermissionsModifier");
const generateCSVXmlPortHeadersModifier_1 = require("../alsyntaxmodifiers/generateCSVXmlPortHeadersModifier");
const removeRedundantDataClassificationModifier_1 = require("../alsyntaxmodifiers/removeRedundantDataClassificationModifier");
const collapseEmptyBracketsModifier_1 = require("../alsyntaxmodifiers/collapseEmptyBracketsModifier");
const oneStatementPerLineModifier_1 = require("../alsyntaxmodifiers/oneStatementPerLineModifier");
const addDotToToolTipModifier_1 = require("../alsyntaxmodifiers/addDotToToolTipModifier");
const removeProceduresSemicolonModifier_1 = require("../alsyntaxmodifiers/removeProceduresSemicolonModifier");
const addUsingRegionModifier_1 = require("../alsyntaxmodifiers/addUsingRegionModifier");
const sortUsingsModifier_1 = require("../alsyntaxmodifiers/sortUsingsModifier");
const removeUnusedUsingsModifier_1 = require("../alsyntaxmodifiers/removeUnusedUsingsModifier");
const addNamespaceSupportModifier_1 = require("../alsyntaxmodifiers/addNamespaceSupportModifier");
const sortTriggersModifier_1 = require("../alsyntaxmodifiers/sortTriggersModifier");
class ALCodeTransformationService extends devToolsExtensionService_1.DevToolsExtensionService {
    _syntaxFactories;
    constructor(context) {
        super(context);
        this._syntaxFactories = {};
        //document range commands
        this.registerDocumentRangeCommand('azALDevTools.sortVariables', () => new sortVariablesModifier_1.SortVariablesModifier(this._context));
        this.registerDocumentRangeCommand('azALDevTools.sortProcedures', () => new sortProceduresModifier_1.SortProceduresModifier(this._context));
        this.registerDocumentRangeCommand('azALDevTools.sortTriggers', () => new sortTriggersModifier_1.SortTriggersModifier(this._context));
        this.registerDocumentRangeCommand('azALDevTools.sortProperties', () => new sortPropertiesModifier_1.SortPropertiesModifier(this._context));
        this.registerDocumentRangeCommand('azALDevTools.sortReportColumns', () => new sortReportColumnsModifier_1.SortReportColumnsModifier(this._context));
        this.registerDocumentRangeCommand('azALDevTools.sortTableFields', () => new sortTableFieldsModifier_1.SortTableFieldsModifier(this._context));
        this.registerDocumentRangeCommand('azALDevTools.sortPermissions', () => new sortPermissionsModifier_1.SortPermissionsModifier(this._context));
        this.registerDocumentRangeCommand('azALDevTools.sortPermissionSetList', () => new sortPermissionSetListModifier_1.SortPermissionSetListModifier(this._context));
        this.registerDocumentRangeCommand('azALDevTools.sortCustomizations', () => new sortCustomizationsModifier_1.SortCustomizationsModifier(this._context));
        this.registerDocumentRangeCommand('azALDevTools.addAllObjectsPermissions', () => new addAllObjectsPermissionsModifier_1.AddAllObjectsPermissionsModifier(this._context));
        this.registerDocumentRangeCommand('azALDevTools.addReferencedTablesPermissions', () => new addReferencedTablesPermissionsModifier_1.AddReferencedTablesPermissionsModifier(this._context));
        this.registerDocumentRangeCommand('azALDevTools.generateCSVXmlPortHeaders', () => new generateCSVXmlPortHeadersModifier_1.GenerateCSVXmlPortHeadersModifier(this._context));
        this.registerDocumentRangeCommand('azALDevTools.sortUsings', () => new sortUsingsModifier_1.SortUsingsModifier(this._context));
        this.registerDocumentRangeCommand('azALDevTools.removeVariable', () => new workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier(this._context, 'removeVariable', 'removeVariable'));
        this.registerDocumentSymbolCommand('azALDevTools.ReuseToolTipFromOtherPages', () => new reuseSingleFieldToolTipModifier_1.ReuseSingleFieldToolTipModifier(this._context));
        //onsave command
        this.registerDocumentCommand('azALDevTools.fixDocumentOnSave', () => new onDocumentSaveModifier_1.OnDocumentSaveModifier(this._context));
        //editor and workspace commands
        this.registerModifierCommands('RemoveWithStatements', 'azALDevTools.RemoveEditorWithStatements', 'azALDevTools.RemoveProjectWithStatements', () => new withModifier_1.WithModifier(this._context));
        this.registerModifierCommands('AddApplicationAreas', 'azALDevTools.AddEditorApplicationAreas', 'azALDevTools.AddProjectApplicationAreas', () => new appAreasModifier_1.AppAreasModifier(this._context));
        this.registerModifierCommands('AddToolTips', 'azALDevTools.AddEditorToolTip', 'azALDevTools.AddProjectToolTip', () => new toolTipsModifier_1.ToolTipModifier(this._context));
        this.registerModifierCommands('RefreshToolTips', 'azALDevTools.RefreshEditorToolTips', 'azALDevTools.RefreshProjectToolTips', () => new refreshToolTipsModifier_1.RefreshToolTipsModifier(this._context));
        this.registerModifierCommands('AddTableFieldCaptions', 'azALDevTools.AddEditorFieldCaption', 'azALDevTools.AddProjectFieldCaption', () => new fieldCaptionsModifier_1.FieldCaptionsModifier(this._context));
        this.registerModifierCommands('AddTableDataCaptionFields', 'azALDevTools.AddEditorTableDataCaptionFields', 'azALDevTools.AddProjectTableDataCaptionFields', () => new addTableDataCaptionFieldsModifier_1.AddTableDataCaptionFieldsModifier(this._context));
        this.registerModifierCommands('AddDropDownFieldGroups', 'azALDevTools.AddEditorDropDownFieldGroups', 'azALDevTools.AddProjectDropDownFieldGroups', () => new AddDropDownFieldGroupsModifier_1.AddDropDownFieldGroupsModifier(this._context));
        this.registerModifierCommands('AddEndingToolTipDot', 'azALDevTools.AddEditorEndingToolTipDot', 'azALDevTools.AddProjectEndingToolTipDot', () => new addDotToToolTipModifier_1.AddDotToToolTipModifier(this._context));
        this.registerModifierCommands('AddEnumValuesCaptions', 'azALDevTools.AddEditorEnumValuesCaption', 'azALDevTools.AddProjectEnumValuesCaption', () => new enumCaptionsModifier_1.EnumCaptionsModifier(this._context));
        this.registerModifierCommands('LockRemovedFieldCaptions', 'azALDevTools.LockEditorRemovedFieldCaptions', 'azALDevTools.LockProjectRemovedFieldCaptions', () => new lockRemovedFieldsCaptionsModifier_1.LockRemovedFieldsCaptionsModifier(this._context));
        this.registerModifierCommands('AddPageFieldCaptions', 'azALDevTools.AddEditorPageFieldCaption', 'azALDevTools.AddProjectPageFieldCaption', () => new pageControlsCaptionsModifier_1.PageControlsCaptionsModifier(this._context));
        this.registerModifierCommands('AddObjectCaptions', 'azALDevTools.AddEditorObjectCaption', 'azALDevTools.AddProjectObjectCaption', () => new objectCaptionsModifier_1.ObjectCaptionsModifier(this._context));
        this.registerModifierCommands('FixKeywordsCase', 'azALDevTools.FixEditorKeywordsCase', 'azALDevTools.FixProjectKeywordsCase', () => new fixKeywordsCaseModifier_1.FixKeywordsCaseModifier(this._context));
        this.registerModifierCommands('FixIdentifiersCase', 'azALDevTools.FixEditorIdentifiersCase', 'azALDevTools.FixProjectIdentifiersCase', () => new fixIdentifiersCaseModifier_1.FixIdentifiersCaseModifier(this._context));
        this.registerModifierCommands('ConvertObjectIdsToNames', 'azALDevTools.ConvertEditorObjectIdsToNames', 'azALDevTools.ConvertProjectObjectIdsToNames', () => new convertObjectIdsToNamesModifier_1.ConvertObjectIdsToNamesModifier(this._context));
        this.registerModifierCommands('AddMissingParentheses', 'azALDevTools.AddMissingEditorParentheses', 'azALDevTools.AddMissingProjectParentheses', () => new addMissingParenthesesModifier_1.AddMissingParenthesesModifier(this._context));
        this.registerModifierCommands('AddDataClassifications', 'azALDevTools.AddEditorDataClassification', 'azALDevTools.AddProjectDataClassification', () => new dataClassificationModifier_1.DataClassificationModifier(this._context));
        this.registerModifierCommands('MakeFlowFieldsReadOnly', 'azALDevTools.MakeEditorFlowFieldsReadOnly', 'azALDevTools.MakeProjectFlowFieldsReadOnly', () => new makeFlowFieldsReadOnlyModifier_1.MakeFlowFieldsReadOnlyModifier(this._context));
        this.registerModifierCommands('RemoveUnusedVariables', 'azALDevTools.RemoveEditorUnusedVariables', 'azALDevTools.RemoveProjectUnusedVariables', () => new removeUnusedVariablesModifier_1.RemoveUnusedVariablesModifier(this._context));
        this.registerModifierCommands('RemoveBeginEnd', 'azALDevTools.RemoveEditorBeginEnd', 'azALDevTools.RemoveProjectBeginEnd', () => new removeBeginEndModifier_1.RemoveBeginEndModifier(this._context));
        this.registerModifierCommands('RemoveProceduresSemicolon', 'azALDevTools.RemoveEditorProceduresSemicolon', 'azALDevTools.RemoveProjectProceduresSemicolon', () => new removeProceduresSemicolonModifier_1.RemoveProceduresSemicolonModifier(this._context));
        this.registerModifierCommands('CollapseEmptyBrackets', 'azALDevTools.CollapseEditorEmptyBrackets', 'azALDevTools.CollapseProjectEmptyBrackets', () => new collapseEmptyBracketsModifier_1.CollapseEmptyBracketsModifier(this._context));
        this.registerModifierCommands('OneStatementPerLine', 'azALDevTools.EditorOneStatementPerLine', 'azALDevTools.ProjectOneStatementPerLine', () => new oneStatementPerLineModifier_1.OneStatementPerLineModifier(this._context));
        this.registerModifierCommands('AddUsingRegion', 'azALDevTools.AddEditorUsingRegion', 'azALDevTools.AddProjectUsingRegion', () => new addUsingRegionModifier_1.AddUsingRegionModifier(this._context));
        this.registerModifierCommands('RemoveEmptyLines', 'azALDevTools.RemoveEditorEmptyLines', 'azALDevTools.RemoveProjectEmptyLines', () => new removeEmptyLinesModifier_1.RemoveEmptyLinesModifier(this._context));
        this.registerModifierCommands('RemoveEmptySections', 'azALDevTools.RemoveEditorEmptySections', 'azALDevTools.RemoveProjectEmptySections', () => new removeEmptySectionsModifier_1.RemoveEmptySectionsModifier(this._context));
        this.registerModifierCommands('RemoveEmptyTriggers', 'azALDevTools.RemoveEditorEmptyTriggers', 'azALDevTools.RemoveProjectEmptyTriggers', () => new removeEmptyTriggersModifier_1.RemoveEmptyTriggersModifier(this._context));
        this.registerModifierCommands('RemoveStrSubstNoFromError', 'azALDevTools.RemoveEditorStrSubstNoFromError', 'azALDevTools.RemoveProjectStrSubstNoFromError', () => new removeStrSubstNoFromErrorModifier_1.RemoveStrSubstNoFromErrorModifier(this._context));
        this.registerModifierCommands('RemoveRedundantAppAreas', 'azALDevTools.RemoveEditorRedundantAppAreas', 'azALDevTools.RemoveProjectRedundantAppAreas', () => new removeRedundantAppAreasModifier_1.RemoveRedundantAppAreasModifier(this._context));
        this.registerModifierCommands('RemoveRedundantDataClassification', 'azALDevTools.RemoveEditorRedundantDataClassification', 'azALDevTools.RemoveProjectRedundantDataClassification', () => new removeRedundantDataClassificationModifier_1.RemoveRedundantDataClassificationModifier(this._context));
        this.registerModifierCommands('SortPermissions', 'azALDevTools.SortEditorPermissions', 'azALDevTools.SortWorkspacePermissions', () => new sortPermissionsModifier_1.SortPermissionsModifier(this._context));
        this.registerModifierCommands('SortPermissionSetList', 'azALDevTools.SortEditorPermissionSetList', 'azALDevTools.SortWorkspacePermissionSetList', () => new sortPermissionSetListModifier_1.SortPermissionSetListModifier(this._context));
        this.registerModifierCommands('SortProcedures', 'azALDevTools.SortEditorProcedures', 'azALDevTools.SortWorkspaceProcedures', () => new sortProceduresModifier_1.SortProceduresModifier(this._context));
        this.registerModifierCommands('SortTriggers', 'azALDevTools.SortEditorTriggers', 'azALDevTools.SortWorkspaceTriggers', () => new sortTriggersModifier_1.SortTriggersModifier(this._context));
        this.registerModifierCommands('SortProperties', 'azALDevTools.SortEditorProperties', 'azALDevTools.SortWorkspaceProperties', () => new sortPropertiesModifier_1.SortPropertiesModifier(this._context));
        this.registerModifierCommands('SortReportColumns', 'azALDevTools.SortEditorReportColumns', 'azALDevTools.SortWorkspaceReportColumns', () => new sortReportColumnsModifier_1.SortReportColumnsModifier(this._context));
        this.registerModifierCommands('SortTableFields', 'azALDevTools.SortEditorTableFields', 'azALDevTools.SortWorkspaceTableFields', () => new sortTableFieldsModifier_1.SortTableFieldsModifier(this._context));
        this.registerModifierCommands('SortVariables', 'azALDevTools.SortEditorVariables', 'azALDevTools.SortWorkspaceVariables', () => new sortVariablesModifier_1.SortVariablesModifier(this._context));
        this.registerModifierCommands('SortCustomizations', 'azALDevTools.SortEditorCustomizations', 'azALDevTools.SortWorkspaceCustomizations', () => new sortCustomizationsModifier_1.SortCustomizationsModifier(this._context));
        this.registerModifierCommands('SortUsings', 'azALDevTools.SortEditorUsings', 'azALDevTools.SortProjectUsings', () => new sortUsingsModifier_1.SortUsingsModifier(this._context));
        this.registerModifierCommands('RemoveUnusedUsings', 'azALDevTools.RemoveUnusedEditorUsings', 'azALDevTools.RemoveUnusedProjectUsings', () => new removeUnusedUsingsModifier_1.RemoveUnusedUsingsModifier(this._context));
        this.registerModifierCommands('EnableNamespaces', undefined, 'azALDevTools.EnableProjectNamespaces', () => new addNamespaceSupportModifier_1.AddNamespaceSupportModifier(this._context));
        this.registerModifierCommands(undefined, 'azALDevTools.RunEditorCodeCleanup', 'azALDevTools.RunWorkspaceCodeCleanup', () => new batchSyntaxModifier_1.BatchSyntaxModifier(this._context));
        this.registerModifiedFilesOnlyCommand('azALDevTools.RunModifiedFilesCodeCleanup', () => new batchSyntaxModifier_1.BatchSyntaxModifier(this._context));
        //register code cleanup only modifiers
        this._syntaxFactories["FormatDocument"] = (() => new formatDocumentModifier_1.FormatDocumentModifier(this._context));
        this._syntaxFactories["TrimTrailingWhitespace"] = (() => new trimTrailingWhitespaceModifier_1.TrimTrailingWhitespaceModifier(this._context));
    }
    registerModifierCommands(name, editorCmdName, workspaceCmdName, modifierFactory) {
        if (name) {
            this._syntaxFactories[name] = modifierFactory;
        }
        if (editorCmdName) {
            this.registerEditorCommand(editorCmdName, modifierFactory);
        }
        if (workspaceCmdName) {
            this.registerWorkspaceCommand(workspaceCmdName, modifierFactory);
        }
    }
    registerEditorCommand(name, modifierFactory) {
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand(name, async (document) => {
            let cmd = modifierFactory();
            await cmd.runForActiveEditor();
        }));
    }
    registerDocumentCommand(name, modifierFactory) {
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand(name, async (document) => {
            let cmd = modifierFactory();
            await cmd.runForDocument(document, undefined, false);
        }));
    }
    registerWorkspaceCommand(name, modifierFactory) {
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand(name, async (document) => {
            let cmd = modifierFactory();
            await cmd.runForWorkspace();
        }));
    }
    registerModifiedFilesOnlyCommand(name, modifierFactory) {
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand(name, async (document) => {
            let cmd = modifierFactory();
            await cmd.runForFiles();
        }));
    }
    registerDocumentRangeCommand(name, modifierFactory) {
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand(name, async (document, range) => {
            //let cmd = new WorkspaceCommandSyntaxModifier(this._context, workspaceCommandName, workspaceCommandName);
            let cmd = modifierFactory();
            await cmd.runForDocument(document, range, false);
        }));
    }
    registerDocumentSymbolCommand(name, modifierFactory) {
        this._context.vscodeExtensionContext.subscriptions.push(vscode.commands.registerCommand(name, async (document, symbol) => {
            let cmd = modifierFactory();
            await cmd.runForDocumentSymbol(document, symbol, false);
        }));
    }
    getSyntaxModifier(name) {
        let factory = this._syntaxFactories[name];
        if (factory)
            return factory();
        return undefined;
    }
}
exports.ALCodeTransformationService = ALCodeTransformationService;
//# sourceMappingURL=alCodeTransformationService.js.map