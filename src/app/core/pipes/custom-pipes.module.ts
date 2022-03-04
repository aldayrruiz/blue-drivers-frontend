import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DurationPipe } from './duration.pipe';
import { MediumDatePipe } from './essential-date.pipe';

@NgModule({
  declarations: [DurationPipe, MediumDatePipe],
  imports: [CommonModule],
  exports: [DurationPipe, MediumDatePipe],
})
export class CustomPipesModule {}
