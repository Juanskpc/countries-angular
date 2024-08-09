import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { ConutriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent {

  public countries: Country[] = [];
  
  constructor(
    private serviceCountries: ConutriesService
  ){}

  seatchByCountry( term: string){
    this.serviceCountries.searchCountry(term)
    .subscribe( countries => this.countries = countries
    );

    
  }

}
