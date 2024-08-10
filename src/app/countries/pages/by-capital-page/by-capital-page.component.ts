import { Component, OnInit } from '@angular/core';
import { ConutriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent implements OnInit{

  public countries: Country[] = [];

  public isLoading: boolean = false;

  public initialValue: string = '';
  
  constructor(
    private serviceCountries: ConutriesService
  ){}

  ngOnInit(): void {
    this.countries = this.serviceCountries.cacheStore.byCapital.countries;
    this.initialValue = this.serviceCountries.cacheStore.byCapital.term;    
  }

  seatchByCapital( term: string){
    this.isLoading = true;

    this.serviceCountries.searchCapital(term)
    .subscribe( countries => {
      this.countries = countries;
      
      this.isLoading = false;
    });

    
  }

}
