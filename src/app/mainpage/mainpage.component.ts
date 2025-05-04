import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent {
  @Output() userType = new EventEmitter<{ isDoctor: boolean }>();

  changeUserType(type: String): void {
    if (type === 'doctor') {
      this.userType.emit({ isDoctor: true });
    }
    else {
      this.userType.emit({ isDoctor: false });
    }
  }
}
