import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core'

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective implements OnInit {
  @Input('appTooltip') tooltipText: string = ''
  @Input() trigger: boolean = true

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.renderer.setAttribute(this.el.nativeElement, 'data-tooltip', this.tooltipText)
    this.renderer.setAttribute(this.el.nativeElement, 'data-tooltip-trigger', this.trigger ? '!' : '')
    this.renderer.addClass(this.el.nativeElement, 'tooltip-container')
  }
}
