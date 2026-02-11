export const FORM_PATTERNS = {
  ONLY_LETTERS: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+(?:[ -][A-Za-zÁÉÍÓÚáéíóúÑñÜü]+)*$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
}

export const FORM_ERRORS = {
  firstName: 'Debes ingresar un nombre válido',
  lastName: 'Debes ingresar un apellido válido',
  email: 'Debes ingresar un correo electrónico válido',
  isAdult: 'Indica si eres mayor de Edad',
  isBankClient: 'Indica si eres cliente del Banco',
}
