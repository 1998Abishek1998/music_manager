
export class AttachmentKey<T> { // eslint-disable-line
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  static from<T>(key: string) {
    return new AttachmentKey<T>(key);
  }
}

export default class Attachments {
  private map: Record<string, any>;

  constructor() {
    this.map = {};
  }

  get<T>(ak: AttachmentKey<T>): T {
    const value = this.tryGet(ak);
    if (!value) {
      throw new Error('invalid attachment');
    }
    return value;
  }

  tryGet<T>(ak: AttachmentKey<T>): T | undefined {
    if (ak.key in this.map) {
      const value = this.map[ak.key] as T;
      return value;
    }
    return undefined;
  }

  put<T>(ak: AttachmentKey<T>, value: T) {
    this.map[ak.key] = value;
  }
}
