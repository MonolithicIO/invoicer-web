import { FormControl } from "@angular/forms";

import { WritableSignal } from "@angular/core";
import { FormControlErrorWatcher } from "../../../../../../core/util/form-control-error-watcher";

export class RequiredFieldFormField extends FormControlErrorWatcher {
  constructor(
    fieldName: string,
    control: FormControl,
    signal: WritableSignal<string | null>
  ) {
    super(
      control,
      [
        {
          errorKey: "required",
          onTransform: () => `${fieldName} is required`,
        },
      ],
      signal
    );
  }
}
