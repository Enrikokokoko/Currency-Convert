import { Component } from '@angular/core';
import { Currency } from '../interface/currency';
import { CurrencyService } from '../service/currency.service';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-currency-calc',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './currency-calc.component.html',
  styleUrl: './currency-calc.component.scss',
})
export class CurrencyCalcComponent {
  private destroy$: Subject<void> = new Subject();

  public currencyInfo!: Currency[];
  public firstTransfer: number = 1;
  public secondTransfer: number = 1;
  public firstNumber: number = 100;
  public secondNumber: number = 1;
  public currencyUAH: any = {
    CurrencyCodeL: 'UAH',
    Amount: 1,
  };
  private currencyCodeL: string[] = ['USD', 'EUR', 'JPY', 'GBP'];
  public firstCurrency: string = this.currencyUAH.CurrencyCodeL;
  public secondCurrency: string = this.currencyCodeL[0];

  public constructor(private currencyService: CurrencyService) {}

  public ngOnInit(): void {
    this.currencyService
      .getCurrency()
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: Currency[]) => {
        this.currencyInfo = value.filter((val) => {
          return this.currencyCodeL.includes(val.CurrencyCodeL);
        });
        this.currencyInfo.push(this.currencyUAH);
        this.inputFirstValue(this.firstNumber);
      });
  }

  public firstSelectedCurrency(event: any): void {
    this.firstCurrency = event.target.value;
    this.inputFirstValue(this.firstNumber);
  }

  public secondSelectedCurrency(event: any): void {
    this.secondCurrency = event.target.value;
    this.inputFirstValue(this.firstNumber);
  }

  public inputFirstValue(event: any): void {
    let firstCurrenctValue = this.currencyInfo.find((val) => {
      return val.CurrencyCodeL === this.firstCurrency;
    });
    let secondCurrenctValue = this.currencyInfo.find((val) => {
      return val.CurrencyCodeL === this.secondCurrency;
    });
    if (secondCurrenctValue && firstCurrenctValue) {
      this.firstTransfer =
        Math.round(
          (firstCurrenctValue.Amount / secondCurrenctValue.Amount) * 1000
        ) / 1000;
      this.secondTransfer =
        Math.round(
          (secondCurrenctValue.Amount / firstCurrenctValue.Amount) * 1000
        ) / 1000;
      this.secondNumber =
        Math.round(
          (firstCurrenctValue.Amount / secondCurrenctValue.Amount) * event * 100
        ) / 100;
    }
  }

  public inputSecondValue(event: any): void {
    let firstCurrenctValue = this.currencyInfo.find((val) => {
      return val.CurrencyCodeL === this.firstCurrency;
    });
    let secondCurrenctValue = this.currencyInfo.find((val) => {
      return val.CurrencyCodeL === this.secondCurrency;
    });
    if (secondCurrenctValue && firstCurrenctValue) {
      this.firstNumber =
        Math.round(
          (secondCurrenctValue.Amount / firstCurrenctValue.Amount) * event * 100
        ) / 100;
    }
  }

  public allowedSymbol(event: KeyboardEvent): void {
    const numbers = /[0-9]/;
    if (!numbers.test(event.key)) {
      event.preventDefault();
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
