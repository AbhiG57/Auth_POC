import { Component } from '@angular/core';
import { SideChatSectionComponent } from '../side-chat-section/side-chat-section.component';
import { ChatBotComponent } from '../chat-bot/chat-bot.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-dashboard',
  imports: [SideChatSectionComponent,ChatBotComponent,FormsModule, DropdownModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  selectedChatId : any;
  newChatCreationFlag = false;
  selectedChatIdEvent(id:any):void
  {
    this.selectedChatId = id;
  }
  newChatCreated(flag:any):any
  {
      this.newChatCreationFlag = flag;
  }
}
