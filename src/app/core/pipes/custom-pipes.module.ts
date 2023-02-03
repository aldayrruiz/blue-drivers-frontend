import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EssentialDatePipe } from './date.pipe';
import { DistanceFromNow } from './distance-from-now.pipe';
import { DurationPipe } from './duration.pipe';
import { EssentialDatetimePipe } from './essential-date.pipe';
import { FromKnotsToKph } from './from-knots-to-kph.pipe';
import { MonthLabel } from './month-label.pipe';
import { NotTooLongPipe } from './not-too-long.pipe';

@NgModule({
  declarations: [
    DurationPipe,
    FromKnotsToKph,
    EssentialDatetimePipe,
    NotTooLongPipe,
    DistanceFromNow,
    MonthLabel,
    EssentialDatePipe,
  ],
  imports: [CommonModule],
  exports: [
    DurationPipe,
    FromKnotsToKph,
    EssentialDatetimePipe,
    NotTooLongPipe,
    DistanceFromNow,
    MonthLabel,
    EssentialDatePipe,
  ],
})
export class CustomPipesModule {}
