import {Headers} from './headers';

/**
 * A response from a web request
 */
export class Response<TBody> {
  readonly statusCode: number;
  readonly headers: Headers;
  readonly body: TBody;
  readonly url: string;
  readonly ok: boolean;
  constructor(ok: boolean, statusCode: number, headers: Headers, body: TBody, url: string) {
    if (typeof ok !== 'boolean') {
      throw new TypeError('ok must be a boolean but was ' + (typeof statusCode));
    }
    if (typeof statusCode !== 'number') {
      throw new TypeError('statusCode must be a number but was ' + (typeof statusCode));
    }
    if (headers === null) {
      throw new TypeError('headers cannot be null');
    }
    if (typeof headers !== 'object') {
      throw new TypeError('headers must be an object but was ' + (typeof headers));
    }
    this.ok = ok;
    this.statusCode = statusCode;
    const headersToLowerCase = {};
    for (var key in headers) {
      (headersToLowerCase as any)[key.toLowerCase()] = headers[key];
    }
    this.headers = headersToLowerCase;
    this.body = body;
    this.url = url;
  }
  getBody(encoding: string): string;
  getBody(): TBody;
  getBody(encoding?: string): TBody | string {
    if (this.statusCode >= 300) {
      var err = new Error('Server responded with status code '
                      + this.statusCode + ':\n' + this.body.toString());
      (err as any).ok = this.ok;
      (err as any).statusCode = this.statusCode;
      (err as any).headers = this.headers;
      (err as any).body = this.body;
      (err as any).url = this.url;
      throw err;
    }
    if (!encoding || typeof this.body === 'string') {
      return this.body;
    }
    return (this.body as any).toString(encoding);
  }
}

// export = Response
