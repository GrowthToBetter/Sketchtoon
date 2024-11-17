/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {ValidatePage} from "../../_components/Validasi";
import prisma from "@/lib/prisma";
import { nextGetServerSession } from "@/lib/authOption";
import { FileFullPayload, userFullPayload } from "@/utils/relationsip";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


export default async function page() {
  const session = await nextGetServerSession();
  
  if (!session?.user?.id) return redirect("/signin");

  const userData = await prisma.user.findFirst({
    where: { id: session.user.id },
    include: { userAuth: true, File: { include: { TaskValidator: true } } },
  });

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  let file: FileFullPayload[] = [];
  
  if (session.user.role === "SISWA") {
    file = await prisma.fileWork.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        user: { include: { userAuth: true } },
        TaskValidator: true,
        comment: { include: { user: true } },
      },
    });
  } else {
    file = await prisma.fileWork.findMany({
      include: {
        user: { include: { userAuth: true } },
        TaskValidator: true,
        comment: { include: { user: true } },
      },
    });
  }

  return <ValidatePage userData={userData as userFullPayload} file={file} />;
}
