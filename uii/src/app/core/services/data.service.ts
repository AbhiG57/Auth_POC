import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, retry } from 'rxjs';
import { ApiService } from './api.service';
import { EnvService } from './env.service';
import { StorageService } from './storage.service';
import { configuration } from '../config';
import { OAuthService } from 'angular-oauth2-oidc';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private apiService: ApiService,private  env: EnvService,
    private storageService: StorageService, private oauthService:OAuthService) {
   }

   getChatHistoryTitles():Observable<any>
   {

     return of([{
      "title":"This is the 1st chat",
      "session_id":1
    },
    {
      "title":"This is the 2nd chat",
      "session_id":2
    },
    {
      "title":"This is the 3rd chat",
      "session_id":3
    },
    {
      "title":"This is the 4th chat",
      "session_id":4
    }]);
    // return  this.apiService.get(`${this.env.apiUrl}${configuration.GET_CHAT_HISTORY_TITLES}`);  
   }

   getChatHistoryDetails(id:any):Observable<any>
   { 
    return of([
      {
          "message": "hi",
          "role": "user",
          "timestamp": "2025-02-12T09:45:34.974943"
      },
      {
          "message": " Hello! I'm Marco, your food assistant. To help you find the perfect meal, could you please tell me your budget for this outing in rupees? Keep in mind that I can only work with whole numbers. For example, if it's 700 rupees, just say \"700\".",
          "role": "agent",
          "timestamp": "2025-02-12T09:45:34.974943"
      },
      {
          "message": "1000\n",
          "role": "user",
          "timestamp": "2025-02-12T09:46:28.628570"
      },
      {
          "message": "1000\n\n\nThanks! Now, let me find you some delicious options within your budget. Here are a few suggestions:\n\n1. Veggie Thali (Rs. 250) - A traditional Indian meal consisting of various vegetarian dishes served on a large platter.\n2. Chicken Biryani (Rs. 300) - A popular rice dish made with aromatic basmati rice, chicken, and an array of spices.\n3. Paneer Tikka Masala (Rs. 250) - A creamy tomato-based curry made with paneer (Indian cheese) and a variety of spices.\n4. Veg Manchurian (Rs. 200) - A popular Chinese dish made with vegetables coated in a spicy, tangy sauce.\n5. Masala Dosa (Rs. 100) - A crispy, savory pancake filled with a spiced potato filling.\n6. Samosa (Rs. 50) - A fried or baked pastry with a savory filling, typically made with potatoes, peas, and spices.\n7. Mango Lassi (Rs. 150) - A refreshing yogurt-based drink blended with ripe mangoes and sweetened with sugar.\n8. Gulab Jamun (Rs. 100) - Soft, round balls of milk solids soaked in a sugary syrup flavored with cardamom and rose water.\n9. Butter Chicken (Rs. 350) - A rich and creamy chicken dish made with tender pieces of chicken cooked in a tomato-based sauce with butter and cream.\n10. Palak Paneer (Rs. 250) - A creamy spinach-based curry made with paneer (Indian cheese).\n\nEnjoy your meal! Let me know if you need any more suggestions or have any dietary restrictions.",
          "role": "agent",
          "timestamp": "2025-02-12T09:46:28.628570"
      }
  ]
    )
     // return  this.apiService.get(`${this.env.apiUrl}${configuration.GET_CHAT_HISTORY_DETAILS}/${id}`);  
   }

   getLLMList():Observable<any>{
     return of([
      {
        "id": 1, 
        "name": "Model 1", 
        "base_url": "", 
        "model_name": "Model 1"
      },
      {
        "id": 2, 
        "name": "Model 2", 
        "base_url": "", 
        "model_name": "Model 2"
      },
      {
        "id": 3, 
        "name": "Model 3", 
        "base_url": "", 
        "model_name": "Model 3"
      }
    ])
    // return  this.apiService.get(`${this.env.apiUrl}${configuration.GET_LLM_MODELS}`);  
   }
   getResturantsData():Observable<any>
   {
    let headers = {
      'Authorization':`Bearer ${this.oauthService.getAccessToken()}`
    }
    return  this.apiService.get(`https://kong-73ce601a2ein4bp8d.kongcloud.dev/my_restaurants`,headers);
   }
   getDummyData():Observable<any>
  {
    return this.apiService.get(`${this.env.apiUrl}data`);
  }
 }
