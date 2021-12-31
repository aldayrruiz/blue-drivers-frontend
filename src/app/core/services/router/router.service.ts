import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CustomRouter {
  extras = { replaceUrl: true };

  constructor(private readonly router: Router) {}

  async goToReservationStatistics(id: string) {
    const to = `admin/reservations/statistics/${id}`;
    return this.router.navigateByUrl(to, this.extras);
  }

  async goBack(route: ActivatedRoute) {
    return this.router.navigate(['..'], { relativeTo: route });
  }

  async goToLogin() {
    const to = `/login`;
    this.router.navigateByUrl(to, this.extras);
  }
}
