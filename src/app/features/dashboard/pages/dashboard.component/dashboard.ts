import { Component } from '@angular/core';
import { DashLayout } from '@shared/ui/layouts/dash-layout/dash-layout';
import { MATERIAL_MODULES } from '@shared/utils/material-modules';

@Component({
  selector: 'app-dashboard',
  standalone: true, 
  imports: [
    MATERIAL_MODULES,
    DashLayout
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
