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
    
    if(Object.values(clientObject).some(value => value.trim() === '')) {
        new Notification({
            title: 'Error',
            message: 'Todos los campos son obligatorios',
            type: 'error'
        });
        
    } else {
        new Notification({
            title: 'Correcto',
            message: 'Cliente agregado correctamente',
            type: 'success'
        });
    }
}

// slice para mostrar mensaje DE validacion


class Notification {
    constructor({title, message, type}) {
        this.title = title;
        this.message = message;
        this.type = type;
        this.show();
    }

    show() {

        const prevAlert = document.querySelector('.notification');
        prevAlert?.remove();
        
        const notification = document.createElement('div');
        notification.classList.add('text-white', 'p-3', 'mb-3', 'text-center', 'rounded', 'font', 'notification');

        notification.textContent = this.message;

        if(this.type === 'error') {
            notification.classList.add('bg-red-500');
        } else {
            notification.classList.add('bg-green-500');
        }

        formulario.insertBefore(notification, formulario.firstChild);

        setTimeout(() => {
            notification.remove();
        }, 3000);
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




