///ts:ref=globals
/// <reference path="../globals.ts"/> ///ts:ref:generated

import path = require('path');
import tsconfig = require('tsconfig');

// Make sure we have the packages we depend upon
var apd = require('atom-package-dependencies');

import programManager = require('./programManager');

// globals
var statusBar;
var statusBarMessage;
var editorWatch: AtomCore.Disposable;

export interface PackageState {
}

export function activate(state: PackageState) {

    // Don't activate if we have a dependency that isn't available
    var linter = apd.require('linter');
    if (!linter) {
        apd.install(function () {
            atom.notifications.addSuccess("Some dependent packages were required for atom-typescript. These are now installed. Best you restart atom just this once.", { dismissable: true });
        });

        return;
    }

    atom.packages.once('activated', () => {

        // TODO: Setup the error reporter:


        statusBar = document.querySelector("status-bar");
        if (statusBar) {
            // statusBarMessage = statusBar.addLeftTile({ item: something, priority: 100 });
        }


        editorWatch = atom.workspace.observeTextEditors((editor) => {

            var filePath = editor.getPath();
            var filename = path.basename(filePath);
            var ext = path.extname(filename);            

            if (ext == '.ts') {
                var program = programManager.getOrCreateAProgram(filePath);
            }
        });

    });
}

export function deactivate() {
    if (statusBarMessage) statusBarMessage.destroy();
    editorWatch.dispose();
}

export function serialize(): PackageState {
    return {};
}

export function deserialize() {
    /* do any tear down here */
}