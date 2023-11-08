export const Button = ({text} : {text : string}) => {
    return(
        <div className="flex justify-center">
            <button className="rounded-full text-white bg-red-600 shadow-lg px-16 py-2">{text}</button>
        </div>
    );
}
