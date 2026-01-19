"use client";

import { useLanguage } from "@/context/language-context";

export function AboutWorkSection() {
  const { t } = useLanguage();

  const experiences = [
    {
      role: t("company1Role"),
      company: t("company1Name"),
      year: `2023 - ${t("present")}`,
      logoColor: "text-green-500",
      logoBg: "bg-green-500/10",
    },
    {
      role: t("company2Role"),
      company: t("company2Name"),
      year: "2022 - 2023",
      logoColor: "text-red-500",
      logoBg: "bg-red-500/10",
    },
    {
      role: t("company3Role"),
      company: t("company3Name"),
      year: "2020 - 2021",
      logoColor: "text-blue-500",
      logoBg: "bg-blue-500/10",
    },
  ];

  return (
    <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight light:text-zinc-900 dark:text-white">
          {t("aboutMe")}
        </h2>
        <p className="light:text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
          {t("aboutMeDesc")}
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight light:text-zinc-900 dark:text-white">
          {t("workExperience")}
        </h2>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={index} className="flex items-center justify-between group">
              <div className="flex items-center gap-4">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center ${exp.logoBg} ${exp.logoColor}`}>
                    {/* Placeholder Icon */}
                    <div className="w-4 h-4 rounded-full bg-current" />
                 </div>
                 <div>
                    <h3 className="font-medium light:text-zinc-900 dark:text-white group-hover:text-black dark:group-hover:text-zinc-200 transition-colors">
                        {exp.company}
                    </h3>
                    <p className="text-sm light:text-zinc-500 dark:text-zinc-400">
                        {exp.role}
                    </p>
                 </div>
              </div>
              <span className="text-sm light:text-zinc-400 dark:text-zinc-400 font-medium tabular-nums">
                {exp.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
