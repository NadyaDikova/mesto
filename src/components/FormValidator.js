export default class FormValidator {
  constructor(selectorsConfig, formElement) {
    this._inputSelector = selectorsConfig.inputSelector;
    this._submitButtonSelector = selectorsConfig.submitButtonSelector;
    this._inactiveButtonClass = selectorsConfig.inactiveButtonClass;
    this._inputErrorClass = selectorsConfig.inputErrorClass;
    this._errorClass = selectorsConfig.errorClass;
    this._formElement = formElement;
  }

  // функция добавляет класс с ошибкой
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // функция удаляет класс с ошибкой
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  // функция проверяет ОДНО поле на валидность
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //функция проверяет ВСЕ поля на валидность
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // функция вкл/выкл кнопки при валидности
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute("disabled", "");
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute("disabled");
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  //функция, которая добавляет слушатели всем инпутам внутри формы
  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._formElement.reset();
    this._formElement.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButtonState(), 0;
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
