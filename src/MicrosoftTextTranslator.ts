import axios, { AxiosRequestConfig } from 'axios';
import { v4 as uuidv4 } from 'uuid';

type TranslateParameters = {
  /**
   * The body of the request is a JSON array. Each array element is a JSON object with a string property named Text, which represents the string to translate.
   * 
   * The following limitations apply:

     - The array can have at most 100 elements.
     - The entire text included in the request cannot exceed 50,000 characters including spaces.
   */
  text: string[] | string
  /**
   * Specifies the language of the output text. The target language must be one of the supported languages included in the translation scope. For example, use to=de to translate to German.
   * 
   * It's possible to translate to multiple languages simultaneously by repeating the parameter in the query string. For example, use to=de&to=it to translate to German and Italian.
   */
  to: string[] | string;
  /**
   * Specifies the language of the input text. Find which languages are available to translate from by looking up supported languages using the translation scope. If the from parameter isn't specified, automatic language detection is applied to determine the source language.
   * 
   * You must use the from parameter rather than autodetection when using the dynamic dictionary feature.
   */
  from?: string;
  /**
   * Defines whether the text being translated is plain text or HTML text. Any HTML needs to be a well-formed, complete element. Possible values are: plain (default) or html.
   */
  textType?: 'plain' | 'html';
  /**
   * A string specifying the category (domain) of the translation. This parameter is used to get translations from a customized system built with Custom Translator. Add the Category ID from your Custom Translator project details to this parameter to use your deployed customized system. Default value is: general.
   */
  category?: string;
  /**
   * Specifies how profanities should be treated in translations. Possible values are: NoAction (default), Marked or Deleted. To understand ways to treat profanity, see Profanity handling.
   */
  profanityAction?: 'NoAction' | 'Marked' | 'Deleted';
  /**
   * Specifies how profanities should be marked in translations. Possible values are: Asterisk (default) or Tag. To understand ways to treat profanity, see Profanity handling.
   */
  profanityMarker?: boolean;
  /**
   * Specifies whether to include alignment projection from source text to translated text. Possible values are: true or false (default).
   */
  includeAlignment?: boolean;
  /**
   * Specifies whether to include sentence boundaries for the input text and the translated text. Possible values are: true or false (default).
   */
  includeSentenceLength?: boolean;
  /**
   * Specifies a fallback language if the language of the input text can't be identified. Language autodetection is applied when the from parameter is omitted. If detection fails, the suggestedFrom language will be assumed.
   */
  suggestedFrom?: string;
  /**
   * Specifies the script of the input text.
   */
  fromScript?: string;
  /**
   * Specifies the script of the translated text.
   */
  toScript?: string;
  /**
   * Specifies that the service is allowed to fall back to a general system when a custom system doesn't exist. Possible values are: true (default) or false.
   * 
   * allowFallback=false specifies that the translation should only use systems trained for the category specified by the request. If a translation for language X to language Y requires chaining through a pivot language E, then all the systems in the chain (X->E and E->Y) will need to be custom and have the same category. If no system is found with the specific category, the request will return a 400 status code. allowFallback=true specifies that the service is allowed to fall back to a general system when a custom system doesn't exist.
   */
  allowFallback?: boolean
}
type TranslateResult = {
  /**
   * An object describing the detected language
   * 
   * The detectedLanguage property is only present in the result object when language autodetection is requested.
   */
  detectedLanguage?: {
    /**
     * A string representing the code of the detected language
     */
    language: string
    /**
     * A float value indicating the confidence in the result. The score is between zero and one and a low score indicates a low confidence.
     */
    score: number
  }
  /**
   * An array of translation results. The size of the array matches the number of target languages specified through the to query parameter.
   */
  translations: {
    /**
     * A string representing the language code of the target language.
     */
    text: string
    /**
     * A string giving the translated text.
     */
    to: string
    /**
     * An object giving the translated text in the script specified by the toScript parameter.
     * 
     * The transliteration object isn't included if transliteration doesn't take place.
     */
    transliteration?: {
      /**
       * A string specifying the target script.
       */
      script: string
      /**
       * A string giving the translated text in the target script.
       */
      text: string
    }
    /**
     * An object returning sentence boundaries in the input and output texts.
     */
    sentLen?: {
      /**
       * An integer array representing the lengths of the sentences in the input text. The length of the array is the number of sentences, and the values are the length of each sentence.
       */
      srcSentLen: number[]
      /**
       * An integer array representing the lengths of the sentences in the translated text. The length of the array is the number of sentences, and the values are the length of each sentence.
       */
      transSentLen: number[]

    }
    /**
     * An object with a single string property named text, which gives the input text in the default script of the source language.
     * 
     * sourceText property is present only when the input is expressed in a script that's not the usual script for the language. For example, if the input were Arabic written in Latin script, then sourceText.text would be the same Arabic text converted into Arab script.
     */
    sourceText?: {
      /**
       * input text in the default script of the source language.
       */
      text: string
    }
  }[]
}

type TransliterateParameters = {
  /**
   * The body of the request is a JSON array. Each array element is a JSON object with a string property named Text, which represents the string to convert.
   * 
   * The following limitations apply:

     - The array can have at most 10 elements.
     - The text value of an array element cannot exceed 1,000 characters including spaces.
     - The entire text included in the request cannot exceed 5,000 characters including spaces.
   */
  text: string[] | string
  /**
   * Specifies the language of the text to convert from one script to another. Possible languages are listed in the transliteration scope obtained by querying the service for its supported languages.
   */
  language: string
  /**
   * Specifies the script used by the input text. Look up supported languages using the transliteration scope, to find input scripts available for the selected language.
   */
  fromScript: string
  /**
   * Specifies the output script. Look up supported languages using the transliteration scope, to find output scripts available for the selected combination of input language and input script.
   */
  toScript: string
}
type TransliterateResult = {
  /**
   * A string which is the result of converting the input string to the output script.
   */
  text: string
  /**
   * A string specifying the script used in the output.
   */
  script: string
}

type DetectParameters = {
  /**
   * Language detection is applied to the value of the Text property. The language auto-detection works better with longer input text.
   * 
   * The following limitations apply:

     - The array can have at most 100 elements.
     - The entire text included in the request cannot exceed 50,000 characters including spaces.
   */
  text: string[] | string
}
type DetectResult = {
  /**
   * Code of the detected language.
   */
  language: string
  /**
   * A float value indicating the confidence in the result. The score is between zero and one and a low score indicates a low confidence.
   */
  score: number
  /**
   * A boolean value which is true if the detected language is one of the languages supported for text translation.
   */
  isTranslationSupported: boolean
  /**
   * A boolean value which is true if the detected language is one of the languages supported for transliteration.
   */
  isTransliterationSupported: boolean
  /**
   * An array of other possible languages. Each element of the array is another object with the same properties listed above: language, score, isTranslationSupported and isTransliterationSupported.
   */
  alternatives?: {
    /**
     * Code of the detected language.
     */
    language: string
    /**
     * A float value indicating the confidence in the result. The score is between zero and one and a low score indicates a low confidence.
     */
    score: number
    /**
     * A boolean value which is true if the detected language is one of the languages supported for text translation.
     */
    isTranslationSupported: boolean
    /**
     * A boolean value which is true if the detected language is one of the languages supported for transliteration.
     */
    isTransliterationSupported: boolean
  }[]
}

type MicrosoftTranslatorConfiguration = {
  subscriptionKey: string
  subscriptionRegion?: string
  customDomain?: string
  defaultLanguage?: string
}



export class MicrosoftTextTranslator {
  private readonly apiVersion: "1.0" | "2.0" | "3.0" = "3.0"
  private subscriptionKey: string
  private subscriptionRegion: string | undefined
  private domain: string = 'api'

  constructor({ defaultLanguage, ...config }: MicrosoftTranslatorConfiguration) {
    if (!config.subscriptionKey) throw new Error(`MicrosoftTextTranslator -> "subscriptionKey" is a required parameter and MUST NOT be empty`)
    this.subscriptionKey = config.subscriptionKey;
    if (config.subscriptionRegion) {
      this.subscriptionRegion = config.subscriptionRegion;
    }
    if (config.customDomain) {
      this.domain = config.customDomain;
    }
  }

  private getBaseRequestConfiguration(): AxiosRequestConfig {
    let config: AxiosRequestConfig = {
      baseURL: `https://${this.domain}.cognitive.microsofttranslator.com`,
      headers: {
        'X-ClientTraceId': uuidv4().toString()
      },
      params: {
        'api-version': this.apiVersion
      }
    };
    config.headers = config.headers ?? {}
    if (this.subscriptionKey) {
      config.headers['Ocp-Apim-Subscription-Key'] = this.subscriptionKey;
    }
    if (this.subscriptionRegion) {
      config.headers['Ocp-Apim-Subscription-Region'] = this.subscriptionRegion;
    }
    return config;
  }

  async translate(params: TranslateParameters): Promise<TranslateResult[]> {
    const config = this.getBaseRequestConfiguration();

    return axios.request({
      ...config,
      method: 'POST',
      url: 'translate',
      headers: {
        ...config.headers,
        'Content-type': 'application/json; charset=UTF-8'
      },
      params: {
        ...config.params,
        to: params.to
      },
      data: (typeof params.text === 'string') ? [{ text: params.text }] : params.text.map(it => ({ text: it }))
    })
      .then(r => r.data as TranslateResult[])
      .catch(error => { console.log(error.toJSON()); return []; })
  }

  async transliterate(params: TransliterateParameters): Promise<TransliterateResult[]> {
    const config = this.getBaseRequestConfiguration();

    return axios.request({
      ...config,
      method: 'POST',
      url: 'transliterate',
      headers: {
        ...config.headers,
        'Content-type': 'application/json; charset=UTF-8'
      },
      params: { ...config.params, ...params },
      data: (typeof params.text === 'string') ? [{ text: params.text }] : params.text.map(it => ({ text: it }))
    })
      .then(r => r.data as TransliterateResult[])
      .catch(error => { console.log(error.toJSON()); return []; })
  }

  async detect(params: DetectParameters): Promise<DetectResult[]> {
    const config = this.getBaseRequestConfiguration();

    return axios.request({
      ...config,
      method: 'POST',
      url: 'detect',
      headers: {
        ...config.headers,
        'Content-type': 'application/json'
      },
      data: (typeof params.text === 'string') ? [{ text: params.text }] : params.text.map(it => ({ text: it }))
    })
      .then(r => r.data as DetectResult[])
      .catch(error => { console.log(error.toJSON()); return []; })
  }
}
