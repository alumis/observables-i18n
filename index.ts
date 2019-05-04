import { Observable } from "@alumis/observables";
import * as languageData from "./__observables-i18n.json";

export class Language {

    constructor(public subtag: string, public nativeName: string, public englishName: string, public scope: string, public macroLanguageSubtag: string, public keyEntries: { [key: string]: string }) {

    }

    macroLanguage: Language;

    toString() {

        return this.englishName;
    }
}

export var defaultLanguage: Language;
export var languages: Language[] = [];
export var languagesBySubtag = new Map<string, Language>();

for (let l of (<any[]>(<any>languageData).languages)) {

    let language = new Language(l.subtag, l.nativeName, l.englishName,  l.scope, l.macroLanguageSubtag, l.keyEntries);

    if (language.subtag === (<any>languageData).defaultSubtag)
        defaultLanguage = language;

    languages.push(language);
    languagesBySubtag.set(language.subtag, language);
}

for (let l of languages) {

    let macroLanguage = languagesBySubtag.get(l.macroLanguageSubtag);

    if (macroLanguage)
        l.macroLanguage = macroLanguage;
}

export var currentLanguage = Observable.create(defaultLanguage);

let observablesByKey = new Map<string, Observable<string>>();

currentLanguage.subscribe(n => {

    if (n) {

        for (let p of observablesByKey) {

            let key = p[0];
            let value = n.keyEntries[key];

            if (!value) {

                for (let macroLanguage = n.macroLanguage; macroLanguage; macroLanguage = macroLanguage.macroLanguage) {

                    value = n.keyEntries[key];

                    if (value)
                        break;

                }

                if (!value)
                    value = defaultLanguage && defaultLanguage.keyEntries[key];
            }

            p[1].value = value;
        }

        document.documentElement.setAttribute("lang", n.subtag);
    }

    else {

        for (let p of observablesByKey)
            p[1].value = <any>n;

        document.documentElement.removeAttribute("lang");
    }
});

if (currentLanguage.value)
    document.documentElement.setAttribute("lang", currentLanguage.value.subtag)

else document.documentElement.removeAttribute("lang");

export function r(key: string) {

    let observable = observablesByKey.get(key);

    if (observable)
        return observable;

    let n = currentLanguage.value;
    let value: string;

    if (n) {

        value = n.keyEntries[key];

        if (!value) {

            for (let macroLanguage = n.macroLanguage; macroLanguage; macroLanguage = macroLanguage.macroLanguage) {

                value = n.keyEntries[key];

                if (value)
                    break;

            }

            if (!value)
                value = defaultLanguage && defaultLanguage.keyEntries[key];
        }
    }

    observablesByKey.set(key, observable = Observable.create(value));

    return observable;
}