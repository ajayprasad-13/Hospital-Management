export const filterByDropdown = (
  data: Record<string, any>,
  dropdownKey: string,
  dropdown: string
) => {
  if (dropdown === "") {
    return data;
  }

  return data.filter(
    (data: Record<string, any>) => data?.[dropdownKey] === dropdown
  );
};

export const filterByDropdownAndSearch = (
  data: Record<string, any>[],
  dropdownKey: string,
  searchQueryKey: string,
  dropdown: string,
  searchQuery: string
) => {
  return data?.filter((item) => {
    const matchesDropdown =
      !dropdown || item[dropdownKey]?.toLowerCase() === dropdown.toLowerCase();

    const value = item[searchQueryKey];
    const matchesSearch =
      !searchQuery ||
      (typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesDropdown && matchesSearch;
  });
};

export const filterBySearch = (
  data: Record<string, any>[],
  searchQueryKey: string,
  searchQuery: string
): Record<string, any>[] => {
  if (!searchQuery) return data;

  return data.filter((item) => {
    const value = item[searchQueryKey];

    return (
      typeof value === "string" &&
      value.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
};
