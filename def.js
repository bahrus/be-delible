import 'assign-gingerly/object-extension.js';

/**
 * Registers be-delible's config with the element registry, so the enhancement
 * can be attached programmatically (via `el.enh.set.beDelible` or
 * `el.enh.get(emc)`), without any attribute.
 * @param {Element | undefined} ref - document.body, or a shadow root's host, for a scoped registry
 */
export async function defBeDelible(ref){
    const {default: emc} = await import('./emc.json', {with: {type: 'json'}});
    return await push(ref, emc);
}

async function push(ref, emc){
    const {BeDelible} = await import('./be-delible.js');
    const {enhConfig} = emc;
    enhConfig.spawn = BeDelible;
    enhConfig.customData = emc.customData; // the registry only stores enhConfig, not the full emc
    const registry = ref?.customElementRegistry ?? customElements;
    const {enhancementRegistry} = registry;
    enhancementRegistry.push(enhConfig);
    return enhConfig;
}
