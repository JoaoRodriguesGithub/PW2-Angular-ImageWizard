import { Component, OnInit } from '@angular/core';
import { CardContent } from 'src/models/cardcontent.model';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { UnsplashService } from 'src/services/unsplash.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favourites: CardContent[] = [];

  faEye = faEye;

  constructor(private unsplashService: UnsplashService) { }

  //this will load the favourites array from the service:
  ngOnInit(): void {
    this.favourites = this.unsplashService.favourites;
  }
}
