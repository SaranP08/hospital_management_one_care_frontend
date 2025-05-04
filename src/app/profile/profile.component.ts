import { Component, OnInit } from '@angular/core';
import { Profile, State } from '../types/common-type';
import { ProfileService } from './profile.service';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAddressDialogComponent } from './delete-address-dialog/delete-address-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // Sample data for Profile
  userId: string | null = null;
  isEditPersonalInfo: boolean = false;
  isEditAddressInfo: boolean = false;
  isAddAddress: boolean = false;
  personalInfo: FormGroup;
  addressInfo: FormGroup;

  editingAddress: String = '';
  states: State[] = [];
  districts: { name: String }[] = [];
  information!: Profile;
  constructor(private _profileService: ProfileService, private _authService: AuthService, private _formBuilder: FormBuilder, private snackbar: MatSnackBar, private _dialog: MatDialog) {
    this.personalInfo = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(1)]]
    });

    this.addressInfo = this._formBuilder.group({
      name: ['', [Validators.required]],
      houseNo: ['', [Validators.required]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.maxLength(6)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      landmark: ['']

    })
  }
  ngOnInit(): void {
    this.addressInfo.get('state')?.valueChanges.subscribe((data) => {
      this._profileService.getCities(data).subscribe((cities) => {
        this.districts = cities;
      })
    });
    this._profileService.getStates().subscribe((data) => {
      this.states = data;

    });

    this._authService.getUserId().subscribe((data) => {
      this.userId = data;
      this._profileService.getProfile(this.userId).subscribe((data) => {

        this.information = data.patientInfo;

      });

    })


  }

  editPersonalInfo(): void {
    this.isEditPersonalInfo = true;
    if (this.information) {
      this.personalInfo.get('firstName')?.setValue(this.information.firstName);
      this.personalInfo.get('lastName')?.setValue(this.information.lastName);
      this.personalInfo.get('gender')?.setValue(this.information.gender);
      this.personalInfo.get('age')?.setValue(this.information.age);

    }
  }

  savePersonalInfo(): void {
    if (this.personalInfo.valid) {
      const personalData = this.personalInfo.value;
      const payload = {
        firstName: personalData.firstName,
        lastName: personalData.lastName,
        gender: personalData.gender,
        age: personalData.age
      };
      this._profileService.editPersonalInfo(this.userId, payload).subscribe((data) => {
        this.isEditPersonalInfo = false;
        this.snackbar.open("Added Successfully", "Dismiss", {
          duration: 2000
        });
        this.refreshProfile();

      }, (error) => {

      })
    }
  }

  editAddressInfo(index: number): void {
    this.isEditAddressInfo = true;
    const address = this.information.address[index];
    this.editingAddress = address._id;
    if (this.information) {
      this.addressInfo.get('name')?.setValue(address.name);
      this.addressInfo.get('houseNo')?.setValue(address.houseNo);
      this.addressInfo.get('street')?.setValue(address.street);
      this.addressInfo.get('city')?.setValue(address.city);
      this.addressInfo.get('state')?.setValue(address.state);
      this.addressInfo.get('pincode')?.setValue(address.pincode);
      this.addressInfo.get('phone')?.setValue(address.phone);
      this.addressInfo.get('landmark')?.setValue(address.landmark ?? '');
    }

  }

  addAddress(): void {
    if (this.addressInfo.valid) {
      const payload = this.addressInfo.value;
      this._profileService.addAddress(this.userId, payload).subscribe((data) => {
        this.snackbar.open("Added Successfully", "Dismiss", {
          duration: 2000
        });
        this.refreshProfile();
        this.isAddAddress = false;
        this.addressInfo.reset();
      }, (error) => {
        console.log(error);
      })
    }
  }

  deleteAddress(index: number): void {
    const address = this.information.address[index];
    const dialog = this._dialog.open(DeleteAddressDialogComponent, {
      width: '600px',
      minHeight: '180px'
    }
    );

    dialog.afterClosed().subscribe((isDelete) => {
      if (isDelete) {
        this._profileService.deleteAddress(this.userId, address._id).subscribe((data) => {
          this.snackbar.open("Deleted Successfully", "Dismiss", {
            duration: 2000
          });
          this.refreshProfile();
        }, (error) => {
          console.log(error);
        });
      }
    })
  }

  updateAddress(): void {
    if (this.editingAddress !== '' && this.addressInfo.valid) {
      this._profileService.updateAddress(this.userId, this.editingAddress, this.addressInfo.value).subscribe((data) => {
        this.refreshProfile();
        this.editingAddress = '';
        this.isEditAddressInfo = false;
        this.addressInfo.reset();
        this.snackbar.open("Updated Successfully", "Dismiss", {
          duration: 2000
        });
      }, (error) => {
        console.log(error);
      })
    }


  }


  refreshProfile(): void {
    this._profileService.getProfile(this.userId).subscribe((data) => {

      this.information = data.patientInfo;

    });
  }


  cancelPersonalInfo(): void {
    this.isEditPersonalInfo = false;
  }
  cancel(): void {
    this.isEditAddressInfo = false;
    this.isAddAddress = false;
  }
}
