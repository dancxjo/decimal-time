const {Adw, GLib, Gtk} = imports.gi;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

function init(meta) {
    log(`initializing ${meta.metadata.name} Preferences`);
}

function buildPrefsWidget() {
    const prefsWidget = new Gtk.Box();

    const label = new Gtk.Label({ label: `${Me.metadata.name}` });
    prefsWidget.append(label);
    
    return prefsWidget;
}

function fillPreferencesWindow(window) {
    const prefsPage = new Adw.PreferencesPage({
        name: 'general',
        title: 'General',
        icon_name: 'dialog-information-symbolic',
    });
    window.add(prefsPage);
    
    const prefsGroup = new Adw.PreferencesGroup({
        title: 'Appearance',
        description: `Configure the appearance of ${Me.metadata.name}`,
    });
    prefsPage.add(prefsGroup);
    
    const showIndicatorRow = new Adw.ActionRow({
        title: 'Show Indicator',
        subtitle: 'Whether to show the panel indicator',
    });
    prefsGroup.add(showIndicatorRow);
    
    const showIndicatorSwitch = new Gtk.Switch();
    showIndicatorRow.add_suffix(showIndicatorSwitch);
    showIndicatorRow.set_activatable_widget(showIndicatorSwitch);
}