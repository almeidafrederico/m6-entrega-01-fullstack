import api from "@/pages/services/api";
import { iUserRegister } from "@/types/user";
import { useToastForm } from "./toastContext";

export const UserRegisterContext = async (data: iUserRegister) => {
  const { toast } = useToastForm();
  try {
    const respData = await api.post("/user", data);
    toast({ color: "blue", message: "test", position: "bottom-left" });
    console.log(respData);
  } catch (error) {
    console.log(error);
  }
};
