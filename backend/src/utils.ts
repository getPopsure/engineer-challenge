export const getMatchingEnumValueByString = <T>(
  enumObj: { [s: string]: T },
  value: string
): T[] | undefined => {
  const matchingKeys = Object.keys(enumObj).filter((enumKey) => {
    return enumKey.includes(value.toUpperCase());
  });
  const matchingValues = matchingKeys.map((key) => enumObj[key]); // convert back to enum value type
  return matchingValues.length ? matchingValues : undefined;
};
