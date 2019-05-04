/* eslint-disable no-underscore-dangle */

'use strict';

const path = require('path');
const VirtualStats = require('./virtual-stats');
const bcp47 = require("./bcp47.json");

class ObservableI18nPlugin {

    constructor(options) {
        this.options = options;
        this.processedPaths = new Set();
        this.assembled = {};

        this.defaultSubtag = options.defaultSubtag || "en";
        this.subtags = options.subtags || [];

        if (this.subtags.indexOf(this.defaultSubtag) === -1)
            this.subtags.unshift(this.defaultSubtag);

    }

    apply(compiler) {
        const moduleName = "./node_modules/@alumis/observables-i18n/__observables-i18n.json";
        const ctime = ObservableI18nPlugin.statsDate();
        const self = this;

        function resolverPlugin(request, cb) {
            // populate the file system cache with the virtual module
            const fs = (this && this.fileSystem) || compiler.inputFileSystem;
            const join = (this && this.join) || path.join;

            // webpack 1.x compatibility
            if (typeof request === 'string') {
                request = cb;
                cb = null;
            }

            let modulePath = join(compiler.context, moduleName);


            self.populateFilesystem({ fs, modulePath, ctime });

            if (!cb) {
                return;
            }

            cb();
        }

        const waitForResolvers = !compiler.resolvers.normal;

        function addPlugin() {
            const useModuleFactory = !compiler.resolvers.normal.plugin;
            if (useModuleFactory) {
                if (compiler.hooks) {
                    compiler.hooks.normalModuleFactory.tap('ObservableI18nPlugin', (nmf) => {
                        nmf.hooks.beforeResolve.tap('ObservableI18nPlugin', resolverPlugin);
                    });
                } else {
                    compiler.plugin('normal-module-factory', (nmf) => {
                        nmf.plugin('before-resolve', resolverPlugin);
                    });
                }
            } else {
                compiler.resolvers.normal.plugin('before-resolve', resolverPlugin);
            }
        }

        if (waitForResolvers) {
            compiler.plugin('after-resolvers', addPlugin);
        }

        else {
            addPlugin();
        }
    }

    processPath(fs, path) {

        if (this.processedPaths.has(path))
            return false;

        this.processedPaths.add(path);

        let pathEntries = new Map();

        for (let l of fs.readFileSync(path).toString("utf-8").split('\n')) {

            let i = l.indexOf("////");

            if (i !== -1) {

                let args = JSON.parse("[" + l.substr(i + 4) + "]"), key = args[0], values = args[1];
                let keyEntries = pathEntries.get(key);

                if (!keyEntries) {

                    keyEntries = new Map();
                    pathEntries.set(key, keyEntries);
                }

                for (var p in values)
                    keyEntries.set(p, values[p]);
            }
        }

        if (pathEntries.size) {

            this.mergePathEntriesWithAssembly(pathEntries);
            return true;
        }

        else return false;
    }

    mergePathEntriesWithAssembly(pathEntries) {

        pathEntries.forEach((languageEntries, key) => {

            languageEntries.forEach((v, k) => {

                let assembledLanguage = this.assembled[k];

                if (!assembledLanguage) {

                    let bcp47Language = bcp47[k];

                    this.assembled[k] = assembledLanguage = { subtag: k, englishName: bcp47Language.englishName, keyEntries: {} };

                    if (bcp47Language.nativeName)
                        assembledLanguage.nativeName = bcp47Language.nativeName;
    
                    if (bcp47Language.scope)
                        assembledLanguage.scope = bcp47Language.scope;
    
                    if (bcp47Language.macroLanguageSubtag)
                        assembledLanguage.macroLanguageSubtag = bcp47Language.macroLanguageSubtag;
                }

                assembledLanguage.keyEntries[key] = v;
            });
        });
    }

    compileOutputAssembly() {

        let result = { defaultSubtag: this.defaultSubtag, languages: [] };

        for (let lc of this.subtags) {

            let assembledLanguage = this.assembled[lc];

            if (!assembledLanguage) {

                let bcp47Language = bcp47[lc];

                this.assembled[lc] = assembledLanguage = { subtag: lc, englishName: bcp47Language.englishName, keyEntries: {} };

                if (bcp47Language.nativeName)
                    assembledLanguage.nativeName = bcp47Language.nativeName;

                if (bcp47Language.scope)
                    assembledLanguage.scope = bcp47Language.scope;

                if (bcp47Language.macroLanguageSubtag)
                    assembledLanguage.macroLanguageSubtag = bcp47Language.macroLanguageSubtag;
            }

            result.languages.push(assembledLanguage);
        }

        return result;
    }

    populateFilesystem(options) {

        const fs = options.fs;

        let assembleJSON = false;

        fs._statStorage.data.forEach((value, key) => {
            if (value[1] && (key.endsWith(".ts") || key.endsWith(".tsx")))
                assembleJSON = assembleJSON || this.processPath(fs, key);
        });

        fs._readFileStorage.data.forEach((value, key) => {
            if (value[1] && (key.endsWith(".ts") || key.endsWith(".tsx")))
                assembleJSON = assembleJSON || this.processPath(fs, key);
        });

        if (!assembleJSON)
            return;

        const modulePath = options.modulePath;
        const contents = JSON.stringify(this.compileOutputAssembly());
        const mapIsAvailable = typeof Map !== 'undefined';
        const statStorageIsMap = mapIsAvailable && fs._statStorage.data instanceof Map;
        const readFileStorageIsMap = mapIsAvailable && fs._readFileStorage.data instanceof Map;

        // if (readFileStorageIsMap) { // enhanced-resolve@3.4.0 or greater
        //     if (fs._readFileStorage.data.has(modulePath)) {
        //         return;
        //     }
        // } else if (fs._readFileStorage.data[modulePath]) { // enhanced-resolve@3.3.0 or lower
        //     return;
        // }
        const stats = ObservableI18nPlugin.createStats(options);
        if (statStorageIsMap) { // enhanced-resolve@3.4.0 or greater
            fs._statStorage.data.set(modulePath, [null, stats]);
        } else { // enhanced-resolve@3.3.0 or lower
            fs._statStorage.data[modulePath] = [null, stats];
        }
        if (readFileStorageIsMap) { // enhanced-resolve@3.4.0 or greater
            fs._readFileStorage.data.set(modulePath, [null, contents]);
        } else { // enhanced-resolve@3.3.0 or lower
            fs._readFileStorage.data[modulePath] = [null, contents];
        }
    }

    static statsDate(inputDate) {
        if (!inputDate) {
            inputDate = new Date();
        }
        return inputDate.toString();
    }

    static createStats(options) {
        if (!options) {
            options = {};
        }
        if (!options.ctime) {
            options.ctime = ObservableI18nPlugin.statsDate();
        }
        if (!options.mtime) {
            options.mtime = ObservableI18nPlugin.statsDate();
        }
        if (!options.size) {
            options.size = 0;
        }
        if (!options.size && options.contents) {
            options.size = options.contents.length;
        }
        return new VirtualStats({
            dev: 8675309,
            nlink: 1,
            uid: 501,
            gid: 20,
            rdev: 0,
            blksize: 4096,
            ino: 44700000,
            mode: 33188,
            size: options.size,
            atime: options.mtime,
            mtime: options.mtime,
            ctime: options.ctime,
            birthtime: options.ctime,
        });
    }
}

module.exports = ObservableI18nPlugin;