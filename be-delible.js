import { register } from 'be-hive/register.js';
import { define } from 'be-decorated/be-decorated.js';
export class BeDelible {
    #trigger;
    intro(proxy, target, beDecorProps) {
    }
    finale(proxy, target, beDecorProps) {
        if (this.#trigger !== undefined) {
            this.#trigger.removeEventListener('click', this.handleClick);
            this.#trigger.remove();
        }
    }
    async onInsertPosition({ text, insertPosition, then }) {
        if (this.#trigger === undefined) {
            switch (insertPosition) {
                case 'afterbegin':
                case 'beforeend':
                    {
                        const trigger = this.proxy.querySelector('button.be-delible-trigger');
                        if (trigger !== null) {
                            this.#trigger = trigger;
                        }
                    }
                    break;
                case 'beforebegin':
                    {
                        const trigger = this.proxy.previousElementSibling;
                        if (trigger !== null && trigger.matches('button.be-delible-trigger')) {
                            this.#trigger = trigger;
                        }
                    }
                    break;
                case 'afterend':
                    {
                        const trigger = this.proxy.nextElementSibling;
                        if (trigger !== null && trigger.matches('button.be-delible-trigger')) {
                            this.#trigger = trigger;
                        }
                    }
                    break;
            }
            if (this.#trigger === undefined) {
                this.#trigger = document.createElement('button');
                this.#trigger.classList.add('be-delible-trigger');
                this.proxy.insertAdjacentElement(insertPosition, this.#trigger);
            }
            this.onText(this);
            this.#trigger.addEventListener('click', this.handleClick);
            if (then !== undefined) {
                const { doThen } = await import('be-decorated/doThen.js');
                doThen(this.proxy, then);
            }
        }
    }
    onText({ text }) {
        if (this.#trigger !== undefined) {
            this.#trigger.innerHTML = text; //TODO:  sanitize
        }
    }
    handleClick = (e) => {
        this.proxy.remove();
        this.#trigger.remove();
    };
}
const tagName = 'be-delible';
const ifWantsToBe = 'delible';
const upgrade = '*';
define({
    config: {
        tagName,
        propDefaults: {
            ifWantsToBe,
            virtualProps: ['insertPosition', 'text', 'then'],
            upgrade,
            intro: 'intro',
            finale: 'finale',
            proxyPropDefaults: {
                insertPosition: 'beforeend',
                text: '&times;',
            }
        },
        actions: {
            onInsertPosition: 'insertPosition',
            onText: 'text',
        }
    },
    complexPropDefaults: {
        controller: BeDelible,
    }
});
register(ifWantsToBe, upgrade, tagName);
