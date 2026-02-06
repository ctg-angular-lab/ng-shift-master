import { Component, inject} from '@angular/core';
import { QrCard } from "../../../../shared/ui/qr-card/qr-card";
import { QrService } from "../../../../core/services/qr.service";
@Component({
  selector: 'app-qr-page',
  standalone: true,
  imports: [
    QrCard
  ],
  templateUrl: './qr-page.html',
  styleUrl: './qr-page.scss',
})
export class QrPage {
  public qrService = inject(QrService);
}
