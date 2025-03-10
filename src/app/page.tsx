"use client";

import Link from "next/link";
import { DynamicForm, FormData } from "../../core";

const SingUpForm = () => {
  const signUpFormData: FormData = {
    name: 'SignIn',
    grid: 2,
    submit: {
      function: async ({ values, formik, resetForm }) => {
        console.log('values', values);
      }
    },
    items:  [
      {
        index: 1,
        widths: {
          default: '100%',
          greaterThan1440: '100%',
          between890And1440: '100%',
          between600And890: '100%'
        },
        type: 'email',
        id: 'email',
        label: 'Email',
        name: 'email',
        placeholder: 'jenifer.lawrence@cdda.io',
        size: 'md',
        color: 'default',
        shape: 'smooth',
        required: true,
        autoComplete: 'new-password',
        validation: {
          type: 'string',
          validations: {
            matches: {
              regex: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
              message: 'Invalid Email'
            }
          }
        }
      },
      {
        index: 2,
        widths: {
          default: '100%',
          greaterThan1440: '100%',
          between890And1440: '100%',
          between600And890: '100%'
        },
        type: 'password',
        id: 'password',
        label: 'Password',
        name: 'password',
        placeholder: '********',
        size: 'md',
        color: 'default',
        shape: 'smooth',
        autoComplete: 'new-password',
        required: true,
        validation: {
          type: 'string',
          validations: {
            matches: {
              regex: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
              message:
                'Password must contain at least 8 characters, one number, one uppercase letter, and one special character !@#$%^&*'
            }
          }
        }
      },
      {
        index: 3,
        widths: {
          default: '100%',
          greaterThan1440: '100%',
          between890And1440: '100%',
          between600And890: '100%'
        },
        id: 'rememberMe',
        type: 'switch',
        size: 'sm',
        name: 'rememberMe',
        color: 'primary',
        shape: 'smooth',
        label: 'Remember Me',
        supportText: (
          <div className="text-xs leading-5">
            <Link
              href="/forget-password"
              className="font-sans font-medium text-primary-600 underline-offset-4 transition duration-150 ease-in-out hover:text-primary-500 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
        ),
        // @ts-ignore
        labelText: <span className="text-sm">Remember me</span>
      }
    ] as any[]
  };

  return (
    <div>
      <DynamicForm
        formData={signUpFormData}
        // isRealTime
        // setRealTimeValues={(data) => setOnChangeFormData(data)}
      >
        <div className="col-span-full mt-3">
          <button
          
          className="!h-11 w-full uppercase bg-red-400 text-white">
            Sign In
          </button>
        </div>
      </DynamicForm>
    </div>
  );
};

export default SingUpForm;
