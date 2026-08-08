interface AuthInputProps {

    label: string;

    type?: string;

    name: string;

    value: string;

    placeholder?: string;

    error?: string;

    onChange:
    (e: React.ChangeEvent<HTMLInputElement>) => void;

}


function AuthInput({

    label,
    type="text",
    name,
    value,
    placeholder,
    error,
    onChange

}: AuthInputProps) {


    return (

        <div>


            <label className="font-medium">

                {label}

            </label>


            <input

                type={type}

                name={name}

                value={value}

                placeholder={placeholder}

                onChange={onChange}

                className="
                w-full
                border
                rounded-xl
                px-4
                py-3
                mt-2
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                "

            />


            {
                error && (

                    <p className="
                    text-red-500
                    text-sm
                    mt-1
                    ">

                        {error}

                    </p>

                )
            }


        </div>

    );

}


export default AuthInput;