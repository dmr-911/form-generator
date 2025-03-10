"use client";
import React, { useEffect, useRef, useState } from "react";
import SignaturePad from "react-signature-canvas";
import { getIn } from "formik";
import FormError from "../../FormError";

interface SignaturePenalProps {
  onSignatureEnd: (field: string, ref: React.RefObject<SignaturePad>) => void;
  name: string;
  label: string;
  formik?: any;
  labelPosition?: string;
  labelClassName?: string;
  [key: string]: any;
}

const SignaturePanel = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSignatureEnd,
  formik,
  labelPosition = "above",
  labelClassName = "text-sm",
  ...props
}: SignaturePenalProps) => {
  // Forward the ref to the parent component
  const ref = useRef<SignaturePad | null>(null);

  const [penColor, setPenColor] = useState("black");
  const [dotSize, setDotSize] = useState(1);
  const [throttle, setThrottle] = useState(16); // Throttle in milliseconds
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [velocityFilterWeight, setVelocityFilterWeight] = useState(0.7);
  // Load initial data if available
useEffect(() => {
  if (formik && ref.current) {
    const canvas = ref.current.getCanvas();
    const context = canvas.getContext("2d");
    const img = new Image();
    img.src = getIn(formik.values, props.name);

    img.onload = () => {
      // Ensure context is not null before using it
      if (context) {
        // Get the dimensions of the canvas and image
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgWidth = img.width;
        const imgHeight = img.height;

        // Calculate the position to center the image
        const x = (canvasWidth - imgWidth) / 2;
        const y = (canvasHeight - imgHeight) / 2;

        // Clear the canvas and draw the centered image
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.drawImage(img, x, y);
      }
    };
  }
}, [props.name, formik]);

  const handleSignatureEnd = (field: string, ref: React.RefObject<any>) => {
    if (ref?.current) {
      const dataURL = ref.current.getTrimmedCanvas().toDataURL("image/png");

      if (formik) {
        formik.setFieldValue(field, dataURL);
        formik.setFieldError(field, "");
      }
    }
  };

  // Render the label based on the labelPosition prop
  const renderLabel = () => {
    const defaultLabelClass = "text-sm font-medium";

    switch (labelPosition) {
      case "above":
        return (
          <label
            htmlFor={props.name}
            className={`block mb-2 ${defaultLabelClass} ${labelClassName}`}
          >
            {props.label}
          </label>
        );
      case "top-center":
        return (
          <div
            className={`bg-primary-500 dark:bg-muted-600 text-white py-1 px-4 absolute rounded-lg top-2 left-1/2 transform -translate-x-1/2 select-none ${labelClassName}`}
          >
            {props.label}
          </div>
        );
      case "top-left":
      default:
        return (
          <div
            className={`bg-primary-500 dark:bg-muted-600 text-white py-1 px-2 absolute rounded-lg top-2 left-2 select-none ${labelClassName}`}
          >
            {props.label}
          </div>
        );
    }
  };

  return (
    <div className="w-full relative mr-4 rounded-lg">
      {labelPosition === "above" && renderLabel()}
      <SignaturePad
        ref={ref}
        onEnd={() => handleSignatureEnd(props.name, ref)}
        canvasProps={{
          className:
            "bg-primary-50 dark:bg-muted-800 w-full h-[220px] rounded-t-lg",
        }}
        penColor={penColor}
        backgroundColor={backgroundColor}
        dotSize={dotSize}
        throttle={throttle}
        velocityFilterWeight={velocityFilterWeight}
      />
      <div className="w-full h-8 bg-primary-50 dark:bg-muted-800 border-t-2 border-dashed  border-primary-500 dark:border-primary-200 rounded-b-lg"></div>
      <FormError formik={formik} name={props.name} helperText={""} />
      <button
        onClick={() => {
          ref?.current?.clear();
          handleSignatureEnd(props.name, ref);
          formik && formik.setFieldValue(props.name, "");
        }}
        className="w-full mt-2 text-sm cursor-pointer"
        type="button"
      >
        Clear and draw again
      </button>
      <div className="dark:bg-muted-600 text-white py-1 px-2 absolute rounded-lg top-2 left-2 select-none">
        {props.label}
      </div>
    </div>
  );
};

SignaturePanel.displayName = "SignaturePanel";
export default SignaturePanel;
