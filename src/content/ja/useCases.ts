export const useCases = {
  eyebrow: '07 · USE CASES',
  title: '想定される利用場面。',
  lede: 'いずれも導入実績ではなく、適用可能性としての例です。',
  categories: [
    {
      title: 'Research',
      items: ['論文補足データ', '研究レポート', '公開データセット', '再現可能性の担保'],
    },
    {
      title: 'Company',
      items: ['地理空間AI', '森林・農業', 'ESG開示', '保険', '災害分析'],
    },
    {
      title: 'Government',
      items: ['公共調達', '政策資料', '災害報告', '説明責任'],
    },
  ],
} as const;
