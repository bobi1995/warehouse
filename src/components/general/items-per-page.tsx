const ITEMS_PER_PAGE = 10;

const itemsPerPage = (page: number = 1, data: any) => {
  if (!data) {
    return {
      data: [],
      totalPages: 0,
    };
  }

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedMaterials = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(Number(data.length) / ITEMS_PER_PAGE);

  return {
    data: paginatedMaterials,
    totalPages,
  };
};

export default itemsPerPage;
