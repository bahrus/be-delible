import {register} from 'be-hive/register.js';
import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeDelibleActions, BeDelibleProps} from './types';

export class BeDelible implements BeDelibleActions{
    #trigger: HTMLButtonElement | undefined;
    intro(proxy: Element & BeDelibleProps, target: Element, beDecorProps: BeDecoratedProps): void{
    }
    finale(proxy: Element & BeDelibleProps, target: Element, beDecorProps: BeDecoratedProps): void{
        if(this.#trigger !== undefined){
            this.#trigger.removeEventListener('click', this.handleClick);
            this.#trigger.remove();
        }
    }
    onInsertPosition({text, insertPosition}: this): void{
        if(this.#trigger === undefined){
            switch(insertPosition){
                case 'afterbegin':
                case 'beforeend':
                    {
                        const trigger = this.proxy.querySelector('button.be-delible-trigger');
                        if(trigger !== null){
                            this.#trigger = trigger as HTMLButtonElement;
                        }
                    }
                    break;
                case 'beforebegin':
                    {
                        const trigger = this.proxy.previousElementSibling;
                        if(trigger !== null && trigger.matches('button.be-delible-trigger')){
                            this.#trigger = trigger as HTMLButtonElement;
                        }
                    }
                    break;
                case 'afterend':
                    {
                        const trigger = this.proxy.nextElementSibling;
                        if(trigger !== null && trigger.matches('button.be-delible-trigger')){
                            this.#trigger = trigger as HTMLButtonElement;
                        }
                    }
                    break;

            }
            if(this.#trigger === undefined){
                this.#trigger = document.createElement('button');
                this.#trigger.classList.add('be-delible-trigger');
                this.proxy.insertAdjacentElement(insertPosition, this.#trigger);
            }
            this.onText(this);
            this.#trigger.addEventListener('click', this.handleClick);
            
        }
    }

    onText({text}: this): void{
        if(this.#trigger !== undefined){
            this.#trigger.innerHTML = text;//TODO:  sanitize
        }
    }

    handleClick = (e: Event) => {
        this.proxy.remove();
        this.#trigger!.remove();
    }
}

export interface BeDelible extends BeDelibleProps{}

const tagName = 'be-delible';

const ifWantsToBe = 'delible';

const upgrade = '*';

define<BeDelibleProps & BeDecoratedProps<BeDelibleProps, BeDelibleActions>, BeDelibleActions>({
    config:{
        tagName,
        propDefaults:{
            ifWantsToBe,
            virtualProps: ['insertPosition', 'text'],
            upgrade,
            intro: 'intro',
            finale: 'finale',
            proxyPropDefaults:{
                insertPosition:'beforeend',
                text: '&times;',
            }
        },
        actions:{
            onInsertPosition: 'insertPosition',
            onText: 'text',
        }
    },
    complexPropDefaults:{
        controller: BeDelible,
    }
});

register(ifWantsToBe, upgrade, tagName);
