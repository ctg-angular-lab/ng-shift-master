import { Component, input } from '@angular/core';

@Component({
  selector: 'app-qr-card',
  standalone: true,
  imports: [],
  templateUrl: './qr-card.html',
  styleUrl: './qr-card.scss',
})
export class QrCard {
  url = input.required<string>()
}
