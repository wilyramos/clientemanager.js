// imports
import { clientNameInput, emailInput, phoneInput, companyInput, fechaInput, formulario, tableClients } from './selectores.js';
import { submitClient, datosClient, storageReady,  } from './utilities.js';


// Event Listeners

clientNameInput.addEventListener('change', datosClient);
emailInput.addEventListener('change', datosClient);
phoneInput.addEventListener('change', datosClient);
companyInput.addEventListener('change', datosClient);
fechaInput.addEventListener('change', datosClient);
formulario.addEventListener('submit', submitClient);

document.addEventListener('DOMContentLoaded', () => {
    storageReady();

});


