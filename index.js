/* eslint-disable no-underscore-dangle */

'use strict';

const path = require('path');
const VirtualStats = require('./virtual-stats');

const iso6393 = { "abk": { "englishName": "Abkhaz", "nativeName": "Аҧсуа" }, "aar": { "englishName": "Afar", "nativeName": "Afaraf" }, "afr": { "englishName": "Afrikaans", "nativeName": "Afrikaans" }, "aka": { "englishName": "Akan", "nativeName": "Akan" }, "sqi": { "englishName": "Albanian", "nativeName": "Shqip" }, "amh": { "englishName": "Amharic", "nativeName": "አማርኛ" }, "ara": { "englishName": "Arabic", "nativeName": "العربية" }, "arg": { "englishName": "Aragonese", "nativeName": "Aragonés" }, "hye": { "englishName": "Armenian", "nativeName": "Հայերեն" }, "asm": { "englishName": "Assamese", "nativeName": "অসমীয়া" }, "ava": { "englishName": "Avaric", "nativeName": "Авар" }, "ave": { "englishName": "Avestan", "nativeName": "avesta" }, "aym": { "englishName": "Aymara", "nativeName": "Aymar" }, "aze": { "englishName": "Azerbaijani", "nativeName": "Azərbaycanca" }, "bam": { "englishName": "Bambara", "nativeName": "Bamanankan" }, "bak": { "englishName": "Bashkir", "nativeName": "Башҡортса" }, "eus": { "englishName": "Basque", "nativeName": "Euskara" }, "bel": { "englishName": "Belarusian", "nativeName": "Беларуская" }, "ben": { "englishName": "Bengali", "nativeName": "বাংলা" }, "bih": { "englishName": "Bihari", "nativeName": "भोजपुरी" }, "bis": { "englishName": "Bislama", "nativeName": "Bislama" }, "bos": { "englishName": "Bosnian", "nativeName": "Bosanski" }, "bre": { "englishName": "Breton", "nativeName": "Brezhoneg" }, "bul": { "englishName": "Bulgarian", "nativeName": "Български" }, "mya": { "englishName": "Burmese", "nativeName": "မြန်မာဘာသာ" }, "cat": { "englishName": "Catalan", "nativeName": "Català" }, "cha": { "englishName": "Chamorro", "nativeName": "Chamoru" }, "che": { "englishName": "Chechen", "nativeName": "Нохчийн" }, "nya": { "englishName": "Chichewa", "nativeName": "Chichewa" }, "zho": { "englishName": "Chinese", "nativeName": "中文" }, "chv": { "englishName": "Chuvash", "nativeName": "Чӑвашла" }, "cor": { "englishName": "Cornish", "nativeName": "Kernewek" }, "cos": { "englishName": "Corsican", "nativeName": "Corsu" }, "cre": { "englishName": "Cree", "nativeName": "ᓀᐦᐃᔭᐍᐏᐣ" }, "hrv": { "englishName": "Croatian", "nativeName": "Hrvatski" }, "ces": { "englishName": "Czech", "nativeName": "Čeština" }, "dan": { "englishName": "Danish", "nativeName": "Dansk" }, "div": { "englishName": "Divehi", "nativeName": "Divehi" }, "nld": { "englishName": "Dutch", "nativeName": "Nederlands" }, "dzo": { "englishName": "Dzongkha", "nativeName": "རྫོང་ཁ" }, "eng": { "englishName": "English", "nativeName": "English" }, "epo": { "englishName": "Esperanto", "nativeName": "Esperanto" }, "est": { "englishName": "Estonian", "nativeName": "Eesti" }, "ewe": { "englishName": "Ewe", "nativeName": "Eʋegbe" }, "fao": { "englishName": "Faroese", "nativeName": "Føroyskt" }, "fij": { "englishName": "Fijian", "nativeName": "Na Vosa Vaka-Viti" }, "fin": { "englishName": "Finnish", "nativeName": "Suomi" }, "fra": { "englishName": "French", "nativeName": "Français" }, "ful": { "englishName": "Fula", "nativeName": "Fulfulde" }, "glg": { "englishName": "Galician", "nativeName": "Galego" }, "kat": { "englishName": "Georgian", "nativeName": "ქართული" }, "deu": { "englishName": "German", "nativeName": "Deutsch" }, "ell": { "englishName": "Greek", "nativeName": "Ελληνικά" }, "grn": { "englishName": "Guaraní", "nativeName": "Avañe'ẽ" }, "guj": { "englishName": "Gujarati", "nativeName": "ગુજરાતી" }, "hat": { "englishName": "Haitian", "nativeName": "Kreyòl Ayisyen" }, "hau": { "englishName": "Hausa", "nativeName": "هَوُسَ" }, "heb": { "englishName": "Hebrew", "nativeName": "עברית" }, "her": { "englishName": "Herero", "nativeName": "Otjiherero" }, "hin": { "englishName": "Hindi", "nativeName": "हिन्दी" }, "hmo": { "englishName": "Hiri Motu", "nativeName": "Hiri Motu" }, "hun": { "englishName": "Hungarian", "nativeName": "Magyar" }, "ina": { "englishName": "Interlingua", "nativeName": "Interlingua" }, "ind": { "englishName": "Indonesian", "nativeName": "Bahasa Indonesia" }, "ile": { "englishName": "Interlingue", "nativeName": "Interlingue" }, "gle": { "englishName": "Irish", "nativeName": "Gaeilge" }, "ibo": { "englishName": "Igbo", "nativeName": "Igbo" }, "ipk": { "englishName": "Inupiaq", "nativeName": "Iñupiak" }, "ido": { "englishName": "Ido", "nativeName": "Ido" }, "isl": { "englishName": "Icelandic", "nativeName": "Íslenska" }, "ita": { "englishName": "Italian", "nativeName": "Italiano" }, "iku": { "englishName": "Inuktitut", "nativeName": "ᐃᓄᒃᑎᑐᑦ" }, "jpn": { "englishName": "Japanese", "nativeName": "日本語" }, "jav": { "englishName": "Javanese", "nativeName": "Basa Jawa" }, "kal": { "englishName": "Kalaallisut", "nativeName": "Kalaallisut" }, "kan": { "englishName": "Kannada", "nativeName": "ಕನ್ನಡ" }, "kau": { "englishName": "Kanuri", "nativeName": "Kanuri" }, "kas": { "englishName": "Kashmiri", "nativeName": "كشميري" }, "kaz": { "englishName": "Kazakh", "nativeName": "Қазақша" }, "khm": { "englishName": "Khmer", "nativeName": "ភាសាខ្មែរ" }, "kik": { "englishName": "Kikuyu", "nativeName": "Gĩkũyũ" }, "kin": { "englishName": "Kinyarwanda", "nativeName": "Kinyarwanda" }, "kir": { "englishName": "Kyrgyz", "nativeName": "Кыргызча" }, "kom": { "englishName": "Komi", "nativeName": "Коми" }, "kon": { "englishName": "Kongo", "nativeName": "Kongo" }, "kor": { "englishName": "Korean", "nativeName": "한국어" }, "kur": { "englishName": "Kurdish", "nativeName": "Kurdî" }, "kua": { "englishName": "Kwanyama", "nativeName": "Kuanyama" }, "lat": { "englishName": "Latin", "nativeName": "Latina" }, "ltz": { "englishName": "Luxembourgish", "nativeName": "Lëtzebuergesch" }, "lug": { "englishName": "Ganda", "nativeName": "Luganda" }, "lim": { "englishName": "Limburgish", "nativeName": "Limburgs" }, "lin": { "englishName": "Lingala", "nativeName": "Lingála" }, "lao": { "englishName": "Lao", "nativeName": "ພາສາລາວ" }, "lit": { "englishName": "Lithuanian", "nativeName": "Lietuvių" }, "lub": { "englishName": "Luba-Katanga", "nativeName": "Tshiluba" }, "lav": { "englishName": "Latvian", "nativeName": "Latviešu" }, "glv": { "englishName": "Manx", "nativeName": "Gaelg" }, "mkd": { "englishName": "Macedonian", "nativeName": "Македонски" }, "mlg": { "englishName": "Malagasy", "nativeName": "Malagasy" }, "msa": { "englishName": "Malay", "nativeName": "Bahasa Melayu" }, "mal": { "englishName": "Malayalam", "nativeName": "മലയാളം" }, "mlt": { "englishName": "Maltese", "nativeName": "Malti" }, "mri": { "englishName": "Māori", "nativeName": "Māori" }, "mar": { "englishName": "Marathi", "nativeName": "मराठी" }, "mah": { "englishName": "Marshallese", "nativeName": "Kajin M̧ajeļ" }, "mon": { "englishName": "Mongolian", "nativeName": "Монгол" }, "nau": { "englishName": "Nauru", "nativeName": "Dorerin Naoero" }, "nav": { "englishName": "Navajo", "nativeName": "Diné Bizaad" }, "nde": { "englishName": "Northern Ndebele", "nativeName": "isiNdebele" }, "nep": { "englishName": "Nepali", "nativeName": "नेपाली" }, "ndo": { "englishName": "Ndonga", "nativeName": "Owambo" }, "nob": { "englishName": "Norwegian Bokmål", "nativeName": "Norsk (Bokmål)" }, "nno": { "englishName": "Norwegian Nynorsk", "nativeName": "Norsk (Nynorsk)" }, "nor": { "englishName": "Norwegian", "nativeName": "Norsk" }, "iii": { "englishName": "Nuosu", "nativeName": "ꆈꌠ꒿ Nuosuhxop" }, "nbl": { "englishName": "Southern Ndebele", "nativeName": "isiNdebele" }, "oci": { "englishName": "Occitan", "nativeName": "Occitan" }, "oji": { "englishName": "Ojibwe", "nativeName": "ᐊᓂᔑᓈᐯᒧᐎᓐ" }, "chu": { "englishName": "Old Church Slavonic", "nativeName": "Словѣ́ньскъ" }, "orm": { "englishName": "Oromo", "nativeName": "Afaan Oromoo" }, "ori": { "englishName": "Oriya", "nativeName": "ଓଡି଼ଆ" }, "oss": { "englishName": "Ossetian", "nativeName": "Ирон æвзаг" }, "pan": { "englishName": "Panjabi", "nativeName": "ਪੰਜਾਬੀ" }, "pli": { "englishName": "Pāli", "nativeName": "पाऴि" }, "fas": { "englishName": "Persian", "nativeName": "فارسی" }, "pol": { "englishName": "Polish", "nativeName": "Polski" }, "pus": { "englishName": "Pashto", "nativeName": "پښتو" }, "por": { "englishName": "Portuguese", "nativeName": "Português" }, "que": { "englishName": "Quechua", "nativeName": "Runa Simi" }, "roh": { "englishName": "Romansh", "nativeName": "Rumantsch" }, "run": { "englishName": "Kirundi", "nativeName": "Kirundi" }, "ron": { "englishName": "Romanian", "nativeName": "Română" }, "rus": { "englishName": "Russian", "nativeName": "Русский" }, "san": { "englishName": "Sanskrit", "nativeName": "संस्कृतम्" }, "srd": { "englishName": "Sardinian", "nativeName": "Sardu" }, "snd": { "englishName": "Sindhi", "nativeName": "سنڌي‎" }, "sme": { "englishName": "Northern Sami", "nativeName": "Sámegiella" }, "smo": { "englishName": "Samoan", "nativeName": "Gagana Sāmoa" }, "sag": { "englishName": "Sango", "nativeName": "Sängö" }, "srp": { "englishName": "Serbian", "nativeName": "Српски" }, "gla": { "englishName": "Gaelic", "nativeName": "Gàidhlig" }, "sna": { "englishName": "Shona", "nativeName": "ChiShona" }, "sin": { "englishName": "Sinhala", "nativeName": "සිංහල" }, "slk": { "englishName": "Slovak", "nativeName": "Slovenčina" }, "slv": { "englishName": "Slovene", "nativeName": "Slovenščina" }, "som": { "englishName": "Somali", "nativeName": "Soomaaliga" }, "sot": { "englishName": "Southern Sotho", "nativeName": "Sesotho" }, "spa": { "englishName": "Spanish", "nativeName": "Español" }, "sun": { "englishName": "Sundanese", "nativeName": "Basa Sunda" }, "swa": { "englishName": "Swahili", "nativeName": "Kiswahili" }, "ssw": { "englishName": "Swati", "nativeName": "SiSwati" }, "swe": { "englishName": "Swedish", "nativeName": "Svenska" }, "tam": { "englishName": "Tamil", "nativeName": "தமிழ்" }, "tel": { "englishName": "Telugu", "nativeName": "తెలుగు" }, "tgk": { "englishName": "Tajik", "nativeName": "Тоҷикӣ" }, "tha": { "englishName": "Thai", "nativeName": "ภาษาไทย" }, "tir": { "englishName": "Tigrinya", "nativeName": "ትግርኛ" }, "bod": { "englishName": "Tibetan Standard", "nativeName": "བོད་ཡིག" }, "tuk": { "englishName": "Turkmen", "nativeName": "Türkmençe" }, "tgl": { "englishName": "Tagalog", "nativeName": "Tagalog" }, "tsn": { "englishName": "Tswana", "nativeName": "Setswana" }, "ton": { "englishName": "Tonga", "nativeName": "faka Tonga" }, "tur": { "englishName": "Turkish", "nativeName": "Türkçe" }, "tso": { "englishName": "Tsonga", "nativeName": "Xitsonga" }, "tat": { "englishName": "Tatar", "nativeName": "Татарча" }, "twi": { "englishName": "Twi", "nativeName": "Twi" }, "tah": { "englishName": "Tahitian", "nativeName": "Reo Mā’ohi" }, "uig": { "englishName": "Uyghur", "nativeName": "ئۇيغۇرچه" }, "ukr": { "englishName": "Ukrainian", "nativeName": "Українська" }, "urd": { "englishName": "Urdu", "nativeName": "اردو" }, "uzb": { "englishName": "Uzbek", "nativeName": "O‘zbek" }, "ven": { "englishName": "Venda", "nativeName": "Tshivenḓa" }, "vie": { "englishName": "Vietnamese", "nativeName": "Tiếng Việt" }, "vol": { "englishName": "Volapük", "nativeName": "Volapük" }, "wln": { "englishName": "Walloon", "nativeName": "Walon" }, "cym": { "englishName": "Welsh", "nativeName": "Cymraeg" }, "wol": { "englishName": "Wolof", "nativeName": "Wolof" }, "fry": { "englishName": "Western Frisian", "nativeName": "Frysk" }, "xho": { "englishName": "Xhosa", "nativeName": "isiXhosa" }, "yid": { "englishName": "Yiddish", "nativeName": "ייִדיש" }, "yor": { "englishName": "Yoruba", "nativeName": "Yorùbá" }, "zha": { "englishName": "Zhuang", "nativeName": "Cuengh" }, "zul": { "englishName": "Zulu", "nativeName": "isiZulu" } };

class ObservableI18nPlugin {

    constructor(options) {
        this.options = options;
        this.processedPaths = new Set();
        this.assembled = {};

        this.defaultLanguageCode = options.defaultLanguageCode || "eng";
        this.languageCodes = options.languageCodes || [];

        if (this.languageCodes.indexOf(this.defaultLanguageCode) === -1)
            this.languageCodes.unshift(this.defaultLanguageCode);
    
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

                    let iso6393Entry = iso6393[k];

                    this.assembled[k] = assembledLanguage = { languageCode: k, englishName: iso6393Entry.englishName, nativeName: iso6393Entry.nativeName, keyEntries: {} };
                }

                assembledLanguage.keyEntries[key] = v;
            });
        });
    }

    compileOutputAssembly() {

        let result = { defaultLanguageCode: this.defaultLanguageCode, languages: [] };

        for (let lc of this.languageCodes) {

            let assembledLanguage = this.assembled[lc];

            if (!assembledLanguage) {

                let iso6393Entry = iso6393[lc];

                this.assembled[lc] = assembledLanguage = { languageCode: lc, englishName: iso6393Entry.englishName, nativeName: iso6393Entry.nativeName, keyEntries: {} };
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