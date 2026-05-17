"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RulesetSyntaxProvider = void 0;
const caRulesCollection_1 = require("../carulesviewer/caRulesCollection");
const syntaxProvider_1 = require("./syntaxProvider");
class RulesetSyntaxProvider extends syntaxProvider_1.SyntaxProvider {
    constructor(newContext) {
        super(newContext, "/ruleSetSyntax.json");
    }
    async provideTextDocumentContent(uri, token) {
        let rulesCollection = new caRulesCollection_1.CARulesCollection(this._context);
        await rulesCollection.loadRules();
        if ((rulesCollection.rules) && (rulesCollection.rules.length > 0)) {
            let ruleEnum = [];
            let ruleEnumDesc = [];
            let oneOf = [];
            for (let i = 0; i < rulesCollection.rules.length; i++) {
                var rule = rulesCollection.rules[i];
                if (rule.id) {
                    ruleEnum.push(rule.id);
                    if (rule.description)
                        ruleEnumDesc.push(rule.description);
                    else
                        ruleEnumDesc.push(rule.id);
                }
            }
            let syntax = {
                "$id": "AL Rule Set File Syntax",
                "$schema": "http://json-schema.org/draft-07/schema",
                "description": "Schema for a file containing a rule set.",
                "type": "object",
                "properties": {
                    "rules": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "id": {
                                    "enum": ruleEnum,
                                    "enumDescriptions": ruleEnumDesc
                                }
                            }
                        }
                    }
                }
            };
            return JSON.stringify(syntax);
        }
        return "";
    }
}
exports.RulesetSyntaxProvider = RulesetSyntaxProvider;
//# sourceMappingURL=rulesetSyntaxProvider.js.map