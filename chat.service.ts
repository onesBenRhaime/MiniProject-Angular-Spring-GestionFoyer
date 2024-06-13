import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export class Message {
  constructor(public author: string, public content: string, public date: Date) { }
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }
  conversation = new Subject<Message[]>();
  botMessage: any = {
    "msg": "Provided string contain a vowel",
    "Errormsg": "Provided string doesn't contain a vowel"
  }
  getBotAnswer(msg: string) {
    const userMessage = new Message('user', msg, new Date());
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', this.getBotMessage(msg), new Date());
    setTimeout(() => {
      this.conversation.next([botMessage]);
    }, 1500);
  }
  getBotMessage(question: string) {
    console.log('wn form service', question);
    const vowels = 'aeiouAEIOU';
    for (let char of question) {
      if (vowels.includes(char)) {
        return this.botMessage['msg']
      }
    }
    return this.botMessage['Errormsg'];
  }
}