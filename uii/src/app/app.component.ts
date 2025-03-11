import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./layout/footer/footer.component";
import { NavigationComponent } from './layout/navigation/navigation.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
 user = {
    email: 'abhishek.gawade@ltimindtree.com',
    fullName: 'Abhishek Gawade'
  };
  ngOnInit()
  {
    this.user = {
    email: 'abhishek.gawade@ltimindtree.com',
    fullName: 'Abhishek Gawade'
  };
    localStorage.setItem('userData',this.user.fullName);
  }
  
  title = 'slm-poc-ui';
}
