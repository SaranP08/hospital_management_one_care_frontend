import { Component, OnInit } from '@angular/core';
import { MybookingsService } from './mybookings.service';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.scss']
})
export class MybookingsComponent implements OnInit {
  userId: string | null = null;
  isLoading: boolean = false;
  tableData: {
    doctorName: String,
    gender: String,
    specializedIn: String,
    date: Date,
    startTime: String,
    endTime: String,
    generalFee: Number,
    doctorId: String,
    scheduleId: String,
    slotId: String
  }[] = [];
  dataSource: {
    doctorName: String,
    gender: String,
    specializedIn: String,
    date: Date,
    startTime: String,
    endTime: String,
    generalFee: Number,
    doctorId: String,
    scheduleId: String,
    slotId: String
  }[] = [];
  displayedColumns: string[] = ['sno', 'doctorName', 'gender', 'specializedIn', 'date', 'schedule', 'fee', 'actions'];

  ngOnInit(): void {
    this.authService.getUserId().subscribe((uid) => {
      this.userId = uid;
      this.getBookings();
    })

  }

  getBookings(): void {
    this.isLoading = true;
    this.mybookingsService.getBookings(this.userId).subscribe((data) => {

      this.tableData = [];
      this.dataSource = [];
      data.forEach((info: any) => {
        let updatedData: any = {
          doctorName: info.doctorDetails.firstName,
          gender: info.doctorDetails.gender,
          date: new Date(info.date),
          specializedIn: info.doctorDetails.specializedIn,
          startTime: new Date(info.startTime).getUTCHours(),
          endTime: new Date(info.endTime).getUTCHours(),
          generalFee: info.doctorDetails.generalFee,
          doctorId: info.doctorId,
          scheduleId: info.scheduleId,
          isCancel: true,
          slotId: info.slotId
        };

        if (new Date(updatedData.date).getUTCDate() < new Date().getUTCDate() || (new Date(updatedData.date).getUTCMonth() < new Date().getUTCMonth())) {

          updatedData = {
            ...updatedData,
            isCancel: false
          }
        }

        if (new Date(updatedData.date).getUTCDate() === new Date().getUTCDate() && new Date(updatedData.date).getUTCMonth() === new Date().getUTCMonth()) {

          if (updatedData.startTime < new Date().getHours()) {
            updatedData = {
              ...updatedData,
              isCancel: false
            }

          }

        }

        this.tableData.push(updatedData);
      });
      this.dataSource = this.tableData;
      this.isLoading = false;

    }, (error) => {
      this.isLoading = false;
      this.snackBar.open("Please try again later", "", {
        duration: 2000
      });
    });
  }
  constructor(private mybookingsService: MybookingsService, private authService: AuthService, private snackBar: MatSnackBar) {

  }

  cancelBooking(index: number): void {
    this.isLoading = true;
    let payload: {
      doctorId: String,
      scheduleId: String,
      slotId: String
    } = {
      doctorId: this.tableData[index].doctorId,
      scheduleId: this.tableData[index].scheduleId,
      slotId: this.tableData[index].slotId
    };

    this.mybookingsService.cancelBooking(payload).subscribe((data) => {

      this.dataSource = [];
      this.getBookings();
      this.isLoading = false;
      this.snackBar.open("Cancelled Successfully", "", {
        duration: 2000
      });

    }, (error) => {
      this.isLoading = false;
      this.snackBar.open("Please try again later", "", {
        duration: 2000
      });
    })
  }
}
