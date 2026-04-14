import { InputHTMLAttributes } from "react";
import { IoIosSearch } from "react-icons/io";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
}

const InputSearch: React.FC<Props> = (input) => {
    return (
        <div className="relative mb-4">
            <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
                type="text"
                placeholder="Nhập tên ngưởi dùng"
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-full text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                {...input}
            />
        </div>
    )
}

export default InputSearch;