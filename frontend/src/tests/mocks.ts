import { Policy } from "../types";

const addFilter = jest.fn();
const removeFilter = jest.fn();
const clearAllFilters = jest.fn();
const setNameQuery = jest.fn();
const setPage = jest.fn();
const goToNextPage = jest.fn();
const goToPreviousPage = jest.fn();

export const contextValue = {
  filters: {},
  page: 0,
  policies: [],
  providers: ["BARMER", "AOK", "TK", "DAK"],
  resultsPerPage: 10,
  totalPolicies: 0,
  addFilter,
  removeFilter,
  clearAllFilters,
  setNameQuery,
  setPage,
  goToNextPage,
  goToPreviousPage,
}

export const threePolicies: Policy[] = [
  {
    id: "6c504ed4-6edd-413c-a3f8-b0b594d04ce5",
    provider: "BARMER",
    insuranceType: "HOUSEHOLD",
    status: "PENDING",
    startDate: new Date("2022-01-12T17:47:41.000Z"),
    endDate: null,
    customer: {
      id: "53cb461d-37a1-4be7-830b-7f9fb375d5ef",
      firstName: "Derril",
      lastName: "Gildersleeve",
      dateOfBirth: new Date("2006-02-23T00:10:07.000Z")
    }
  },
  {
    id: "0d996d43-9083-4633-b02e-99dd643e3f95",
    provider: "DAK",
    insuranceType: "HEALTH",
    status: "ACTIVE",
    startDate: new Date("2020-08-16T03:24:30.000Z"),
    endDate: null,
    customer: {
      id: "c7cf0de1-7675-4f23-99df-87757a9fb215",
      firstName: "Graeme",
      lastName: "Ternent",
      dateOfBirth: new Date("1988-10-25T13:37:10.000Z")
    }
  },
  {
    id: "0a81aed4-8a6f-4c90-a18d-5a0c020bfe18",
    provider: "AOK",
    insuranceType: "HEALTH",
    status: "PENDING",
    startDate: new Date("2020-07-21T19:40:35.000Z"),
    endDate: null,
    customer: {
      id: "d4b3cc3e-41dc-4deb-9d11-47e7912c5217",
      firstName: "Aguste",
      lastName: "Bilsford",
      dateOfBirth: new Date("1997-04-24T11:26:05.000Z")
    }
  },
]

export const fifteenPolicies: Policy[] = [
  {
    id: "ce71ef5b-8e5d-4d13-9352-f0a1d02335c4",
    provider: "BARMER",
    insuranceType: "HEALTH",
    status: "PENDING",
    startDate: new Date("2017-04-26T05:32:06.000Z"),
    endDate: null,
    customer: {
      id: "50c9e561-785e-46b2-b856-ac1c699639ba",
      firstName: "Cyrillus",
      lastName: "Biddlecombe",
      dateOfBirth: new Date("1978-12-03T06:33:17.000Z")
    }
  },
  {
    id: "a4fc1f3b-5a76-4ded-8a9f-a327918ca7ee",
    provider: "BARMER",
    insuranceType: "LIABILITY",
    status: "PENDING",
    startDate: new Date("2015-01-13T04:52:15.000Z"),
    endDate: null,
    customer: {
      id: "37c40344-faea-4ede-9637-3f7ad89975b5",
      firstName: "Brandy",
      lastName: "Harbour",
      dateOfBirth: new Date("1985-02-28T12:51:27.000Z")
    }
  },
  {
    id: "0a81aed4-8a6f-4c90-a18d-5a0c020bfe18",
    provider: "AOK",
    insuranceType: "HEALTH",
    status: "PENDING",
    startDate: new Date("2020-07-21T19:40:35.000Z"),
    endDate: null,
    customer: {
      id: "d4b3cc3e-41dc-4deb-9d11-47e7912c5217",
      firstName: "Aguste",
      lastName: "Bilsford",
      dateOfBirth: new Date("1997-04-24T11:26:05.000Z")
    }
  },
  {
    id: "2ceb0c12-0bf4-4625-bf31-feeac704ddc7",
    provider: "BARMER",
    insuranceType: "HOUSEHOLD",
    status: "ACTIVE",
    startDate: new Date("2013-03-30T19:27:54.000Z"),
    endDate: null,
    customer: {
      id: "4df8d846-f9e2-4225-9044-429f550f8288",
      firstName: "Haydon",
      lastName: "Ballay",
      dateOfBirth: new Date("2006-12-04T01:13:38.000Z")
    }
  },
  {
    id: "2992334a-8705-4f78-ae67-328b9c35972a",
    provider: "BARMER",
    insuranceType: "HEALTH",
    status: "ACTIVE",
    startDate: new Date("2018-05-11T11:56:51.000Z"),
    endDate: null,
    customer: {
      id: "7294685a-ac63-41b9-a6bd-269a9a593580",
      firstName: "Tani",
      lastName: "Erasmus",
      dateOfBirth: new Date("2022-03-06T08:51:11.000Z")
    }
  },
  {
    id: "b7d01f1d-2a40-4415-bbe4-7b5176e45ea9",
    provider: "TK",
    insuranceType: "HOUSEHOLD",
    status: "PENDING",
    startDate: new Date("2013-01-25T04:14:34.000Z"),
    endDate: null,
    customer: {
      id: "0fa012ef-d996-4daa-8b8e-96bae24db279",
      firstName: "Galvan",
      lastName: "Suggey",
      dateOfBirth: new Date("1992-05-23T18:12:40.000Z")
    }
  },
  {
    id: "03056c89-4c89-4fe9-9426-edcf9e6a167c",
    provider: "TK",
    insuranceType: "HEALTH",
    status: "ACTIVE",
    startDate: new Date("2012-09-24T09:55:17.000Z"),
    endDate: null,
    customer: {
      id: "8af01b47-2c3d-4ef8-a30a-4db1e66aafbd",
      firstName: "Rozelle",
      lastName: "Nipper",
      dateOfBirth: new Date("2005-08-12T07:01:40.000Z")
    }
  },
  {
    id: "959c59ee-cd47-4547-98e5-2f729363c604",
    provider: "AOK",
    insuranceType: "HEALTH",
    status: "PENDING",
    startDate: new Date("2020-05-02T05:53:46.000Z"),
    endDate: null,
    customer: {
      id: "fc4e4755-e3e7-400d-8e1f-aefbb7d66ba7",
      firstName: "Flossie",
      lastName: "Camings",
      dateOfBirth: new Date("2004-06-15T14:20:52.000Z")
    }
  },
  {
    id: "6c504ed4-6edd-413c-a3f8-b0b594d04ce5",
    provider: "BARMER",
    insuranceType: "HOUSEHOLD",
    status: "PENDING",
    startDate: new Date("2022-01-12T17:47:41.000Z"),
    endDate: null,
    customer: {
      id: "53cb461d-37a1-4be7-830b-7f9fb375d5ef",
      firstName: "Derril",
      lastName: "Gildersleeve",
      dateOfBirth: new Date("2006-02-23T00:10:07.000Z")
    }
  },
  {
    id: "c79bf386-29b3-4ce1-a6f2-91101d2adee5",
    provider: "TK",
    insuranceType: "HEALTH",
    status: "ACTIVE",
    startDate: new Date("2012-07-04T15:31:29.000Z"),
    endDate: null,
    customer: {
      id: "0cf909f4-e9d6-45a3-9cef-82419935bd9c",
      firstName: "Amanda",
      lastName: "McPherson",
      dateOfBirth: new Date("1977-10-16T17:54:53.000Z")
    }
  },
  {
    id: "79df66dc-0eca-4fdc-bb00-c9ae13f12cae",
    provider: "TK",
    insuranceType: "HEALTH",
    status: "PENDING",
    startDate: new Date("2012-08-01T03:25:59.000Z"),
    endDate: null,
    customer: {
      id: "2392ac02-e8cc-48ac-bc2a-430faa33e8f6",
      firstName: "Garnette",
      lastName: "Benda",
      dateOfBirth: new Date("1986-12-29T08:02:10.000Z")
    }
  },
  {
    id: "8f57b3c8-3631-4f4b-8804-227410430d92",
    provider: "BARMER",
    insuranceType: "LIABILITY",
    status: "ACTIVE",
    startDate: new Date("2014-04-14T12:39:02.000Z"),
    endDate: null,
    customer: {
      id: "ff8bc8d5-aa10-4229-9e5f-b8255cfc2e77",
      firstName: "Sam",
      lastName: "Penni",
      dateOfBirth: new Date("2002-03-24T11:34:21.000Z")
    }
  },
  {
    id: "8aaa522f-4f8b-46ac-a742-62058359cc40",
    provider: "TK",
    insuranceType: "HOUSEHOLD",
    status: "DROPPED_OUT",
    startDate: new Date("2017-05-28T11:56:27.000Z"),
    endDate: null,
    customer: {
      id: "eebd0bd5-b91d-43a5-8e4e-fc7faaf078af",
      firstName: "Jeffie",
      lastName: "Pinyon",
      dateOfBirth: new Date("2009-10-26T12:24:25.000Z")
    }
  },
  {
    id: "1f6608c3-d9ce-46a1-9804-d2ae8abcac72",
    provider: "AOK",
    insuranceType: "HOUSEHOLD",
    status: "CANCELLED",
    startDate: new Date("2012-03-29T01:59:13.000Z"),
    endDate: null,
    customer: {
      id: "803e86f3-8de4-4b3e-a3a9-4946469e1ded",
      firstName: "Mariette",
      lastName: "Cristofanini",
      dateOfBirth: new Date("2011-08-01T11:56:32.000Z")
    }
  },
  {
    id: "e20c45ed-620e-4cd8-998a-3abeaeb865ec",
    provider: "DAK",
    insuranceType: "LIABILITY",
    status: "PENDING",
    startDate: new Date("2013-11-15T09:58:45.000Z"),
    endDate: null,
    customer: {
      id: "66e0ae33-724a-4593-941d-2352de6fbaf0",
      firstName: "Jess",
      lastName: "Whittle",
      dateOfBirth: new Date("2017-08-20T14:53:21.000Z")
    }
  },
]