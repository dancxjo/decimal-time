const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

class Extension {
    constructor() {
    }
    
    enable() {
        log(`enabling ${Me.metadata.name}`);
    }
    
    disable() {
        log(`disabling ${Me.metadata.name}`);
    }
}

function init(meta) {
    log(`initializing ${meta.metadata.name}`);
    
    return new Extension();
}