export const filterByCategory = (
  data: Record<string, any>,
  filterData: string,
  catergory: string
) => {
  if (catergory === "") {
    return data;
  }

  return data.filter(
    (data: Record<string, any>) => data?.[filterData] === catergory
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
