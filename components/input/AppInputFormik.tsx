'use client'
import clsx from "clsx";
import { useField } from "formik";
import React, { InputHTMLAttributes, ReactNode } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    viewExtra?: string;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    classNameContainerText?: string;
}

const AppInputFormik: React.FC<Props> = ({ viewExtra, label, iconLeft, iconRight, classNameContainerText, ...input }) => {
    const [field, meta] = useField(input.name!);

    return (
        <div className={clsx('flex flex-col gap-0.5', viewExtra)}>
            <label className="pl-1 font-medium text-md">{label}</label>
            <div className={clsx(`px-4 py-2.5 rounded-xl flex items-center gap-2 bg-white shadow-sm border border-colorGrayLight
                focus-within:ring-2 focus-within:ring-orange-500/20 transition-all focus-within:border focus-within:border-colorOrange`, classNameContainerText)}>
                {iconLeft}
                <div className="w-full flex justify-between">
                    <input
                        className={clsx("w-full outline-none border-none focus:outline-none focus-visible:outline-none bg-transparent", input.disabled && 'text-colorGray' )}
                        {...field}
                        {...input}
                    />
                    {iconRight}
                </div>
            </div>
            {/* error message */}
            {meta.touched && meta.error && (
                <span className="text-sm text-red-500 pl-1 pt-1">{meta.error}</span>
            )}
        </div>
    )
}

export default AppInputFormik;