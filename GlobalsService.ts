export class EncodingService {
  constructor() { }

  encode(value: string): string {
    return btoa(value); // Using simple base64 encoding
  }

  decode(encodedValue: string): string {
    return atob(encodedValue); // Using simple base64 decoding
  }
}