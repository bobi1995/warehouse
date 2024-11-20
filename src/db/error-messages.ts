interface ErrorMessage {
  code: string;
  message: string;
}
const errorMessages: ErrorMessage[] = [
  //LOGIN ERRORS
  { code: "LOGIN_FAILED", message: "НЕУСПЕШНО ВЛИЗАНЕ" },
  { code: "USER_CREATE_FAILED", message: "НЕУСПЕШНО СЪЗДАВАНЕ НА ПОТРЕБИТЕЛ" },
  {
    code: "USER_REQUIRED",
    message: "ПОТРЕБИТЕЛЯТ НЕ Е НАМЕРЕН",
  },

  //CELL ERRORS
  { code: "CELL_CREATE_FAILED", message: "НЕУСПЕШНО СЪЗДАВАНЕ НА КЛЕТКИ" },

  //STILLAGE ERRORS
  { code: "STILLAGE_CREATE_FAILED", message: "НЕУСПЕШНО СЪЗДАВАНЕ НА СТЕЛАЖ" },
  { code: "STILLAGE_NOT_FOUND", message: "СТЕЛАЖЪТ НЕ Е НАМЕРЕН" },
  { code: "STILAGE_EDIT_FAILED", message: "НЕУСПЕШНО РЕДАКТИРАНЕ НА СТЕЛАЖ" },
  {
    code: "STILAGE_DELETE_FAILED",
    message: "НЕУСПЕШНО ИЗТРИВАНЕ НА СТЕЛАЖ",
  },
  {
    code: "STILLAGE_NOT_EMPTY",
    message: "НЕВЪЗМОЖНО ИЗТРИВАНЕ. ИМА НАЛИЧНОСТИ В СТЕЛАЖА.",
  },

  //MATERIAL ERRORS
  {
    code: "MATERIAL_CREATE_FAILED",
    message: "НЕУСПЕШНО СЪЗДАВАНЕ НА МАТЕРИАЛ",
  },
  {
    code: "MATERIAL_UPDATE_FAILED",
    message: "НЕУСПЕШНО РЕДАКТИРАНЕ НА МАТЕРИАЛ",
  },
  {
    code: "MATERIAL_DELETE_FAILED",
    message: "НЕУСПЕШНО ИЗТРИВАНЕ НА МАТЕРИАЛ",
  },

  //INVENTORY ERRORS
  {
    code: "INVENTORY_NOT_EMPTY",
    message: "Невъзможна редакция. Има наличности с този материал.",
  },
  {
    code: "INVENTORY_READ_FAILED",
    message: "НЕУСПЕШНО ИЗТЕГЛЯНЕ НА НАЛИЧНОСТИ",
  },
  {
    code: "INVENTORY_UPDATE_FAILED",
    message: "НЕУСПЕШНО РЕДАКТИРАНЕ НА НАЛИЧНОСТИ",
  },
  {
    code: "INVENTORY_DELETE_FAILED",
    message: "НЕУСПЕШНО ИЗТРИВАНЕ НА НАЛИЧНОСТИ",
  },
  {
    code: "INVENTORY_SHIFT_FAILED",
    message: "НЕУСПЕШНО РАЗМЕСТВАНЕ НА НАЛИЧНОСТИ",
  },

  //STORAGE ERRORS
  {
    code: "STORAGE_CREATE_FAILED",
    message: "НЕУСПЕШНО СЪЗДАВАНЕ НА СКЛАД",
  },
  {
    code: "STORAGE_EDIT_FAILED",
    message: "НЕУСПЕШНО РЕДАКТИРАНЕ НА СКЛАД",
  },
  {
    code: "STORAGE_DELETE_FAILED",
    message: "НЕУСПЕШНО ИЗТРИВАНЕ НА СКЛАД",
  },

  //TRANSACTION ERRORS
  {
    code: "TRANSACTION_READ_FAILED",
    message: "НЕУСПЕШНО ИЗТЕГЛЯНЕ НА ТРАНЗАКЦИИ",
  },
];

export const getErrorMessage = (code: string) => {
  const error = errorMessages.find((err) => err.code === code);
  return error ? error.message : "Непозната грешка";
};
