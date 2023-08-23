import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

type User = {
  branch: number;
  branchName: string;
  customerId: number;
  customerName: string;
  id: number;
  request: number;
  requestName: string;
  state: number;
  stateName: string;
  tellerId: number | null;
  tellerName: string | null;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'encounter';

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  dataSource!: User[];

  api = 'http://localhost:8080/request-business/customer?branch=1&state=0';
  details = 'http://localhost:8080/request-business/details';
  set = 'http://localhost:8080/request-business/set';

  ngOnInit() {
    this.fetchAPI();
    setInterval(() => {
      this.fetchAPI();
    }, 3000);
  }

  fetchAPI() {
    this.http.get(this.api).subscribe((res: any) => (this.dataSource = res));
  }

  rowClick(request: User) {
    this.http.post(this.details, request).subscribe((res: any) => {});

    const dialogRef = this.dialog.open(DialogComponent, {
      data: request,
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   const data = { id: request.id, state: 0 };
    //   if (result)
    //     this.http.post(this.set, data).subscribe(() => this.fetchAPI());
    // });
  }
}
