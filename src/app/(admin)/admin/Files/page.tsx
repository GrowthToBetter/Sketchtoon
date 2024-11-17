import React from "react";
import AdminHeaders from "../components/main/AdminHeaders";
import Table from "./_components/Table";
import prisma from "@/lib/prisma";
import { nextGetServerSession } from "@/lib/authOption";
import { FileFullPayload, userFullPayload } from "@/utils/relationsip";

export default async function studentData() {
  const studentData =  await prisma.fileWork.findMany({
    include: { user: true},
  });
  const session = await nextGetServerSession();
  const Genre = await prisma.genre.findMany({});
  const userData = await prisma.user.findFirst({
    where: {
      id: session?.user?.id,
    },
    include: {
      userAuth: true,
      File: { include: { TaskValidator: true } },
      taskValidator: { include: { user: true } },
      comment: { include: { file: true } },
    },
  });
  console.log(studentData);

  return (
    <div className="flex flex-col">
      <AdminHeaders data="File Data" />
      <Table genre={Genre} userData={userData as userFullPayload} studentData={studentData as FileFullPayload[]} />
    </div>
  );
}
