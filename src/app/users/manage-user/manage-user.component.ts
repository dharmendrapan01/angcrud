import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['sn', 'user_name', 'user_email', 'user_password', 'user_photo', 'action'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  total_count:number = 0;

  constructor(
    private api: ApiService,
    private router: Router,
    ){}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.api.getUser().subscribe(
      (res:any) => {
        this.dataSource.data = res.data;
        this.total_count = res.data.length;
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id:any) {
    this.api.deleteUserById(id).subscribe(
      (res:any) => {
        alert('User Deleted Successfully');
        this.getAllUsers();
      }
    )
  }
}
