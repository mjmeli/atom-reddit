'use babel';

import {
    CompositeDisposable
} from 'atom';

export default {

    subscriptions: null,

    activate(state) {
        // Events subscribed to in atom's system can be easily cleaned up with
        // a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'atom-reddit:browse': () => this.browse()
        }));
    },

    deactivate() {
        this.subscriptions.dispose();
    },

    serialize() {
        // Nothing to save
        return;
    },

    browse() {
        let editor
        if (editor = atom.workspace.getActiveTextEditor()) {
            let selection = editor.getSelectedText()
            let reversed = selection.split('').reverse().join('')
            editor.insertText(reversed)
        }
    }

};