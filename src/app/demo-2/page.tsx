"use client";
import React, { useRef } from "react";
import { DynamicForm, FormData } from "../../../core";
import Button from "../../../core/DynamicForm/components/Button";

const PageTwo = () => {
  const signRef = useRef(null);
  const spouseSignatureRef = useRef(null);
  const setNewPasswordData: FormData = {
    name: "SetNewPassword",
    grid: 2,
    submit: {
      store: "localStorage", // local Storage, session Storage, cookies
      key_name: "name-form",
      endPoint: "/name-form",
      method: "UPDATE", // INSERT, UPSERT, DELETE, UPDATE
      function: async ({ values, formik, resetForm }) => {
        alert(JSON.stringify(values, null, 2));
      },
    },
    items: [
      {
        index: 1,
        widths: {
          default: "100%",
          greaterThan1440: "100%",
          between890And1440: "100%",
          between600And890: "100%",
        },
        type: "password",
        id: "newPassword",
        label: "Password",
        name: "newPassword",
        placeholder: "********",
        size: "md",
        color: "default",
        shape: "smooth",
        autoComplete: "new-password",
        required: true,
        validation: {
          type: "string",
          validations: {
            matches: {
              regex:
                /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
              message:
                "Password must contain at least 8 characters, one number, one uppercase letter, and one special character !@#$%^&*",
            },
          },
        },
      },
      {
        index: 2,
        widths: {
          default: "100%",
          greaterThan1440: "100%",
          between890And1440: "100%",
          between600And890: "100%",
        },
        type: "password",
        id: "confirmNewPassword",
        label: "Confirm Password",
        name: "confirmNewPassword",
        placeholder: "********",
        size: "md",
        color: "default",
        shape: "smooth",
        autoComplete: "new-password",
        required: true,
        showErrorMessage: true,
        validation: {
          type: "string",
          validations: {
            oneOf: {
              field_name: "newPassword",
              message: "Password does not match",
            },
          },
        },
      },
      {
        index: 3,
        widths: {
          default: "100%",
          greaterThan1440: "50%",
          between890And1440: "50%",
          between600And890: "100%",
        },
        type: "signature",
        name: "buyer_signature",
        label: "Signature",
        variant: "M",
        labelClass: "text-sm",
        ref: signRef,
        required: true,
        validation: {
          type: "string",
          validations: {},
        },
      },
      {
        index: 4,
        widths: {
          default: "100%",
          greaterThan1440: "50%",
          between890And1440: "50%",
          between600And890: "100%",
        },
        type: "signature",
        name: "spouse_signature",
        label: "Spouse Signature",
        variant: "M",
        labelClass: "text-sm",
        ref: spouseSignatureRef,
        required: true,
        validation: {
          type: "string",
          validations: {},
        },
      },
    ] as any[],
  };
  return (
    <DynamicForm formData={setNewPasswordData}>
      <div className="col-span-full mt-3">
        <button className="!h-11 w-full uppercase bg-red-400 text-white">
          Save
        </button>
      </div>
    </DynamicForm>
  );
};

export default PageTwo;
