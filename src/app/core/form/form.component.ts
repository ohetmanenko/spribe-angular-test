import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core'
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Observable, Subject } from 'rxjs'

import { FormService } from '@service/form.service'
import { CountdownService } from '@service/countdown.service'
import { Country } from '@shared/enum/country'
import { RestService } from '@service/rest.service'
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common'
import { TooltipDirective } from '@directive/tooltip.directive'
import { UserCardComponent } from '@core/form/user-card/user-card.component'
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-form',
  standalone: true,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    DatePipe,
    NgbDatepickerModule,
    UserCardComponent,
    TooltipDirective,
    AsyncPipe
  ]
})
export class FormComponent implements OnInit, OnDestroy {
  form!: FormGroup
  @Input() public maxItems: number = 10
  @Input() public countdownTime: number = 5

  public countries: Country[] = this.formService.countries
  public invalidCount: number = 0
  public countdown$!: Observable<number> | null
  private destroy$ = new Subject<void>()
  private submitInProgress: boolean = false

  constructor(
    private formService: FormService,
    private restService: RestService,
    private countdownService: CountdownService,
    private changeDetector: ChangeDetectorRef
  ) {
  }

  public get users(): FormArray {
    return this.form.get('users') as FormArray
  }

  ngOnInit(): void {
    this.form = this.formService.initializeForm()
    this.addUser()
    this.formService.subscribeToStatusChanges(this.users, this.updateInvalidCount.bind(this), this.destroy$)
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  addUser(): void {
    const userForm = this.formService.createUserForm()
    this.users.push(userForm)
  }

  removeItem(index: number): void {
    if (this.submitInProgress) return
    this.formService.removeUser(this.users, index)
    this.updateInvalidCount()
  }

  handleSubmit(): void {
    if (this.submitInProgress) {
      this.cancelSubmission()
    } else {
      this.startSubmissionCountdown()
    }
  }

  private updateInvalidCount() {
    this.invalidCount = this.formService.countInvalidUsers(this.users)
  }

  private startSubmissionCountdown(): void {
    this.submitInProgress = true
    this.form.disable()
    this.countdown$ = this.countdownService.startCountdown(
      this.countdownTime,
      this.submitAllForms.bind(this),
      this.cancelSubmission.bind(this)
    )
  }

  private cancelSubmission() {
    this.submitInProgress = false
    this.form.enable()
    this.countdown$ = null
  }

  private submitAllForms() {
    this.restService.submitAllForms(this.form.value).subscribe(() => {
      this.formService.resetForm(this.form, this.users)
      this.changeDetector.markForCheck()
      this.cancelSubmission()
    })
  }
}
