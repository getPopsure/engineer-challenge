import { atom } from "recoil";
import { InsuranceType, PolicyStatus } from "../models/Policy";

export type FilterType = {
  Name: string;
  Type: InsuranceType[];
  Provider: string;
  Status: PolicyStatus[];
};

export type PaginationType = {
  activePage: number;
  totalPages: number;
  totalRecords: number;
  recordsPerPage: number;
};

export const filterAtom = atom<FilterType>({
  key: "filterAtom",
  default: {
    Name: "",
    Type: [],
    Provider: "",
    Status: ["ACTIVE", "PENDING"],
  },
});

export const paginationAtom = atom<PaginationType>({
  key: "paginationAtom",
  default: {
    activePage: 1,
    totalPages: 1,
    totalRecords: 0,
    recordsPerPage: 8,
  },
});
