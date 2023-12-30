import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from '../interface/currency';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiUrlCurrency: string =
    'https://bank.gov.ua/NBU_Exchange/exchange?json';

  constructor(private http: HttpClient) {}

  public getCurrency(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.apiUrlCurrency);
  }
}
