import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TwilioServiceService {
  private twilioSid = 'ACb37058d8326513525273f8c599ee5512';
  private twilioToken = 'b802d9437ad78c6aecf6e7a72373b96f';
  private twilioPhoneNumber = '+12017401072';
  constructor(private http: HttpClient) { }

  sendSMS(to: string, body: string) {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${this.twilioSid}/Messages.json`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${this.twilioSid}:${this.twilioToken}`)
    });

    const payload = {
      To: to,
      From: this.twilioPhoneNumber,
      Body: body
    };

    const formData = new URLSearchParams();
    for (const key in payload) {
      formData.set(key, payload[key]);
    }

    return this.http.post(url, formData.toString(), { headers });
  }
}