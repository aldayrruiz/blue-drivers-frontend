import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/core';

@Component({
  selector: 'app-tickets-table',
  templateUrl: './tickets-table.component.html',
  styleUrls: ['./tickets-table.component.css'],
})
export class TicketsTableComponent implements OnInit {
  tickets: Ticket[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.resolve();
  }

  private resolve() {
    console.log('123123');
    this.route.data.subscribe((response) => {
      console.log('123123123123123');
      console.log(response['tickets']);
      this.tickets = response['tickets'];
    });
  }
}
