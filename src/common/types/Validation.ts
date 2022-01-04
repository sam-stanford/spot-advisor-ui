type Validation = {
  isValid: (value: string) => boolean;
  error: string;
};
export default Validation;

const requiredValidation: Validation = {
  isValid: (val: string) =>
    val !== `${undefined}` && val !== `${null}` && val !== '',
  error: 'Field required',
};

const isPositiveValidation: Validation = {
  isValid: (val: string) => val !== '' && Number(val) >= 0,
  error: 'Must be a positive value',
};

const isIntegerValidation: Validation = {
  isValid: (val: string) => val !== '' && Number.isInteger(Number(val)),
  error: 'Must be an integer',
};

export { requiredValidation, isPositiveValidation, isIntegerValidation };
