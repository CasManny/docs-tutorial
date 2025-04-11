import { useQueryState, parseAsString } from "nuqs";

export const useSearchParam = (key: string) => {
  return useQueryState(
    key,
    parseAsString.withDefault("").withOptions({ clearOnDefault: true })
  );
};
