const showDeclensionOfWord = (number, textForms) => {
  number = Math.abs(number) % 100;
  const num = number % 10;
  if (number > 10 && number < 20) { return textForms[2]; }
  if (num > 1 && num < 5) { return textForms[1]; }
  if (num == 1) { return textForms[0]; }
  return textForms[2];
};

export {showDeclensionOfWord};
