export const toErrorMap = (errors) => {
  let errorMap = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });
  return errorMap;
};
