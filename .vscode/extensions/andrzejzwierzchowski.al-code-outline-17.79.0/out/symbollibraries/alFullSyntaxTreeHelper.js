"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALFullSyntaxTreeHelper = void 0;
class ALFullSyntaxTreeHelper {
    static restoreNodeParent(node, parentNode) {
        if (node) {
            node.parentNode = parentNode;
            this.restoreNodeListParent(node.childNodes, node);
            this.restoreNodeListParent(node.attributes, node);
            this.restoreNodeParent(node.openBraceToken, node);
            this.restoreNodeParent(node.closeBraceToken, node);
            this.restoreNodeParent(node.varKeyword, node);
        }
    }
    static restoreNodeListParent(nodeList, parentNode) {
        if (nodeList)
            for (let i = 0; i < nodeList.length; i++)
                this.restoreNodeParent(nodeList[i], parentNode);
    }
}
exports.ALFullSyntaxTreeHelper = ALFullSyntaxTreeHelper;
//# sourceMappingURL=alFullSyntaxTreeHelper.js.map