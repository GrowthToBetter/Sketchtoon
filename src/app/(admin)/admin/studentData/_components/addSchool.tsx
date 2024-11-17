"use client";
import { FormButton } from "@/app/components/utils/Button";
import React, {  useState } from "react";
import { SchoolFullPayload, userFullPayload } from "@/utils/relationsip";
import ModalSchool from "./modalSchool";

export default function AddGenre({ userData}:{dataSchool:SchoolFullPayload[]; userData:userFullPayload}) {
  const [modal, setModal] = useState(false);
  return (
    <>
      <FormButton type="button" variant="base" onClick={() => setModal(true)}>
        Add School
      </FormButton>
      {modal && <ModalSchool userData={userData} setIsOpenModal={setModal} />}
    </>
  );
}
