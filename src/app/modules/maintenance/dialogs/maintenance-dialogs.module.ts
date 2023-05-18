import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DeleteMaintenanceOperationComponent } from '@modules/maintenance/dialogs/delete-maintenance-operation/dialog.component';
import { DialogMissingMaintenanceCardsComponent } from '@modules/maintenance/dialogs/missing-maintenance-cards/missing-maintenance-cards.component';
import { MyAngularMaterialModule } from '@shared/modules/angular-material.module';

@NgModule({
  declarations: [DeleteMaintenanceOperationComponent, DialogMissingMaintenanceCardsComponent],
  imports: [FormsModule, CommonModule, MyAngularMaterialModule],
  exports: [DeleteMaintenanceOperationComponent, DialogMissingMaintenanceCardsComponent],
})
export class MaintenanceDialogsModule {}
