import { Component } from '@angular/core';

//Bir classın ne işe yaradığını anlattığımız anatasyondur.
@Component({
  selector: 'app-root', //hangi tag ile çağırıldığı.
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rentACar';
}
