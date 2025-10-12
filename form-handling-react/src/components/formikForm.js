// src/components/formikForm.js
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
});

export default function FormikForm() {
  return (
    <div style={{ maxWidth: 420, margin: "32px auto" }}>
      <h2>Register (Formik + Yup)</h2>

      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={schema}       
        onSubmit={(values, helpers) => {
          alert(`Registered: ${values.username} / ${values.email}`);
          helpers.resetForm();
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form style={{ display: "grid", gap: 12 }}>
            <label>
              Username
              <Field name="username" placeholder="ofoe_mahogana" />
              <ErrorMessage name="username" component="span" style={{ color: "crimson", fontSize: 12 }} />
            </label>

            <label>
              Email
              <Field name="email" type="email" placeholder="you@example.com" />
              <ErrorMessage name="email" component="span" style={{ color: "crimson", fontSize: 12 }} />
            </label>

            <label>
              Password
              <Field name="password" type="password" placeholder="min 6 chars" />
              <ErrorMessage name="password" component="span" style={{ color: "crimson", fontSize: 12 }} />
            </label>

            <button type="submit" disabled={isSubmitting || !isValid || !dirty}>
              Create account
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}