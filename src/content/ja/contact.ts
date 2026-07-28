import { links } from '../../lib/config';

interface ContactChannel {
  label: string;
  description: string;
  cta?: { label: string; href: string };
  fallback?: string;
}

export const contact: { eyebrow: string; title: string; channels: ContactChannel[] } = {
  eyebrow: '11 · CONTACT',
  title: '連絡先',
  channels: [
    {
      label: 'General support',
      description: '使い方の質問、バグ報告、誤検知・見逃しの報告。',
      cta: { label: 'Ask on GitHub', href: links.issues },
    },
    {
      label: 'Security',
      description: '脆弱性の報告は、公開のIssueではなくこちらから。',
      cta: { label: 'Report a vulnerability', href: links.securityAdvisories },
    },
    {
      label: 'Research / Commercial inquiry',
      description: '共同研究・商用導入のご相談。',
      fallback: 'Research and commercial inquiries will be available soon.',
    },
  ],
};
