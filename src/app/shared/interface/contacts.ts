type HrefTarget = '_blank' | '_self' | '_parent' | '_top'

export interface Contacts {
  href: string
  icon: string
  target?: HrefTarget
}
