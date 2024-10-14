import { Injectable } from '@angular/core'
import { Subject, takeUntil } from 'rxjs'
import { Country } from '@enum/country'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CountryValidator, MaxDateValidator, UsernameValidator } from '@shared/utils/custom.validators'
import { RestService } from '@service/rest.service'
import { DateFormat } from '@interface/date-format'

@Injectable({providedIn: 'root'})
export class FormService {
  public countries: Country[] = Object.values(Country)

  constructor(private formBuilder: FormBuilder, private restService: RestService) {
  }

  public get today(): DateFormat {
    const today = new Date()
    return {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    }
  }

  public initializeForm(): FormGroup {
    return this.formBuilder.group({
      users: this.formBuilder.array([])
    })
  }

  public createUserForm(): FormGroup {
    return this.formBuilder.group({
      country: ['', [Validators.required, CountryValidator(this.countries)]],
      username: ['', [Validators.required], [UsernameValidator(this.restService)], {updateOn: 'blur'}],
      birthday: ['', [Validators.required, MaxDateValidator(this.today)]]
    })
  }

  public subscribeToStatusChanges(users: FormArray, updateInvalidCount: () => void, destroy$: Subject<void>): void {
    users.statusChanges.pipe(takeUntil(destroy$)).subscribe(updateInvalidCount)
  }

  public removeUser(users: FormArray, index: number): void {
    users.removeAt(index)
    if (users.length === 0) {
      users.push(this.createUserForm())
    }
  }

  public countInvalidUsers(users: FormArray): number {
    return users.controls.filter(control => control.invalid).length
  }

  public resetForm(form: FormGroup, users: FormArray): void {
    form.reset()
    users.clear()
    users.push(this.createUserForm())
  }
}
