import { Component, inject} from '@angular/core';
import { QrCard } from "@shared/ui/qr-card/qr-card";
import { QrService } from "@services/qr.service";
import { CenteredLayout } from '@shared/ui/layouts/centered-layout/centered-layout';
@Component({
  selector: 'app-qr-page',
  standalone: true,
  imports: [
    QrCard,
    CenteredLayout
  ],
  templateUrl: './qr-page.html',
  styleUrl: './qr-page.scss',
})
export class QrPage {
  public qrService = inject(QrService);
}
