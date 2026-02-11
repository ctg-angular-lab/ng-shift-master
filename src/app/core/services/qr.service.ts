import { Injectable, signal, computed } from '@angular/core';
import { toSignal } from "@angular/core/rxjs-interop";
import { timer, map } from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class QrService {
  private readonly REFRESH_INTERNAL = 60 * 1000;

  private qrSeed$ = timer(0, this.REFRESH_INTERNAL)
    .pipe( map(() => crypto.randomUUID()) )

  readonly qrCodeSeed = toSignal(this.qrSeed$)

  readonly qrDataUrl = computed(() =>
      `https://api.qrserver.com/v1/create-qr-code/?data=${this.qrCodeSeed()}&size=200x200`
  );
}
