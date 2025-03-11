import { Component, ElementRef, Injector, Input, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeadset, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { CommunicationService } from '../../core/services';
import { SocketService } from '../../core/services/socket.service';
import { DropdownModule } from 'primeng/dropdown';
import { IDynSrevice, isMockSharedService } from '../../core/config';
import { v4 as uuidv4 } from 'uuid'

@Component({
  selector: 'app-chat-bot',
  imports: [FontAwesomeModule, FormsModule, DropdownModule],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss'
})
export class ChatBotComponent {
  @Input() selectedChatIdFromHistory : any;
  @Input() newChatCreationFlag : any;
  @ViewChild('txtInput') txtInput!: ElementRef;
  @ViewChild('chatboxDetails')   chatbox!: ElementRef;
  items :any = [];
  chatItem ={
    message:'',
    role:'user',
    type:'text',
    session_id: 0,
    llm_id: 0
  };
  icon = {faSend:faPaperPlane, faSystem:faHeadset}
  index: number = 0;
  words: any;
  llmList: any[] | undefined;
  selectedLlm: any | undefined;
  service: IDynSrevice['service'];
  selectedSessionId : any;

  constructor(private communicationService:CommunicationService, private socketService:SocketService,private injector: Injector){
    this.service = this.injector.get<IDynSrevice['service']>(isMockSharedService)
  }
  ngOnInit()
  {
    this.getLlmList();
  }

  ngOnChanges(changes:any):void
  {
    if(changes.selectedChatIdFromHistory && (changes.selectedChatIdFromHistory.currentValue != changes.selectedChatIdFromHistory.previousvalue))
    {
      if(this.selectedChatIdFromHistory!= -1)
      this.loadChatHistory();
    }
    if(changes.newChatCreationFlag && changes.newChatCreationFlag.currentValue)
    {
      this.items = [];
      this.selectedSessionId = null;
    }
  }

  getLlmList()
  {
    this.service.getLLMList().subscribe((data:any)=>{
      this.llmList = data;
      // set default 1st as selected
      if(this.llmList && this.llmList.length>0)
      {
        this.selectedLlm = this.llmList[0];
        this.socketService.startChatSession();
        this.communicationService.getSOcketRecive().subscribe((res: any) => {
        if(res && res.data)
          this.receiveMessages(res.data);
    })
      }
      
    })
  }

  autoGrowTextarea():void {
    if(this.txtInput && this.txtInput.nativeElement)
    this.txtInput.nativeElement.style.height = "5px";
    this.txtInput.nativeElement.style.height = (this.txtInput.nativeElement.scrollHeight) + "px";
    if(this.txtInput.nativeElement.scrollHeight>70)
    {
      this.txtInput.nativeElement.style.overflow = 'auto';
    }else{
      this.txtInput.nativeElement.style.overflow = 'hidden';
    }
}

onUserAction()
{
  // handle case for llm setting and sessionid
  this.chatItem.session_id = this.selectedSessionId ? this.selectedSessionId : uuidv4();
  this.chatItem.llm_id =  this.selectedLlm.id;
  this.items.push({...this.chatItem});
  this.socketService.sendMessages(this.chatItem);
  // lets push one more for loading
  let obj = {
      role:'agent',
      message:"",
      type:'loading',
      session_id: this.selectedSessionId,
      llm_id: this.selectedLlm.id
  }
  this.items.push(obj);
  this.chatItem.message = '';
  setTimeout(() => {
    this.chatbox.nativeElement.scrollTop = this.chatbox.nativeElement.scrollHeight;
   }, 500);
}

receiveMessages(data:any)
{
  // set sessionid and llm id
  this.selectedSessionId = data.session_id;
  let txt = '';
  this.items[this.items.length-1].message = '';
  this.items[this.items.length-1].type = 'text';
  if("error" in data)
  {
     txt = "Unable to fetch response. Please try again later";
  }else{
     txt = data.response;
  }
  this.items[this.items.length-1].message = txt; 
}


loadChatHistory():void
{
  this.service.getChatHistoryDetails(this.selectedChatIdFromHistory).subscribe((res)=>{    
    this.selectedSessionId = this.selectedChatIdFromHistory;
    this.items = res.map((item:any)=> 
    {
      let obj = {type:'text',...item};
      return obj;
    });
  })
}
}
