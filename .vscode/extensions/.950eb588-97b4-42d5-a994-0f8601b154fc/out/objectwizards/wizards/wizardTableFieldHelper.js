"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WizardTableFieldHelper = void 0;
const alTableWizardFieldData_1 = require("./alTableWizardFieldData");
class WizardTableFieldHelper {
    static async getAllFieldTypes(extensionContext, resourceUri) {
        let types = ['Blob', 'Boolean', 'Code', 'Date', 'DateFormula', 'DateTime', 'Decimal', 'Duration',
            'Guid', 'Integer', 'Media', 'MediaSet', 'Option', 'RecordId', 'TableFilter',
            'Text', 'Time'];
        let response = await extensionContext.toolsLangServerClient.getEnumsList({
            path: resourceUri ? resourceUri.fsPath : undefined, includeNonAccessible: false
        });
        if ((response) && (response.symbols)) {
            for (let i = 0; i < response.symbols.length; i++) {
                types.push('enum ' + response.symbols[i].name);
            }
            //let enumList: string[] = await extensionContext.alLangProxy.getEnumList(resourceUri);
            //if (enumList.length > 0) {
            //    for (let i = 0; i < enumList.length; i++) {
            //        types.push('Enum ' + enumList[i]);
            //    }
        }
        else {
            types.push('Enum');
        }
        return types;
    }
    static validateFields(data) {
        let fields = [];
        if ((data) && (data.length > 0)) {
            for (let i = 0; i < data.length; i++) {
                fields.push(new alTableWizardFieldData_1.ALTableWizardFieldData(!!data[i].pk, data[i].id, data[i].name, data[i].dataType, data[i].length, data[i].dataClassification));
            }
        }
        return fields;
    }
}
exports.WizardTableFieldHelper = WizardTableFieldHelper;
//# sourceMappingURL=wizardTableFieldHelper.js.map