import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import { CSSProperties } from "react";

interface AppImageProps extends ImageProps {
  styleContainer?: CSSProperties;
  classNameContainer?: string;
}

const AppImage: React.FC<AppImageProps> = ({ classNameContainer, styleContainer, ...props }) => {
  return (
    <div className={clsx("relative", classNameContainer)} style={styleContainer}>
      <Image fill {...props} alt="" />
    </div>
  );
};

export default AppImage;
