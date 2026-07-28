export const features = {
  eyebrow: '04 · FEATURES',
  title: '10のルールで、主張の弱い箇所を検出する。',
  lede: 'いずれも現在のv0.1.0で実際に動作する機能です。',
  items: [
    {
      title: 'Evidence check',
      description: '主張が根拠を一つも参照していない場合を検出します（EOC301）。既定でerror重大度になる唯一のルールです。',
    },
    {
      title: 'Observation / estimate distinction',
      description: '観測値・推定値・解釈が区別されずに扱われていないかを検査します（EOC101–EOC103）。',
    },
    {
      title: 'Uncertainty disclosure',
      description: '不確実性が未申告のまま断定的な表現になっていないかを確認します（EOC203）。',
    },
    {
      title: 'Display consistency',
      description: '表示ラベルが主張の種類と矛盾していないか、単位が記録値と一致しているかを検査します（EOC201, EOC202）。',
    },
    {
      title: 'Provenance disclosure',
      description: '合成データや由来不明のデータが、表示上その旨を開示しているかを確認します（EOC401, EOC402）。',
    },
    {
      title: 'GitHub annotation',
      description: 'Pull Requestの該当ファイル・該当行に、指摘をGitHub annotationとして直接表示します。',
    },
    {
      title: 'Configurable severity',
      description: '`fail-on` でどの重大度からチェックを失敗させるかを、`severity` でルールごとの重大度上書きを設定できます。',
    },
    {
      title: 'CLI support',
      description: '`eo-claim-lint check` / `rules` / `schema` / `init` のコマンドで、CI外でもローカルに同じ検査を実行できます。',
    },
  ],
} as const;
