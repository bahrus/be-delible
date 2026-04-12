//@ts-check

/** @import {EMC} from './types/mount-observer/types' */;
/** @import {AllProps, Actions} from './types/be-delible/types' */
/** @import {RAConfig} from './types/roundabout/types' */

/**
 * @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions> >}
 */
export const emc = {
    enhConfig: {
        enhKey: 'BeDelible',
        spawn: 'be-delible/be-delible.js',
        withAttrs: {
            base: 'be-delible',
            triggerInsertPosition: '${base}-trigger-insert-position',
            buttonContent: '${base}-button-content'
        }
    },
    customData: {
        weakRef: {
            properties: ['enhancedElement', 'trigger']
        },
        actions: {
            setBtnContent: {
                ifAllOf: ['buttonContent'],
                ifNoneOf: ['byob']
            }
        },
        handlers: {
            trigger_to_beDeleted_on: 'click'
        },
        compacts: {
            when_triggerInsertPosition_changes_call_addDeleteBtn: 0
        },
        defaultPropVals: {
            byob: true,
            triggerInsertPosition: 'beforeend',
            buttonContent: '⌫'
        }
    }
}

export function render(){
    return JSON.stringify(emc, null, 4);
}

console.log(render());
