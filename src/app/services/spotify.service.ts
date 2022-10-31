import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {}

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQBucKnjxInlAMDxbOagP3h3NPtdDtjAUFaTg9ULgW2PdPTAVlkBrYiOkEpRu88kPTgu9rHouQ6j82LkZeQ',
    });

    return this.http.get(url, { headers });
  }

  getNewRelease() {
    // Enviar token a la api de spotify por header
    // const headers = new HttpHeaders({
    //   Authorization:
    //     'Bearer BQDfdhFb29Gc-MMQHEZymv4k0HsHtL-SovGRD5gUShGwM8kQoe2dkhjM3om3A_IAxPN0vP34Ut6P6mBkh4s',
    // });
    return this.getQuery('browse/new-releases?limit=30').pipe(
      map((data: any) => data['albums'].items)
    );
  }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(
      map((data: any) => data.artists.items)
    );
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map((data: any) => data.tracks)
    );
  }
}
