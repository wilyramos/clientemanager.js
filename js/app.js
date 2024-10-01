// Selects

const clientNameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const companyInput = document.querySelector('#company');
const fechaInput = document.querySelector('#fecha');

const formulario = document.querySelector('#formulario-cliente');



// Event Listeners

clientNameInput.addEventListener('change', datosClient);
emailInput.addEventListener('change', datosClient);
phoneInput.addEventListener('change', datosClient);
companyInput.addEventListener('change', datosClient);
fechaInput.addEventListener('change', datosClient);

formulario.addEventListener('submit', submitClient);

function datosClient(e) {
    clientObject[e.target.name] = e.target.value;
    console.log(clientObject);
}

function submitClient(e) {
    e.preventDefault();
    
    if(Object.values(clientObject).includes('')) {
        alert('Todos los campos son obligatorios');
    } else {
        console.log('Enviando datos...');
    }
}


// Object of client

const clientObject = {
    name: '',
    email: '',
    phone: '',
    company: '',
    fecha: ''
}




