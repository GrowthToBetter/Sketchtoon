/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { DeleteFile, DeleteUser } from "@/utils/server-action/userGetServerSession";
import { Prisma } from "@prisma/client";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";
import ModalStudent from "./Modal";
import { FileFullPayload, GenreFullPayload, SchoolFullPayload, userFullPayload } from "@/utils/relationsip";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { fetcher } from "@/utils/server-action/Fetcher";

export default function Table({ studentData, userData, genre }: { studentData: Prisma.fileWorkGetPayload<{ include: { user: true } }>[]; userData: userFullPayload; genre:GenreFullPayload[] }) {
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState<Prisma.fileWorkGetPayload<{ include: { user: true } }> | null>(null);
  const [loader, setLoader] = useState(true);
  const columns: TableColumn<Prisma.fileWorkGetPayload<{ include: { user: true } }>>[] = [
    {
      name: "Name",
      selector: (row) => row.filename,
      sortable: true,
    },
    {
      name: "Genre",
      selector: (row) => row.genre,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-x-3">
          <button onClick={() => EditUser(row)} title="Edit" className="p-2 bg-blue-900 text-white rounded-lg hover:scale-110 active:scale-105 duration-150">
            edit
          </button>
          <button onClick={() => DeleteUserById(row.id, row as FileFullPayload)} title="Delete" className="p-2.5 bg-red-500 text-white rounded-md hover:scale-110 active:scale-105 duration-150">
            delete
          </button>
        </div>
      ),
    },
  ];
  const EditUser = async (data: Prisma.fileWorkGetPayload<{ include: { user: true } }>) => {
    setModal(true);
    setModalData(data);
  };

  const DeleteUserById = async (id: string, file:FileFullPayload) => {
    if (!confirm("Anda yakin ingin menghapus user ini?")) return;
    const toastId = toast.loading("Loading...");
    const result = await DeleteFile(id, file);
    if (result) {
      toast.success(result.message, { id: toastId });
    }
  };

  useEffect(() => {
    setLoader(false);
  }, []);

  if (loader) return <div>Loading</div>;
  return (
    <>
      <section className="min-w-[1440px] max-w-full min-h-full w-full bg-[#F6F6F6] p-4 outline outline-1 outline-slate-200 ml-6">
        <div className="w-full border-b-2 border-black "></div>
        <div className="mt-6">
          <DataTable data={studentData} columns={columns} />
        </div>
        {modal && <ModalStudent Genre={genre} userData={userData} setIsOpenModal={setModal} data={modalData} />}
      </section>
    </>
  );
}
