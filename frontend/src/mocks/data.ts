export const searchKeywordMock = {
  provider: "aok",
  status: "active",
  type: "health",
  client: "haydon",
  crossField: "er",
};

export const allPolicies = [
  {
    id: "1",
    customer: {
      firstName: "Cyrillus",
      lastName: "Biddlecombe",
    },
    provider: "BARMER",
    insuranceType: "HEALTH",
    status: "PENDING",
  },
  {
    id: "2",
    customer: {
      firstName: "Brandy",
      lastName: "Harbour",
    },
    provider: "BARMER",
    insuranceType: "LIABILITY",
    status: "PENDING",
  },
  {
    id: "3",
    customer: {
      firstName: "Ailina",
      lastName: "Harber",
    },
    provider: "AOK",
    insuranceType: "HEALTH",
    status: "DROPPED_OUT",
  },
  {
    id: "4",
    customer: {
      firstName: "Aguste",
      lastName: "Bilsford",
    },
    provider: "AOK",
    insuranceType: "HEALTH",
    status: "PENDING",
  },
  {
    id: "5",
    customer: {
      firstName: "Haydon",
      lastName: "Ballay",
    },
    provider: "BARMER",
    insuranceType: "HOUSEHOLD",
    status: "ACTIVE",
  },
  {
    id: "6",
    customer: {
      firstName: "Brandyn",
      lastName: "Argyle",
    },
    provider: "AOK",
    insuranceType: "HEALTH",
    status: "CANCELLED",
  },
  {
    id: "7",
    customer: {
      firstName: "Tani",
      lastName: "Erasmus",
    },
    provider: "BARMER",
    insuranceType: "HEALTH",
    status: "ACTIVE",
  },
  {
    id: "8",
    customer: {
      firstName: "Galvan",
      lastName: "Suggey",
    },
    provider: "TK",
    insuranceType: "HOUSEHOLD",
    status: "PENDING",
  },
  {
    id: "9",
    customer: {
      firstName: "Rozelle",
      lastName: "Nipper",
    },
    provider: "TK",
    insuranceType: "HEALTH",
    status: "ACTIVE",
  },
  {
    id: "10",
    customer: {
      firstName: "Flossie",
      lastName: "Camings",
    },
    provider: "AOK",
    insuranceType: "HEALTH",
    status: "PENDING",
  },
];

const providerSearchResult = [
  {
    id: "4",
    customer: {
      firstName: "Aguste",
      lastName: "Bilsford",
    },
    provider: "AOK",
    insuranceType: "HEALTH",
    status: "PENDING",
  },
  {
    id: "10",
    customer: {
      firstName: "Flossie",
      lastName: "Camings",
    },
    provider: "AOK",
    insuranceType: "HEALTH",
    status: "PENDING",
  },
];

const statusSearchResult = [
  {
    id: "5",
    customer: {
      firstName: "Haydon",
      lastName: "Ballay",
    },
    provider: "BARMER",
    insuranceType: "HOUSEHOLD",
    status: "ACTIVE",
  },
  {
    id: "7",
    customer: {
      firstName: "Tani",
      lastName: "Erasmus",
    },
    provider: "BARMER",
    insuranceType: "HEALTH",
    status: "ACTIVE",
  },

  {
    id: "9",
    customer: {
      firstName: "Rozelle",
      lastName: "Nipper",
    },
    provider: "TK",
    insuranceType: "HEALTH",
    status: "ACTIVE",
  },
];

const typeSearchResult = [
  {
    id: "1",
    customer: {
      firstName: "Cyrillus",
      lastName: "Biddlecombe",
    },
    provider: "BARMER",
    insuranceType: "HEALTH",
    status: "PENDING",
  },
  {
    id: "4",
    customer: {
      firstName: "Aguste",
      lastName: "Bilsford",
    },
    provider: "AOK",
    insuranceType: "HEALTH",
    status: "PENDING",
  },
  {
    id: "7",
    customer: {
      firstName: "Tani",
      lastName: "Erasmus",
    },
    provider: "BARMER",
    insuranceType: "HEALTH",
    status: "ACTIVE",
  },

  {
    id: "9",
    customer: {
      firstName: "Rozelle",
      lastName: "Nipper",
    },
    provider: "TK",
    insuranceType: "HEALTH",
    status: "ACTIVE",
  },
  {
    id: "10",
    customer: {
      firstName: "Flossie",
      lastName: "Camings",
    },
    provider: "AOK",
    insuranceType: "HEALTH",
    status: "PENDING",
  },
];

const clientSearchResult = [
  {
    id: "5",
    customer: {
      firstName: "Haydon",
      lastName: "Ballay",
    },
    provider: "BARMER",
    insuranceType: "HOUSEHOLD",
    status: "ACTIVE",
  },
];

const crossFieldSearchResult = [
  {
    id: "1",
    customer: {
      firstName: "Cyrillus",
      lastName: "Biddlecombe",
    },
    provider: "BARMER",
    insuranceType: "HEALTH",
    status: "PENDING",
  },
  {
    id: "2",
    customer: {
      firstName: "Brandy",
      lastName: "Harbour",
    },
    provider: "BARMER",
    insuranceType: "LIABILITY",
    status: "PENDING",
  },

  {
    id: "5",
    customer: {
      firstName: "Haydon",
      lastName: "Ballay",
    },
    provider: "BARMER",
    insuranceType: "HOUSEHOLD",
    status: "ACTIVE",
  },
  {
    id: "7",
    customer: {
      firstName: "Tani",
      lastName: "Erasmus",
    },
    provider: "BARMER",
    insuranceType: "HEALTH",
    status: "ACTIVE",
  },
  {
    id: "9",
    customer: {
      firstName: "Rozelle",
      lastName: "Nipper",
    },
    provider: "TK",
    insuranceType: "HEALTH",
    status: "ACTIVE",
  },
];

export const searchResultMock = {
  provider: providerSearchResult,
  status: statusSearchResult,
  type: typeSearchResult,
  client: clientSearchResult,
  crossField: crossFieldSearchResult,
};
