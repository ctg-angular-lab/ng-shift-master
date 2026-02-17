import { Component, Input, ViewChild } from '@angular/core';
import { MATERIAL_MODULES } from '@shared/utils/material-modules';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dash-layout',
  standalone: true,
  imports: [
CommonModule,
    RouterModule,    
    MATERIAL_MODULES,
  ],
  templateUrl: './dash-layout.html',
  styleUrl: './dash-layout.scss',
})
export class DashLayout {
  @Input() pageTitle: string = 'MetroBank Admin';
}
