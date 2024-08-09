import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { ConutriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent {

  public countries: Country[] = [];
  
  constructor(
    private serviceCountries: ConutriesService
  ){}

  seatchByRegion( term: string){
    this.serviceCountries.searchRegion(term)
    .subscribe( countries => this.countries = countries
    );

    
  }

}
