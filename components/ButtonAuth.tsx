'use client'


import { ROUTE } from "@/type/constant/route"
import { signIn } from "next-auth/react"
import { FaFacebook } from "react-icons/fa6"
import { FcGoogle } from "react-icons/fc"
import AppButton from "./button/AppButton"

const ButtonAuth = () => {
    const onLoginGoogle = async () => {
        sessionStorage.setItem("login", "true");
        await signIn("google", {
            callbackUrl: ROUTE.HOME
        });
    };

    const onLoginFacebook = async () => {
        sessionStorage.setItem("login", "true");
        await signIn("facebook", {
            callbackUrl: ROUTE.HOME
        });
    };

    return (
        <div className="flex flex-col justify-between gap-2.5">
            <AppButton
                iconLeft={<FcGoogle size={20} />}
                text={{ children: "Login with Google" }}
                className="flex items-center justify-center py-3.5 border border-colorGrayLight bg-white rounded-2xl hover:bg-colorGrayLight transition-all font-bold text-sm shadow-md active:scale-95"
                onClick={onLoginGoogle}
            />

            <AppButton
                iconLeft={<FaFacebook size={18} className="text-blue-500" />}
                text={{ children: "Login with Facebook", className: 'text-colorBlack' }}
                className="flex items-center justify-center py-3.5 border border-colorGrayLight bg-white rounded-2xl hover:bg-colorGrayLight transition-all font-bold text-sm shadow-md active:scale-95"
                onClick={onLoginFacebook}
            />
        </div>
    )
}

export default ButtonAuth
