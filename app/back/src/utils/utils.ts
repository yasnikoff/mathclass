import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export type Data<T> = { [K in keyof T]: T[K] };

export function fromData<T extends object>(
  cls: ClassConstructor<T>,
  data: Data<T>,
): T {
  const instance = plainToInstance(cls, data);
  const errors = validateSync(instance);
  if (errors?.length) {
    throw new Error(`Can't create instance of ${cls.name}.\n Cause: ${errors}`);
  }
  return instance;
}
