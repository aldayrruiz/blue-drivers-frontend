import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CreateReservationTemplate, ReservationTemplate } from '@core/models';
import { BlueDriversRouter, ErrorMessageService, ReservationTemplateService, SnackerService } from '@core/services';
import { MyErrorStateMatcher } from '@core/utils/my-error-state-matcher';
import { reservationTitleValidators } from '@core/validators/reservation-template';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-reservation-template',
  templateUrl: './edit-reservation-template.component.html',
  styleUrls: ['./edit-reservation-template.component.css'],
})
export class EditReservationTemplateComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  oldTemplateReservation: ReservationTemplate;
  template: FormGroup;
  sending = false;

  constructor(
    private reservationTemplateSrv: ReservationTemplateService,
    private errorMessage: ErrorMessageService,
    private formBuilder: FormBuilder,
    private snackerService: SnackerService,
    private route: ActivatedRoute,
    private router: BlueDriversRouter
  ) {}

  get title(): FormControl {
    return this.template.get('title') as FormControl;
  }

  ngOnInit(): void {
    this.resolve();
    this.setFormGroup(this.oldTemplateReservation);
  }

  async edit() {
    this.sending = true;
    const updatedData = this.getUpdatedData();

    this.reservationTemplateSrv
      .update(this.oldTemplateReservation.id, updatedData)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe({
        next: async () => {
          this.router.goToReservationTemplates();
          const message = 'Plantilla de reserva editada con éxito';
          this.snackerService.showSuccessful(message);
        },
        error: async (error) => {
          const message = this.errorMessage.get(error);
          this.snackerService.showError(message);
        },
      });
  }

  private setFormGroup(template: ReservationTemplate) {
    this.template = this.formBuilder.group({
      title: [template.title, reservationTitleValidators],
    });
  }

  private getUpdatedData(): CreateReservationTemplate {
    const updatedData = {
      title: this.title.value,
    };
    return updatedData;
  }

  private resolve(): void {
    this.route.data.subscribe((response) => {
      this.oldTemplateReservation = response.reservationTemplate;
    });
  }
}
