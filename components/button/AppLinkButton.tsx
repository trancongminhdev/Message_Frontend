import Link from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { IMAGE_SOUCE } from "@/public/assets/images";
import AppImage from "../image/AppImage";

interface IAppLinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  text?: React.HTMLAttributes<HTMLParagraphElement>;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  iconRightStyle?: string;
  buttonDefault?: boolean;
  isLoading?: boolean;
}

const AppLinkButton: React.FC<IAppLinkButtonProps> = ({
  href,
  buttonDefault,
  text,
  iconLeft,
  iconRight,
  iconRightStyle,
  isLoading,
  className,
  ...props
}) => {
  return (
    <div className="flex items-center group">
      <Link
        href={href}
        {...props}
        className={twMerge(
          "w-full flex items-center justify-center gap-2 text-base font-semibold cursor-pointer",
          buttonDefault
            ? "px-0 py-0 bg-transparent rounded-0 text-black"
            : "px-[50px] min-h-[55px] bg-colorOrange rounded-[10px] text-white",
          className,
        )}
        aria-disabled={isLoading}
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
        {text?.children && <p {...text}>{text.children}</p>}
      </Link>

      {iconRight && <div className={iconRightStyle}>{iconRight}</div>}
    </div>
  );
};

export default AppLinkButton;
