import { IMAGE_SOUCE } from "@/public/assets/images";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import AppImage from "../image/AppImage";
interface IAppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: React.HTMLAttributes<HTMLParagraphElement>;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  iconRightStyle?: string;
  buttonDefault?: boolean;
  isLoading?: boolean;
}

const AppButton: React.FC<IAppButtonProps> = ({
  buttonDefault,
  text,
  iconLeft,
  iconRight,
  iconRightStyle,
  isLoading,
  ...props
}) => {
  return (
    <div className="flex items-center group">
      <button
        {...props}
        className={twMerge(
          "w-full flex items-center justify-center gap-2 text-base font-semibold cursor-pointer",
          buttonDefault
            ? "px-0 py-0 bg-transparent rounded-0"
            : "px-[50px] min-h-[55px] bg-blue-500 rounded-[10px]",
          `disabled:bg-gray-300 disabled:text-gray-500`,
          props.className,
        )}
      >
        {isLoading && (
          <AppImage
            src={IMAGE_SOUCE.LOADING}
            alt=""
            classNameContainer="h-[20px] w-[20px]"
            unoptimized
          />
        )}
        {iconLeft && iconLeft}
        {text?.children && (
          <p {...text} className={twMerge("text-black", text.className)}>
            {text?.children}
          </p>
        )}
      </button>
      {iconRight && <div className={iconRightStyle}>{iconRight}</div>}
    </div>
  );
};

export default AppButton;
