import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.scss'
})
export class BasicPageComponent {

}
