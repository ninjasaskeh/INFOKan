import React from "react";
import CreateInvoice from "@/components/CreateInvoice";
import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";

const getUserData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      address: true,
      email: true,
    },
  });
  return data;
};

const InvoiceCreate = async () => {
  const session = await requireUser();
  const data = await getUserData(session.user?.id as string);
  return (
    <div>
      <CreateInvoice
        firstName={data?.firstName as string}
        lastName={data?.lastName as string}
        email={data?.email as string}
        address={data?.address as string}
      />
    </div>
  );
};
export default InvoiceCreate;
