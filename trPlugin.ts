import {RenderContext, TransformPluginSettings} from 'trans-render/lib/types';
import {DEMethods} from 'be-decorated/types';
import {register} from 'trans-render/lib/pluginMgr.js';

export const trPlugin: TransformPluginSettings = {
    selector: 'beDelibleAttribs',
    ready: true,
    processor:  async ({target, val, attrib, host}: RenderContext) => {
        if(customElements.get('be-delible') === undefined) return;
        const {attach} = await import('be-decorated/upgrade.js');
        const instance = document.createElement('be-delible') as any as DEMethods;
        attach(target!, 'delible', instance.attach.bind(instance));
    }
}

register(trPlugin);