"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALTableBasedWizardPage = void 0;
const projectItemWizardPage_1 = require("./projectItemWizardPage");
const toolsSymbolInformationRequest_1 = require("../../langserver/symbolsinformation/toolsSymbolInformationRequest");
const toolsGetTableFieldsListRequest_1 = require("../../langserver/symbolsinformation/toolsGetTableFieldsListRequest");
const tableFieldInformationHelper_1 = require("../../symbolsinformation/tableFieldInformationHelper");
const tableFieldClass_1 = require("../../symbolsinformation/tableFieldClass");
class ALTableBasedWizardPage extends projectItemWizardPage_1.ProjectItemWizardPage {
    _tableWizardData;
    _includeToolTips;
    _includeFlowFilters;
    _toolTipsSourceDependencies;
    constructor(toolsExtensionContext, title, settings, data) {
        super(toolsExtensionContext, title, settings, data);
        this._tableWizardData = data;
        this._includeToolTips = false;
        this._includeFlowFilters = false;
        this._toolTipsSourceDependencies = undefined;
    }
    //initialize wizard
    onDocumentLoaded() {
        //send data to the web view
        this.sendMessage({
            command: 'setData',
            data: this._tableWizardData
        });
        //load tables
        if ((!this._tableWizardData.fixedTable) && ((this._tableWizardData.tableList == null) || (this._tableWizardData.tableList.length == 0)))
            this.loadTables();
    }
    async loadTables() {
        let tableList = [];
        let response = await this._toolsExtensionContext.toolsLangServerClient.getTablesList(new toolsSymbolInformationRequest_1.ToolsSymbolInformationRequest(this._settings.getDestDirectoryPath(), false));
        if ((response) && (response.symbols)) {
            for (let i = 0; i < response.symbols.length; i++) {
                let name = response.symbols[i].name;
                if (name)
                    tableList.push(name);
            }
        }
        this._tableWizardData.tableList = tableList;
        this.sendMessage({
            command: "setTables",
            data: this._tableWizardData.tableList
        });
    }
    updateFieldsDescriptions(fieldList) {
        if (fieldList) {
            for (let i = 0; i < fieldList.length; i++) {
                this.updateFieldDescription(fieldList[i]);
            }
        }
    }
    updateFieldDescription(field) {
        field.uiDesc = tableFieldInformationHelper_1.TableFieldInformationHelper.getFieldUIDesc(field);
    }
    async loadFields() {
        try {
            //this._tableWizardData.fieldList = await this._toolsExtensionContext.alLangProxy.getFieldList(this._settings.getDestDirectoryUri(), this._tableWizardData.selectedTable);
            let fieldList = [];
            let response = await this._toolsExtensionContext.toolsLangServerClient.getTableFieldsList(new toolsGetTableFieldsListRequest_1.ToolsGetTableFieldsListRequest(this._settings.getDestDirectoryPath(), { nameWithNamespaceOrId: this._tableWizardData.selectedTable }, false, false, true, true, this._includeFlowFilters, this._includeToolTips, this._toolTipsSourceDependencies));
            if ((response) && (response.symbols)) {
                for (let i = 0; i < response.symbols.length; i++) {
                    let name = response.symbols[i].name;
                    if (name)
                        fieldList.push(name);
                }
                if (this._includeFlowFilters) {
                    let fields = [];
                    let flowFilters = [];
                    for (let i = 0; i < response.symbols.length; i++)
                        if (response.symbols[i].fieldClass == tableFieldClass_1.TableFieldClass.FlowFilter)
                            flowFilters.push(response.symbols[i]);
                        else
                            fields.push(response.symbols[i]);
                    this._tableWizardData.fieldList = fields;
                    this._tableWizardData.flowFiltersList = flowFilters;
                }
                else {
                    this._tableWizardData.fieldList = response.symbols;
                    this._tableWizardData.flowFiltersList = [];
                }
                this.updateFieldsDescriptions(this._tableWizardData.fieldList);
                this.updateFieldsDescriptions(this._tableWizardData.flowFiltersList);
            }
            //this._tableWizardData.fieldList = fieldList;
            this.sendMessage({
                command: "setFields",
                data: {
                    fieldList: this._tableWizardData.fieldList,
                    flowFilterList: this._tableWizardData.flowFiltersList
                }
            });
        }
        catch (e) {
        }
    }
    setTable(tableName, includeFlowFilters) {
        var fieldChanged = (this._tableWizardData.selectedTable !== tableName) ||
            (this._includeFlowFilters !== includeFlowFilters);
        this._tableWizardData.selectedTable = tableName;
        this._includeFlowFilters = includeFlowFilters;
        if ((fieldChanged) || (!this._tableWizardData.fieldList) || (this._tableWizardData.fieldList.length == 0)) {
            this.loadFields();
        }
    }
    processWebViewMessage(message) {
        if (super.processWebViewMessage(message)) {
            return true;
        }
        switch (message.command) {
            case "selectTable":
                if (message.tableName) {
                    this.setTable(message.tableName, !!message.includeFlowFilters);
                }
                return true;
        }
        return false;
    }
}
exports.ALTableBasedWizardPage = ALTableBasedWizardPage;
//# sourceMappingURL=alTableBasedWizardPage.js.map