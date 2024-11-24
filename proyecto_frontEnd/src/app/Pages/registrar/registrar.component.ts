import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent,FooterComponent],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export default class RegistrarComponent {
  email: string='';
  password: string='';
  username: string='';


  constructor(private fb: FormBuilder){}


}
