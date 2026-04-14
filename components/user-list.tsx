'use client';

import { ROUTE } from "@/types/constant/route";
import { IUser } from "@/types/interaface/user.interface";
import Link from "next/link";

interface Props {
  data: IUser[]
}

const UserList: React.FC<Props> = ({ data }) => {
  if (data.length === 0) {
    return <p className="text-center text-muted-foreground h-screen w-full flex justify-center items-center">Không có dữ liệu</p>
  }
  // ${selectedUser?.id === user.id ? 'bg-secondary' : '' nếu được chọn
  return (
    <div className="flex-1 overflow-y-auto">
      {data.map((user) => (
        <Link href={ROUTE.MESSAGE.replace('[id]', user.id.toString())}
          className={`w-full p-4 border-b border-border hover:bg-secondary transition text-left }`} >

          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl shrink-0">
                {user.avatar}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-foreground truncate">
                  {user.userName}
                </h3>
                <span className="text-xs text-muted-foreground ml-2">
                  {user.createAt}
                </span>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {user.avatar}
              </p>
            </div>
            {/* {user.unread > 0 && (
              <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold flex-shrink-0">
                {user.unread}
              </div>
            )} */}
          </div>
        </Link>
      ))}
    </div >
  );
}

export default UserList;