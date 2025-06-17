import { signOut } from "firebase/auth";
import { auth } from "../config/Firebase";

const logout = async () => {
  await signOut(auth);
};

export default logout;
