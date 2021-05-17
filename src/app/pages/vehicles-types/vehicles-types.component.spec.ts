import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesTypesComponent } from './vehicles-types.component';

describe('VehiclesTypesComponent', () => {
  let component: VehiclesTypesComponent;
  let fixture: ComponentFixture<VehiclesTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclesTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
