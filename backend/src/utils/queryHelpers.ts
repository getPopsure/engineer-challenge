import { Prisma } from "@prisma/client";

function findByValueOrArray<Type, Key extends keyof Type>(
  enumObj: Type,
  key: Key,
  incomingQueryParam: string | Array<string>,
  whereAnd: Array<Prisma.PolicyWhereInput>,
  fieldName: string
) {
  if (incomingQueryParam) {
    if (Array.isArray(incomingQueryParam)) {
      const whereNestedOr: Array<Prisma.PolicyWhereInput> = [];
      incomingQueryParam.forEach((singlePolicyState) => {
        whereNestedOr.push({
          [fieldName]: enumObj[singlePolicyState as Key],
        });
      });
      whereAnd.push({ OR: whereNestedOr });
    } else {
      whereAnd.push({
        [fieldName]: enumObj[incomingQueryParam as Key],
      });
    }
  }
}
export { findByValueOrArray };
