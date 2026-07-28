export const future = {
  eyebrow: '08 · FUTURE',
  title: '構想の段階であることを、最初に断ります。',
  conceptNotice: 'Conceptual roadmap — not yet available',
  lede: '現在提供しているのはeo-claim-lintのみです。以下は将来構想であり、現時点で利用可能な製品ではありません。',
  current: {
    title: 'Current',
    items: ['eo-claim-lint', 'Static claim validation', 'GitHub Action', 'CLI', '10 rules'],
  },
  visionItems: [
    { name: 'eo-knowledge', description: '主張と根拠のグラフ' },
    { name: 'eo-validator', description: '観測データの再検証' },
    { name: 'eo-search', description: '根拠となる観測の横断検索' },
    { name: 'eo-agent', description: '検証手順の自動実行' },
    { name: 'eo-monitor', description: '公開後の主張の継続監視' },
  ],
} as const;
