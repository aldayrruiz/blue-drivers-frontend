import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { CreateReservationTemplate } from 'src/app/core/models';
import {
  ErrorMessageService,
  FleetRouter,
  ReservationTemplateService,
  SnackerService,
} from 'src/app/core/services';
import { MyErrorStateMatcher } from 'src/app/core/utils/my-error-state-matcher';
import { titleValidators } from 'src/app/core/validators/reservation-template';

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
    private readonly reservationTemplateSrv: ReservationTemplateService,
    private readonly errorMessage: ErrorMessageService,
    private readonly formBuilder: FormBuilder,
    private readonly snacker: SnackerService,
    private readonly router: FleetRouter
  ) {}

  ngOnInit(): void {
    this.template = this.formBuilder.group({
      title: ['', titleValidators],
    });
  }

  private getFormData(): CreateReservationTemplate {
    const template = { title: this.title.value };
    return template;
  }

  create(): void {
    const template = this.getFormData();
    this.sending = true;

    this.reservationTemplateSrv
      .create(template)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe(
        async () => {
          this.router.goToReservationTemplates();
          this.snacker.showSuccessful('Plantilla de reserva creada con éxito');
        },
        async (error) => {
          const message = this.errorMessage.get(error);
          this.snacker.showError(message);
        }
      );
  }

  get title(): AbstractControl {
    return this.template.get('title');
  }
}
