import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync, validate as validateAsync } from 'class-validator';

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

export async function validate<T extends object>(
  cls: ClassConstructor<T>,
  data: Data<T>,
): Promise<void> {
  const instance = plainToInstance(cls, data);
  const errors = await validateAsync(instance);
  if (errors?.length) {
    throw new Error(
      errors
        .map((error) => Object.values(error.constraints))
        .flat()
        .join(';\n'),
    );
  }
}
