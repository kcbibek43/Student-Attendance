import { Component } from '@angular/core';
import { httpService } from '../SERVICES/http.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private httpService : httpService){
    
  }
}
