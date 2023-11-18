import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.scss'
})
export class DynamicPageComponent {

}
