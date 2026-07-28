export const architecture = {
  eyebrow: '05 · ARCHITECTURE',
  title: 'Claim Documentの内容は、OrbSeekr運営者のサーバーへ送信されません。',
  lede: '検査はGitHub-hostedランナー上、あなたのリポジトリの中だけで完結します。',
  flow: ['User repository', 'GitHub-hosted runner', 'eo-claim-lint', 'Local validation', 'GitHub annotation'],
  notRequired: [
    'API keyは不要です',
    'GITHUB_TOKENは不要です',
    'Repository secretsは不要です',
    '外部のEOサービスへの接続は不要です',
    'ドキュメントを検査している最中の外部通信はありません',
  ],
  duringInstall: [
    'インストール時にのみ、actions/setup-pythonが指定バージョンのPythonを取得します。',
    'pipがAction自身のチェックアウトからパッケージをインストールする際、ビルドバックエンド（hatchling）とその依存をPyPIから取得する場合があります。',
  ],
  disclaimer:
    'これは「完全にネットワークアクセスがない」という意味ではありません。ドキュメントの内容が外部へ送信されないことと、インストールに伴う通常のパッケージ取得トラフィックは別です。',
} as const;
