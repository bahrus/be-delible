// @ts-check
import { resolved, rejected, propInfo} from 'be-enhanced/cc.js';
import { BE } from 'be-enhanced/BE.js';
import {dispatchEvent as de} from 'trans-render/positractions/dispatchEvent.js';

/** @import {BEConfig, IEnhancement, BEAllProps} from './ts-refs/be-enhanced/types.d.ts' */
/** @import {Actions, PAP, AllProps, AP, BAP} from './ts-refs/be-delible/types.d.ts' */;

/**
 * @implements {Actions}
 */
class BeDelible extends BE{
    /**
     * @type {BEConfig<BAP, Actions & IEnhancement>}
     */
    static config = {
        propDefaults:{
            byob: true,
            triggerInsertPosition: 'beforeend',
            buttonContent: '⌫'
        },
        propInfo: {
            ...propInfo,
            trigger: {
                ro: true
            }
        },
        positractions: [resolved, rejected],
        compacts: {
            when_triggerInsertPosition_changes_invoke_addDeleteBtn: 0
        },
        actions: {
            setBtnContent: {
                ifAllOf: ['buttonContent'],
                ifNoneOf: ['byob']
            }
        },
        handlers: {
            trigger_to_beDeleted_on: 'click'
        }
    }

    de = de;

    /**
     * 
     * @param {BAP} self 
     * @returns 
     */
    async addDeleteBtn(self){
        const {triggerInsertPosition, enhancedElement, buttonContent} = self;
        const { findAdjacentElement } = await import('trans-render/lib/findAdjacentElement.js');
        let trigger = /** @type {HTMLButtonElement | null} */ (findAdjacentElement(triggerInsertPosition, enhancedElement, 'button.be-clonable-trigger'));
        let byob = true;
        if(trigger === null){
            byob = false;
            trigger = document.createElement('button');
            trigger.type = 'button';
            trigger.classList.add('be-delible-trigger');
            trigger.ariaLabel = 'Delete this.';
            trigger.title = 'Delete this.';
            enhancedElement.insertAdjacentElement(triggerInsertPosition, trigger);
        }
        return /** @type {PAP} */ ({
            trigger: new WeakRef(trigger),
            resolved: true,
            byob,
        });
    }

    /**
     * 
     * @param {BAP} self 
     */
    setBtnContent(self) {
        const {buttonContent, trigger} = self;
        const triggerEl = trigger.deref();
        if(triggerEl === undefined) return;
        //TODO: use trusted types
        triggerEl.textContent = buttonContent;
    }

    /**
     * 
     * @param {BAP} self 
     */
    beDeleted(self){
        const { enhancedElement, trigger } = self;
        enhancedElement.remove();
        trigger.deref()?.remove();
    }
}

await BeDelible.bootUp();
export { BeDelible }