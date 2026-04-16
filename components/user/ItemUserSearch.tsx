import { ROUTE } from "@/types/constant/route";
import { IUser } from "@/types/interaface/user.interface";
import Link from "next/link";
import AppImage from "../image/AppImage";

const ItemUserSearch: React.FC<IUser> = (user) => {
  return (
    <Link href={ROUTE.USER(user.id.toString())} className="w-full">
      <div className="w-full px-4 py-2 flex items-center gap-2 cursor-pointer rounded-lg hover:bg-gray-200">
        <AppImage
          src={user.avatar}
          alt={user.userName}
          classNameContainer="object-cover w-9 h-9"
          className="rounded-full"
        />
        <p className="text-sm text-black font-medium">{user.userName}</p>
      </div>
    </Link>
  );
};

export default ItemUserSearch;
