import {RenderContext, TransformPluginSettings} from 'trans-render/lib/types';
import {register} from 'trans-render/lib/pluginMgr.js';
import {BeDelibleVirtualProps} from './types';
import {Deleter, proxyPropDefaults} from './Deleter.js';
import {passTheBaton} from 'be-decorated/relay.js';

export const trPlugin: TransformPluginSettings = {
    selector: 'beDelibleAttribs',
    ready: true,
    processor:  async ({target, val, attrib, host}: RenderContext) => {
        let defaults = {...proxyPropDefaults};
        if(val){
            const params = JSON.parse(val) as BeDelibleVirtualProps;
            Object.assign(defaults, params);
        }
        const deleter = new Deleter(target!, defaults);
        deleter.addDeleteButtonTrigger(defaults);
        passTheBaton('delible', target!, deleter);
    }
};

register(trPlugin);