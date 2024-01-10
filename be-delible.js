import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
export class BeDelible extends BE {
    static get beConfig() {
        return {
            parse: true,
        };
    }
    #trigger;
    get trigger() {
        if (this.#trigger === undefined)
            return undefined;
        return this.#trigger.deref();
    }
    async addDeleteBtn(self) {
        if (this.trigger === undefined) {
            //the check above is unlikely to ever fail.
            const { buttonInsertPosition, enhancedElement } = self;
            const { findAdjacentElement } = await import('be-enhanced/findAdjacentElement.js');
            const trigger = findAdjacentElement(buttonInsertPosition, enhancedElement, 'button.be-delible-trigger');
            if (trigger !== null)
                this.#trigger = new WeakRef(trigger);
            let byob = true;
            if (this.trigger === undefined) {
                byob = false;
                const trigger = document.createElement('button');
                trigger.type = 'button';
                trigger.classList.add('be-delible-trigger');
                trigger.ariaLabel = 'Delete this.';
                trigger.title = 'Delete this.';
                enhancedElement.insertAdjacentElement(buttonInsertPosition, trigger);
                this.#trigger = new WeakRef(trigger);
            }
            return [{ resolved: true, byob }, { beDeleted: { on: 'click', of: this.trigger } }];
        }
        else {
            return [{}, {}];
        }
    }
    beDeleted(self) {
        const { enhancedElement } = self;
        enhancedElement.remove();
        this.trigger?.remove();
    }
    setBtnContent(self) {
        if (this.trigger !== undefined) {
            const { buttonContent } = self;
            this.trigger.innerHTML = buttonContent; //TODO:  sanitize
        }
    }
}
export const tagName = 'be-delible';
const xe = new XE({
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
