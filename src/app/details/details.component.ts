import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CardContent } from 'src/models/cardcontent.model';
import { UnsplashService } from 'src/services/unsplash.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  detailedCard: CardContent;

  detailedImage: { image_id: string };

  favouriteCardStatus: boolean = false;
  favouritesIndex: number;

  constructor(private activatedRoute: ActivatedRoute, private unsplashService: UnsplashService) { }

  //this makes the subscription of details, where takes it looks at images id, and then do the api request with that id:
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.detailedImage = {
          image_id: params['image_id']
        }
        this.unsplashService.getDetails(this.detailedImage.image_id).subscribe(
          (data) => {
            this.detailedCard = data;
          });
        this.favouriteCardVerification();
      });
  }

  // this method looks at the favourites array and then compares if the id is present on the array, 
  // and if it is present it will return one status for the button and the position of the element:
  favouriteCardVerification() {
    for (let index = 0; index < this.unsplashService.favourites.length; index++) {
      if (this.unsplashService.favourites[index].id == this.detailedImage.image_id) {
        this.favouriteCardStatus = true;
        this.favouritesIndex = index;
        return this.favouriteCardStatus, this.favouritesIndex
      } else {
        this.favouriteCardStatus = false;
      }
    }
  }

  //this method will look at the favouriteCardStatus and favouritesIndex and will remove or add the card from favourites array:
  favouritesButton(favouriteCardStatus, favouritesIndex) {
    if (favouriteCardStatus == true) {
      this.unsplashService.revomeFromFavourites(favouritesIndex);
    } else {
      this.unsplashService.addToFavourites(this.detailedCard);
    }
    this.favouriteCardVerification();
  }


}