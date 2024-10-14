import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms'
import { Observable, of } from 'rxjs'
import { catchError, debounceTime, map } from 'rxjs/operators'
import { Country } from '@shared/enum/country'
import { RestService } from '@service/rest.service'
import { DateFormat } from '@interface/date-format'

// Country Validator
export function CountryValidator(countries: Country[]): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl) => (countries.includes(control.value) ? null : {invalidCountry: true})
}

// Username Validator
export function UsernameValidator(restService: RestService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return restService.checkUser(control.value).pipe(
      debounceTime(300),
      map(response => (response.isAvailable ? null : {invalidUsername: true})),
      catchError(() => of(null))
    )
  }
}

// Max Date Validator
export function MaxDateValidator(today: DateFormat): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl) => {
    if (!control.value) return null

    const convertDate = (date: DateFormat): Date => new Date(`${ date.year }-${ date.month }-${ date.day }`)
    const inputDate = convertDate(control.value)
    const compareDate = convertDate(today)

    return inputDate <= compareDate ? null : {invalidDate: true}
  }
}
