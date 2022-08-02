import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CreateReservationTemplate, ReservationTemplate } from 'src/app/core/models';
import {
  ErrorMessageService,
  FleetRouter,
  ReservationTemplateService,
  SnackerService,
} from 'src/app/core/services';
import { MyErrorStateMatcher } from 'src/app/core/utils/my-error-state-matcher';
import { reservationTitleValidators } from 'src/app/core/validators/reservation-template';

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
    private snacker: SnackerService,
    private route: ActivatedRoute,
    private router: FleetRouter
  ) {}

  ngOnInit(): void {
    this.resolve();
    this.setFormGroup(this.oldTemplateReservation);
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

  async edit() {
    this.sending = true;
    const updatedData = this.getUpdatedData();

    this.reservationTemplateSrv
      .update(this.oldTemplateReservation.id, updatedData)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe(
        async () => {
          this.router.goToReservationTemplates();
          const message = 'Plantilla de reserva editada con éxito';
          this.snacker.showSuccessful(message);
        },
        async (error) => {
          const message = this.errorMessage.get(error);
          this.snacker.showError(message);
        }
      );
  }

  resolve(): void {
    this.route.data.subscribe((response) => {
      this.oldTemplateReservation = response.reservationTemplate;
    });
  }

  get title(): AbstractControl {
    return this.template.get('title');
  }
}
