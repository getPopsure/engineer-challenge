import { Policy } from "../types";

export const contextValue = {
  filters: {},
  page: 0,
  policies: [],
  providers: ["BARMER", "AOK", "TK", "DAK"],
  resultsPerPage: 10,
  totalPolicies: 0
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
    id: "54d505d5-5b68-4d1a-82d9-c1f2e1757860",
    provider: "AOK",
    insuranceType: "LIABILITY",
    status: "ACTIVE",
    startDate: new Date("2016-04-14T02:53:58.000Z"),
    endDate: null,
    customer: {
      id: "b8359da8-8bf5-42d9-825a-c76f4cfd70a2",
      firstName: "Valeria",
      lastName: "Keysel",
      dateOfBirth: new Date("1979-04-23T10:03:12.000Z")
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
  }
]