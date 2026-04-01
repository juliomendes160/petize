import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        search: "Search",
        repositories: "Repositories",
        notFound: "User not found",
        viewGithub: "View on GitHub",
      },
    },
    pt: {
      translation: {
        search: "Buscar",
        repositories: "Repositórios",
        notFound: "Usuário não encontrado",
        viewGithub: "Ver no GitHub",
      },
    },
  },
  lng: "pt",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;