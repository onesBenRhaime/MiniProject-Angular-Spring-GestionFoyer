import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private actionCompletedSource = new BehaviorSubject<string[]>([]);

  actionCompleted$ = this.actionCompletedSource.asObservable();

  emitActionCompleted(actionName: string) {
    // Get the current list of actions
    const currentActions = this.actionCompletedSource.value;

    // Add the new action to the list
    const updatedActions = [...currentActions, actionName];

    // Emit the updated list
    this.actionCompletedSource.next(updatedActions);
  }
}