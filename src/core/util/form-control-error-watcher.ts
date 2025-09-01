import { DestroyRef, inject, WritableSignal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl } from "@angular/forms";

export class FormControlErrorWatcher {
  private readonly control: FormControl;
  private readonly transformers: ErrorWatcherTransformer[];
  private readonly errorSignal: WritableSignal<string | null>;
  private referenceCleaner = inject(DestroyRef);

  constructor(
    control: FormControl,
    transformers: ErrorWatcherTransformer[],
    signal: WritableSignal<string | null>
  ) {
    this.control = control;
    this.transformers = transformers;
    this.errorSignal = signal;
  }

  startWatchFormChanges() {
    this.control.statusChanges
      .pipe(takeUntilDestroyed(this.referenceCleaner))
      .subscribe(() => {
        this.errorSignal.set(this.getErrorMessage());
      });
  }

  private getErrorMessage(): string | null {
    for (const { errorKey, onTransform } of this.transformers) {
      if (this.control.hasError(errorKey)) {
        return onTransform();
      }
    }
    return null;
  }
}

export interface ErrorWatcherTransformer {
  errorKey: string;
  onTransform: () => string;
}

export class FormControlErrorWatcherGroup {
  private readonly group: Record<string, FormControlErrorWatcher>;

  constructor(group: Record<string, FormControlErrorWatcher>) {
    this.group = group;
  }

  startWatchFormChanges() {
    for (const watcher of Object.values(this.group)) {
      watcher.startWatchFormChanges();
    }
  }
}
