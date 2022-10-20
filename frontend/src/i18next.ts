import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        policies: {
          table: {
            headers: {
              customerName: "Customer (relatives)",
              provider: "Provider",
              insuranceType: "Type",
              status: "Status",
            },
          },
          filters: {
            customer: "Customer",
            provider: "Provider",
            statuses: "Statuses",
            types: "Types",
            clear: "Clear",
          },
        },
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  ns: ["translation"],
  interpolation: {
    escapeValue: false,
  },
});
