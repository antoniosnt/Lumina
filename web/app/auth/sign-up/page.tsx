// Components
import AppForm from "@/components/AppForm";

const SignUp = () => {
  return (
      <main className="AppMain">
      {
        <AppForm
          emailPlaceholder="Email"
          passwordPlaceholder="Password"
          onSubmit={() => console.log("Hello World")}
          type="signUp"
        />
      }
    </main>
  )
}

export default SignUp;