/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { FormButton } from "@/app/components/utils/Button";
import React, { useEffect, useState } from "react";
import ModalUser from "./ModalUser";
import { SchoolFullPayload, userFullPayload } from "@/utils/relationsip";
import useSWR from "swr";
import { fetcher } from "@/utils/server-action/Fetcher";

export default function AddUser({userData}:{userData:userFullPayload}) {
  const [modal, setModal] = useState(false);
  const[schoolData, setSchoolData] = useState<SchoolFullPayload[]>();
  const { data, error } = useSWR(
    `/api/getSchool`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );
  useEffect(() => {
    if (data) {
      const { dataFile } = data;
      setSchoolData(dataFile);
    }
  }, [data]);
  return (
    <>
      <FormButton type="button" variant="base" onClick={() => setModal(true)}>
        Add User
      </FormButton>
      {modal && <ModalUser Schools={schoolData as SchoolFullPayload[]} userData={userData} setIsOpenModal={setModal} />}
    </>
  );
}
