import React from 'react'
import img from "../images/Consulting.gif";
import { Link } from 'react-router';
const Login = () => {
 return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#141761]"
      data-theme="synthwave"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden " >
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <div className="mb-4 flex items-center justify-start gap-2">
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
              JobGenius
            </span>
          </div>

          

          <div className="w-full">
            <form >
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Welcome Back</h2>
                  <p className="text-sm opacity-70">
                    Sign in to your account to search jobs
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="hello@example.com"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-full" >
                    
                  
                      Login
                  
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-sm">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-primary hover:underline">
                        Create one
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
                            <img src={img} alt="Language connection illustration" className="w-full h-full rounded-3xl" />

            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold"> Begin your journey!! </h2>
              <p className="opacity-70">
                Find jobs that suits your skill set
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Login
