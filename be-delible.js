import { register } from 'be-hive/register.js';
import { define } from 'be-decorated/be-decorated.js';
import { Deleter, proxyPropDefaults } from './Deleter.js';
export class BeDelible extends EventTarget {
    #deleter;
    batonPass(proxy, target, beDecorProps, baton) {
        this.#deleter = baton;
    }
    finale(proxy, target, beDecorProps) {
        if (this.#deleter !== undefined) {
            this.#deleter.dispose();
        }
    }
    async onInsertPosition({ proxy }) {
        this.ensure(this);
        await this.#deleter.addDeleteButtonTrigger(this);
        proxy.resolved = true;
    }
    ensure(self) {
        if (self.#deleter === undefined) {
            self.#deleter = new Deleter(self.proxy, self.proxy);
        }
    }
    onText(self) {
        this.ensure(self);
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
            virtualProps: ['insertPosition', 'text',],
            upgrade,
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
