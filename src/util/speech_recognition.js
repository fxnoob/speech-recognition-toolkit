import Message from './message';
import * as SpeechRecognitionLib from 'annyang';

const message = new Message();

export class speechRecognition {
    constructor() {
        this.SpeechRecognition = SpeechRecognitionLib;
        this.langs = [
            {
                "name": "Afrikaans",
                "key": "af-ZA"
            },
            {
                "name": "አማርኛ",
                "key": "am-ET"
            },
            {
                "name": "Azərbaycanca",
                "key": "az-AZ"
            },
            {
                "name": "বাংলা",
                "key": "bn-BD"
            },
            {
                "name": "Bahasa Indonesia",
                "key": "id-ID"
            },
            {
                "name": "Bahasa Melayu",
                "key": "ms-MY"
            },
            {
                "name": "Català",
                "key": "ca-ES"
            },
            {
                "name": "Čeština",
                "key": "cs-CZ"
            },
            {
                "name": "Dansk",
                "key": "da-DK"
            },
            {
                "name": "Deutsch",
                "key": "de-DE"
            },
            {
                "name": "English",
                "key": "en-AU"
            },
            {
                "name": "Español",
                "key": "es-AR"
            },
            {
                "name": "Euskara",
                "key": "eu-ES"
            },
            {
                "name": "Filipino",
                "key": "fil-PH"
            },
            {
                "name": "Français",
                "key": "fr-FR"
            },
            {
                "name": "Basa Jawa",
                "key": "jv-ID"
            },
            {
                "name": "Galego",
                "key": "gl-ES"
            },
            {
                "name": "ગુજરાતી",
                "key": "gu-IN"
            },
            {
                "name": "Hrvatski",
                "key": "hr-HR"
            },
            {
                "name": "IsiZulu",
                "key": "zu-ZA"
            },
            {
                "name": "Íslenska",
                "key": "is-IS"
            },
            {
                "name": "Italiano",
                "key": "it-IT"
            },
            {
                "name": "ಕನ್ನಡ",
                "key": "kn-IN"
            },
            {
                "name": "ភាសាខ្មែរ",
                "key": "km-KH"
            },
            {
                "name": "Latviešu",
                "key": "lv-LV"
            },
            {
                "name": "Lietuvių",
                "key": "lt-LT"
            },
            {
                "name": "മലയാളം",
                "key": "ml-IN"
            },
            {
                "name": "मराठी",
                "key": "mr-IN"
            },
            {
                "name": "Magyar",
                "key": "hu-HU"
            },
            {
                "name": "ລາວ",
                "key": "lo-LA"
            },
            {
                "name": "Nederlands",
                "key": "nl-NL"
            },
            {
                "name": "नेपाली भाषा",
                "key": "ne-NP"
            },
            {
                "name": "Norsk bokmål",
                "key": "nb-NO"
            },
            {
                "name": "Polski",
                "key": "pl-PL"
            },
            {
                "name": "Português",
                "key": "pt-BR"
            },
            {
                "name": "Română",
                "key": "ro-RO"
            },
            {
                "name": "සිංහල",
                "key": "si-LK"
            },
            {
                "name": "Slovenščina",
                "key": "sl-SI"
            },
            {
                "name": "Basa Sunda",
                "key": "su-ID"
            },
            {
                "name": "Slovenčina",
                "key": "sk-SK"
            },
            {
                "name": "Suomi",
                "key": "fi-FI"
            },
            {
                "name": "Svenska",
                "key": "sv-SE"
            },
            {
                "name": "Kiswahili",
                "key": "sw-TZ"
            },
            {
                "name": "ქართული",
                "key": "ka-GE"
            },
            {
                "name": "Հայերեն",
                "key": "hy-AM"
            },
            {
                "name": "தமிழ்",
                "key": "ta-IN"
            },
            {
                "name": "తెలుగు",
                "key": "te-IN"
            },
            {
                "name": "Tiếng Việt",
                "key": "vi-VN"
            },
            {
                "name": "Türkçe",
                "key": "tr-TR"
            },
            {
                "name": "اُردُو",
                "key": "ur-PK"
            },
            {
                "name": "Ελληνικά",
                "key": "el-GR"
            },
            {
                "name": "български",
                "key": "bg-BG"
            },
            {
                "name": "Pусский",
                "key": "ru-RU"
            },
            {
                "name": "Српски",
                "key": "sr-RS"
            },
            {
                "name": "Українська",
                "key": "uk-UA"
            },
            {
                "name": "한국어",
                "key": "ko-KR"
            },
            {
                "name": "中文",
                "key": "cmn-Hans-CN"
            },
            {
                "name": "日本語",
                "key": "ja-JP"
            },
            {
                "name": "हिन्दी",
                "key": "hi-IN"
            },
            {
                "name": "ภาษาไทย",
                "key": "th-TH"
            }
        ];
    }
    addCommand(commands) {
        this.SpeechRecognition.addCommands(commands);
    }
    stop() {
    }
    start() {
        this.SpeechRecognition.start();
    }
    /** set language*/
    setLang(langKey) {
        this.SpeechRecognition.setLanguage(langKey);
    }
    /** send recognised speech to highlighted input element */
    sendTextToDom(text) {
        message.putOnHighlightedInputfield(text);
    }
}
