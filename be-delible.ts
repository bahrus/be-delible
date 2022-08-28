import {register} from 'be-hive/register.js';
import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeDelibleActions, BeDelibleProps, BeDelibleVirtualProps} from './types';
import {Deleter, proxyPropDefaults} from './Deleter.js';

export class BeDelible extends EventTarget implements BeDelibleActions{
    #deleter!:  Deleter;
    batonPass(proxy: Element & BeDelibleVirtualProps, target: Element, beDecorProps: BeDecoratedProps<any, any>, baton: any): void {
        this.#deleter = baton;
    }
    finale(proxy: Element & BeDelibleProps, target: Element, beDecorProps: BeDecoratedProps): void{
        if(this.#deleter !== undefined){
            this.#deleter.dispose();
        }
    }
    async onInsertPosition({proxy}: this): Promise<void>{
        this.ensure(this);
        await this.#deleter.addDeleteButtonTrigger(this);
        proxy.resolved = true;
    }

    ensure(self: this){
        if(self.#deleter === undefined){
            self.#deleter = new Deleter(self.proxy, self.proxy);
        }
    }

    onText(self: this): void{
        this.ensure(self);
        this.#deleter.setText(this);
    }

}

export interface BeDelible extends BeDelibleProps{}

const tagName = 'be-delible';

const ifWantsToBe = 'delible';

const upgrade = '*';

define<BeDelibleProps & BeDecoratedProps<BeDelibleProps, BeDelibleActions>, BeDelibleActions>({
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
