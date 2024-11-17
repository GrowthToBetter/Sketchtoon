/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Gambar from "@/../public/img/gambar provesi (2).png";
import Image from "next/image";
import { FormButton, LinkButton } from "../../components/utils/Button";
import { Archivo_Black } from "next/font/google";
const archivo_black = Archivo_Black({ weight: "400", subsets: ["latin"] });
import IconSubject from "../../components/Icons/icon-Subject";
import Img from "../../components/Icons/Img";
import Link from "next/link";
import gambar1 from "@/../public/img/WhatsApp Image 2024-11-07 at 21.23.29_7c1b692d.jpg";
import { useEffect, useState } from "react";
import { FileFullPayload, userFullPayload } from "@/utils/relationsip";
import { signIn, useSession } from "next-auth/react";
import { fetcher } from "@/utils/server-action/Fetcher";
import useSWR from "swr";
import Card from "../../components/utils/card";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ModalProfile from "@/app/components/utils/Modal";
import { addViews } from "@/utils/server-action/userGetServerSession";

export default function Home({ userData }: { userData: userFullPayload }) {
  const { data: session, status } = useSession();
  const [files, setFile] = useState<FileFullPayload[]>([]);
  const { data, error } = useSWR(`/api/getFiles`, fetcher, {
    refreshInterval: 1000,
  });
  const [openProfiles, setOpenProfiles] = useState<{
    [key: string]: { isOpen: boolean; link: string };
  }>({});

  const handleProf = (id: string, link: string) => {
    setOpenProfiles((prev) => ({
      ...prev,
      [id]: {
        isOpen: !prev[id]?.isOpen,
        link: prev[id]?.link || link,
      },
    }));
  };

  useEffect(() => {
    if (data) {
      const { dataFile } = data;
      setFile(dataFile);
    }
  }, [data]);
  const router = useRouter();
  const filteredFiles =
    files
      .filter((file) => file.status === "VERIFIED")
      .sort((a, b) => b.views - a.views)
      .slice(0, 15) ?? [];
  return (
    <div className="">
      <div className="bg-Primary min-w-max p-10 flex flex-col justify-center items-center relative">
        <div
          className={`flex justify-center relative mt-14 md:m-0 flex-col md:flex-row items-center h-screen min-w-fit`}
        >
          <div className="w-full mt-20 z-10 relative p-5 bg-white bg-opacity-55 rounded-lg">
            <h1 className="md:text-6xl text-4xl font-bold md:w-[800px] w-[500px]">
              Berjalan Bersama Menghasilkan Ribuan Karya
            </h1>
            <p className="md:w-[800px] w-[500px] pt-5 md:text-base text-sm font-semibold">
              Optimalisasi Karya Guru dalam ruang Belajar <br />
              Sebagai Pendukung dari platform merdeka Belajar
            </p>
            <FormButton
              onClick={() => router.push("/AjukanKarya")}
              className="mt-20 scale-125 ml-4"
              variant="base"
            >
              Ajukan Sekarang
            </FormButton>
          </div>
        </div>
        <Image
          src={Gambar}
          alt="Gambar"
          width={1020}
          height={700}
          className="rounded-md w-screen h-screen object-cover mix-blend-lighten absolute z-0"
        />
        <div className="h-[100px] w-full pt-10 bg-[#F5F8FA] z-10">
          <ul className="flex justify-evenly font-semibold  ">
            <li>
              <Link href={"/AjukanKarya"} className="flex">
                <IconSubject />
                Ajukan Karya
              </Link>
            </li>
            <li>
              <Link href={"/ListKarya"} className="flex">
                <Img />
                List Karya
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className=" grid lg:grid-cols-3 grid-cols-1 gap-4 bg-white rounded-xl p-8 mt-4">
        {filteredFiles.map((user, i) => (
          <div
            key={i}
            id="container"
            className="w-full h-fit bg-slate-50 rounded-3xl pb-6 border border-slate-200"
          >
            <Image
              src={
                user.coverFile
                  ? (user.coverFile as string)
                  : "https://res.cloudinary.com/dhjeoo1pm/image/upload/v1726727429/mdhydandphi4efwa7kte.png"
              }
              unoptimized
              quality={100}
              width={100}
              height={100}
              alt="banner"
              className="w-full object-cover h-40 rounded-t-3xl"
            />
            <div className="ml-8 mt-2">
              <div className="flex justify-between p-5">
                <p className="font-medium xl:text-[15px] lg:text-[14px] md:text-[13px] sm:text-[12px] text-[11px] text-black">
                  {user.filename}
                </p>
                <p className="font-medium xl:text-[15px] lg:text-[14px] md:text-[13px] sm:text-[12px] text-[11px] text-black">
                  views : {user.views}
                </p>
              </div>

              <div className="mt-6 justify-between flex">
                <LinkButton
                  variant="white"
                  href={`/ListKarya/user/profile/${user.userId}`}
                  className="bg-transparent border rounded-full"
                >
                  Profil
                </LinkButton>
                <div className="flex gap-x-4">
                  <FormButton
                    variant="base"
                    onClick={() => {
                      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                      if (
                        user.mimetype.includes("msword") ||
                        user.mimetype.includes(
                          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        ) ||
                        user.mimetype.includes("pdf")
                      ) {
                        handleProf(user.id, user.permisionId as string);
                      } else {
                        router.push(user.path);
                      }
                      addViews(user.id, user.views + 1);
                    }}
                    className=" text-white hover:underline"
                  >
                    Baca
                  </FormButton>
                </div>
              </div>
              {openProfiles[user.id]?.isOpen && (
                <ModalProfile
                  title={user.filename}
                  onClose={() => handleProf(user.id, "")}
                  className="h-screen"
                >
                  <iframe
                    className="w-full h-full"
                    src={`https://drive.google.com/file/d/${
                      openProfiles[user.id]?.link
                    }/preview`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    sandbox="allow-scripts allow-modals allow-popups allow-presentation allow-same-origin"
                    allowFullScreen
                  ></iframe>
                </ModalProfile>
              )}
            </div>
          </div>
        ))}
      </div>
      <LinkButton href={"/ListKarya"} className="m-5" variant="base">
        Lihat Lebih Banyak{" "}
      </LinkButton>
      <div>
        <div className="justify-center flex  bg-white pt-40  h-screen relative xl:flex-row items-center px-4">
          <div className="max-w-max flex flex-col items-center">
            <h1
              className={`text-[80px] text-center ${archivo_black.className} leading-none`}
            >
              <span className="text-purple-500">S</span>ketchtoon
            </h1>
            <p className="xl:text-[32px] text-center lg:text-[30px] md:text-[28px] sm:text-[26px] text-[24px] font-normal my-2">
              MGMP Tata Busana, Bersama kita berkarya
            </p>
            <FormButton
              onClick={() => signIn()}
              className="mt-[17px] scale-125 ml-4 mb-40 text-white"
              variant="base"
            >
              Get Started Now!
            </FormButton>
            <div className="absolute bottom-0 w-screen h-80 bg-Primary">
            <Image
              src={Gambar}
              width={500}
              height={500}
              className="rounded-md w-full h-full object-cover mix-blend-lighten object-top absolute"
              alt="Orang Sukses Amin"
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
