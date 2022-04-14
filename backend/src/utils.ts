export const getMatchingEnumValue = <T>(
  enumObj: { [s: string]: T },
  value: string
): T[] | undefined => {
  const matchingKeys = Object.keys(enumObj).filter((enumKey) => {
    return enumKey.includes(value.toUpperCase());
  });
  const matchingList = matchingKeys.map((key) => enumObj[key]); // convert back to enum value type
  return matchingList.length ? matchingList : undefined;
};
