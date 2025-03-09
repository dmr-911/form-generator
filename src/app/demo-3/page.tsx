"use client";
import React from "react";
import { DynamicForm, FormData } from "../../../core";
import Button from "../../../core/DynamicForm/components/Button";

const DemoThree = () => {
  const domainFormData: FormData = {
    name: "Request to Buy Domain",
    description: "Enter the domain you want to Request to buy.",
    grid: 6,
    submit: {
      function: async ({
        values,
        formik,
        setErrors,
      }: {
        values: any;
        formik: any;
        setErrors: any;
      }) => {
        console.log("values", values);
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
        size: "md",
        color: "default",
        shape: "smooth",
        type: "radio-group",
        variant: "custom",
        label: "Choose Domain Type",
        options: [
          {
            label: "Domain",
            value: "domain",
            selfSubmit: false,
          },
          {
            label: "Sub Domain",
            value: "sub-domain",
            selfSubmit: false,
          },
        ],
        id: "domain-type",
        name: "domain-type",
        required: true,
      },
      {
        index: 3,
        widths: {
          default: "100%",
          greaterThan1440: "100%",
          between890And1440: "100%",
          between600And890: "100%",
        },
        size: "md",
        color: "default",
        shape: "smooth",
        type: "text",
        id: "domain",
        label: "Domain",
        name: "domain",
        loading: false,
        // depends: {
        //   condition: "AND",
        //   rules: [{ name: "domain-type", operator: "eq", value: "domain" }],
        // },
        requiredEnabled: {
          condition: "AND",
          rules: [{ name: "domain-type", operator: "eq", value: "domain" }],
        },
        icon: "MdSearch",
      },
      {
        index: 4,
        widths: {
          default: "100%",
          greaterThan1440: "100%",
          between890And1440: "100%",
          between600And890: "100%",
        },
        size: "md",
        color: "default",
        shape: "smooth",
        type: "text",
        id: "sub-domain",
        label: "Sub Domain",
        name: "sub-domain",
        // depends: {
        //   condition: "AND",
        //   rules: [{ name: "domain-type", operator: "eq", value: "sub-domain" }],
        // },
        requiredEnabled: {
          condition: "AND",
          rules: [{ name: "domain-type", operator: "eq", value: "sub-domain" }],
        },
        // suffix: <ReIcon iconName="TbWorld" className="h-5 w-5 text-muted-500" />
      },
      {
        index: 4,
        widths: {
          default: "100%",
          greaterThan1440: "50%",
          between890And1440: "50%",
          between600And890: "100%",
        },
        type: "select",
        name: "model_name",
        label: "Select a model",
        variant: "M",
        multiple: false,

        labelClass: "text-sm",
        // options: ['mctos', 'khulna', 'dhaka'], // if options are given , availableDataAPI cannot be used
        // availableDataAPI: 'https://jsonplaceholder.typicode.com/users' // if options are given , availableDataAPI cannot be used
        options: [
          {
            label: "Single Family Residence",
            value: "Single Family Residence",
          },
          {
            label: "Apartment",
            value: "Apartment",
          },
          {
            label: "Multi (2-4 units)",
            value: "Multi (2-4 units)",
          },
          {
            label: "Vacant Land",
            value: "Vacant Land",
          },
        ],
        required: true,
        validation: {
          type: "string",
          validations: {},
        },
      },
      {
        index: 5,
        widths: {
          default: "100%",
          greaterThan1440: "50%",
          between890And1440: "50%",
          between600And890: "100%",
        },
        type: "select",
        name: "mn",
        label: "Select a mn",
        variant: "M",
        multiple: true,

        labelClass: "text-sm",
        // options: ['mctos', 'khulna', 'dhaka'], // if options are given , availableDataAPI cannot be used
        // availableDataAPI: 'https://jsonplaceholder.typicode.com/users' // if options are given , availableDataAPI cannot be used
        options: [
          {
            label: "SFR",
            value: "Single Family Residence",
          },
          {
            label: "Apt",
            value: "Apartment",
          },
          {
            label: "MU",
            value: "Multi (2-4 units)",
          },
          {
            label: "VL",
            value: "Vacant Land",
          },
        ],
        required: true,
        validation: {
          type: "array",
          validations: {
            min: {
              value: 1,
              message: "Select at least one",
            },
          },
        },
      },
      {
        index: 10,
        widths: {
          default: "100%",
          greaterThan1440: "100%",
          between890And1440: "100%",
          between600And890: "100%",
        },
        size: "md",
        color: "default",
        shape: "smooth",
        type: "file",
        multiple: false,
        id: "file",
        label: "Upload Organization Document",
        name: "file",
        placeholder: "",
        required: true,
        validation: {
          type: "array",
          validations: {},
        },
      },
    ],
  };
  return (
    <DynamicForm formData={domainFormData} noGap={false}>
      <div className="col-span-full flex items-center justify-end gap-4 rounded-b-xl bg-gray-100 px-4 py-3">
        <Button color="muted" shape="smooth" size="sm" type="button">
          Cancel
        </Button>
          <button
          
          className="!h-10 w-full uppercase bg-red-400 text-white">
            Submit
          </button>
        </div>
    </DynamicForm>
  );
};

export default DemoThree;
