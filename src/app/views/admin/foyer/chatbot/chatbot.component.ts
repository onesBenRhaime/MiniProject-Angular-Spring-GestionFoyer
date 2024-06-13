import { Component, HostListener, NgZone } from '@angular/core';
import { ChatService, Message } from 'chat.service';
import { DeepChat } from 'deep-chat';
 

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {

  messages: Message[] = [];
  value: any;
  placeholder: any = '';
  isRecording: boolean = false;
  recognition: any;
  show: boolean = false;
  isButtonDisabled: boolean = false;
  time = new Date();
  sidebarArray: any=[];
  showOverlay: boolean= false;

  image: boolean= false;

  constructor(public chatService: ChatService, private ngZone: NgZone) {
    this.placeholder = 'Type or Record your query'
    this.recognition = new (window as any).webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event: any) => {
      this.ngZone.run(() => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
            console.log('finalTranscript', finalTranscript);
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        this.value = finalTranscript;
      });
    };

    setInterval(() => {
      this.time = new Date()
    }, 1000)
  }

  ngOnInit() {
    this.chatService.conversation.subscribe((val) => {
      this.messages = this.messages.concat(val);
    });


    
    const arrOfNum = [1, 2, 2, 4, 5, 6, 6];
    const arr= new Set(arrOfNum)
    console.log(arr);
    
    
  }
  
  sidebar() {  //Sidebar
    this.show = !this.show
  }

  sendMessage() {
    if (!this.value) {
      alert('question is not iterable')
    }
    else {
      this.chatService.getBotAnswer(this.value);
      this.value = '';
      this.sidebarArray= this.messages;  
      console.log('sendMessage()', this.sidebarArray);
    }
  }

  toggleRecording() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }
  startRecording() {
    this.placeholder = ' Listening...'
    this.isRecording = true;
    this.recognition.start();
  }
  stopRecording() {
    this.placeholder = ' Listening stopped'
    this.isRecording = false;
    this.recognition.stop();
    if (!this.isRecording) {
      setTimeout(() => {
        this.placeholder = 'Type or Record your query'
      }, 1500);
    }

  }

  onRecognitionResult(event: any) {
    const transcript = event.results[event.results.length - 1][0].transcript;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateScreenSize();
  }

  updateScreenSize(): void {
    const width = window.innerWidth;
    if (width < 800) {
      this.showOverlay = true;
    }
    else {
      this.showOverlay = false;
    }
  }




}
