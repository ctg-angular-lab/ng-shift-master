import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrPage } from './qr-page';

describe('QrPage', () => {
  let component: QrPage;
  let fixture: ComponentFixture<QrPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
