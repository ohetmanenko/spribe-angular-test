import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { AbstractControl, ReactiveFormsModule } from '@angular/forms'
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap'
import { NgForOf, NgIf } from '@angular/common'
import { InputErrorDirective } from '@directive/input-error.directive'
import { TooltipDirective } from '@directive/tooltip.directive'
import { FormService } from '@service/form.service'

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    NgbInputDatepicker,
    InputErrorDirective,
    TooltipDirective
  ]
})
export class UserCardComponent {
  @Input() userForm!: any
  @Output() remove: EventEmitter<void> = new EventEmitter()

  constructor(public formService: FormService) {
  }

  get countryControl(): AbstractControl {
    return this.userForm.get('country') as AbstractControl
  }

  get usernameControl(): AbstractControl {
    return this.userForm.get('username') as AbstractControl
  }

  get birthdayControl(): AbstractControl {
    return this.userForm.get('birthday') as AbstractControl
  }
}
