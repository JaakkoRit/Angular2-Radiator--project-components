import { Component, OnInit } from '@angular/core';
import { Dashboard, DashboardService } from '../shared/dashboard.service';
import { Router } from '@angular/router';
import { IdentityService } from '../shared/identity.service';

@Component({
  selector: 'radiator-dashboards-manager',
  templateUrl: './dashboards-manager.component.html',
  styleUrls: [ './dashboards-manager.component.scss' ],
  providers: [ DashboardService, IdentityService ]
})
export class DashboardsManagerComponent implements OnInit {

  private columns: Array<number>;
  private columnCount: number;
  private rows: Array<number>;
  private rowCount: number;
  private minRows: number = 3;
  private dashboards: Dashboard[] = [];
  private userIsAuthenticated = this.identityService.isAuthenticated;

  title: string = 'Dashboards Manager';

  constructor(private dashboardService: DashboardService,
              private router: Router,
              private identityService: IdentityService) {}

  ngOnInit() {
    this.identityService.getUserIsAuthenticated().subscribe(userAuthenticated => this.userIsAuthenticated = userAuthenticated);
    this.rowCount = this.minRows;
    this.columnCount = 6;
    this.dashboardService.getAll().subscribe(dashboards => {
      this.dashboards = dashboards;
      while (this.dashboards.length >= this.columnCount * this.rowCount) {
        this.rowCount += 1;
      }
      this.rows = new Array(this.rowCount);
      this.columns = new Array(this.columnCount);
    });
  }

  goToDashboard(id: number) {
    this.router.navigate(['/dashboard', id]);
  }

  deleteDashboard(id: number, event) {
    event.stopPropagation();
    this.dashboardService.remove(id).subscribe(() => this.deleteEmptyRow());
  }

  createDashboard() {
    this.router.navigate(['/dashboard', 'new']);
  }

  private deleteEmptyRow() {
    const difference = this.rowCount * this.columnCount - this.dashboards.length;
    if (difference > this.columnCount - 1 && this.rowCount > this.minRows) {
      this.rowCount -= 1;
    }
  }
}
