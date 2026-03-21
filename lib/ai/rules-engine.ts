export type RuleResult = {
  id: string;
  passed: boolean;
  message: string;
};

export type RulesEngineOutput = {
  passed: RuleResult[];
  failed: RuleResult[];
};

export function runRules(_text: string): RulesEngineOutput {
  // TODO: replace with shared rules implementation.
  return { passed: [], failed: [] };
}

