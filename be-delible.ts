import {register} from 'be-hive/register.js';
import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeDelibleActions, BeDelibleProps} from './types';

export class BeDelible implements BeDelibleActions{
    intro(proxy: Element & BeDelibleProps, target: Element, beDecorProps: BeDecoratedProps): void{
    }
    finale(proxy: Element & BeDelibleProps, target: Element, beDecorProps: BeDecoratedProps): void{

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
            virtualProps: ['insertPosition'],
            upgrade,
            intro: 'intro',
            finale: 'finale',
            proxyPropDefaults:{
                insertPosition:'beforeend'
            }
        }
    }
});

register(ifWantsToBe, upgrade, tagName);
