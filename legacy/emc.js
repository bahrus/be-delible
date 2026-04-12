// @ts-check
import { BeHive, seed, MountObserver } from 'be-hive/be-hive.js';

/** @import {EMC} from './ts-refs/trans-render/be/types' */

/**
 * @type {EMC}
 */
export const emc = {
    base: 'be-delible',
    // map: {
    //     '0.0': 'ni'
    // },
    enhPropKey: 'beDelible',
    importEnh: async () => {
        const { BeDelible } = await import('./be-delible.js');
        return BeDelible;
    }
};
const mose = seed(emc);
MountObserver.synthesize(document, BeHive, mose);
