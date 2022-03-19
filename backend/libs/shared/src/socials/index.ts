import { Injectable } from '@nestjs/common';
import { SocialLinks } from 'social-links';

const ctrlCharactersRegex =
  /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim;
const invalidProtocolRegex = /^([^\w]*)(javascript|data|vbscript)/im;
const urlSchemeRegex = /^([^:]+):/gm;
const relativeFirstCharacters = ['.', '/'];

export declare type SocialType =
  | 'email'
  | 'website'
  | 'behance'
  | 'dev_to'
  | 'dribbble'
  | 'exercism'
  | 'facebook'
  | 'github'
  | 'instagram'
  | 'keybase'
  | 'linkedin'
  | 'medium'
  | 'patreon'
  | 'stackoverflow'
  | 'substack'
  | 'telegram'
  | 'tiktok'
  | 'twitch'
  | 'twitter'
  | 'vk'
  | 'youtube';

@Injectable()
export class SocialsUtils extends SocialLinks {
  urlCleaner(inputUrl: string) {
    if (inputUrl) {
      let url = inputUrl;
      if (!url.includes('https://') && url.includes('https:/')) {
        url = url.replace('https:/', 'https://');
      }
      return url.replace(ctrlCharactersRegex, '').trim();
    }
    return inputUrl;
  }

  isRelativeUrlWithoutProtocol(url: string): boolean {
    return relativeFirstCharacters.indexOf(url[0]) > -1;
  }

  sanitizeUrl(
    inputUrl?: string,
    { https = true }: { https?: boolean } = {},
  ): string {
    if (typeof inputUrl !== 'string') {
      throw new TypeError(
        `Expected \`url\` to be of type \`string\`, got \`${typeof inputUrl}\``,
      );
    }

    let url = inputUrl.trim();
    if (/^\.*\/|^(?!localhost)\w+?:/.test(url)) {
      return url;
    }
    url = url.replace(/^(?!(?:\w+?:)?\/\/)/, https ? 'https://' : 'http://');

    const sanitizedUrlProp = this.urlCleaner(url);

    if (this.isRelativeUrlWithoutProtocol(sanitizedUrlProp)) {
      return sanitizedUrlProp;
    }

    const urlSchemeParseResults = sanitizedUrlProp.match(urlSchemeRegex);
    if (!urlSchemeParseResults) {
      return sanitizedUrlProp;
    }

    const urlScheme = urlSchemeParseResults[0];
    if (invalidProtocolRegex.test(urlScheme)) {
      return '';
    }

    return sanitizedUrlProp;
  }

  isValidLink = (social: SocialType, link: string) => {
    try {
      return this.isValid(social.toLowerCase(), link);
    } catch (error) {
      return false;
    }
  };

  sanitizeFacebook = (inputUrl: string) => {
    let url = inputUrl;
    if (url.includes('fb.com/')) {
      url = url.replace('fb.com/', '');
    }
    return this.sanitize('facebook', url);
  };

  sanitizeLink = (social: SocialType, link: string) => {
    try {
      if (social === 'email') {
        return link;
      } else if (social === 'website') {
        return this.sanitizeUrl(link, { https: true });
      } else if (social === 'facebook') {
        return this.sanitizeFacebook(link);
      }
      return this.sanitize(social.toLowerCase(), link);
    } catch (error) {
      return '';
    }
  };

  validateSanitizeLink = (social: SocialType, link: string) => {
    if (this.isValidLink(social, link)) {
      return this.sanitizeLink(social, link);
    }
    return undefined;
  };
}
