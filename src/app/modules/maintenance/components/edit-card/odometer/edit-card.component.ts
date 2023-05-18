import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OdometerCard, Vehicle } from '@core/models';
import { BlueDriversRouter, ErrorMessageService, MaintenanceService, SnackerService } from '@core/services';
import { MyErrorStateMatcher } from '@core/utils/my-error-state-matcher';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css'],
})
export class EditOdometerCardComponent {
  matcher = new MyErrorStateMatcher();
  vehicle: Vehicle;
  formGroup: FormGroup;
  oldOdometerCard: OdometerCard;

  constructor(
    private maintenanceService: MaintenanceService,
    private errorMessage: ErrorMessageService,
    private appRouter: BlueDriversRouter,
    private formBuilder: FormBuilder,
    private snacker: SnackerService,
    private route: ActivatedRoute
  ) {
    this.resolve();
    this.initOldOdometerCard();
    this.initFormGroup();
  }

  get km_period() {
    return this.formGroup.get('km_period');
  }

  initFormGroup() {
    this.formGroup = this.formBuilder.group({
      km_period: [this.oldOdometerCard?.km_period],
    });
  }

  createOrEdit() {
    const newOdometerCard = this.getOdometerCard();
    if (this.oldOdometerCard?.id) {
      this.editCard(newOdometerCard);
    } else {
      this.createCard(newOdometerCard);
    }
    this.appRouter.goToMaintenanceByVehicle(this.vehicle.id);
  }

  editCard(newData: OdometerCard) {
    this.maintenanceService.updateOdometerCard(newData).subscribe({
      next: () => this.snacker.showSuccessful('Ficha de kilometraje actualizada'),
      error: (error) => {
        const msg = this.errorMessage.get(error);
        this.snacker.showError(msg);
      },
    });
  }

  createCard(odometerCard: OdometerCard) {
    this.maintenanceService.createOdometerCard(odometerCard).subscribe({
      next: () => this.snacker.showSuccessful('Ficha de kilometraje creada'),
      error: (error) => {
        const msg = this.errorMessage.get(error);
        this.snacker.showError(msg);
      },
    });
  }

  goToMaintenanceByVehicle() {
    this.appRouter.goToMaintenanceByVehicle(this.vehicle.id);
  }

  private initOldOdometerCard() {
    this.maintenanceService.getOdometerCard().subscribe({
      next: (odometerCard) => {
        this.oldOdometerCard = odometerCard;
        this.km_period.setValue(this.oldOdometerCard?.km_period);
      },
      error: () => {
        this.km_period.setValue(0);
      },
    });
  }

  private getOdometerCard() {
    return { km_period: this.km_period.value };
  }

  private resolve() {
    this.route.data.subscribe((data) => {
      this.vehicle = data.vehicle;
    });
  }
}
