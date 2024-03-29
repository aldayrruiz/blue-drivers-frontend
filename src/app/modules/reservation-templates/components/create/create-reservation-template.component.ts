import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CreateReservationTemplate } from '@core/models';
import { BlueDriversRouter, ErrorMessageService, ReservationTemplateService, SnackerService } from '@core/services';
import { MyErrorStateMatcher } from '@core/utils/my-error-state-matcher';
import { reservationTitleValidators } from '@core/validators/reservation-template';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-reservation-template',
  templateUrl: './create-reservation-template.component.html',
  styleUrls: ['./create-reservation-template.component.css'],
})
export class CreateReservationTemplateComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  template: FormGroup;
  sending = false;

  constructor(
    private reservationTemplateSrv: ReservationTemplateService,
    private errorMessage: ErrorMessageService,
    private formBuilder: FormBuilder,
    private snackerService: SnackerService,
    private router: BlueDriversRouter
  ) {}

  get title(): FormControl {
    return this.template.get('title') as FormControl;
  }

  ngOnInit(): void {
    this.template = this.formBuilder.group({
      title: ['', reservationTitleValidators],
    });
  }

  create(): void {
    const template = this.getFormData();
    this.sending = true;

    this.reservationTemplateSrv
      .create(template)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe({
        next: async () => {
          this.router.goToReservationTemplates();
          this.snackerService.showSuccessful('Plantilla de reserva creada con éxito');
        },
        error: async (error) => {
          const message = this.errorMessage.get(error);
          this.snackerService.showError(message);
        },
      });
  }

  private getFormData(): CreateReservationTemplate {
    const template = { title: this.title.value };
    return template;
  }
}
