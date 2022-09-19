import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Incident, incidentTypeLabel } from 'src/app/core/models';
import { IncidentService } from 'src/app/core/services';
import { PipeDates } from 'src/app/core/utils/dates/pipe-dates';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.css'],
})
export class IncidentDetailsComponent implements OnInit {
  translateType = incidentTypeLabel;
  driversBaseUrl = environment.fleetBaseUrl;
  incident: Incident;
  dateTimeFormat = PipeDates.dateTimeFormat;
  formGroup: FormGroup;

  constructor(
    private incidentSrv: IncidentService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  get solverMessage(): AbstractControl {
    return this.formGroup.get('solverMessage');
  }

  ngOnInit(): void {
    this.resolveData();
    this.createFormGroup();
  }

  resolveData(): void {
    this.route.data.subscribe((data) => {
      this.incident = data.incident;
    });
  }

  solve() {
    this.incidentSrv
      .solve(this.incident.id, { solver_message: this.solverMessage.value })
      .subscribe();
  }

  private createFormGroup(): void {
    this.formGroup = this.fb.group({
      solverMessage: new FormControl({
        value: this.incident.solver_message,
        disabled: this.incident.solved,
      }),
    });
  }
}
