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
    async onInsertPosition(pp) {
        const { proxy } = pp;
        this.ensure(pp);
        await this.#deleter.addDeleteButtonTrigger(pp);
        proxy.resolved = true;
    }
    ensure({ proxy }) {
        if (this.#deleter === undefined) {
            this.#deleter = new Deleter(proxy, proxy);
        }
    }
    onText(pp) {
        this.ensure(pp);
        this.#deleter.setText(pp);
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
