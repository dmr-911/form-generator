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
        index: 10,
        widths: {
          default: '100%',
          greaterThan1440: '100%',
          between890And1440: '100%',
          between600And890: '100%'
        },
        size: 'md',
        color: 'default',
        shape: 'smooth',
        type: 'file',
        multiple: false,
        id: 'file',
        label: 'Upload Organization Document',
        name: 'file',
        placeholder: '',
        validation: {
          type: 'array',
          validations: {}
        }
      }
    ],
  };
  return (
    <DynamicForm formData={domainFormData} noGap={false}>
      <div className="col-span-full flex items-center justify-end gap-4 rounded-b-xl bg-gray-100 px-4 py-3">
        <Button
          color="muted"
          shape="smooth"
          size="sm"
          type="button"
        >
          Cancel
        </Button>
        <Button color="primary" shape="smooth" size="sm" type="submit">
          Submit
        </Button>
      </div>
    </DynamicForm>
  );
};

export default DemoThree;
