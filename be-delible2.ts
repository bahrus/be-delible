import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA, ProPOA} from './types';
import {register} from 'be-hive/register.js';

export class BeDelible extends BE<AP, Actions> implements Actions{
    static  override get beConfig(){
        return {
            parse: true,
        } as BEConfig
    }

    #trigger: WeakRef<HTMLButtonElement> | undefined;

    get trigger(){
        if(this.#trigger === undefined) return undefined;
        return this.#trigger.deref();
    }

    async addDeleteBtn(self: this){
        if(this.trigger === undefined){
            //the check above is unlikely to ever fail.
            const {buttonInsertPosition, enhancedElement} = self;
            const {findAdjacentElement} = await import('be-enhanced/findAdjacentElement.js');
            const trigger = findAdjacentElement(buttonInsertPosition!, enhancedElement, 'button.be-delible-trigger');
            if(trigger !== null) this.#trigger = new WeakRef(trigger as HTMLButtonElement);
            let byob = true;
            if(this.trigger === undefined){
                byob = false;
                const trigger = document.createElement('button');
                trigger.type = 'button';
                trigger.classList.add('be-delible-trigger');
                trigger.ariaLabel = 'Delete this.';
                trigger.title = 'Delete this.';
                enhancedElement.insertAdjacentElement(buttonInsertPosition!, trigger);
                this.#trigger = new WeakRef(trigger);
            }
            return [{resolved: true, byob}, {beDeleted: {on: 'click', of: this.trigger}}] as POA
        }else{
            return [{}, {}] as POA
        }
    }

    beDeleted(self: this): void {
        const {enhancedElement} = self;
        enhancedElement.remove();
        this.trigger?.remove();
    }

    setBtnContent(self: this): void {
        if(this.trigger !== undefined){
            const {buttonContent} = self;
            this.trigger.innerHTML = buttonContent! //TODO:  sanitize
        }
    }
}

export interface BeDelible extends AllProps{}

const tagName = 'be-delible';
const ifWantsToBe = 'delible';
const upgrade = '*';

const xe = new XE<AP, Actions>({
    config: {
        tagName,
        propDefaults: {
            ...propDefaults,
            byob: true,
            buttonInsertPosition: 'beforeend',
            buttonContent: '&times;',
        },
        propInfo: {
            ...propInfo
        },
        actions: {
            addDeleteBtn: 'buttonInsertPosition',
            setBtnContent: {
                ifAllOf: ['buttonContent'],
                ifNoneOf: ['byob']
            },
        }
    },
    superclass: BeDelible
});

register(ifWantsToBe, upgrade, tagName);