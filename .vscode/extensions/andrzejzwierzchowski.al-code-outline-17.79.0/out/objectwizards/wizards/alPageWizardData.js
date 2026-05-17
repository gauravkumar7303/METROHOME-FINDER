'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALPageWizardData = void 0;
//import * as vscode from 'vscode';
const alTableBasedWizardData_1 = require("./alTableBasedWizardData");
class ALPageWizardData extends alTableBasedWizardData_1.ALTableBasedWizardData {
    pageType;
    fastTabs;
    usageCategory;
    caption;
    apiPublisher;
    apiGroup;
    apiVersion;
    entityName;
    entitySetName;
    createTooltips;
    showCreateTooltips;
    reuseToolTips;
    toolTipsSource;
    fastTabsData;
    constructor() {
        super();
        this.pageType = "Card";
        this.fastTabs = "General";
        this.applicationArea = "All";
        this.usageCategory = "";
        this.createTooltips = false;
        this.showCreateTooltips = true;
        //api fields
        this.caption = "";
        this.apiPublisher = "publisherName";
        this.apiGroup = "apiGroup";
        this.apiVersion = "v1.0";
        this.entityName = "entityName";
        this.entitySetName = "entitySetName";
        //tooltips
        this.reuseToolTips = true;
        this.toolTipsSource = undefined;
        //fast tabs
        this.fastTabsData = [];
    }
    isFastTabsPageType() {
        return ((this.pageType == "Card") || (this.pageType == "Document") || (this.pageType == "CardPart") ||
            (this.pageType == "ConfirmationDialog") || (this.pageType == "NavigatePage"));
    }
}
exports.ALPageWizardData = ALPageWizardData;
//# sourceMappingURL=alPageWizardData.js.map