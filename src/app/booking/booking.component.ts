import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator, phoneValidator } from './booking.validators';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatExpansionPanel } from '@angular/material/expansion';
import { BookingService } from './booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit, AfterViewInit {
  bookingFormGroup: FormGroup;
  @ViewChild('panel') panel!: MatExpansionPanel;
  specialist: String[] = [];
  doctors: String[] = ['Ram', 'Kumar'];
  doctorDetails: { _id: String, firstName: String, specializedIn: String, generalFee: Number }[] = [];
  currentDate: Date = new Date();
  userId: string | null = null;
  defaultTimeSlot: { startTime: String, endTime: String, isBooked?: boolean }[] = [
  ];
  startHour = ((new Date().getHours()) + 1) % 24;
  selectedTabIndex: Number = 0;

  nextDate: Date = new Date(this.currentDate);


  myFilter = (d: Date | null): boolean => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return !d || d >= yesterday;

  };
  slots: { time: String; isAvailable: boolean }[] = [
    {
      time: '9:00AM - 10:00AM',
      isAvailable: true,
    },
    {
      time: '9:00AM - 10:00AM',
      isAvailable: true,
    },
    {
      time: '9:00AM - 10:00AM',
      isAvailable: true,
    },
    {
      time: '9:00AM - 10:00AM',
      isAvailable: false,
    },
    {
      time: '9:00AM - 10:00AM',
      isAvailable: true,
    },
  ];



  constructor(private router: Router, private cdr: ChangeDetectorRef, private snackbar: MatSnackBar, private _dialog: MatDialog, private _formBuilder: FormBuilder, private authService: AuthService, private bookingService: BookingService) {


    this.nextDate.setDate(this.currentDate.getDate() + 1);
    this.bookingFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', [Validators.required, emailValidator]],
      specialist: ['', Validators.required],
      doctorId: ['', Validators.required],
      phone: ['', [Validators.required, phoneValidator]],

      fee: [{ value: 0, disabled: true }, Validators.required]

    })

  }
  ngOnInit(): void {
    this.authService.getUserId().subscribe((id) => {
      this.userId = id;
    })
    this.bookingFormGroup.get("doctorId")?.valueChanges.subscribe((data) => {
      const findDoctor = this.doctorDetails.find(doctor => doctor._id === data);
      if (findDoctor) {
        this.bookingFormGroup.get("fee")?.setValue(findDoctor?.generalFee);


        this.updateTimeSlot(this.currentDate.toISOString().split("T")[0], findDoctor._id);
      }
    })
    this.bookingFormGroup.get('specialist')?.valueChanges.pipe(debounceTime(300)).subscribe((data) => {
      this.bookingService.getDoctorDetails(data).subscribe((details) => {
        details.forEach((information: any) => {
          this.doctorDetails.push(information);
        })
      });

    })

    this.bookingService.getSpecialistDetails().subscribe((data) => {
      data.specializations.forEach((specialist: String) => {
        this.specialist.push(specialist);
      })
    }, (error) => {
      this.snackbar.open("Please try again later", "", {
        duration: 2000
      });
    })
    this.fillDefaultTimeSlot(this.startHour);

  }

  ngAfterViewInit(): void {
    if (this.panel) {
      this.panel.open();
    }
    this.cdr.detectChanges();
  }

  fillDefaultTimeSlot(startHour: number): void {
    const numberOfSlots = 10; // Number of time slots to generate
    let currentHour = startHour;

    for (let i = 0; i < numberOfSlots; i++) {
      const startTime = this.formatTime(currentHour, 0); // Start time of the slot
      const endTime = this.formatTime(currentHour + 1, 0); // End time of the slot

      if (currentHour + 1 === 1) {
        break;
      }
      this.defaultTimeSlot.push({
        startTime: startTime,
        endTime: endTime
      });

      currentHour = (currentHour + 1) % 24; // Wrap around for next day if necessary
    }

  }
  formatTime(hours: number, minutes: number): string {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }


  updateTimeSlot(date: String, id: String): void {

    this.bookingService.getBookedSlots(id, date).subscribe((data) => {
      data.slots.forEach((slot: any) => {
        const findSlot = (this.defaultTimeSlot.find(time => time.startTime === slot));
        if (findSlot) {
          findSlot.isBooked = true;
        }
      })
    })
  }

  formatLocalDateToUTCString(date: any) {
    // Get local time components

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    // Construct ISO string with 'Z' to indicate UTC time
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
  }
  openDialog(index: number): void {
    let startTime: any;
    let endTime: any;
    let date = '';

    if (this.selectedTabIndex === 0) {
      date = this.currentDate.toISOString().split("T")[0];

      // Initialize start and end time
      startTime = new Date(this.currentDate);
      endTime = new Date(this.currentDate);
      // Extract hours from defaultTimeSlot
      const startHour = Number(this.defaultTimeSlot[index].startTime.split(":")[0]);
      const endHour = Number(this.defaultTimeSlot[index].endTime.split(":")[0]);

      // Set hours in local time

      startTime.setHours(startHour)
      startTime.setMinutes(0);
      startTime.setSeconds(0);
      startTime.setMilliseconds(0);

      endTime.setHours(endHour)
      endTime.setMinutes(0);
      endTime.setSeconds(0);
      endTime.setMilliseconds(0);

      // Local time
      // Local time

    }
    else {
      date = this.nextDate.toISOString().split("T")[0];


      // Initialize start and end time
      startTime = new Date(this.nextDate);
      endTime = new Date(this.nextDate);
      // Extract hours from defaultTimeSlot
      const startHour = Number(this.defaultTimeSlot[index].startTime.split(":")[0]);
      const endHour = Number(this.defaultTimeSlot[index].endTime.split(":")[0]);

      // Set hours in local time

      startTime.setHours(startHour)
      startTime.setMinutes(0);
      startTime.setSeconds(0);
      startTime.setMilliseconds(0);

      endTime.setHours(endHour)
      endTime.setMinutes(0);
      endTime.setSeconds(0);
      endTime.setMilliseconds(0);
    }



    const dialog = this._dialog.open(DialogComponent, {
      width: '400px'
    });
    dialog.afterClosed().subscribe((isPaid) => {
      if (isPaid) {
        const bookingInfo = this.bookingFormGroup.value;

        const payload = {
          firstName: bookingInfo.firstName,
          lastName: bookingInfo.lastName,
          gender: bookingInfo.gender,
          age: bookingInfo.age,
          email: bookingInfo.email,
          phone: bookingInfo.phone,
          consultingFee: this.bookingFormGroup.get('fee')?.value,
          bookingDate: date,
          startTime: this.formatLocalDateToUTCString(startTime),
          endTime: this.formatLocalDateToUTCString(endTime)
        };

        this.bookingService.scheduleAppointment(this.userId, bookingInfo.doctorId, payload).subscribe((data) => {
          this.snackbar.open("Slot booked successfully", "", {
            duration: 2000
          });
          this.router.navigate(['/']);
        }, (error) => {
          this.snackbar.open("Please try again later", "", {
            duration: 2000
          });
        })

      }
    })

  }

  onTabChanged(event: any): void {

    this.selectedTabIndex = event;
    let formattedDate = '';
    if (this.selectedTabIndex === 0) {
      formattedDate = this.currentDate.toISOString().split("T")[0];
    }
    else {
      formattedDate = this.nextDate.toISOString().split("T")[0];
    }

    setTimeout(() => {
      this.defaultTimeSlot = [];
      if (event === 0) {


        this.fillDefaultTimeSlot(this.startHour);

      }
      else {

        this.fillDefaultTimeSlot(10);
      }
      this.updateTimeSlot(formattedDate, this.bookingFormGroup.get('doctorId')?.value);
    }, 80)
    // Log the index of the selected tab
    // Perform any additional actions based on the tab change
  }
}
