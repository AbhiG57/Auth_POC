import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencilSquare, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { IDynSrevice, isMockSharedService } from '../../core/config/config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-chat-section',
  imports: [FontAwesomeModule,CommonModule],
  templateUrl: './side-chat-section.component.html',
  styleUrl: './side-chat-section.component.scss'
})
export class SideChatSectionComponent {
  icons = {faEdit:faPenToSquare};
  chatHistoryTitles :any = [];
  service: IDynSrevice['service'];
  selectedChatIdValue :any;
  @Output() selectedChatId = new EventEmitter();
  @Output() newChatCreatedEvent = new EventEmitter();

  constructor(private injector: Injector)
  {
    this.service = this.injector.get<IDynSrevice['service']>(isMockSharedService)
  }
  ngOnInit()
  {
    this.chatHistoryTitles = [];
    this.getChatHistoryTitles();
  }

  getChatHistoryTitles()
  {
   this.service.getChatHistoryTitles().subscribe((data)=>{
    this.chatHistoryTitles = data;
   })    
  }

  chatTitleSelected(item:any)
  {
    this.selectedChatIdValue = item.session_id;
    this.selectedChatId.emit(item.session_id);
    this.newChatCreatedEvent.emit(false);
  }

  newChatCreated()
  {
    this.selectedChatIdValue = null;
    this.selectedChatId.emit(-1);
    this.newChatCreatedEvent.emit(true);
  }
}
