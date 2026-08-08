import { useState } from "react";

import Button from "../components/button";
import AuthInput from "../components/authInput";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

import {
    Eye,
    EyeOff
} from "lucide-react";


function Login() {

    const { login } = useAuth();
    const [loginError, setLoginError] =
        useState("");

    const [showPassword, setShowPassword]
        =
        useState(false);

    const navigate = useNavigate();

    const [formData, setFormData]
        =
        useState({

            email: "",
            password: ""

        });



    const handleChange =
        (e: React.ChangeEvent<HTMLInputElement>) => {

            setFormData({

                ...formData,

                [e.target.name]:
                    e.target.value

            });

        };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();
        setLoginError("");

        try {

            const response = await loginUser(formData);

            login(
                response.user,
                response.token
            );

            navigate("/profile");

        } catch (error: any) {
            console.error(
                "Login failed:",
                error
            );

            setLoginError(
                error.response?.data?.message ||
                "Invalid email or password."
            );
        }
    };



    return (

        <div className="
min-h-screen
flex
items-center
justify-center
px-6
">


            <div className="
bg-white
shadow-xl
rounded-3xl
p-8
w-full
max-w-md
">


                <h1 className="
text-3xl
font-bold
text-center
">

                    Welcome Back

                </h1>


                <p className="
text-gray-500
text-center
mt-2
">

                    Login to your SportConnect account

                </p>



                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 mt-8"
                >


                    <AuthInput

                        label="Email"

                        name="email"

                        type="email"

                        value={formData.email}

                        placeholder="example@email.com"

                        onChange={handleChange}

                    />



                    <div className="relative">


                        <AuthInput

                            label="Password"

                            name="password"

                            type={
                                showPassword
                                    ?
                                    "text"
                                    :
                                    "password"
                            }

                            value={formData.password}

                            placeholder="Enter password"

                            onChange={handleChange}

                        />



                        <button

                            type="button"

                            onClick={() => setShowPassword(!showPassword)}

                            className="
absolute
right-4
top-10
text-gray-500
"

                        >

                            {
                                showPassword
                                    ?
                                    <EyeOff size={20} />
                                    :
                                    <Eye size={20} />
                            }

                        </button>


                    </div>


                    {loginError && (
                        <div
                            className="
      rounded-xl
      border
      border-red-200
      bg-red-50
      px-4
      py-3
      text-sm
      text-red-600
    "
                        >
                            {loginError}
                        </div>
                    )}

                    <Button

                        type="submit"

                        className="w-full"

                    >

                        Login

                    </Button>



                </form>

                <p className="mt-6 text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Register
                    </Link>
                </p>


            </div>


        </div>

    );

}


export default Login;