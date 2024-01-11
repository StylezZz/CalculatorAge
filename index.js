// Validar que se haya ingresado números en los inputs
const dateInput = document.getElementById('date');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const buttonSubmit = document.getElementById('button-submit');
let errorDias=0,errorMes=0,errorYear=0;

buttonSubmit.addEventListener('click', () => {
  // Obtener los valores de los inputs
  const dateValue = dateInput.value.trim();
  const monthValue = monthInput.value.trim();
  const yearValue = yearInput.value.trim();

  // Validar que no se envíen todos los campos vacíos
  if (dateValue === '' && monthValue === '' && yearValue === '') {
    // Mostrar mensaje de error para cada campo vacío
    const groupArrays = document.querySelectorAll('.group');
    groupArrays.forEach(group => {
      handleInputError(group, 'This field is required');
    });
  } else {
    // Validar el día
    
    if (dateValue !== '') {
      const dateNumber = parseInt(dateValue);
      const monthNumber = parseInt(monthValue);

      // Verificar si el mes tiene 30 días y el día ingresado es mayor a 30
      if ((monthNumber === 4 || monthNumber === 6 || monthNumber === 9 || monthNumber === 11) && dateNumber > 30) {
        const dayGroup = document.getElementById('day-group');
        handleInputError(dayGroup, 'Must be a valid day');
        errorDias=1;
      }

      // Verificar si el mes es febrero y el día ingresado es mayor a 28 (o 29 en años bisiestos)
      else if (monthNumber === 2 && (dateNumber > 29 || (dateNumber > 28 && !isLeapYear(yearValue)))) {
        const dayGroup = document.getElementById('day-group');
        handleInputError(dayGroup, 'Must be a valid date');
        errorDias=1;
      }

      // Verificar si el día ingresado está fuera del rango general
      else if (dateNumber < 1 || dateNumber > 31) {
        const dayGroup = document.getElementById('day-group');
        handleInputError(dayGroup, 'Must be a valid date');
        errorDias=1;
      }
    }

    // Validar el mes
    if (monthValue !== '') {
      const monthNumber = parseInt(monthValue);

      // Verificar si el mes ingresado está fuera del rango general
      if (monthNumber < 1 || monthNumber > 12) {
        const monthGroup = document.getElementById('month-group');
        handleInputError(monthGroup, 'Must be a valid month');
        errorMes=1;
      }
    }

    // Validar el año
    if (yearValue !== '') {
      const yearNumber = parseInt(yearValue);

      // Verificar si el año ingresado está fuera del rango general
      if (yearNumber < 1900 || yearNumber > 2021) {
        const yearGroup = document.getElementById('year-group');
        handleInputError(yearGroup, 'Must be a valid year');
        errorYear=1;
      }
    }

    if(errorDias==0 && errorMes==0 && errorYear==0){
      const fechaIngresada = new Date(`${yearInput.value}-${monthInput.value}-${dateInput.value}`);
      const fechaActual = new Date();
      const milisegundos = fechaActual - fechaIngresada;
      
      // Calcular años, meses y días
      const milisegundosEnUnAño = 1000 * 60 * 60 * 24 * 365.25;
      const años = Math.floor(milisegundos / milisegundosEnUnAño);

      // Calcular los milisegundos restantes después de calcular los años
      const milisegundosRestantes = milisegundos % milisegundosEnUnAño;

      // Calcular meses y días
      const milisegundosEnUnMes = milisegundosEnUnAño / 12;
      const meses = Math.floor(milisegundosRestantes / milisegundosEnUnMes);
      const días = Math.floor((milisegundosRestantes % milisegundosEnUnMes) / (1000 * 60 * 60 * 24))-1;

      const yearSpan = document.querySelector('.years-result');
      const monthSpan = document.querySelector('.months-result');
      const daySpan = document.querySelector('.days-result');

      yearSpan.innerHTML = años;
      monthSpan.innerHTML = meses;
      daySpan.innerHTML = días;
    }
  }
});

// Función para manejar el error en el input
function handleInputError(group, errorMessage) {
  const label = group.querySelector('label');
  label.style.color = 'red';
  const errorDiv = group.querySelector('.error-message');
  errorDiv.style.display = 'block';
  errorDiv.innerHTML = errorMessage;
  const inputError = group.querySelector('input');
  inputError.style.border = '1px solid red';
}

// Función para verificar si un año es bisiesto
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

//Mostrar la cantidad de días, meses y años que han pasado desde la fecha ingresada

