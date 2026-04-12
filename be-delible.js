// @ts-check
/** @import {Actions, PAP, AllProps, AP} from './types/be-delible/types' */;
/** @import {RoundaboutOptions} from './types/roundabout/types' */;
/** @import {ElementEnhancementGateway} from './types/assign-gingerly/types' */;
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
     * @param {Element & ElementEnhancementGateway} enhancedElement 
     * @param {*} ctx 
     * @param {AllProps} initVals 
     */
    constructor(enhancedElement, ctx, initVals){
        this.init(this, enhancedElement, initVals);
    }

    /**
     * @param {AllProps} self 
     * @param {Element & ElementEnhancementGateway} enhancedElement 
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
     * @param {AP} self 
     * @returns {ProPAP}
     */
    async addDeleteBtn(self){
        const {triggerInsertPosition, enhancedElement, buttonContent} = self;
        const { findAdjacentElement } = await import('trans-render/lib/findAdjacentElement.js');
        let trigger = /** @type {HTMLButtonElement | null} */ (findAdjacentElement(triggerInsertPosition, enhancedElement, 'button.be-delible-trigger'));
        let byob = true;
        if(trigger === null){
            byob = false;
            trigger = document.createElement('button');
            trigger.type = 'button';
            trigger.classList.add('be-delible-trigger');
            trigger.ariaLabel = 'Delete this.';
            trigger.title = 'Delete this.';
            enhancedElement.insertAdjacentElement(triggerInsertPosition, trigger);
        }
        return /** @type {PAP} */ ({
            trigger: new WeakRef(trigger),
            byob,
        });
    }

    /**
     * @param {AP} self 
     */
    setBtnContent(self) {
        const {buttonContent, trigger} = self;
        const triggerEl = trigger.deref();
        if(triggerEl === undefined) return;
        triggerEl.textContent = buttonContent;
    }

    /**
     * @param {AP} self 
     */
    beDeleted(self){
        const { enhancedElement, trigger } = self;
        enhancedElement.remove();
        trigger.deref()?.remove();
    }
}

export { BeDelible }
