export const roadmap = {
  eyebrow: '09 · ROADMAP',
  title: '方向性。日付ではなくフェーズで示す。',
  phases: [
    {
      label: 'Phase 1',
      status: 'Published',
      items: ['eo-claim-lint v0.1.0', 'GitHub Marketplace', 'CLI', 'GitHub Action'],
    },
    {
      label: 'Phase 2',
      status: 'Validation',
      items: ['External users', 'False positive collection', 'False negative collection', 'Additional rules', 'Documentation'],
    },
    {
      label: 'Phase 3',
      status: 'Expansion',
      items: ['Claim graph', 'Validation workflows', 'Research collaboration', 'Organization policy'],
    },
    {
      label: 'Phase 4',
      status: 'Platform',
      items: ['Monitoring', 'Search', 'Agents', 'Enterprise governance'],
    },
  ],
} as const;
