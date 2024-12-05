import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core'
import { AbstractControl } from '@angular/forms'
import { Subscription } from 'rxjs'

@Directive({
  selector: '[appInputError]',
  standalone: true
})
export class InputErrorDirective implements OnInit, OnDestroy {
  @Input('appInputError') control!: AbstractControl
  @Input('appInputErrorMessage') errorMessage: string = 'Invalid input'

  private controlSubscription!: Subscription
  private errorElement: HTMLElement | null = null

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.controlSubscription = this.control.statusChanges.subscribe(() => this.updateView())
    this.updateView()
  }

  ngOnDestroy(): void {
    if (this.controlSubscription) {
      this.controlSubscription.unsubscribe()
    }
    this.removeErrorMessage()
  }

  private updateView(): void {
    if (this.control.invalid && (this.control.dirty || this.control.touched)) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid')
      this.addErrorMessage()
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid')
      this.removeErrorMessage()
    }
  }

  private addErrorMessage(): void {
    if (!this.errorElement) {
      this.errorElement = this.renderer.createElement('div')
      this.renderer.addClass(this.errorElement, 'error-message')
      this.renderer.addClass(this.errorElement, 'text-danger')
      this.renderer.addClass(this.errorElement, 'position-absolute')
      this.renderer.setProperty(this.errorElement, 'innerText', this.errorMessage)
      this.renderer.appendChild(this.el.nativeElement.parentNode, this.errorElement)
    }
  }

  private removeErrorMessage(): void {
    if (this.errorElement) {
      this.renderer.removeChild(this.el.nativeElement.parentNode, this.errorElement)
      this.errorElement = null
    }
  }
}
