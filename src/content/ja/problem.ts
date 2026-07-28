export const problem = {
  eyebrow: '02 · PROBLEM',
  title: '検証されない主張が、静かに積み上がっている。',
  lede: '衛星データから作られる数字や文章には、性質の異なる情報が混在します。',
  mixedKinds: [
    { label: 'Observation', description: '実測値' },
    { label: 'Estimate', description: '推定値' },
    { label: 'Interpretation', description: '解釈' },
    { label: 'Modeled data', description: 'モデル由来のデータ' },
    { label: 'Synthetic data', description: '合成データ' },
    { label: 'Unknown origin', description: '由来不明のデータ' },
  ],
  consequences: [
    '実測値と推定値が区別されないまま混ざる',
    '数値の根拠が公開の過程で失われる',
    '不確実性が説明されないまま断定的な表現になる',
    '単位や表示が文書内で矛盾する',
    '公開後に第三者が再検証できない',
  ],
  reframe: '問題は「AIが誤ること」ではありません。問題は、公開された主張が検証できる形になっていないことです。',
} as const;
