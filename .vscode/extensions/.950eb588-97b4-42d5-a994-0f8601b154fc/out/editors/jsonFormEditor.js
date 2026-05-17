"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonFormEditor = void 0;
const formEditor_1 = require("./formEditor");
class JsonFormEditor extends formEditor_1.FormEditor {
    fieldsOrder;
    undefFields;
    constructor(devToolsContext, title) {
        super(devToolsContext, title);
        this.fieldsOrder = undefined;
        this.undefFields = undefined;
    }
    getViewType() {
        return 'azALDevTools.JsonFormEditor';
    }
    onDataChanged(data) {
        if (!data)
            data = {};
        //sort fields
        if (this.fieldsOrder) {
            let sorted = {};
            //add fields from the definition
            for (let i = 0; i < this.fieldsOrder.length; i++) {
                let val = data[this.fieldsOrder[i]];
                if (val)
                    sorted[this.fieldsOrder[i]] = val;
            }
            //add fields that are not in the current fields definition
            if (this.undefFields) {
                for (let i = 0; i < this.undefFields.length; i++) {
                    let val = data[this.undefFields[i]];
                    if (val)
                        sorted[this.undefFields[i]] = val;
                }
            }
            data = sorted;
        }
        this.updateTextDocumentFromJson(data);
    }
    onBeforeDataSave(data) {
    }
    getDocumentData() {
        let data = this.getTextDocumentAsJson();
        //store names of unknown fields
        this.undefFields = undefined;
        if ((this.fieldsOrder) && (data)) {
            this.undefFields = [];
            for (let key in data) {
                if (this.fieldsOrder.indexOf(key) < 0)
                    this.undefFields.push(key);
            }
        }
        return data;
    }
}
exports.JsonFormEditor = JsonFormEditor;
//# sourceMappingURL=jsonFormEditor.js.map