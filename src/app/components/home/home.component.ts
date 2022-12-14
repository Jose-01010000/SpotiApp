import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent {
  nuevasCanciones: any[] = [];
  loading?: boolean;
  error: boolean;
  mensajeError: string;

  constructor(private spotify: SpotifyService) {
    this.loading = true;
    this.error = false;
    this.mensajeError = '';

    this.spotify.getNewRelease().subscribe(
      (data) => {
        this.nuevasCanciones = data;
        this.loading = false;
      },
      (errorServicio) => {
        this.error = true;
        this.loading = false;
        this.mensajeError = errorServicio.error.error.message;
      }
    );
  }
}
