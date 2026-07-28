import { links } from '../../lib/config';

export const faq = {
  eyebrow: '10 · FAQ',
  title: 'よくある質問',
  items: [
    {
      question: 'OrbSeekrとは何ですか。',
      answer:
        '地球観測・衛星データから生まれる主張を、検証可能・追跡可能・再現可能にするためのオープンソースプロジェクトです。現在公開している最初のプロダクトがeo-claim-lintです。',
    },
    {
      question: 'eo-claim-lintとは何ですか。',
      answer:
        'Claim Document（主張を記述したJSON）を、根拠・観測と推定の区別・不確実性の開示・表示の整合性・データの由来という観点で検査するGitHub ActionおよびCLIです。',
    },
    {
      question: '数字が正しいかを検証できますか。',
      answer:
        'いいえ。eo-claim-lintの合格は、数字の科学的正しさや法的有効性を保証しません。検査するのは、主張の隣に根拠・不確実性・由来が正しく記述され、表示と矛盾していないかという構造です。値そのものの真偽は判定しません。',
    },
    {
      question: '衛星画像を解析しますか。',
      answer: 'いいえ。eo-claim-lintは画像を解析しません。検査対象は、あなたが用意したClaim Document（JSON）というテキストの構造です。',
    },
    {
      question: 'データは外部へ送信されますか。',
      answer:
        'Claim Documentの内容は、OrbSeekr運営者のサーバーへ送信されません。検査はGitHub-hostedランナー上で完結します。ただしAction導入時にはactions/setup-pythonとPyPIへの通常のパッケージ取得通信が発生します。これは「完全にネットワークアクセスがない」という意味ではありません。詳細はArchitectureセクションをご覧ください。',
    },
    {
      question: '無料で使えますか。',
      answer: 'はい。Apache License 2.0で公開されているオープンソースソフトウェアです。',
    },
    {
      question: '商用利用できますか。',
      answer:
        'はい。Apache License 2.0はライセンス条文に従う限り商用利用を制限しません。組織導入や共同研究のご相談はContactセクションからお問い合わせください。',
    },
    {
      question: 'GitHub以外でも使えますか。',
      answer:
        '現在の配布形態はGitHub ActionとPython CLIです。CLIはGitHub Actions以外のCI環境やローカル環境でも実行できますが、GitHub annotation出力はGitHub上での実行を前提としています。',
    },
    {
      question: 'どのようなJSONが必要ですか。',
      answer:
        'Claim Documentと呼ぶJSON構造です。`eo-claim-lint init`コマンドで、構造を確認できる合成データの雛形を生成できます。詳細はRepositoryのREADMEおよびスキーマ定義をご覧ください。',
    },
    {
      question: '誤検知した場合はどうすればよいですか。',
      answer:
        'GitHub Issuesでご報告ください。false positive（誤検知）とfalse negative（見逃し）の報告は、このプロジェクトにとって最も価値のある情報として扱っています。',
    },
    {
      question: 'セキュリティ問題はどこへ報告すればよいですか。',
      answer:
        '公開のIssueには書かないでください。GitHubのPrivate vulnerability reporting（Security タブ → Report a vulnerability）からご報告ください。',
    },
    {
      question: '共同研究や商用相談は可能ですか。',
      answer: 'Contactセクションをご覧ください。',
    },
  ],
  cta: { label: 'Ask on GitHub', href: links.issues },
} as const;
