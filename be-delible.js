// @ts-check
/** @import {Actions, PAP, AllProps, AP} from './types/be-delible/types' */;
/** @import {RoundaboutOptions} from './types/roundabout/types' */;
/** @import {EMC} from './types/mount-observer/types' */;
/** @import {RAConfig} from './types/roundabout/types' */;
/**
 * @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions>>}
 */
import emc from './emc.json' with {type: 'json'};

const {customData} = emc;

/**
 * @implements {Actions}
 */
class BeDelible {

    /**
     * @this {AllProps & Actions}
     * @param {Element} enhancedElement 
     * @param {*} ctx 
     * @param {PAP} initVals 
     */
    constructor(enhancedElement, ctx, initVals){
        this.init(this, enhancedElement, initVals);
    }

    /**
     * @param {AllProps & Actions} self 
     * @param {Element} enhancedElement 
     * @param {PAP} initVals 
     */
    async init(self, enhancedElement, initVals){
        const {defaultPropVals} = customData;
        /**
         * @type {RoundaboutOptions}
         */
        const raOptions = {
            ...customData,
            vm: self,
            initialPropVals: {
                enhancedElement,
                ...defaultPropVals,
                ...initVals
            }
        };
        (await import('roundabout-lib/roundabout.js')).roundabout(raOptions);
    }

    /**
     * 
     * @param {AP} self 
     * @returns 
     */
    async addDeleteBtn(self) {
        const { triggerInsertPosition, enhancedElement } = self;
        let trigger = /** @type {HTMLButtonElement | null} */ ((await import('be-hive/findAdjacentElement.js')).findAdjacentElement(
            triggerInsertPosition, enhancedElement, 'button.be-delible-trigger')
        );
        let byob = true;
        if (trigger === null) {
            byob = false;
            trigger = document.createElement('button');
            const {triggerSettings, withMethods} = customData.customData;
            (await import('assign-gingerly/assignGingerly.js')).assignGingerly(trigger, triggerSettings, {withMethods});
            enhancedElement.insertAdjacentElement(triggerInsertPosition, trigger);
        }
        return /** @type {PAP} */ ({
            trigger,
            resolved: true,
            byob
        });
    }

    /**
     * @param {AP} self 
     */
    setBtnContent(self) {
        const { buttonContent, trigger } = self;
        trigger.textContent = buttonContent;
    }

    /**
     * @param {AP} self 
     */
    beDeleted(self){
        const { enhancedElement, trigger } = self;
        enhancedElement.remove();
        trigger?.remove();
    }
}

export { BeDelible }
