import { register } from 'be-hive/register.js';
import { define } from 'be-decorated/DE.js';
export class BeDelible extends EventTarget {
    #trigger;
    async addDeleteBtn(pp) {
        if (this.#trigger === undefined) {
            //the check above is unlikely to ever fail.
            const { buttonInsertPosition, self } = pp;
            const { findAdjacentElement } = await import('be-decorated/findAdjacentElement.js');
            const trigger = findAdjacentElement(buttonInsertPosition, self, 'button.be-delible-trigger');
            if (trigger !== null)
                this.#trigger = trigger;
            let byob = true;
            if (this.#trigger === undefined) {
                byob = false;
                this.#trigger = document.createElement('button');
                this.#trigger.type = 'button';
                this.#trigger.classList.add('be-delible-trigger');
                this.#trigger.ariaLabel = 'Delete this.';
                this.#trigger.title = 'Delete this.';
                self.insertAdjacentElement(buttonInsertPosition, this.#trigger);
            }
            return [{ resolved: true, byob }, { beDeleted: { on: 'click', of: this.#trigger } }];
        }
        else {
            //can't think of a scenario where consumer would want to change the trigger position midstream, so not bothering to do anything here
        }
    }
    beDeleted({ self }) {
        self.remove();
        this.#trigger.remove();
    }
    setBtnContent({ buttonContent }) {
        if (this.#trigger !== undefined) {
            this.#trigger.innerHTML = buttonContent; //TODO:  sanitize
        }
    }
    finale() {
        this.#trigger = undefined;
    }
}
const tagName = 'be-delible';
const ifWantsToBe = 'delible';
const upgrade = '*';
define({
    config: {
        tagName,
        propDefaults: {
            ifWantsToBe,
            virtualProps: ['buttonContent', 'buttonInsertPosition', 'byob'],
            upgrade,
            finale: 'finale',
            proxyPropDefaults: {
                byob: true,
                buttonInsertPosition: 'beforeend',
                buttonContent: '&times;',
            }
        },
        actions: {
            addDeleteBtn: 'buttonInsertPosition',
            setBtnContent: {
                ifAllOf: ['buttonContent'],
                ifNoneOf: ['byob']
            },
        }
    },
    complexPropDefaults: {
        controller: BeDelible,
    }
});
register(ifWantsToBe, upgrade, tagName);
