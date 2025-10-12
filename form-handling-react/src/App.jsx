import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/FormikForm";

export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <RegistrationForm />
      <hr style={{ margin: "32px 0" }} />
      <FormikForm />
    </div>
  );
}