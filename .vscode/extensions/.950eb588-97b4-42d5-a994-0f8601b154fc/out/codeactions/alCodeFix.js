"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALCodeFix = void 0;
const alCodeAction_1 = require("./alCodeAction");
class ALCodeFix extends alCodeAction_1.ALCodeAction {
    diagnosticCode;
    constructor(context, diagCode) {
        super(context, diagCode);
        this.diagnosticCode = diagCode;
    }
    collectCodeActions(docSymbols, symbol, document, range, diagnostics, actions) {
        for (let i = 0; i < diagnostics.length; i++) {
            let diagCode = diagnostics[i].code;
            if ((diagCode) && ((diagCode === this.diagnosticCode) || (diagCode.value === this.diagnosticCode))) {
                let codeFix = this.createFix(document, diagnostics[i]);
                if (codeFix)
                    actions.push(codeFix);
            }
        }
    }
    createFix(document, diagnostic) {
        return undefined;
    }
}
exports.ALCodeFix = ALCodeFix;
//# sourceMappingURL=alCodeFix.js.map