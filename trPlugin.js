import { register } from 'trans-render/lib/pluginMgr.js';
export const trPlugin = {
    selector: 'beDelibleAttribs',
    ready: true,
    processor: async ({ target, val, attrib, host }) => {
        if (customElements.get('be-delible') === undefined)
            return;
        const { attach } = await import('be-decorated/upgrade.js');
        const instance = document.createElement('be-delible');
        attach(target, 'delible', instance.attach.bind(instance));
    }
};
register(trPlugin);
