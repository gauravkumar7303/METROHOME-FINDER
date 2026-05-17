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
exports.TableFieldsSelector = void 0;
const vscode = __importStar(require("vscode"));
const tableFieldQuickPickItem_1 = require("./tableFieldQuickPickItem");
class TableFieldsSelector {
    _sortNameImage;
    _sortIdImage;
    _sortNameText;
    _sortIdText;
    _toolsExtensionContext;
    _sortBy;
    _quickPick;
    _selectedItems;
    _skipEmptyUpdate;
    constructor(context) {
        this._skipEmptyUpdate = false;
        this._sortNameImage = 'ico-sorttext.svg';
        this._sortIdImage = 'ico-sortnumeric.svg';
        this._sortNameText = 'Sort by Name';
        this._sortIdText = 'Sort by Id';
        this._toolsExtensionContext = context;
        this._sortBy = 'name';
        this._selectedItems = [];
        this._quickPick = vscode.window.createQuickPick();
        this.initQuickPick();
    }
    selectFields(title, fieldsList) {
        let items = [];
        for (let i = 0; i < fieldsList.length; i++) {
            items.push(new tableFieldQuickPickItem_1.TableFieldQuickPickItem(fieldsList[i]));
        }
        this._quickPick.title = title;
        this._quickPick.items = items;
        return new Promise((resolve, reject) => {
            try {
                this._quickPick.show();
                this._quickPick.onDidAccept(() => {
                    let data = [];
                    for (let i = 0; i < this._quickPick.selectedItems.length; i++) {
                        data.push(this._quickPick.selectedItems[i].fieldInformation);
                    }
                    resolve(data);
                    this._quickPick.hide();
                });
                this._quickPick.onDidHide(() => {
                    resolve(undefined);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    initQuickPick() {
        this._quickPick.placeholder = 'Type to search';
        this._quickPick.canSelectMany = true;
        this._quickPick.buttons = [
            {
                iconPath: {
                    light: this._toolsExtensionContext.getLightImageUri(this._sortNameImage),
                    dark: this._toolsExtensionContext.getDarkImageUri(this._sortNameImage)
                },
                tooltip: this._sortNameText
            },
            {
                iconPath: {
                    light: this._toolsExtensionContext.getLightImageUri(this._sortIdImage),
                    dark: this._toolsExtensionContext.getDarkImageUri(this._sortIdImage)
                },
                tooltip: this._sortIdText
            }
        ];
        this._quickPick.onDidTriggerButton(button => this.onButton(button));
        this._quickPick.onDidChangeSelection((itemList) => this.onSelectionChanged(itemList));
    }
    updateItems(newSelItems, forceUpdate) {
        if (this._skipEmptyUpdate) {
            this._skipEmptyUpdate = false;
            if ((!newSelItems) || (newSelItems.length === 0)) {
                return;
            }
        }
        let selectionOrder = this.isInSelectionOrderMode();
        let listChanged = !this.isListEqual(newSelItems, this._selectedItems);
        if ((selectionOrder && listChanged) || (forceUpdate)) {
            //collect not selected items
            let notSelItems = [];
            for (let i = 0; i < this._quickPick.items.length; i++) {
                if (newSelItems.indexOf(this._quickPick.items[i]) < 0) {
                    notSelItems.push(this._quickPick.items[i]);
                    this._quickPick.items[i].picked = false;
                }
                else {
                    this._quickPick.items[i].picked = true;
                }
            }
            //sort and merge selected and not selected items
            if (selectionOrder)
                this.sortItems(notSelItems);
            let newItems = newSelItems.concat(notSelItems);
            if (!selectionOrder)
                this.sortItems(newItems);
            //update members and quick pick
            this._skipEmptyUpdate = true;
            this._selectedItems = newSelItems;
            this._quickPick.items = newItems;
            this._quickPick.selectedItems = newSelItems;
        }
    }
    setSortBy(value) {
        this._sortBy = value;
        this.updateItems(this._selectedItems, true);
    }
    sortItems(items) {
        items.sort((a, b) => {
            if (this._sortBy == 'id')
                return this.compareValue(a.fieldInformation.id, b.fieldInformation.id);
            return this.compareValue(a.fieldInformation.name, b.fieldInformation.name);
        });
    }
    compareValue(a, b) {
        if (a > b)
            return 1;
        if (a < b)
            return -1;
        return 0;
    }
    onSelectionChanged(itemList) {
        let newList = [];
        newList.push(...itemList);
        this.updateItems(newList, false);
    }
    onButton(button) {
        if (button.tooltip === this._sortIdText)
            this.setSortBy('id');
        else if (button.tooltip === this._sortNameText)
            this.setSortBy('name');
    }
    isInSelectionOrderMode() {
        let resource = undefined;
        if ((vscode.window.activeTextEditor) && (vscode.window.activeTextEditor.document))
            resource = vscode.window.activeTextEditor.document.uri;
        let selectionMode = vscode.workspace.getConfiguration('alOutline', resource).get('fieldsSelectionOrder');
        //convert undefined to boolean
        if ((selectionMode) && (selectionMode.toLowerCase() == 'selection order'))
            return true;
        return false;
    }
    isListEqual(a, b) {
        if (a.length != b.length)
            return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i].fieldInformation.id != b[i].fieldInformation.id)
                return false;
        }
        return true;
    }
}
exports.TableFieldsSelector = TableFieldsSelector;
//# sourceMappingURL=tableFieldsSelector.js.map