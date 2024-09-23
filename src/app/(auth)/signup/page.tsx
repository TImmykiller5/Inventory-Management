"use client";
import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
// import UploadImage from "../components/UploadImage";
import ImageUpload from "@/components/ui/image-upload";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

function Register() {
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const formSchema = z
    .object({
      firstName: z.string().min(1, { message: "First name is required" }),
      lastName: z.string().min(1, { message: "Last name is required" }),
      email: z.string().min(1, { message: "Email is required" }),
      password: z.string().min(1, { message: "Password is required" }).min(8, {
        message: "Password must be at least 8 characters",
      }),
      confirmPassword: z.string(),
      phoneNumber: z
        .string()
        .regex(/^\+?[0-9]{8,}$/, "Invalid phone number format"),
      imageUrl: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  type settingFormValues = z.infer<typeof formSchema>;

  const form = useForm<settingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      imageUrl: "",
    },
  });
  // Register User
   const registerUser = async () => {
    try {
        const response = await axios.post("/api/auth/register", {...form.getValues(), role: "ADMIN"});
        console.log(response);
        if (response.status === 201) {
            sessionStorage.setItem("user", JSON.stringify(response.data.user));
          toast({
            title: "Registration successful",
            description: "You are now logged in.",
            duration: 9000,
          })
          router.push("/login");
        } 
    } catch (error) {
        console.log(error);
        toast({
          title: "Registration failed",
          description: "Something went wrong",
          duration: 9000,
        })
    }
   

  };
  // ------------------

  // Uploading image to cloudinary
  //   const uploadImage = async (image) => {
  //     const data = new FormData();
  //     data.append("file", image);
  //     data.append("upload_preset", "inventoryapp");

  //     await fetch("https://api.cloudinary.com/v1_1/ddhayhptm/image/upload", {
  //       method: "POST",
  //       body: data,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setForm({ ...form, imageUrl: data.url });
  //         alert("Image Successfully Uploaded");
  //       })
  //       .catch((error) => console.log(error));
  //   };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen  items-center place-items-center">
        <div className="w-full max-w-md space-y-8  p-10 rounded-lg">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={"/images/logo.png"}
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Register your account
            </h2>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(registerUser)}>

                <div className="space-y-4">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>First Name</FormLabel>
                        {form.formState.errors.firstName && <FormMessage className="text-xs font-medium text-[#DC2626]">{form.formState.errors.firstName.message}</FormMessage>}
                        <Input
                        type="text"
                        placeholder="First Name"
                        className="input input-bordered w-full max-w-xs"
                        {...field}
                        />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        {form.formState.errors.lastName && <FormMessage className="text-xs font-medium text-[#DC2626]">{form.formState.errors.lastName.message}</FormMessage>}
                        <Input
                        type="text"
                        placeholder="Last Name"
                        className="input input-bordered w-full max-w-xs"
                        {...field}
                        />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        {form.formState.errors.email && <FormMessage className="text-xs font-medium text-[#DC2626]">{form.formState.errors.email.message}</FormMessage>}
                        <Input
                        type="email"
                        placeholder="Email"
                        className="input input-bordered w-full max-w-xs"
                        {...field}
                        />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        {form.formState.errors.phoneNumber && <FormMessage className="text-xs font-medium text-[#DC2626]">{form.formState.errors.phoneNumber.message}</FormMessage>}
                        <Input
                        type="text"
                        placeholder="Phone Number"
                        className="input input-bordered w-full max-w-xs"
                        {...field}
                        />
                    </FormItem>
                    )}
                />
                <FormField
                        control={form.control}
                        name='imageUrl'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Profile Picture</FormLabel>
                                <FormControl>
                                    <ImageUpload value={field.value ? [field.value] : []} disabled={loading} onRemove={() => field.onChange('')} onChange={(url) => field.onChange(url)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        {form.formState.errors.password && <FormMessage className="text-xs font-medium text-[#DC2626]">{form.formState.errors.password.message}</FormMessage>}
                        <div className="relative">
                        <div
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        >
                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </div>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="input input-bordered w-full max-w-xs"
                            {...field}
                        />
                        </div>
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        {form.formState.errors.confirmPassword && <FormMessage className="text-xs font-medium text-[#DC2626]">{form.formState.errors.confirmPassword.message}</FormMessage>}
                        <div className="relative">
                        <div
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        >
                            {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </div>
                        <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            className="input input-bordered w-full max-w-xs"
                            {...field}
                        />
                        </div>
                    </FormItem>
                    )}
                />
                </div>
                <Button className="mt-6" type="submit">Submit</Button>
            </form>
          </Form>
          {/* <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 -space-y-px rounded-md shadow-sm">
              <div className="flex gap-4">
                <input
                  name="firstName"
                  type="text"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleInputChange}
                />
                <input
                  name="lastName"
                  type="text"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  name="phoneNumber"
                  type="number"
                  autoComplete="phoneNumber"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Phone Number"
                  value={form.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <input type="file"  />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  checked
                  required
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  I Agree Terms & Conditons
                </label>
              </div>

              <div className="text-sm">
                <span
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </span>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={registerUser}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                </span>
                Sign up
              </button>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <span
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Already Have an Account, Please
                  <Link href="/login"> Signin now </Link>
                </span>
              </p>
            </div>
          </form> */}
        </div>
        <div className="flex justify-center order-first sm:order-last">
          <img src={"/images/Login.png"} alt="" />
        </div>
      </div>
    </>
  );
}

export default Register;
