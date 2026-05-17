"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlHelper = void 0;
class XmlHelper {
    static EncodeXmlAttributeValue(value) {
        return value.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }
}
exports.XmlHelper = XmlHelper;
//# sourceMappingURL=xmlHelper.js.map