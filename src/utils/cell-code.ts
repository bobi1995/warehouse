const getColumnLabel = (colIndex: number) => String.fromCharCode(65 + colIndex); // 65 is 'A' in ASCII
export const formatCellCode = (code: string) => {
  const [row, col] = code.split("-").map(Number);
  return `${row}-${getColumnLabel(col)}`;
};
