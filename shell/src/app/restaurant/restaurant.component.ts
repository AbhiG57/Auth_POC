import { Component, Injector } from '@angular/core';
import { IDynSrevice, isMockSharedService } from '../core/config';
import { CommunicationService } from '../core/services';
import { SocketService } from '../core/services/socket.service';

@Component({
  selector: 'app-restaurant',
  imports: [],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss'
})
export class RestaurantComponent {
  items:any=[];
  service: IDynSrevice['service'];
  responseMessage:any;
  constructor(private communicationService:CommunicationService, private socketService:SocketService,private injector: Injector){
      this.service = this.injector.get<IDynSrevice['service']>(isMockSharedService)
  }
  ngOnInit()
  {
    this.getDummyData();
    setTimeout(() => {
      // this.getRestaurants();  
    }, 5000);
  }

  getRestaurants()
  {
      this.service.getResturantsData().subscribe((res:any)=>{
       // this.responseMessage = res.message;
      },(err:any)=>{

      })
  }

  getDummyData()
  {
    this.service.getDummyData().subscribe((res:any)=>{
      console.log(res);
      this.responseMessage = res.message;
    },(err:any)=>{

    })
  }
}
