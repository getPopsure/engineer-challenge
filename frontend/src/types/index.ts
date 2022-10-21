export type TPolicy = {
  firstName: string;
  lastName: string;
  id: string;
  type: string;
  provider: string;
  status: string;
}

export type ProviderProps = "BARMER" | "AOK" | "TK" | "DAK"
export type TypesProps = "HEALTH" | "LIABILITY" | "HOUSEHOLD"
export type StatusProps = "PENDING" | "ACTIVE"