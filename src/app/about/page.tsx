"use client";

import { useLanguage } from "@/context/language-context";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen pt-32 pb-12 px-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-8">{t('aboutMe')}</h1>
      <div className="prose prose-zinc dark:prose-invert">
        <p className="text-lg text-zinc-600 dark:text-zinc-300">
          {t('aboutPageHello')}
        </p>
        <p className="text-zinc-600 dark:text-zinc-400">
            {t('aboutPagePlaceholder')}
        </p>
      </div>
    </main>
  );
}
