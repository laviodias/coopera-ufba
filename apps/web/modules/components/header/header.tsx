"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import "../../../app/globals.css";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FiMenu } from "react-icons/fi";

import { TbBell, TbUserCircle } from "react-icons/tb";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUser } from "@/context/UserContext";
import { authStore } from "@/context/loginContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NotificationList from "./notifications";
import useGetUnseenNotificationsCount from "@/api/notifications/use-get-unseen-notifications-count";

const headerLinks = {
  NONE: [
    {
      label: "Encontrar demandas",
      path: "/encontrar-demandas",
    },
    {
      label: "Encontrar Grupos de Pesquisa",
      path: "/encontrar-grupo-pesquisa",
    },
  ],
  COMPANY: [
    {
      label: "Encontrar Grupos de Pesquisa",
      path: "/encontrar-grupo-pesquisa",
    },
    {
      label: "Minhas demandas",
      path: "/minhas-demandas",
    },
  ],
  RESEARCHER: [
    {
      label: "Encontrar demandas",
      path: "/encontrar-demandas",
    },
    // {
    //   label: "Minhas Propostas",
    //   path: "/minhas-propostas",
    // },
    {
      label: "Meus Grupos de pesquisa",
      path: "/meus-grupos-pesquisa",
    },
  ],
  ADMIN: [
    {
      label: "Painel Administrativo",
      path: "/painel-administrativo",
    },
  ],
};

const Header = () => {
  const isDesktop = useMediaQuery("(min-width: 64rem)");

  const router = useRouter();

  const { user, setUser } = useUser();

  const { data: unseenNotifications } = useGetUnseenNotificationsCount();

  const formatName = (name: string) => {
    const firstName = name.split(" ")[0];
    return (
      <p className="self-center text-primary font-bold">
        Olá,{" "}
        {firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()}
      </p>
    );
  };

  const linksType = user
    ? user.role === "ADMIN"
      ? "ADMIN"
      : user.utype
    : "NONE";

  function handleLogout() {
    authStore.logout();
    setUser(null);
    router.push("/");
  }

  return isDesktop ? (
    <header className="flex justify-center shadow-custom bg-white z-50">
      <div className="flex justify-between px-4 w-full max-w-screen-xl">
        <Link href={"/"} className="flex items-center gap-3 py-4">
          <Image src="/logo.png" width="31" height="50" alt="logo ufba" />
          <h1 className="text-3xl font-bold text-blue-strong">COOPERA-UFBA</h1>
        </Link>
        <div className="flex gap-5 items-center">
          {headerLinks[linksType].map((link, index) => (
            <Link
              key={index}
              href={link.path}
              className="h-full content-center px-2 font-bold text-blue-strong border-y-4 border-transparent hover:border-b-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex gap-2.5 items-center content-center">
          {linksType === "NONE" ? (
            <>
              <Button
                variant={"outline"}
                asChild
                className="rounded-full py-2.5 px-8 border-primary"
              >
                <Link
                  href={"/login"}
                  className="font-medium text-primary bg-white text-base"
                >
                  Entrar
                </Link>
              </Button>
              <Button asChild className="rounded-full py-2.5 px-8">
                <Link href={"/user-register"} className="font-medium">
                  Cadastrar-se
                </Link>
              </Button>
            </>
          ) : (
            <div className="flex gap-2">
              {user?.name ? formatName(user.name) : ""}
              <Popover>
                <PopoverTrigger className="relative">
                  <TbBell className="text-primary/80 hover:text-primary size-8 cursor-pointer" />
                  {unseenNotifications && unseenNotifications > 0 ? (
                    <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
                  ) : null}
                </PopoverTrigger>
                <PopoverContent>
                  <NotificationList />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger>
                  <TbUserCircle className="text-primary/80 hover:text-primary size-8 cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="grid gap-2">
                  <Link
                    href={"/perfil"}
                    className="font-medium hover:underline text-blue-strong"
                  >
                    Meu perfil
                  </Link>

                  {["COMPANY", "RESEARCHER"].includes(linksType) && (
                    <>
                      <Link
                        key={linksType}
                        href={
                          linksType === "COMPANY"
                            ? "/minhas-demandas"
                            : "/meus-grupos-pesquisa"
                        }
                        className="font-medium hover:underline text-blue-strong"
                      >
                        {linksType === "COMPANY"
                          ? "Minhas demandas"
                          : "Meus Grupos de pesquisa"}
                      </Link>
                    </>
                  )}
                  <Button
                    variant="link"
                    onClick={handleLogout}
                    className="font-medium hover:underline outline-none text-blue-strong text-base text-left p-0 justify-start h-auto"
                  >
                    Sair
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </header>
  ) : (
    <Drawer direction="right">
      <header className="shadow-custom bg-white p-4 z-50">
        <div className="flex justify-between max-w-screen-xl mx-auto">
          <Link href={"/"} className="flex items-center gap-3">
            <Image src="/logo.png" width="31" height="50" alt="logo ufba" />
            <h1 className="text-3xl font-bold text-blue-strong">
              COOPERA-UFBA
            </h1>
          </Link>
          <DrawerTrigger>
            <FiMenu className="text-primary text-3xl" />
          </DrawerTrigger>
        </div>
      </header>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <DrawerClose asChild>
              <Link
                href={"/"}
                className="flex items-center justify-center gap-3 py-4"
              >
                <Image src="/logo.png" width="31" height="50" alt="logo ufba" />
                <h1 className="text-3xl font-bold text-blue-strong">
                  COOPERA-UFBA
                </h1>
              </Link>
            </DrawerClose>
          </DrawerTitle>
        </DrawerHeader>

        <nav className="flex flex-col gap-4 px-4">
          {headerLinks[linksType].map((link, index) => (
            <DrawerClose key={index} className="text-left" asChild>
              <Link
                href={link.path}
                className="items-center font-bold text-blue-strong"
              >
                {link.label}
              </Link>
            </DrawerClose>
          ))}

          {linksType === "NONE" ? (
            <>
              <Button
                variant={"outline"}
                asChild
                className="rounded-full w-full py-2.5 px-8 border-primary"
              >
                <Link
                  href={"/login"}
                  className="font-medium text-primary text-base"
                >
                  Entrar
                </Link>
              </Button>

              <Button asChild className="rounded-full w-full py-2.5 px-8">
                <Link href={"/user-register"} className="font-medium">
                  Cadastrar-se
                </Link>
              </Button>
            </>
          ) : (
            <>
              <DrawerClose className="text-left" asChild>
                <Link
                  href="/"
                  className="items-center font-bold text-blue-strong"
                >
                  Notificações
                </Link>
              </DrawerClose>
              <DrawerClose className="text-left" asChild>
                <Link
                  href="/perfil"
                  className="items-center font-bold text-blue-strong"
                >
                  Meu perfil
                </Link>
              </DrawerClose>
              {["COMPANY", "RESEARCHER"].includes(linksType) && (
                <>
                  <DrawerClose className="text-left" asChild>
                    <Link
                      key={linksType}
                      href={
                        linksType === "COMPANY"
                          ? "/minhas-demandas"
                          : "/meus-grupos-pesquisa"
                      }
                      className="items-center font-bold text-blue-strong"
                    >
                      {linksType === "COMPANY"
                        ? "Minhas demandas"
                        : "Meus Grupos de pesquisa"}
                    </Link>
                  </DrawerClose>
                </>
              )}
              <DrawerClose className="text-left" asChild>
                <Button
                  variant="link"
                  onClick={handleLogout}
                  className="font-bold text-blue-strong outline-none text-base text-left p-0 justify-start h-auto"
                >
                  Sair
                </Button>
              </DrawerClose>
            </>
          )}
        </nav>
      </DrawerContent>
    </Drawer>
  );
};

export default Header;
