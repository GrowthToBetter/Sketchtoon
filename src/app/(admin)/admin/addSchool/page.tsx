import React from "react";
import AdminHeaders from "../components/main/AdminHeaders";
import prisma from "@/lib/prisma";
import Table from "../studentData/_components/tableSchool";
import { userFullPayload } from "@/utils/relationsip";
import { nextGetServerSession } from "@/lib/authOption";

export default async function teamData() {
  const dataSchool = await prisma.schoolOrigin.findMany();
  const session = await nextGetServerSession();
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
  return (
    <div className="flex flex-col">
      <AdminHeaders data="Data Category" />
      <Table userData={userData as userFullPayload} dataSchool={dataSchool} />
    </div>
  );
}
