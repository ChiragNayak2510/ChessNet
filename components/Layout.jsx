import Left from "./layout/Left";
import Right from "./layout/Right";
import Header from "./layout/Header";
import { useState, useEffect} from "react";
import useUserStore from "@/libs/store/useUserStore";
import { useRouter } from "next/router";

export default function Layout({ children }){
    const router = useRouter();
    const path = router.pathname;
    const [label, setLabel] = useState("");
    const user = useUserStore((state)=>state.user)

  useEffect(() => {
    if (path === "/") {
      setLabel("Home");
    } else if (path === "/login") {
      setLabel("Login");
    } else if (path === "/register") {
      setLabel("Register");
    } else if(user){
      setLabel(user)
    }
  }, [path,user]);

  return (
    <div className="flex">
      <Left />
      <div className="w-full h-screen">
        <Header showBackArrow={true} label={label} />
        {children}
      </div>
      <Right />
    </div>
  );
};

