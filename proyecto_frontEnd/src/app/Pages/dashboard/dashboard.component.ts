import { Component} from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {


}