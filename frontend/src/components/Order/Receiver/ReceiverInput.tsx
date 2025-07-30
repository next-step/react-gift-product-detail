import type {
  FieldError,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';
import { Input, ItemInput, ReceiverItem } from '@/components/Order/Receiver/Receiver.style.ts';

interface Props<T extends FieldValues, K extends FieldPath<T>> {
  type?: string;
  label: string;
  name: K;
  placeholder?: string;
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T, K>;
  error?: FieldError | null;
}

export default function ReceiverInput<T extends FieldValues, K extends FieldPath<T>>({
  type = 'text',
  label,
  name,
  placeholder,
  register,
  rules,
  error,
}: Props<T, K>) {
  return (
    <ReceiverItem>
      <span>{label}</span>
      <ItemInput>
        <Input
          type={type}
          {...register(name, {
            required: `${label}를 입력해주세요`,
            ...rules,
          })}
          isActive={!!error}
          placeholder={placeholder}
        />
        {error?.message && <p>{error.message}</p>}
      </ItemInput>
    </ReceiverItem>
  );
}
