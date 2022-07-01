export const PoliciesMock = [
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

  
  const statusResultMock = [
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
  
  
  const clientResultMock = [
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
  
  export const filterResultMock = {
    status: statusResultMock,
    client: clientResultMock,
  };