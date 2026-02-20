export const FORM_PATTERNS = {
  ONLY_LETTERS: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+(?:[ -][A-Za-zÁÉÍÓÚáéíóúÑñÜü]+)*$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  USERNAME: /^[A-Za-z0-9]+$/,
  PASSWORD: /^(?=.*@)[A-Za-z0-9@]{8,}$/
}

export const FORM_ERRORS = {
  firstName: 'Debes ingresar un nombre válido',
  usuarioIncorrecto: 'El usuario solo puede contener letras y números',
  passwordIncorrecta: 'La contraseña debe contener letras, números y al menos un @',
  lastName: 'Debes ingresar un apellido válido',
  email: 'Debes ingresar un correo electrónico válido',
  isAdult: 'Indica si eres mayor de Edad',
  isBankClient: 'Indica si eres cliente del Banco',
  required: 'Este campo es obligatorio',
}
