export const validateIsEmpty = (value: any) => {
  if (value) {
    return value;
  } else {
    return 'Não informado';
  }
};
