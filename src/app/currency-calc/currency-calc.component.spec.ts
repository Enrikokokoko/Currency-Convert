import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyCalcComponent } from './currency-calc.component';

describe('CurrencyCalcComponent', () => {
  let component: CurrencyCalcComponent;
  let fixture: ComponentFixture<CurrencyCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyCalcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrencyCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
