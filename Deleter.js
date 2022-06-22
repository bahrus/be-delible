import { findAdjacentElement } from 'be-decorated/findAdjacentElement.js';
export class Deleter {
    proxy;
    props;
    #trigger;
    constructor(proxy, props) {
        this.proxy = proxy;
        this.props = props;
        if (props === undefined) {
            this.props = proxy;
        }
    }
    async addDeleteButtonTrigger({ insertPosition, then }) {
        if (this.#trigger === undefined) {
            const trigger = findAdjacentElement(insertPosition, this.proxy, 'button.be-delible-trigger');
            if (trigger !== null)
                this.#trigger = trigger;
            if (this.#trigger === undefined) {
                this.#trigger = document.createElement('button');
                this.#trigger.classList.add('be-delible-trigger');
                this.proxy.insertAdjacentElement(insertPosition, this.#trigger);
            }
            this.setText(this.props);
            this.#trigger.addEventListener('click', this.handleClick);
            if (then !== undefined) {
                const { doThen } = await import('be-decorated/doThen.js');
                doThen(this.proxy, then);
            }
        }
    }
    setText({ text }) {
        if (this.#trigger !== undefined) {
            this.#trigger.innerHTML = text; //TODO:  sanitize
        }
    }
    handleClick = (e) => {
        this.proxy.remove();
        this.#trigger.remove();
    };
    dispose() {
        if (this.#trigger !== undefined) {
            this.#trigger.removeEventListener('click', this.handleClick);
            this.#trigger.remove();
        }
    }
}
export const proxyPropDefaults = {
    insertPosition: 'beforeend',
    text: '&times;',
};
