import {register} from 'be-hive/register.js';
import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {Actions, PP, PPE, VirtualProps, Proxy, ProxyProps} from './types';
export class BeDelible extends EventTarget implements Actions{
    #trigger: HTMLButtonElement | undefined;
    async addDeleteBtn(pp: PP): Promise<PPE | void> {
        if(this.#trigger === undefined){
            //the check above is unlikely to ever fail.
            const {buttonInsertPosition, self} = pp;
            const {findAdjacentElement} = await import('be-decorated/findAdjacentElement.js');
            const trigger = findAdjacentElement(buttonInsertPosition!, self, 'button.be-delible-trigger');
            if(trigger !== null) this.#trigger = trigger as HTMLButtonElement;
            let byob = true;
            if(this.#trigger === undefined){
                byob = false;
                this.#trigger = document.createElement('button');
                this.#trigger.type = 'button';
                this.#trigger.classList.add('be-delible-trigger');
                this.#trigger.ariaLabel = 'Delete this.';
                this.#trigger.title = 'Delete this.';
                self.insertAdjacentElement(buttonInsertPosition!, this.#trigger);
            }
            return [{resolved: true, byob}, {beDeleted: {on: 'click', of: this.#trigger}}]
        }else{
            //can't think of a scenario where consumer would want to change the trigger position midstream, so not bothering to do anything here
        }
    }

    beDeleted({self}: PP): void {
        self.remove();
        this.#trigger!.remove();
    }

    setBtnContent({buttonContent}: PP): void{
        if(this.#trigger !== undefined){
            this.#trigger.innerHTML = buttonContent!;//TODO:  sanitize
        }
    }

    finale() {
        this.#trigger = undefined;
    }
}

const tagName = 'be-delible';

const ifWantsToBe = 'delible';

const upgrade = '*';

define<VirtualProps & BeDecoratedProps<VirtualProps, Actions>, Actions>({
    config:{
        tagName,
        propDefaults:{
            ifWantsToBe,
            virtualProps: ['buttonContent', 'buttonInsertPosition', 'byob'],
            upgrade,
            finale: 'finale',
            proxyPropDefaults:{
                byob: true,
                buttonInsertPosition:'beforeend',
                buttonContent: '&times;',
            }
        },
        actions:{
            addDeleteBtn: 'buttonInsertPosition',
            setBtnContent: {
                ifAllOf: ['buttonContent'],
                ifNoneOf: ['byob']
            },
        }
    },
    complexPropDefaults:{
        controller: BeDelible,
    }
});


register(ifWantsToBe, upgrade, tagName);