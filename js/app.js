// Selects

const clientNameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const companyInput = document.querySelector('#company');
const fechaInput = document.querySelector('#fecha');

const formulario = document.querySelector('#formulario-cliente');
const tableClients = document.querySelector('#tabla-clientes');

// buttons

const btnDelete = document.querySelector('.btn-delete');
const btnEdit = document.querySelector('.btn-edit');

let editando = false;

// Event Listeners

clientNameInput.addEventListener('change', datosClient);
emailInput.addEventListener('change', datosClient);
phoneInput.addEventListener('change', datosClient);
companyInput.addEventListener('change', datosClient);
fechaInput.addEventListener('change', datosClient);

formulario.addEventListener('submit', submitClient);

document.addEventListener('DOMContentLoaded', () => {

    
    if(localStorage.getItem('clients')) {
        clientes = JSON.parse(localStorage.getItem('clients'));
        clients.clients = clientes;
        clients.showClients();
    }
});

// Object of client

const clientObject = {
    id: generateId(),
    name: '',
    email: '',
    phone: '',
    company: '',
    fecha: ''
}




function datosClient(e) {
    clientObject[e.target.name] = e.target.value;
    // console.log(clientObject);
}

function submitClient(e) {
    e.preventDefault();

    // object clients
    
    
    console.log(clientObject);
    if(Object.values(clientObject).some(value => value.trim() === '')) {
        new Notification({
            title: 'Error',
            message: 'Todos los campos son obligatorios',
            type: 'error'
        });
        return;
        
    } 
    if(editando){
        
        console.log(clientObject);
        clients.editClient({...clientObject});
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cliente';
        formulario.querySelector('button[type="submit"]').classList.remove('btn-edit');
        editando = false;
        new Notification({
            title: 'Cliente',
            message: 'Cliente editado correctamente',
            type: 'success'
        });
        resetObject();

    } else {
        clients.addClient({...clientObject});
        new Notification({
            title: 'Cliente',
            message: 'Cliente agregado correctamente',
            type: 'success'
        });
        resetObject();
    }
    formulario.reset();
    editando = false;
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
        // add to local storage
        syncStorage();
    }

    editClient(clientUpdated) {
        this.clients = this.clients.map(client => client.id === clientUpdated.id ? clientUpdated : client);
        this.showClients();
        console.log(this.clients);
    }

    deleteClient(id) {
        this.clients = this.clients.filter(client => client.id !== id);
        this.showClients();
    }

    showClients() {

        clearTable();

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
            const btnEdit = document.createElement('button');
            btnEdit.textContent = 'Editar';
            btnEdit.classList.add('text-white', 'bg-yellow-500', 'p-1', 'rounded', 'shadow');
            btnEdit.classList.add('btn', 'btn-edit');
            const clone = structuredClone(client);
            btnEdit.onclick = () => cargarClient(clone);

            const btnDelete = document.createElement('button');

            btnDelete.classList.add('text-white', 'bg-red-500', 'p-1', 'rounded', 'shadow');
            btnDelete.textContent = 'Eliminar';
            btnDelete.classList.add('btn', 'btn-delete');
            btnDelete.onclick = () => {
                this.deleteClient(client.id);
                new Notification({
                    title: 'Cliente',
                    message: 'Cliente eliminado correctamente',
                    type: 'success'
                });
            }

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

// object clients

const clients = new Clients();


// utilities
function resetObject() {
    clientObject.id = generateId();
    clientObject.name = '';
    clientObject.email = '';
    clientObject.phone = '';
    clientObject.company = '';
    clientObject.fecha = '';
}   

function cargarClient(client) {
    
    const {name, email, phone, company, fecha, id} = client;
    clientObject.name = name;
    clientObject.email = email;
    clientObject.phone = phone;
    clientObject.company = company;
    clientObject.fecha = fecha;
    clientObject.id = id;

    clientNameInput.value = name;
    emailInput.value = email;
    phoneInput.value = phone;
    companyInput.value = company;
    // fechaInput.value = fecha;

    formulario.querySelector('button[type="submit"]').textContent = 'Editar Cliente';
    formulario.querySelector('button[type="submit"]').classList.add('btn-edit');
    editando = true;

    console.log(clientObject);
    console.log(client);

}

function generateId() {
    return Math.random().toString(36).substring(2) + new Date().getTime().toString(36);
}

function clearTable() {
    while(tableClients.firstChild) {
        tableClients.removeChild(tableClients.firstChild);
    }
}


// add local storage

function syncStorage() {

    localStorage.setItem('clients', JSON.stringify(clients.clients));
    
}


