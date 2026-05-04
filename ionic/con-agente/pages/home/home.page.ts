import { Component, OnInit } from '@angular/core';

interface ActividadItem {
  nombre: string;
  accion: string;
  avatar: string;
  estado: string;
  badgeColor: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  actividadReciente: ActividadItem[] = [
    {
      nombre: 'María López',
      accion: 'Creó un nuevo pedido #1042',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      estado: 'Nuevo',
      badgeColor: 'primary',
    },
    {
      nombre: 'Carlos Ruiz',
      accion: 'Actualizó su perfil',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      estado: 'Info',
      badgeColor: 'tertiary',
    },
    {
      nombre: 'Ana Martínez',
      accion: 'Procesó pago de $320',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      estado: 'Pagado',
      badgeColor: 'success',
    },
    {
      nombre: 'Luis Pérez',
      accion: 'Reporte de error en módulo X',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      estado: 'Error',
      badgeColor: 'danger',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
