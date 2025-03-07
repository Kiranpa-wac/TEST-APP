// src/components/FormComponent.js
import React, { useRef } from "react";
import { Form } from "informed";
import { ToastContainer } from "react-toastify";
import DynamicField from "./DynamicField";
import formData from "../Data/formData (1).json";
import { toast } from "react-toastify";

const FormComponent = () => {
  const formRef = useRef();

  const handleSubmit = (values) => {
    console.log(values);
    formRef.current.reset();
    toast.success("Form submitted successfully");
  };

  return (
    <div className="container mt-5">
      <Form
        onSubmit={handleSubmit}
        formApiRef={formRef}
        initialValues={{ skills: [] }}
      >
        <div>
          {formData.map((field) => (
            <DynamicField key={field.id} fieldData={field} />
          ))}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <ToastContainer position="top-right" autoClose={5000} />
        </div>
      </Form>
    </div>
  );
};

export default FormComponent;
