import { useState } from "react";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import AuthInput from "../components/authInput";

function Register() {
  const initialForm = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    favouriteSport: "",
    agree: false,
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim())
      newErrors.name = "Full name is required.";

    if (!formData.username.trim())
      newErrors.username = "Username is required.";

    if (!formData.email.trim())
      newErrors.email = "Email is required.";

    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email.";

    if (formData.password.length < 8)
      newErrors.password =
        "Password must be at least 8 characters.";

    if (
      formData.confirmPassword !== formData.password
    )
      newErrors.confirmPassword =
        "Passwords do not match.";

    if (!formData.agree)
      newErrors.agree =
        "Please accept the terms.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      await registerUser({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      alert("Registration Successful!");

      setFormData(initialForm);

      navigate("/login");

    } catch (error: any) {
      console.error(
        "Registration failed:",
        error
      );

      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";

      alert(message);

    } finally {
      setLoading(false);
    }
  };
  const passwordStrength = () => {
    if (formData.password.length === 0)
      return "";

    if (formData.password.length < 6)
      return "Weak";

    if (formData.password.length < 10)
      return "Medium";

    return "Strong";
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 bg-gray-50">

      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-lg">

        <div className="flex flex-col items-center">

          <UserPlus
            size={48}
            className="text-blue-600"
          />

          <h1 className="text-3xl font-bold mt-4">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2 text-center">
            Join SportConnect and discover sports
            events near you.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 mt-8"
        >
          <AuthInput
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="enter your full name"
          />

          <AuthInput
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            placeholder="@aslam"
          />

          <AuthInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="example@email.com"
          />

          <div className="relative">

            <AuthInput
              label="Password"
              type={
                showPassword ? "text" : "password"
              }
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-10"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          <p className="text-sm text-gray-500">
            Password Strength:{" "}
            <span className="font-semibold">
              {passwordStrength()}
            </span>
          </p>

          <div className="relative">

            <AuthInput
              label="Confirm Password"
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-4 top-10"
            >
              {showConfirmPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          <AuthInput
            label="Location (Optional)"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Glasgow"
          />

          <AuthInput
            label="Favourite Sport (Optional)"
            name="favouriteSport"
            value={formData.favouriteSport}
            onChange={handleChange}
            placeholder="Football"
          />

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
              />
              I agree to the Terms &
              Conditions
            </label>

            {errors.agree && (
              <p className="text-red-500 text-sm mt-1">
                {errors.agree}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </Button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;