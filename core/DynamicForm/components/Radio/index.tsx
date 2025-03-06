import React, { type FC } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { radioVariants } from '../variants/radio-variants';
// import { ReIcon } from '@/core/ReIcon/ReIcon';

interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'color'>,
    VariantProps<typeof radioVariants> {
  label: string;
}

const Radio: FC<RadioProps> = ({ id, type, color, label, className: classes = '', ...props }) => {
  // const radioId = label.toLocaleLowerCase().replaceAll(" ", "-");

  return (
    <div
      className={`radio-${color || 'default'}  relative inline-block cursor-pointer leading-tight`}
    >
      <label htmlFor={id} className="flex items-center">
        <span className="shrink-0 relative flex h-5 w-5 items-center justify-center overflow-hidden rounded-full border border-muted-300 bg-muted-100 text-white transition-shadow duration-300 dark:border-muted-700 dark:bg-muted-800">
          <input
            id={id}
            type="radio"
            className={`peer absolute top-0 start-0 z-[3] h-full w-full cursor-pointer appearance-none ${classes}`}
            {...props}
          />
          <ReIcon iconName="GoDotFill" className={radioVariants({ color })} />
          <span className="absolute top-0 start-0 z-[1] block h-full  w-full scale-0 rounded-full bg-white transition-transform duration-300 peer-checked:scale-[1.1] peer-checked:rounded-[.35rem] dark:bg-muted-900"></span>
        </span>
        <span className="ms-2 cursor-pointer text-[.9rem] text-muted-400">{label}</span>
      </label>
    </div>
  );
};

export default Radio;
