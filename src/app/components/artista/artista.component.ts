import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [],
})
export class ArtistaComponent {
  artist: any = {};
  topTracks: any[] = [];
  loading?: boolean;

  constructor(private route: ActivatedRoute, private spotify: SpotifyService) {
    this.route.params.subscribe((data) => {
      console.log(data['id']);
      this.loading = true;

      this.getArtista(data['id']);
      this.getTopTracks(data['id']);
    });
  }

  getArtista(id: string) {
    this.loading = true;
    this.spotify.getArtista(id).subscribe((data) => {
      // console.log(data);
      this.artist = data;
      this.loading = false;
    });
  }

  getTopTracks(id: string) {
    this.spotify.getTopTracks(id).subscribe((data) => {
      console.log(data);
      this.topTracks = data;
    });
  }
}
