import {register} from 'be-hive/register.js';
import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {Actions, Proxy, VirtualProps, PP} from './types';
import {Deleter, proxyPropDefaults} from './Deleter.js';

export class BeDelible extends EventTarget implements Actions{
    #deleter!:  Deleter;
    batonPass(proxy: Proxy, target: Element, beDecorProps: BeDecoratedProps<any, any>, baton: any): void {
        this.#deleter = baton;
    }
    finale(proxy: Proxy, target: Element, beDecorProps: BeDecoratedProps): void{
        if(this.#deleter !== undefined){
            this.#deleter.dispose();
        }
    }
    async onInsertPosition(pp: PP): Promise<void>{
        const {proxy} = pp;
        this.ensure(pp);
        await this.#deleter.addDeleteButtonTrigger(pp);
        proxy.resolved = true;
    }

    ensure({proxy}: PP){
        if(this.#deleter === undefined){
            this.#deleter = new Deleter(proxy, proxy);
        }
    }

    onText(pp: PP): void{
        this.ensure(pp);
        this.#deleter.setText(pp);
    }

}


const tagName = 'be-delible';

const ifWantsToBe = 'delible';

const upgrade = '*';

define<VirtualProps & BeDecoratedProps<VirtualProps, Actions>, Actions>({
    config:{
        tagName,
        propDefaults:{
            ifWantsToBe,
            virtualProps: ['insertPosition', 'text',],
            upgrade,
            finale: 'finale',
            proxyPropDefaults,
        },
        actions:{
            onInsertPosition: 'insertPosition',
            onText: 'text',
        }
    },
    complexPropDefaults:{
        controller: BeDelible,
    }
});

register(ifWantsToBe, upgrade, tagName);
