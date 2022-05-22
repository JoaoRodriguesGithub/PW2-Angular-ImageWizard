import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SearchComponent } from './navbar/search/search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:searchKeyword', component: SearchComponent },
  { path: 'images/:image_id', component: DetailsComponent },
  { path: 'favourites', component: FavoritesComponent },
  { path: 'not-found', component: NotfoundComponent },
  { path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
