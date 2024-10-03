import { tableClients } from "../selectores.js";
import { syncStorage, clearTable, cargarClient } from "../utilities.js";
import Notification from "./Notification.js";




export default class Clients {
    constructor() {
        this.clients = [];
    }

    addClient(client) {
        this.clients = [...this.clients, client];
        this.showClients();
        // add to local storage
        syncStorage();
    }

    editClient(clientUpdated) {
        this.clients = this.clients.map(client => client.id === clientUpdated.id ? clientUpdated : client);
        this.showClients();
        syncStorage();
    }

    deleteClient(id) {
        this.clients = this.clients.filter(client => client.id !== id);
        this.showClients();
        syncStorage();
    }

    showClients() {
        
        // limipar tabla

        while(tableClients.firstChild) {
            tableClients.removeChild(tableClients.firstChild);
        }

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