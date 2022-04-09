import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DistanceFromNow } from './distance-from-now.pipe';
import { DurationPipe } from './duration.pipe';
import { MediumDatePipe } from './essential-date.pipe';
import { NotTooLongPipe } from './not-too-long.pipe';

@NgModule({
  declarations: [DurationPipe, MediumDatePipe, NotTooLongPipe, DistanceFromNow],
  imports: [CommonModule],
  exports: [DurationPipe, MediumDatePipe, NotTooLongPipe, DistanceFromNow],
})
export class CustomPipesModule {}
