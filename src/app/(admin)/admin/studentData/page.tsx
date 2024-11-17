import React from "react";
import AdminHeaders from "../components/main/AdminHeaders";
import Table from "./_components/Table";
import prisma from "@/lib/prisma";
import { nextGetServerSession } from "@/lib/authOption";
import { userFullPayload } from "@/utils/relationsip";

export default async function studentData() {
  const studentData =  await prisma.user.findMany({
    where: {OR: [ { role:"VALIDATOR" }, {role:"GURU"}]},
    include: { userAuth: true },
  });
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
  console.log(studentData);

  return (
    <div className="flex flex-col">
      <AdminHeaders data="Student Data" />
      <Table userData={userData as userFullPayload} studentData={studentData} />
    </div>
  );
}
