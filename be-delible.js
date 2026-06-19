// @ts-check
/** @import {Actions, PAP, AllProps, AP} from './types/be-delible/types' */;
/** @import {RoundaboutOptions} from './types/roundabout/types' */;
/** @import {ElementEnhancementGateway, SpawnContext} from './types/assign-gingerly/types' */;
/** @import {EMC} from './types/mount-observer/types' */;
/** @import {RAConfig} from './types/roundabout/types' */;

/**
 * @implements {Actions}
 */
class BeDelible {

    /** @type {any} */
    #customData;

    /**
     * @this {AllProps & Actions}
     * @param {Element & ElementEnhancementGateway} enhancedElement 
     * @param {SpawnContext} ctx 
     * @param {PAP} initVals 
     */
    constructor(enhancedElement, ctx, initVals){
        this.init(this, enhancedElement, ctx, initVals);
    }

    /**
     * @param {AllProps & Actions} self 
     * @param {Element & ElementEnhancementGateway} enhancedElement 
     * @param {SpawnContext} ctx 
     * @param {PAP} initVals 
     */
    async init(self, enhancedElement, ctx, initVals){
        const {customData} = /** @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions>>} */ (ctx.emc);
        this.#customData = customData?.customData;
        /**
         * @type {RoundaboutOptions}
         */
        const raOptions = {
            ...customData,
            vm: self,
            initialPropVals: {
                enhancedElement,
                ...customData?.defaultPropVals,
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
            const {triggerSettings, withMethods} = this.#customData;
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
