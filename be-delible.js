import { register } from 'be-hive/register.js';
import { define } from 'be-decorated/be-decorated.js';
import { Deleter, proxyPropDefaults } from './Deleter.js';
export class BeDelible {
    #deleter;
    intro(proxy, target, beDecorProps) {
    }
    batonPass(proxy, target, beDecorProps, baton) {
        this.#deleter = baton;
    }
    finale(proxy, target, beDecorProps) {
        if (this.#deleter !== undefined) {
            this.#deleter.dispose();
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
            proxyPropDefaults,
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
