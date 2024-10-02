// Selects

const clientNameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const companyInput = document.querySelector('#company');
const fechaInput = document.querySelector('#fecha');

const formulario = document.querySelector('#formulario-cliente');
const tableClients = document.querySelector('#tabla-clientes');



// Event Listeners

clientNameInput.addEventListener('change', datosClient);
emailInput.addEventListener('change', datosClient);
phoneInput.addEventListener('change', datosClient);
companyInput.addEventListener('change', datosClient);
fechaInput.addEventListener('change', datosClient);

formulario.addEventListener('submit', submitClient);

// Object of client

const clientObject = {
    name: '',
    email: '',
    phone: '',
    company: '',
    fecha: ''
}


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
        return;
        
    } else {
        const client = new Clients();
        client.addClient({...clientObject}); // Spread operator para crear una copia del objeto
        formulario.reset();
        resetObject();

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

// Agrergar cliente

class Clients {
    constructor() {
        this.clients = [];

    }

    addClient(client) {
        this.clients = [...this.clients, client];
        console.log(this.clients);
        this.showClients();
    }

    showClients() {
        // Limpiar HTML

        // while(tableClients.firstChild) {
        //      tableClients.removeChild(tableClients.firstChild);
        // }

        // Generar HTML


        this.clients.forEach(client => {
            const divClient = document.createElement('div');
            divClient.classList.add('bg-red', 'p-3', 'rounded', 'mb-2', 'shadow', 'flex', 'justify-between', 'items-center');
            const cliente = document.createElement('P');
            cliente.innerHTML = `
                <span class="font-bold">Nombre:</span> ${client.name} <br>
                <span class="font-bold">Email:</span> ${client.email} <br>
                <span class="font-bold">Telefono:</span> ${client.phone} <br>
                <span class="font-bold">Empresa:</span> ${client.company} <br>
                <span class="font-bold">Fecha:</span> ${client.fecha} <br>
            `;
            const btnDelete = document.createElement('button');
            btnDelete.textContent = 'Eliminar';
            btnDelete.classList.add('bg-red-500', 'hover:bg-red-700', 'text-white', 'font', 'p-2', 'rounded', 'shadow');

            const btnEdit = document.createElement('button');
            btnEdit.textContent = 'Editar';
            btnEdit.classList.add('bg-green-500', 'hover:bg-green-700', 'text-white', 'font', 'p-2', 'rounded', 'shadow', 'mr-2');




            const contenedorBtns = document.createElement('div');
            contenedorBtns.classList.add('flex', 'justify-end', 'items-center');
            contenedorBtns.appendChild(btnEdit);
            contenedorBtns.appendChild(btnDelete);
            divClient.appendChild(contenedorBtns);
            
            divClient.appendChild(cliente);
            tableClients.appendChild(divClient);
        });
        
    }
    
}

// utilities

function resetObject() {
    clientObject.name = '';
    clientObject.email = '';
    clientObject.phone = '';
    clientObject.company = '';
    clientObject.fecha = '';
}   





