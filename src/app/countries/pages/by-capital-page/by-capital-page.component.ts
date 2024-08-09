import { Component } from '@angular/core';
import { ConutriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];
  
  constructor(
    private serviceCountries: ConutriesService
  ){}

  seatchByCapital( term: string){
    this.serviceCountries.searchCapital(term)
    .subscribe( countries => this.countries = countries
    );

    
  }

}
