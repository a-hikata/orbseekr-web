export const solution = {
  eyebrow: '03 · SOLUTION',
  title: '検査 → 指摘 → 修正。3ステップで完結する。',
  lede: 'eo-claim-lintは、公開・マージの前に主張を検査し、問題箇所をGitHub上に直接表示します。',
  steps: [
    {
      number: '1',
      title: 'Check',
      description: 'Claim Document（主張を記述したJSON）を、根拠・不確実性・由来・表示整合性の観点で検査します。',
    },
    {
      number: '2',
      title: 'Annotate',
      description: '検出した問題を、該当するファイルと行にGitHubの annotation として表示します。',
    },
    {
      number: '3',
      title: 'Fix',
      description: '公開やマージの前に、指摘に沿って主張を修正します。修正されるまでチェックは失敗のままです。',
    },
  ],
  flow: ['JSON', 'Schema', '10 Rules', 'GitHub Annotation', 'Pass / Fail'],
} as const;
