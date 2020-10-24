import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/core/services/users';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public displayedColumns: string[] = ['fileName', 'description','firstname','lastname','modifiedDate', 'uploadedDate', 'downloadUrl', 'edit', 'delete' ];
  public dataSource = new MatTableDataSource();
  private subscriptions = new Subscription();
  public email: string;
  public userDetails;
  public showSpinner = false;
   @ViewChild(MatSort, {static: false}) sort: MatSort;
  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) { }

  getUserDetails() {
    this.showSpinner = true;
    this.userService.getUserDetails(this.email).subscribe(data => {
      if(data.success) {
        this.userDetails = data.user;
        sessionStorage.setItem('userDetails',JSON.stringify(this.userDetails));
        this.userService.userDetails.next(true);
        this.dataSource.data = this.userDetails.files;
        this.dataSource.sort = this.sort;
        this.showSpinner = false;
      }
    });
  }

  deleteFile(filename) {
    this.showSpinner = true;
    this.userService.deleteFile(this.email, filename).subscribe(response => {
      this.openSnackBar(response.data.message, 'mat-warn');
      this.getUserDetails();
    })
  }

  openSnackBar(message: string, className: string) {
    this.snackBar.open(message, '', {
      duration: 5000,
      panelClass: ['mat-toolbar', className]
    });
  }

  goToEdit(file) {
    sessionStorage.setItem('file', JSON.stringify(file));
    this.router.navigate(['home/upload',{ name: file.fileName}])
  }
  ngOnInit(): void {
    this.email = sessionStorage.getItem('email');
    this.getUserDetails();
  }

}
