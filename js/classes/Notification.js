import { formulario } from "../selectores.js";


export default class Notification {
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