import Footer from "../components/Footer";
import { LoginForm, ProfileForm, RegisterForm } from "../components/Form";
import Navbar from "../components/Navbar";

export const Profile = () => {
  return (
    <>
      <Navbar />
      <ProfileForm />
      <Footer />
    </>
  );
};

export const Login = () => {
  return (
    <>
      <Navbar />
      <LoginForm />
      <Footer />
    </>
  );
};

export const Register = () => {
  return (
    <>
      <Navbar />
      <RegisterForm />
      <Footer />
    </>
  );
};
