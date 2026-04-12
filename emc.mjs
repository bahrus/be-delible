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
            addDeleteBtn: {
                ifAllOf: ['triggerInsertPosition', 'enhancedElement']
            },
            setBtnContent: {
                ifAllOf: ['buttonContent', 'trigger', 'enhancedElement'],
                ifNoneOf: ['byob']
            }
        },
        handlers: {
            trigger_to_beDeleted_on: 'click'
        },
        compacts: {
            when_resolved_changes_dispatch: 'resolved',
        },
        defaultPropVals: {
            byob: true,
            triggerInsertPosition: 'beforeend',
            buttonContent: '⌫'
        },
        customData: {
            triggerSettings: {
                type: 'button',
                '?.classList?.add': 'be-delible-trigger',
                ariaLabel: 'Delete this.',
                title: 'Delete this.',
            },
            withMethods: ['add']
        }
    }
}

export function render(){
    return JSON.stringify(emc, null, 4);
}

console.log(render());
