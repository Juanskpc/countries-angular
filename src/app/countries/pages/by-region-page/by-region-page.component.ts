import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { ConutriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];


  public regions = ['Americas', 'Africa', 'Europe', 'Oceania'];

  public selectedRegion: string = '';
  
  constructor(
    private serviceCountries: ConutriesService
  ){}

  ngOnInit(): void {
    this.countries = this.serviceCountries.cacheStore.byRegion.countries;
    this.selectedRegion = this.serviceCountries.cacheStore.byRegion.term;
  }

  seatchByRegion( region: string){
    this.selectedRegion = region;
    this.serviceCountries.searchRegion(region)
    .subscribe( countries => this.countries = countries
    );

    
  }

}
