"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "tr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const dictionary: Record<Language, Record<string, string>> = {
  en: {
    home: "Home",
    projects: "Projects",
    blog: "Blog",
    speaking: "Speaking",
    about: "About",
    heroTitle: "Hey, I'm Burak",
    heroSubtitle: "Frontend Developer",
    heroDescription: "I craft intuitive digital experiences where design meets functionality. Based in Turkiye, bringing ideas to life through code and creativity.",
    letsTalk: "Let's talk",
    moreAboutMe: "More about me",
    selectedProjects: "Selected Projects",
    viewAllProjects: "View all projects",
    latestArticles: "Latest Articles",
    readAllArticles: "Read all articles",
    viewProject: "View Project",
    viewDemo: "Live Demo",
    viewSource: "Source Code",
    projectsTitle: "Projects",
    projectsDescription: "A collection of projects I've worked on, ranging from web applications to design systems.",
    blogTitle: "Blog",
    blogDescription: "Thoughts on design, development, and the future of the web.",
    noProjects: "No projects found.",
    noArticles: "No articles found.",
    page: "Page",
    of: "of",
    backToProjects: "Back to projects",
    backToBlog: "Back to blog",
    builtWith: "Built with Next.js",
    aboutMe: "About Me",
    aboutMeDesc: "As a developer with over 5 years of experience, I specialize in building scalable web applications and intuitive user interfaces. My approach blends technical expertise with a keen eye for design, creating products that are both functional and beautiful.",
    workExperience: "Work Experience",
    present: "Present",
    company1Role: "Senior Frontend Developer",
    company1Name: "Tech Corp",
    company2Role: "UI Engineer",
    company2Name: "Digital Agency",
    company3Role: "Junior Developer",
    company3Name: "StartUp Inc",
  },
  tr: {
    home: "Anasayfa",
    projects: "Projeler",
    blog: "Blog",
    speaking: "Konuşmalar",
    about: "Hakkımda",
    heroTitle: "Selam, Ben Burak",
    heroSubtitle: "Önyüz Geliştiricisi",
    heroDescription: "Tasarımın işlevsellikle buluştuğu sezgisel dijital deneyimler tasarlıyorum. Türkiye'de kod ve yaratıcılıkla fikirleri hayata geçiriyorum.",
    letsTalk: "Konuşalım",
    moreAboutMe: "Hakkımda daha fazla",
    selectedProjects: "Seçilmiş Projeler",
    viewAllProjects: "Tüm projeleri gör",
    latestArticles: "Son Yazılar",
    readAllArticles: "Tüm yazıları oku",
    viewProject: "İncele",
    viewDemo: "Canlı Demo",
    viewSource: "Kaynak Kod",
    projectsTitle: "Projeler",
    projectsDescription: "Web uygulamalarından tasarım sistemlerine kadar üzerinde çalıştığım projelerin bir koleksiyonu.",
    blogTitle: "Blog",
    blogDescription: "Tasarım, yazılım ve webin geleceği üzerine düşünceler.",
    noProjects: "Proje bulunamadı.",
    noArticles: "Yazı bulunamadı.",
    page: "Sayfa",
    of: "/",
    backToProjects: "Projelere dön",
    backToBlog: "Blog'a dön",
    builtWith: "Next.js ile yapıldı",
    aboutMe: "Hakkımda",
    aboutMeDesc: "5 yılı aşkın deneyime sahip bir geliştirici olarak, ölçeklenebilir web uygulamaları ve sezgisel kullanıcı arayüzleri oluşturma konusunda uzmanım. Yaklaşımım teknik uzmanlığı tasarım gözüyle harmanlayarak hem işlevsel hem de estetik ürünler yaratmaktır.",
    workExperience: "İş Deneyimi",
    present: "Günümüz",
    company1Role: "Kıdemli Frontend Geliştirici",
    company1Name: "Tech Corp",
    company2Role: "UI Mühendisi",
    company2Name: "Digital Agency",
    company3Role: "Junior Geliştirici",
    company3Name: "StartUp Inc",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // Load language from local storage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "tr")) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string) => {
    return dictionary[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
