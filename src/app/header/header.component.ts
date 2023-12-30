import { Component } from '@angular/core';
import { CurrencyService } from '../service/currency.service';
import { Currency } from '../interface/currency';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private destroy$: Subject<void> = new Subject();
  private currencyCodeL: string[] = ['USD', 'EUR'];
  public currencyInfo!: Currency[];

  public constructor(private currencyService: CurrencyService) {}

  public ngOnInit(): void {
    this.currencyService
      .getCurrency()
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: Currency[]) => {
        this.currencyInfo = value.filter((val) => {
          return this.currencyCodeL.includes(val.CurrencyCodeL);
        });
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
