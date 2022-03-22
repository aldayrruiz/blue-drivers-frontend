import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FleetRouter {
  extras = { replaceUrl: true };

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  async goToHome() {
    const to = `admin`;
    return this.router.navigateByUrl(to, this.extras);
  }

  async goToUsers() {
    const to = `admin/users`;
    return this.router.navigateByUrl(to, this.extras);
  }

  async goToVehicles() {
    const to = `admin/vehicles`;
    return this.router.navigateByUrl(to, this.extras);
  }

  async goToReservations() {
    const to = `admin/reservations`;
    return this.router.navigateByUrl(to, this.extras);
  }

  async goToTickets() {
    const to = `admin/tickets`;
    return this.router.navigateByUrl(to, this.extras);
  }

  async goToInsuranceCompanies() {
    const to = `admin/insurance-companies`;
    return this.router.navigateByUrl(to, this.extras);
  }

  async goToIncidents() {
    const to = `admin/incidents`;
    return this.router.navigateByUrl(to, this.extras);
  }

  async goToGNSS() {
    const to = `admin/positions`;
    return this.router.navigateByUrl(to, this.extras);
  }

  async goToReservationStatistics(id: string) {
    const to = `admin/reservations/statistics/${id}`;
    return this.router.navigateByUrl(to, this.extras);
  }

  async goBack() {
    return this.router.navigate(['..'], { relativeTo: this.route });
  }

  async goToLogin() {
    const to = `/login`;
    this.router.navigateByUrl(to, this.extras);
  }
}
