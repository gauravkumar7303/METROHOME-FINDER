"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbolWithNameInformation = void 0;
class SymbolWithNameInformation {
    name;
    caption;
    static toNamesList(items) {
        let values = [];
        if (items)
            for (let i = 0; i < items.length; i++)
                if (items[i].name)
                    values.push(items[i].name);
        return values;
    }
}
exports.SymbolWithNameInformation = SymbolWithNameInformation;
//# sourceMappingURL=smbolWithNameInformation.js.map