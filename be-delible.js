import { register } from 'be-hive/register.js';
import { define } from 'be-decorated/be-decorated.js';
import { Deleter } from './Deleter.js';
export class BeDelible {
    #deleter;
    #trigger;
    intro(proxy, target, beDecorProps) {
    }
    finale(proxy, target, beDecorProps) {
        if (this.#trigger !== undefined) {
            this.#trigger.removeEventListener('click', this.handleClick);
            this.#trigger.remove();
        }
    }
    async onInsertPosition(self) {
        if (this.#deleter === undefined) {
            this.#deleter = new Deleter(self.proxy, self.proxy);
        }
        this.#deleter.addDeleteButtonTrigger(self);
    }
    onText(self) {
        if (this.#deleter === undefined) {
            this.#deleter = new Deleter(self.proxy, self.proxy);
        }
        this.#deleter.setText(this);
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
