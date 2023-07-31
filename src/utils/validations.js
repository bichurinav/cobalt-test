export const emptyValid = {
  error: "Обязательно к заполнению",
  validator: (value) => value !== "",
};

export const numsValid = {
  error: "Только цифры",
  pattern: new RegExp(/^[0-9]+$/),
};

export const indexValid = {
  error: "Введите 6 символов",
  validator: (value) => value.length === 6,
};
