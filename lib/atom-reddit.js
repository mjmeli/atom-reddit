'use babel';

import { CompositeDisposable } from 'atom'
import request from 'request'

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
        this.getFrontPage().then((html) => {
            atom.workspace.open().then((editor) => {
                editor.insertText(html)
            })
        }).catch((error) => {
            atom.notifications.addWarning(error.reason)
        })
    },

    download(url) {
        return new Promise((resolve, reject) => {
            request(url, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    resolve(body)
                } else {
                    reject({
                        reason: 'Unable to download page'
                    })
                }
            })
        })
    },

    getFrontPage() {
        return new Promise((resolve, reject) => {
            this.download("https://www.reddit.com/.json?limit=25").then((html) => {
                resolve(html)
            }).catch((error) => {
                reject({
                    reason: 'Unable to download Reddit front page'
                })
            })
        })
    }

};
