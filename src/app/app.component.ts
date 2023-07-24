import { Component } from '@angular/core';
import { AppApiService } from './app-api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  providers: [AppApiService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  decision: string = '';
  approvedAmount: number = 0;
  approvedPeriod: number = 0;

  public form: FormGroup;
  constructor(private service: AppApiService) {
    this.form = new FormGroup({
      period: new FormControl('', [Validators.required, Validators.min(12), Validators.max(60)]),
      amount: new FormControl('', [Validators.required, Validators.min(2000), Validators.max(10000)])
    })
  }

  public submit() {
    if (!this.form.valid) return;

    this.service.calcScore(this.form.value).subscribe((data) => {
      this.form.reset();
      this.decision = data.decision;
      this.approvedAmount = data.amount;
      this.approvedPeriod = data.period;
    })
  }
}
