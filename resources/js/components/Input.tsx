import { HiddenIcon } from "@/icons/HiddenIcon";
import type { ReactNode } from "react";

interface InputProps {
    info: string,
    type: string,
    children: ReactNode
}

const Input = ({info, type="text", children} : InputProps) => {
    return(
        <div className="flex flex-col">
            <label htmlFor={info}>{info}</label><br />
            <div className="flex gap-5">
                {children}
                <input className=" placeholder:text-xs placeholder:text-left" id={info} type={type} placeholder={`Enter your ${info}`} />
                {type=="password" && <HiddenIcon />}
            </div>
            <hr />
        </div>
    );
};

export default Input
