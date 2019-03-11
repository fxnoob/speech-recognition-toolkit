import Message from './message'
import * as SpeechRecognitionLib from 'annyang'

const message = new Message()

export class speechRecognition {
  constructor () {
    this.SpeechRecognition = SpeechRecognitionLib
    this.langs = [
      {
        'name': 'Afrikaans',
        'key': 'af-ZA'
      },
      {
        'name': 'አማርኛ',
        'key': 'am-ET'
      },
      {
        'name': 'Azərbaycanca',
        'key': 'az-AZ'
      },
      {
        'name': 'বাংলা',
        'key': 'bn-BD'
      },
      {
        'name': 'Bahasa Indonesia',
        'key': 'id-ID'
      },
      {
        'name': 'Bahasa Melayu',
        'key': 'ms-MY'
      },
      {
        'name': 'Català',
        'key': 'ca-ES'
      },
      {
        'name': 'Čeština',
        'key': 'cs-CZ'
      },
      {
        'name': 'Dansk',
        'key': 'da-DK'
      },
      {
        'name': 'Deutsch',
        'key': 'de-DE'
      },
      {
        'name': 'English',
        'key': 'en-AU'
      },
      {
        'name': 'Español',
        'key': 'es-AR'
      },
      {
        'name': 'Euskara',
        'key': 'eu-ES'
      },
      {
        'name': 'Filipino',
        'key': 'fil-PH'
      },
      {
        'name': 'Français',
        'key': 'fr-FR'
      },
      {
        'name': 'Basa Jawa',
        'key': 'jv-ID'
      },
      {
        'name': 'Galego',
        'key': 'gl-ES'
      },
      {
        'name': 'ગુજરાતી',
        'key': 'gu-IN'
      },
      {
        'name': 'Hrvatski',
        'key': 'hr-HR'
      },
      {
        'name': 'IsiZulu',
        'key': 'zu-ZA'
      },
      {
        'name': 'Íslenska',
        'key': 'is-IS'
      },
      {
        'name': 'Italiano',
        'key': 'it-IT'
      },
      {
        'name': 'ಕನ್ನಡ',
        'key': 'kn-IN'
      },
      {
        'name': 'ភាសាខ្មែរ',
        'key': 'km-KH'
      },
      {
        'name': 'Latviešu',
        'key': 'lv-LV'
      },
      {
        'name': 'Lietuvių',
        'key': 'lt-LT'
      },
      {
        'name': 'മലയാളം',
        'key': 'ml-IN'
      },
      {
        'name': 'मराठी',
        'key': 'mr-IN'
      },
      {
        'name': 'Magyar',
        'key': 'hu-HU'
      },
      {
        'name': 'ລາວ',
        'key': 'lo-LA'
      },
      {
        'name': 'Nederlands',
        'key': 'nl-NL'
      },
      {
        'name': 'नेपाली भाषा',
        'key': 'ne-NP'
      },
      {
        'name': 'Norsk bokmål',
        'key': 'nb-NO'
      },
      {
        'name': 'Polski',
        'key': 'pl-PL'
      },
      {
        'name': 'Português',
        'key': 'pt-BR'
      },
      {
        'name': 'Română',
        'key': 'ro-RO'
      },
      {
        'name': 'සිංහල',
        'key': 'si-LK'
      },
      {
        'name': 'Slovenščina',
        'key': 'sl-SI'
      },
      {
        'name': 'Basa Sunda',
        'key': 'su-ID'
      },
      {
        'name': 'Slovenčina',
        'key': 'sk-SK'
      },
      {
        'name': 'Suomi',
        'key': 'fi-FI'
      },
      {
        'name': 'Svenska',
        'key': 'sv-SE'
      },
      {
        'name': 'Kiswahili',
        'key': 'sw-TZ'
      },
      {
        'name': 'ქართული',
        'key': 'ka-GE'
      },
      {
        'name': 'Հայերեն',
        'key': 'hy-AM'
      },
      {
        'name': 'தமிழ்',
        'key': 'ta-IN'
      },
      {
        'name': 'తెలుగు',
        'key': 'te-IN'
      },
      {
        'name': 'Tiếng Việt',
        'key': 'vi-VN'
      },
      {
        'name': 'Türkçe',
        'key': 'tr-TR'
      },
      {
        'name': 'اُردُو',
        'key': 'ur-PK'
      },
      {
        'name': 'Ελληνικά',
        'key': 'el-GR'
      },
      {
        'name': 'български',
        'key': 'bg-BG'
      },
      {
        'name': 'Pусский',
        'key': 'ru-RU'
      },
      {
        'name': 'Српски',
        'key': 'sr-RS'
      },
      {
        'name': 'Українська',
        'key': 'uk-UA'
      },
      {
        'name': '한국어',
        'key': 'ko-KR'
      },
      {
        'name': '中文',
        'key': 'cmn-Hans-CN'
      },
      {
        'name': '日本語',
        'key': 'ja-JP'
      },
      {
        'name': 'हिन्दी',
        'key': 'hi-IN'
      },
      {
        'name': 'ภาษาไทย',
        'key': 'th-TH'
      }
    ]
    this.langExt = {
    'af-ZA': "Afrikaans" ,
    'am-ET': "አማርኛ" ,
    'az-AZ': "Azərbaycanca" ,
    'bg-BG': "български" ,
    'bn-BD': "বাংলা" ,
    'ca-ES': "Català" ,
   'cmn-Hans-CN': "中文" ,
    'cs-CZ': "Čeština" ,
    'da-DK': "Dansk" ,
    'de-DE': "Deutsch" ,
    'el-GR': "Ελληνικά" ,
    'en-AU': "English" ,
    'es-AR': "Español" ,
    'eu-ES': "Euskara" ,
    'fi-FI': "Suomi" ,
    'fil-PH': "Filipino" ,
    'fr-FR': "Français" ,
    'gl-ES': "Galego" ,
    'gu-IN': "ગુજરાતી" ,
    'hi-IN': "हिन्दी" ,
    'hr-HR': "Hrvatski" ,
    'hu-HU': "Magyar" ,
    'hy-AM': "Հայերեն" ,
    'id-ID': "Bahasa Indonesia" ,
    'is-IS': "Íslenska" ,
    'it-IT': "Italiano" ,
    'ja-JP': "日本語" ,
    'jv-ID': "Basa Jawa" ,
    'ka-GE': "ქართული" ,
    'km-KH': "ភាសាខ្មែរ" ,
    'kn-IN': "ಕನ್ನಡ" ,
    'ko-KR': "한국어" ,
    'lo-LA': "ລາວ" ,
    'lt-LT': "Lietuvių" ,
    'lv-LV': "Latviešu" ,
    'ml-IN': "മലയാളം" ,
    'mr-IN': "मराठी" ,
    'ms-MY': "Bahasa Melayu" ,
    'nb-NO': "Norsk bokmål" ,
    'ne-NP': "नेपाली भाषा" ,
    'nl-NL': "Nederlands" ,
    'pl-PL': "Polski" ,
    'pt-BR': "Português" ,
    'ro-RO': "Română" ,
    'ru-RU': "Pусский" ,
   'si-LK': "සිංහල" ,
    'sk-SK': "Slovenčina" ,
    'sl-SI': "Slovenščina" ,
    'sr-RS': "Српски" ,
    'su-ID': "Basa Sunda" ,
    'sv-SE': "Svenska" ,
    'sw-TZ': "Kiswahili" ,
    'ta-IN': "தமிழ்" ,
    'te-IN': "తెలుగు" ,
    'th-TH': "ภาษาไทย" ,
    'tr-TR': "Türkçe" ,
    'uk-UA': "Українська" ,
    'ur-PK': "اُردُو" ,
    'vi-VN': "Tiếng Việt" ,
    'zu-ZA': "IsiZulu"
    }
  };
  addCommand (commands) {
    this.SpeechRecognition.addCommands(commands)
  }
  stop () {
  }
  start () {
    this.SpeechRecognition.start()
  }
  /** set language */
  setLang (langKey) {
    this.SpeechRecognition.setLanguage(langKey)
  }
  /** send recognised speech to highlighted input element */
  sendTextToDom (text) {
    message.putOnHighlightedInputfield(text)
  }
}
