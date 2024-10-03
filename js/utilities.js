import { tableClients } from './selectores.js';
import { clientNameInput, emailInput, phoneInput, companyInput, fechaInput, formulario } from './selectores.js';
import Notification from './classes/Notification.js';
import { clientObject } from './variables.js';
import Clients from './classes/Clients.js';

const clients = new Clients();


export let editando = {
    editando: false
}


// utilities
export function resetObject() {
    clientObject.id = generateId();
    clientObject.name = '';
    clientObject.email = '';
    clientObject.phone = '';
    clientObject.company = '';
    clientObject.fecha = '';
}   

export function cargarClient(client) {
    
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
    editando.value = true;


}

export function generateId() {
    return Math.random().toString(36).substring(2) + new Date().getTime().toString(36);
}

export function clearTable() {
    while(tableClients.firstChild) {
        tableClients.removeChild(tableClients.firstChild);
    }
}


// add local storage

export function syncStorage() {
    localStorage.setItem('clients', JSON.stringify(clients.clients));
}

export function datosClient(e) {
    clientObject[e.target.name] = e.target.value;
}

export function submitClient(e) {
    e.preventDefault();

    // object clients
    if(Object.values(clientObject).some(value => value.trim() === '')) {
        new Notification({
            title: 'Error',
            message: 'Todos los campos son obligatorios',
            type: 'error'
        });
        return;
        
    } 
    if(editando.value){
        
        clients.editClient({...clientObject});
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cliente';
        formulario.querySelector('button[type="submit"]').classList.remove('btn-edit');
        editando.value = false;
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
    editando.value = false;
}

export function storageReady() {
    if(localStorage.getItem('clients')) {
        clients.clients = JSON.parse(localStorage.getItem('clients'));
        clients.showClients();
    }
}