import {register} from 'be-hive/register.js';
import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeDelibleActions, BeDelibleProps, BeDelibleVirtualProps} from './types';
import {Deleter, proxyPropDefaults} from './Deleter.js';

export class BeDelible implements BeDelibleActions{
    #deleter!:  Deleter;
    intro(proxy: Element & BeDelibleProps, target: Element, beDecorProps: BeDecoratedProps): void{
    }
    batonPass(proxy: Element & BeDelibleVirtualProps, target: Element, beDecorProps: BeDecoratedProps<any, any>, baton: any): void {
        this.#deleter = baton;
    }
    finale(proxy: Element & BeDelibleProps, target: Element, beDecorProps: BeDecoratedProps): void{
        if(this.#deleter !== undefined){
            this.#deleter.dispose();
        }
    }
    async onInsertPosition(self: this): Promise<void>{
        if(this.#deleter === undefined){
            this.#deleter = new Deleter(self.proxy, self.proxy);
        }
        this.#deleter.addDeleteButtonTrigger(self);

    }

    onText(self: this): void{
        if(this.#deleter === undefined){
            this.#deleter = new Deleter(self.proxy, self.proxy);
        }
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
            virtualProps: ['insertPosition', 'text', 'then'],
            upgrade,
            intro: 'intro',
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
