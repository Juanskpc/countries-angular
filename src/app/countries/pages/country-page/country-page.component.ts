import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConutriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activateRoute: ActivatedRoute,
    private serviceCountries: ConutriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.serviceCountries.searchCountryByAlphaCode(id))
      )
      .subscribe(country => {
        if (!country) {
          return this.router.navigateByUrl('');
        }

        return this.country = country;
      }

      );
  }

  // searchCountry(code: string){
  //   this.serviceCountries.searchCountryByAlphaCode(code)
  //     .subscribe( country => {
  //       console.log(country);

  //     })
  // }

}
