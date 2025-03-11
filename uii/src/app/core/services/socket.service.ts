import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SOCKET_KEYS } from '../config';
import { CommunicationService } from './communication.service';
import { IDynSrevice, isMockSharedService } from '../config/config';
import { EnvService } from './env.service';
import { io, Socket } from "socket.io-client";
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socketMain:any;
  service: IDynSrevice['service'];
  constructor(private env:EnvService,private injector: Injector, private communicationService:CommunicationService) {
    this.service = this.injector.get<IDynSrevice['service']>(isMockSharedService); 
   }
   
  startChatSession(): void {
    if(this.env.socketEnable){
      let count=0;
      const url = 'ws://localhost:8000';
      this.socketMain = io(url,{path: "/socket.io"}) // /ws/notification/socket.io    
      this.socketMain.connect();
      this.socketMain.on('connect', () => {
        const sessionID = this.socketMain.id; 
        console.log('notify socket sessionid',sessionID) 
      });
      this.socketMain.on("connect_error", (e: any) => {
        count++;
        console.log("count", count);
        if (count == 4) {
          this.socketMain.close();
        }
      });
      // listen for events
      this.getMessages();
    }
  }
  
  getMessages():any{
    this.socketMain.on('chat_response',(data:string)=>{  // simple_response
          this.communicationService.setSocketData({data:data,sessionId:this.socketMain.id});
      })
  }

  sendMessages(data:any):any{
    if(this.env.socketEnable)
      this.socketMain.emit('chat_message',data); // simple_message
  }


    
}
