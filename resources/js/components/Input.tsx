import { HiddenIcon } from "@/icons/HiddenIcon";
import type { ReactNode } from "react";
import React from "react";

interface InputProps {
    id: string,
    label: string,
    type?: string,
    children: ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({id, label, type="text", children, ...props} : InputProps, ref) => {
    return(
        <div className="flex flex-col">
            <label htmlFor={id}>{label}</label><br />
            <div className="flex gap-5">
                {children}
                <input className="placeholder:text-xs placeholder:text-left md:placeholder:text-sm"
                    id={id}
                    type={type}
                    placeholder={`Enter ${label}`}
                    {...props}
                    ref={ref}
                />
                {type=="password" && <HiddenIcon />}
            </div>
            <hr />
        </div>
    );
});

export default Input
