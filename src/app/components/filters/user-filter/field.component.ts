import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

export interface ObjectField {
  id: string;
  value: string;
}

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
})
export class FieldComponent implements OnInit {
  @Input() objectFields: ObjectField[];
  @Input() placeholder: string;
  @Input() label: string;

  control = new FormControl('');
  filteredOptions: Observable<ObjectField[]>;

  ngOnInit() {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this.filter(name as string) : this.objectFields.slice();
      })
    );
  }

  getValue(): ObjectField {
    return this.control.value;
  }

  displayFn(obj: ObjectField): string {
    return obj && obj.value ? obj.value : '';
  }

  private filter(value: string): ObjectField[] {
    const filterValue = value.toLowerCase();
    return this.objectFields.filter((option) => option.value.toLowerCase().includes(filterValue));
  }
}
