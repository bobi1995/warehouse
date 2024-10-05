interface ErrorMessage {
  code: string;
  message: string;
}
const errorMessages: ErrorMessage[] = [
  { code: "CELL_CREATE_FAILED", message: "НЕУСПЕШНО СЪЗДАВАНЕ НА КЛЕТКИ" },
  { code: "STILLAGE_CREATE_FAILED", message: "НЕУСПЕШНО СЪЗДАВАНЕ НА СТЕЛАЖ" },
  { code: "STILLAGE_NOT_FOUND", message: "СТЕЛАЖЪТ НЕ Е НАМЕРЕН" },
  { code: "STILAGE_EDIT_FAILED", message: "НЕУСПЕШНО РЕДАКТИРАНЕ НА СТЕЛАЖ" },
  { code: "LOGIN_FAILED", message: "НЕУСПЕШНО ВЛИЗАНЕ" },
  {
    code: "MATERIAL_CREATE_FAILED",
    message: "НЕУСПЕШНО СЪЗДАВАНЕ НА МАТЕРИАЛ",
  },
];

export const getErrorMessage = (code: string) => {
  const error = errorMessages.find((err) => err.code === code);
  return error ? error.message : "Непозната грешка";
};
