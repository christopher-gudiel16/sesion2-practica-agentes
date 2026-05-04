import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private menuCtrl: MenuController) {}

  /** Abre/cierra el menú programáticamente si se necesita desde código */
  toggleMenu(): void {
    this.menuCtrl.toggle('main-menu');
  }
}
