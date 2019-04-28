import { Observable } from "@alumis/observables";
import * as languageData from "./__observables-i18n.json";

export class Language {

    constructor(public languageCode: string, public englishName: string, public nativeName: string, public keyEntries: { [key: string]: string }) {

    }
}

export var defaultLanguage: Language;
export var availableLanguages = (<any[]>(<any>languageData).languages).map(l => {

    let result = new Language(l.languageCode, l.englishName, l.nativeName, l.keyEntries);

    if (result.languageCode === (<any>languageData).defaultLanguageCode)
        defaultLanguage = result;

    return result;
});

export var currentLanguage = Observable.create(defaultLanguage);

var map = new Map<string, Observable<string>>();

currentLanguage.subscribe(n => {

    map.forEach((v, k) => { v.value = n && n.keyEntries[k] || defaultLanguage && defaultLanguage.keyEntries[k]; });
});

export function r(key: string) {

    let observable = map.get(key);

    if (observable)
        return observable;

    let l = currentLanguage.value;

    map.set(key, observable = Observable.create(l && l.keyEntries[key] || defaultLanguage && defaultLanguage.keyEntries[key]));

    return observable;
}