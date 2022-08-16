# Microsoft Translator API Client
non-official package that enables a Microsoft Azure Translator API Client for NodeJS

This package was created as response of a lack of official packages for consuming MS Translator API in NodeJS applications.<br/>It provides an easy way to consume their enpointsand its fully extensible by adding layers of abstraction for business logic.

**This package is currently a beta version and only supports "detect", "translate" and "transliterate" endpoints of the Azure [Text Translation REST API](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/reference/rest-api-guide)**

## Installing / Getting Started

This package is only available for NodeJS and should be installed using NPM by running the commands below:

Open a command line and make sure you are in your project's root directory before installing it
```
cd development/my-awesome-project/
```
Now, let's install this package
```
npm i @akgargo/ms-translator-api-client
```

## Quick Start

The usage of this API client is very intuitive if you have already read the official [Microsoft documentation](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/reference/v3-0-reference). I higly recommend you to uderstand how the API works first, as this is only an abstracion layer that help you to reduce boilerplate code directly in your application for using MS Azure translation capabilities.
### Creating a client

```
import { MicrosoftTextTranslator } from '@akgargo/ms-translator-api-client';

const translator = new MicrosoftTextTranslator({ subscriptionKey: <YOUR_AZURE_TRANSLATOR_KEY> })
```
### Translating some text
```
translator.translate({
  text: ["Hello world", "This are two different texts to be translated in a single call"],
  to: "es"
})
.then(translation => {
  console.log(JSON.stringify({ translation }, null, 2))
});
```
The code above should print in the console
```
{
  "translation": [
    {
      "detectedLanguage": {
        "language": "en",
        "score": 1
      },
      "translations": [
        {
          "text": "Hola mundo",
          "to": "es"
        }
      ]
    },
    {
      "detectedLanguage": {
        "language": "en",
        "score": 1
      },
      "translations": [
        {
          "text": "Se trata de dos textos diferentes a traducir en una sola convocatoria",
          "to": "es"
        }
      ]
    }
  ]
}
```

## Usage

### Detect endpoint
Usage
```
translator.detect({
  text: ['Bonjour']
}).then(detection => {
  console.log(JSON.stringify({ detection }, null, 2))
});
```
Result
```
{
  "detection": [
    {
      "language": "fr",
      "score": 1,
      "isTranslationSupported": true,
      "isTransliterationSupported": false
    }
  ]
}
```

### Translate endpoint
Usage
```
translator.translate({
  text: ['Bonjour']
}).then(translationResult => {
  console.log(JSON.stringify({ detection }, null, 2))
});
```
Result
```
{
  "translation": [
    {
      "detectedLanguage": {
        "language": "fr",
        "score": 1
      },
      "translations": [
        {
          "text": "Hello",
          "to": "en"
        }
      ]
    }
  ]
}
```

### Transliterate endpoint
Usage
```
translator.translate({
  text: ['Bonjour']
}).then(transliteration => {
  console.log(JSON.stringify({ detection }, null, 2))
});
```
Result
```
{
  "translation": [
    {
      "text": "Kon'nichiwa",
      "script": "Latn"
    }
  ]
}
```


## License
MIT License

Copyright (c) 2022 Victor Monsalve Retamal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.