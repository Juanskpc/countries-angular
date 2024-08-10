import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country.interface';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store.interface';

@Injectable({providedIn: 'root'})
export class ConutriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1';

    public cacheStore: CacheStore = {
        byCapital: { term: '', countries: []},
        byCountry: { term: '', countries: []},
        byRegion:  { term: '', countries: []},
    }

    constructor(private httpClient: HttpClient) { 
        this.loadToLocalStorage();
    }

    private saveToLocalStorage(){
        localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
    }
    
    private loadToLocalStorage(){
        if(!localStorage.getItem('cacheStore')) return;
        this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
    }

    private getCountriesRequest(url: string): Observable<Country []>{
        return this.httpClient.get<Country []>(url)
        .pipe(
            catchError(error => of([]))
        );
    }

    searchCountryByAlphaCode(code: string): Observable<Country | null>{
        return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
        .pipe(
            map(countries => countries.length > 0 ? countries[0] : null),
            catchError(() => of(null))
        );
    }

    searchCapital(term: string): Observable<Country[]>{
        const url = `${this.apiUrl}/capital/${term}`
        return this.getCountriesRequest(url)
        .pipe(
            tap( countries => {
                this.cacheStore.byCapital.countries = countries;
                this.cacheStore.byCapital.term = term;
            } ),
            tap( () => this.saveToLocalStorage())
        )
    }

    searchCountry(term: string): Observable<Country[]>{
        const url = `${this.apiUrl}/name/${term}`
        return this.getCountriesRequest(url)
        .pipe(
            tap( countries => {
                this.cacheStore.byCountry.countries = countries;
                this.cacheStore.byCountry.term = term;
            } ),
            tap( () => this.saveToLocalStorage())
        )
    }

    searchRegion(term: string): Observable<Country[]>{
        const url = `${this.apiUrl}/region/${term}`
        return this.getCountriesRequest(url)
        .pipe(
            tap( countries => {
                this.cacheStore.byRegion.countries = countries;
                this.cacheStore.byRegion.term = term;
            } ),
            tap( () => this.saveToLocalStorage())
        )
    }
}