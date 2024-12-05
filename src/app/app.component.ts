import { Component } from '@angular/core'
import { Contacts } from '@interface/contacts'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  contacts: Contacts[] = [
    {
      target: '_blank',
      href: 'https://www.linkedin.com/in/ohetmanenko/',
      icon: 'bi bi-linkedin'
    },
    {
      target: '_blank',
      href:'mailto:oleksii.hetmanenko@gmail.com',
      icon: 'bi bi-envelope-at'
    },
    {
      target: '_blank',
      href: 'tel:+380964884400',
      icon: 'bi bi-phone'
    }
  ]
}
