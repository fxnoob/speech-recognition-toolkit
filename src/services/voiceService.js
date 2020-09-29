import * as SR from "annyang";
class Voice {
  constructor() {
    this.supportedLanguages = {
      "af-ZA": "Afrikaans",
      "am-ET": "አማርኛ",
      "az-AZ": "Azərbaycanca",
      "bg-BG": "български",
      "bn-BD": "বাংলা",
      "ca-ES": "Català",
      "cmn-Hans-CN": "中文",
      "cs-CZ": "Čeština",
      "da-DK": "Dansk",
      "de-DE": "Deutsch",
      "el-GR": "Ελληνικά",
      "en-AU": "English",
      "es-AR": "Español",
      "eu-ES": "Euskara",
      "fi-FI": "Suomi",
      "fil-PH": "Filipino",
      "fr-FR": "Français",
      "gl-ES": "Galego",
      "gu-IN": "ગુજરાતી",
      "hi-IN": "हिन्दी",
      "hr-HR": "Hrvatski",
      "hu-HU": "Magyar",
      "hy-AM": "Հայերեն",
      "id-ID": "Bahasa Indonesia",
      "is-IS": "Íslenska",
      "it-IT": "Italiano",
      "ja-JP": "日本語",
      "jv-ID": "Basa Jawa",
      "ka-GE": "ქართული",
      "km-KH": "ភាសាខ្មែរ",
      "kn-IN": "ಕನ್ನಡ",
      "ko-KR": "한국어",
      "lo-LA": "ລາວ",
      "lt-LT": "Lietuvių",
      "lv-LV": "Latviešu",
      "ml-IN": "മലയാളം",
      "mr-IN": "मराठी",
      "ms-MY": "Bahasa Melayu",
      "nb-NO": "Norsk bokmål",
      "ne-NP": "नेपाली भाषा",
      "nl-NL": "Nederlands",
      "pl-PL": "Polski",
      "pt-BR": "Português",
      "ro-RO": "Română",
      "ru-RU": "Pусский",
      "si-LK": "සිංහල",
      "sk-SK": "Slovenčina",
      "sl-SI": "Slovenščina",
      "sr-RS": "Српски",
      "su-ID": "Basa Sunda",
      "sv-SE": "Svenska",
      "sw-TZ": "Kiswahili",
      "ta-IN": "தமிழ்",
      "te-IN": "తెలుగు",
      "th-TH": "ภาษาไทย",
      "tr-TR": "Türkçe",
      "uk-UA": "Українська",
      "ur-PK": "اُردُو",
      "vi-VN": "Tiếng Việt",
      "zu-ZA": "IsiZulu"
    };
    this.SR = SR;
  }
  addCommand(commands) {
    this.SR.addCommands(commands);
  }
  start() {
    this.SR.start();
  }
  stop() {
    this.SR.abort();
  }
  setLanguage(langKey = "en-AU") {
    this.SR.setLanguage(langKey);
  }
  permissionGranted() {
    return navigator.permissions.query({ name: "microphone" });
  }
}

const voice = new Voice();
export default voice;
