import {VirtualProps, EndUserProps} from './types';
import {findAdjacentElement} from 'be-decorated/findAdjacentElement.js';

export class Deleter{
    #trigger: HTMLButtonElement | undefined;

    constructor(public proxy: Element, public props: EndUserProps){
        if(props === undefined){
            this.props = proxy as any as VirtualProps;
        }
    }

    async addDeleteButtonTrigger({insertPosition}: EndUserProps){
        if(this.#trigger === undefined){
            const trigger = findAdjacentElement(insertPosition!, this.proxy, 'button.be-delible-trigger');
            if(trigger !== null) this.#trigger = trigger as HTMLButtonElement;
            if(this.#trigger === undefined){
                this.#trigger = document.createElement('button');
                this.#trigger.type = 'button';
                this.#trigger.classList.add('be-delible-trigger');
                this.proxy.insertAdjacentElement(insertPosition!, this.#trigger);
            }
            this.setText(this.props);
            this.#trigger.addEventListener('click', this.handleClick);
        }
    }

    setText({text}: EndUserProps): void{
        if(this.#trigger !== undefined){
            this.#trigger.innerHTML = text!;//TODO:  sanitize
        }
    }

    handleClick = (e: Event) => {
        this.proxy.remove();
        this.#trigger!.remove();
    }

    dispose(){
        if(this.#trigger !== undefined){
            this.#trigger.removeEventListener('click', this.handleClick);
            this.#trigger.remove();
        }
    }
}

export const proxyPropDefaults: EndUserProps = {
    insertPosition:'beforeend',
    text: '&times;',
}