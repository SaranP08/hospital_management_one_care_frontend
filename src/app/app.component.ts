import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'musicplayer';

  isDoctor: boolean = false;
  isPatient: boolean = false;

  changeUserType(data: { isDoctor: boolean }): void {
    if (data.isDoctor) {
      this.isDoctor = true;
      this.isPatient = false;
    }
    else {
      this.isDoctor = false;
      this.isPatient = true;
    }
  }
}
