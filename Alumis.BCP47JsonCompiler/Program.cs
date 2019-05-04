using System.IO;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Diagnostics;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Alumis.BCP47JsonCompiler
{
    class Program
    {
        static void Main(string[] args)
        {
            var lines = File.ReadAllLines("language-subtag-registry.txt");
            var languages = new Dictionary<string, Language>();

            for (var i = 0; i < lines.Length; ++i)
            {
                var languageDictionary = new Dictionary<string, string>();

                do
                {
                    var line = lines[i];

                    if (line == "%%")
                        break;

                    var j = line.IndexOf(':');

                    if (j != -1 && j + 2 < line.Length)
                        languageDictionary[line.Substring(0, j)] = line.Substring(j + 2);

                } while (++i < lines.Length);

                if (languageDictionary.TryGetValue("Type", out string type) && type == "language")
                {
                    if (languageDictionary.ContainsKey("Deprecated") || languageDictionary.ContainsKey("Preferred-Value"))
                        continue;

                    var language = new Language() { Subtag = languageDictionary["Subtag"] };

                    CultureInfo cultureInfo;

                    try
                    {
                        cultureInfo = new CultureInfo(language.Subtag);
                    }

                    catch (CultureNotFoundException)
                    {
                        continue;
                    }

                    if (!cultureInfo.NativeName.StartsWith("Unknown Language"))
                        language.NativeName = cultureInfo.NativeName;


                    language.EnglishName = languageDictionary["Description"];
                    language.MSLCID = cultureInfo.LCID;
                    language.ThreeLetterISOLanguageName = cultureInfo.ThreeLetterISOLanguageName;

                    if (languageDictionary.TryGetValue("Scope", out string scope))
                        language.Scope = scope;

                    if (languageDictionary.TryGetValue("Macrolanguage", out string macrolanguage))
                        language.MacroLanguageSubtag = macrolanguage;

                    languages.Add(language.Subtag, language);
                }
            }

            var foo = JsonConvert.SerializeObject(languages, new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            });

            int z = 1;
        }
    }

    //  { description: language.Description, scope: language.Scope, macroLanguage: language.Macrolanguage };
    class Language
    {
        //[JsonProperty("subtag")]
        public string Subtag { get; set; }
        //[JsonProperty("nativeName")]
        public string NativeName { get; set; }
        //[JsonProperty("englishName")]
        public string EnglishName { get; set; }
        //[JsonProperty("msLCID")]
        public int MSLCID { get; set; }
        //[JsonProperty("threeLetterISOLanguageName")]
        public string ThreeLetterISOLanguageName { get; set; }
        //[JsonProperty("macroLanguageSubtag")]
        public string MacroLanguageSubtag { get; set; }
        //[JsonProperty("scope")]
        public string Scope { get; set; }
    }
}