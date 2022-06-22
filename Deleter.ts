import {BeDelibleVirtualProps} from './types';
import {findAdjacentElement} from 'be-decorated/findAdjacentElement.js';

export class Deleter{
    #trigger: HTMLButtonElement | undefined;

    constructor(public proxy: Element, public props: BeDelibleVirtualProps){
        if(props === undefined){
            this.props = proxy as any as BeDelibleVirtualProps;
        }
    }

    async addDeleteButtonTrigger({insertPosition, then}: BeDelibleVirtualProps){
        if(this.#trigger === undefined){
            const trigger = findAdjacentElement(insertPosition, this.proxy, 'button.be-delible-trigger');
            if(trigger !== null) this.#trigger = trigger as HTMLButtonElement;
            if(this.#trigger === undefined){
                this.#trigger = document.createElement('button');
                this.#trigger.classList.add('be-delible-trigger');
                this.proxy.insertAdjacentElement(insertPosition, this.#trigger);
            }
            this.setText(this.props);
            this.#trigger.addEventListener('click', this.handleClick);
            if(then !== undefined){
                const {doThen} = await import('be-decorated/doThen.js');
                doThen(this.proxy, then);
            }
        }
    }

    setText({text}: BeDelibleVirtualProps): void{
        if(this.#trigger !== undefined){
            this.#trigger.innerHTML = text;//TODO:  sanitize
        }
    }

    handleClick = (e: Event) => {
        this.proxy.remove();
        this.#trigger!.remove();
    }
}