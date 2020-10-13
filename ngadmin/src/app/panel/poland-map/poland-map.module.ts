import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolandMapRoutingModule } from './poland-map-routing.module';
import { PolandMapComponent } from './poland-map.component';
import { MapViewComponent } from './map-view/map-view.component';
import { MatButtonModule, MatSlideToggleModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatProgressSpinnerModule } from '@angular/material';
import { EditPointComponent } from './edit-point/edit-point.component';
import { EditCloudComponent } from './edit-cloud/edit-cloud.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPointComponent } from './add-point/add-point.component';
import { AddCloudComponent } from './add-cloud/add-cloud.component';
import { ConfirmWindowComponent } from 'src/app/tools/confirm-window/confirm-window.component';

@NgModule({
  declarations: [PolandMapComponent, MapViewComponent, EditPointComponent, EditCloudComponent, AddPointComponent, AddCloudComponent],
  imports: [
    CommonModule,
    PolandMapRoutingModule,
    MatButtonModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    EditCloudComponent,
    EditPointComponent,
    AddPointComponent,
    AddCloudComponent,
    ConfirmWindowComponent
  ]
})
export class PolandMapModule { }
