Install from [Chrome Web Store](https://chrome.google.com/webstore/detail/speech-recognition-toolki/hmpihaioaacpehkghnkmnmgmihalkmdf)

Fill out any web form by using only your voice!
Just select the Input field and Dictate your voice.! 
An easy to use speech synthesis and recognition tool for your browser!
Speech Recognition Toolkit is an extension that helps you convert your speech to text and fill out forms on the websites and speak recognized text if you want.

It can recognize a wide variety of languages. In order to work with this extension, simply open the addon's UI and then press on the big microphone icon to start converting your voice to text. Please note that, when the add-on is first started, it asks for microphone permission. Please accept the permission to start working with the add-on.

Works on google docs, google spreadsheets, fb messenger, instagram chats,  Gmail or write blog posts on Wordpress or send messages in Slack  and in any site that contains a text box. 

Greatest feature of all, is that it works on all the websites. :)

Features: 

 - Type with your voice on any website in more than 100 languages.
 - Play game with your voice.
 - Open your favorite website with your voice in new tab
 - TTS (Text to Speech) and copy on single click for recognized text.
 - Comes with voices commands such as  
  * emoji - to search from more then 1800 emoji in your language to type a 
    emoji with your voice.
  * Commands such as undo, redo, newline, press enter, calculate, math 
    symbol etc.
 - Dictate Calculations on the fly. eg. to dictate result of ' 2 x 30' just say 
   'calculate 2 x 30' and it will dictate the result in the selected text box. 
 - To insert math symbol, just say 'math symbol symbol_name' eg. 'math 
     symbol sigma' to insert sigma symbol. more than 125 maths symbol 
     available.
 - Tab Navigation using your voice. 
 - Convert your speech to morse code.
 - Toggle any command. 
 - Quick Command window (type commands instead).
 - Command Window Shortcut: windows (CTRL + Shift + S) and mac(Command + Shift + S) 
 - Supports On Start Feature.
 - Supports always listen mode.
 - Free to use

## Prerequisites
- yarn v1.17.3
- node v12.3.1

### Setup
````
git clone https://github.com/fxnoob/speech-recognition-toolkit.git
cd speech-recognition-toolkit
yarn
````

### Build
#### For Local Development
```
yarn
yarn start
```

#### For Production Release
```
yarn build
```

### Install
1. Navigate to `chrome://extensions/` in Google Chrome.
2. Turn on `developer mode`.
   ![](doc/screenshot/developer-mode.png)
3. Click on `Load unpacked`.
   ![](doc/screenshot/load-unpacked.png)
4. Select `build` directory.
5. **Speech Recognition Toolkit** should now up in extension list.
   ![](doc/screenshot/extension.png)

## List of available voice commands

[Click here](https://github.com/fxnoob/speech-recognition-toolkit/blob/master/COMMANDS.md)

## Available yarn commands

````
yarn start 
````
Start development build in watch mode


````
yarn build 
````
Create Production build


````
yarn generate:command 
````
Generate command template for new command. [Read more](https://github.com/fxnoob/speech-recognition-toolkit/wiki/How-to-create-new-Command-for-this-extension-%3F)


````
yarn delete:command  
````
Delete existing command and it's config files. [Read more](https://github.com/fxnoob/speech-recognition-toolkit/wiki/How-to-delete-the-command-experimental-created-command-%3F)


````
yarn generate:locale  
````
Generate locale key-value pair for all the languages.


````
yarn delete:locale  
````
Delete locale key-value pair for all the languages.

## Contributing
When contributing to this repository, please first discuss the change you wish to make via [issues](https://github.com/fxnoob/speech-recognition-toolkit/issues) with the owner of this repository before making a change.

## Author
Hitesh Saini - [fxnoob](https://github.com/fxnoob)

## License
This project is maintained under MIT license