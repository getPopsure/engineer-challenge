import React from "react";

// TODO: Add styling for inputs in invalid state
function useClickOutsideHandler(
  target: React.MutableRefObject<HTMLElement | null>,
  onClickOutside?: () => void
) {
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!target.current?.contains(e.target as HTMLElement)) {
        onClickOutside?.();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [target, onClickOutside]);
}

export type InputCellProps<T = string> = {
  defaultValue: T;
  onEditCancel?: () => void;
  onCommitChanges: (newValue: T) => Promise<void>;
  onEditDone?: () => void;
};

export function TextInputCell({
  defaultValue,
  onEditCancel,
  onEditDone,
  onCommitChanges,
}: InputCellProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  useClickOutsideHandler(inputRef, onEditCancel);

  const handleKeyDown = React.useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      const input = e.target as HTMLInputElement;

      if (e.key === "Enter") {
        if (input.value) {
          input.blur();
          await onCommitChanges(input.value);
          onEditDone?.();
        } else {
          input.setCustomValidity("'Provider' field should not be empty!");
        }
      } else if (e.key === "Escape") {
        onEditCancel?.();
      }
    },
    [onCommitChanges, onEditCancel, onEditDone]
  );

  return (
    <input
      ref={inputRef}
      className="min-w-0 w-full p-0 text-sm"
      type="text"
      defaultValue={defaultValue}
      onKeyDown={handleKeyDown}
      autoFocus
      required
    />
  );
}

export function PeriodInputCell({
  defaultValue,
  onEditCancel,
  onEditDone,
  onCommitChanges,
}: InputCellProps<string[]>) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const fromInputRef = React.useRef<HTMLInputElement | null>(null);
  const toInputRef = React.useRef<HTMLInputElement | null>(null);
  useClickOutsideHandler(containerRef, onEditCancel);

  const handleEditDoneClick = React.useCallback(async () => {
    const fromValue = fromInputRef.current?.value;
    const toValue = toInputRef.current?.value;

    if (!fromValue) {
      return fromInputRef.current?.setCustomValidity(
        "'From' date should not be empty!"
      );
    }

    if (!toValue) {
      return toInputRef.current?.setCustomValidity(
        "'To' date should not be empty!"
      );
    }

    if (fromValue && toValue) {
      if (Date.parse(fromValue) > Date.parse(toValue)) {
        return fromInputRef.current?.setCustomValidity(
          "'From' date cannot be later than 'to' date"
        );
      }

      await onCommitChanges([fromValue, toValue]);
      onEditDone?.();
    }
  }, [onCommitChanges, onEditDone]);

  return (
    <div ref={containerRef} className="flex flex-row gap-4">
      <div className="flex flex-row gap-2">
        <input
          ref={fromInputRef}
          className="min-w-0 max-w-min p-0 text-sm invalid:border-red-500"
          type="date"
          defaultValue={defaultValue[0]}
          autoFocus
          required
        />
        -
        <input
          ref={toInputRef}
          className="min-w-0 max-w-min p-0 text-sm"
          type="date"
          defaultValue={defaultValue[1]}
          required
        />
      </div>

      <div className="flex flex-row gap-2">
        <button onClick={onEditCancel}>❌</button>
        <button onClick={handleEditDoneClick}>✅</button>
      </div>
    </div>
  );
}

export type EditableCellProps<T = string> = {
  entityId: string;
  value: T;
  field: string;
  inputComponent: React.ComponentType<InputCellProps<T>>;
  valueFormatter?: (value: T) => string;
  onCommitChanges: (
    entityId: string,
    field: string,
    newValue: T
  ) => Promise<void>;
};

// TODO: add memoization for this component
export function EditableCell<T>({
  entityId,
  field,
  value,
  inputComponent: InputComponent,
  valueFormatter,
  onCommitChanges,
}: EditableCellProps<T>) {
  const [isEditing, setIsEditing] = React.useState(false);

  const handleSpanClick = React.useCallback(() => setIsEditing(true), []);
  const handleCancelEdit = React.useCallback(() => setIsEditing(false), []);
  const handleCommitChanges = React.useCallback(
    (newValue: T) => onCommitChanges(entityId, field, newValue),
    [entityId, field, onCommitChanges]
  );

  if (isEditing) {
    return (
      <InputComponent
        defaultValue={value}
        onEditCancel={handleCancelEdit}
        onEditDone={handleCancelEdit}
        onCommitChanges={handleCommitChanges}
      />
    );
  }

  return (
    <div className="cursor-pointer" onClick={handleSpanClick}>
      {valueFormatter?.(value) ?? value}
    </div>
  );
}
