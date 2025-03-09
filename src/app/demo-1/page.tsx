"use client"
import React from "react";
import { FormData, DynamicForm } from "../../../core";
import Button from "../../../core/DynamicForm/components/Button";

const DemoOne = () => {
  const signUpFormData: FormData = {
    name: "SignUp",
    grid: 2,
    submit: {
      store: "localStorage", // local Storage, session Storage, cookies
      key_name: "name-form",
      // submit form
      // submit form
      function: async ({
        values,
        formik,
        setErrors,
        resetForm,
      }: {
        values: any;
        formik: any;
        schema?: any;
        setErrors: any;
        resetForm: any;
      }) => {},
    },
    items: [
      {
        index: 1,
        widths: {
          default: "100%",
          greaterThan1440: "50%",
          between890And1440: "50%",
          between600And890: "100%",
        },
        type: "text",
        id: "firstName",
        label: "First Name",
        name: "firstName",
        placeholder: "Enter first name",
        size: "md",
        color: "default",
        shape: "smooth",
        autoComplete: "new-password",
        required: true,
        validation: {
          type: "string",
          validations: {},
        },
      },
      {
        index: 2,
        widths: {
          default: "100%",
          greaterThan1440: "50%",
          between890And1440: "50%",
          between600And890: "100%",
        },
        type: "text",
        id: "lastName",
        label: "Last name",
        name: "lastName",
        placeholder: "Enter last name",
        size: "md",
        color: "default",
        shape: "smooth",
        autoComplete: "new-password",
        required: true,
        validation: {
          type: "string",
          validations: {},
        },
      },
      {
        index: 3,
        widths: {
          default: "100%",
          greaterThan1440: "100%",
          between890And1440: "100%",
          between600And890: "100%",
        },
        type: "email",
        id: "email",
        label: "Email",
        name: "email",
        placeholder: "Enter Email",
        size: "md",
        color: "default",
        shape: "smooth",
        autoComplete: "new-password",
        required: true,
        validation: {
          type: "string",
          validations: {
            matches: {
              regex: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
              message: "Invalid Email",
            },
          },
        },
      },
      {
        index: 4,
        widths: {
          default: "100%",
          greaterThan1440: "100%",
          between890And1440: "100%",
          between600And890: "100%",
        },
        type: "checkbox",
        name: "confirm",
        // size: 'md',
        color: "primary",
        shape: "smooth",
        // autoComplete: 'new-password',
        required: true,
        id: "confirm",
        label: (
          <span>
            I here by confirm that I have read and agree to the{" "}
            <span className="text-primary" onClick={() => {}}>
              User agreement.
            </span>
          </span>
        ),
      },
    ],
  };
  return (
    <DynamicForm formData={signUpFormData}>
        <div className="col-span-full mt-3">
          <button
          
          className="!h-11 w-full uppercase bg-blue-400 text-white">
            Sign Up
          </button>
        </div>
    </DynamicForm>
  );
};

export default DemoOne;
