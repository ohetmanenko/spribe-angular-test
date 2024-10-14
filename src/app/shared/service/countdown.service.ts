import { Injectable } from '@angular/core'
import { Observable, Subject, timer } from 'rxjs'
import { scan, takeUntil, takeWhile, tap } from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class CountdownService {
  private cancel$ = new Subject<void>()

  startCountdown(
    countdownTime: number,
    onComplete: () => void,
    onCancel: () => void
  ): Observable<number> {
    return timer(0, 1000).pipe(
      takeUntil(this.cancel$),
      scan(ticks => --ticks, countdownTime),
      takeWhile(v => v >= 0),
      tap({
        next: val => !val && onComplete(),
        complete: onCancel
      })
    )
  }

  cancelCountdown(): void {
    this.cancel$.next()
  }
}
