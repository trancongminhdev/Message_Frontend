import { IUser } from "@/types/interaface/user.interface";
import Image from "next/image";

const ItemUserSearch: React.FC<IUser> = (user) => {
    return (
        <div className="flex items-center gap-2">
            <Image src={user.avatar} alt={'user.userName'} width={40} height={40} className="rounded-full bg-blue-400" />
            <p className="text-sm font-medium">{user.userName}</p>
        </div>
    );
};

export default ItemUserSearch;