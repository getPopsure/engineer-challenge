export type TPolicy = {
  name: string;
  id: string;
  type: TTypes;
  provider: TProviders;
  status: TStatus;
}

export type TProviders = "BARMER" | "AOK" | "TK" | "DAK"
export type TTypes = "LIABILITY" | "HOUSEHOLD" | "HEALTH"
export type TStatus = "ACTIVE" | "PENDING" | "CANCELLED" | "DROPPED_OUT"