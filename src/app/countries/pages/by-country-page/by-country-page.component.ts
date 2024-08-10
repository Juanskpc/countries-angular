import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { ConutriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];

  public initValue: string = '';
  
  constructor(
    private serviceCountries: ConutriesService
  ){}

  ngOnInit(): void {
    this.countries = this.serviceCountries.cacheStore.byCountry.countries;
    this.initValue = this.serviceCountries.cacheStore.byCountry.term;
  }

  seatchByCountry( term: string){
    this.serviceCountries.searchCountry(term)
    .subscribe( countries => this.countries = countries
    );    
  }

}
