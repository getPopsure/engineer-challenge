export type TPolicy = {
  name: string;
  id: string;
  type: string;
  provider: string;
  status: string;
}

export type ProviderProps = "BARMER" | "AOK" | "TK" | "DAK"
export type TypesProps = "LIABILITY" | "HOUSEHOLD" | "HEALTH"
export type StatusProps = "ACTIVE" | "PENDING" | "CANCELLED" | "DROPPED_OUT"