import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CleaningCard, Vehicle } from '@core/models';
import { BlueDriversRouter, ErrorMessageService, MaintenanceService, SnackerService } from '@core/services';
import { MyErrorStateMatcher } from '@core/utils/my-error-state-matcher';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css'],
})
export class EditCleaningCardComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  vehicle: Vehicle;
  formGroup: FormGroup;
  datePeriod = 'PT0S';
  cleaningCardInvalid = false;

  constructor(
    private maintenanceService: MaintenanceService,
    private errorMessage: ErrorMessageService,
    private appRouter: BlueDriversRouter,
    private formBuilder: FormBuilder,
    private snackerService: SnackerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.resolve();
    this.initData();
  }

  createOrEdit() {
    const newCleaningCard = this.getCleaningCard();
    const oldCleaningCard = this.vehicle.cleaning_card;
    if (oldCleaningCard) {
      this.editCard(oldCleaningCard.id, newCleaningCard);
    } else {
      this.createCard(newCleaningCard);
    }
    this.appRouter.goToMaintenanceByVehicle(this.vehicle.id);
  }

  editCard(cleaningCardId: string, newData: CleaningCard) {
    this.maintenanceService.updateCleaningCard(cleaningCardId, newData).subscribe({
      next: () => this.snackerService.showSuccessful('Ficha de limpieza actualizada'),
      error: (error) => {
        const msg = this.errorMessage.get(error);
        this.snackerService.showError(msg);
      },
    });
  }

  createCard(cleaningCard: CleaningCard) {
    this.maintenanceService.createCleaningCard(cleaningCard).subscribe({
      next: () => this.snackerService.showSuccessful('Ficha de limpieza creada'),
      error: (error) => {
        const msg = this.errorMessage.get(error);
        this.snackerService.showError(msg);
      },
    });
  }

  goToMaintenanceByVehicle() {
    this.appRouter.goToMaintenanceByVehicle(this.vehicle.id);
  }

  valueChange() {
    if (this.datePeriod === 'PT0S' || this.datePeriod === '') {
      this.cleaningCardInvalid = true;
    } else {
      this.cleaningCardInvalid = false;
    }
  }

  private getCleaningCard(): CleaningCard {
    return {
      vehicle: this.vehicle.id,
      date_period: this.datePeriod,
    };
  }

  private resolve(): void {
    this.route.data.subscribe((response) => {
      this.vehicle = response.vehicle;
    });
  }

  private initData() {
    this.datePeriod = this.vehicle.cleaning_card?.date_period;
    this.valueChange();
  }
}
