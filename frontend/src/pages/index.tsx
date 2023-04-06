import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { LoginCard } from "@/components/loginCard";
import Header from "@/components/header";
import ModalRegister from "@/components/modalRegister";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Header header="" btnCadastrar={false} btnLogout={false} />
      <LoginCard />
    </>
  );
}
