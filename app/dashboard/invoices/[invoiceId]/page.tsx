import React from "react";
import prisma from "@/app/utils/db";
import { notFound } from "next/navigation";
import { requireUser } from "@/app/utils/hooks";
import EditInvoiceForm from "@/components/EditInvoiceForm";

type Params = Promise<{ invoiceId: string }>;

const getData = async (invoiceId: string, userId: string) => {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });

  if (!data) return notFound();

  return data;
};

const EditInvoice = async ({ params }: { params: Params }) => {
  const { invoiceId } = await params;
  const session = await requireUser();

  const data = await getData(invoiceId, session.user?.id as string);

  return (
    <div>
      <EditInvoiceForm data={data} />
    </div>
  );
};
export default EditInvoice;
