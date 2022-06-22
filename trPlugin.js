import { Deleter, proxyPropDefaults } from './Deleter.js';
import { passTheBaton } from 'be-decorated/relay.js';
export const trPlugin = {
    selector: 'beDelibleAttribs',
    ready: true,
    processor: async ({ target, val, attrib, host }) => {
        let defaults = proxyPropDefaults;
        if (val) {
            const params = JSON.parse(val);
            Object.assign(defaults, params);
        }
        const deleter = new Deleter(target, defaults);
        deleter.addDeleteButtonTrigger(defaults);
        passTheBaton('delible', target, deleter);
    }
};
