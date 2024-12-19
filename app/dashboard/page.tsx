import React, { Suspense } from "react";
import { requireUser } from "@/app/utils/hooks";

import DashboardBlocks from "@/components/DashboardBlocks";
import InvoiceGraph from "@/components/InvoiceGraph";
import RecentInvoices from "@/components/RecentInvoices";
import prisma from "@/app/utils/db";
import EmptyState from "@/components/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";

const getData = async (userId: string) => {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });

  return data;
};

const Dashboard = async () => {
  const session = await requireUser();

  const data = await getData(session.user?.id as string);
  return (
    <>
      {data.length < 1 ? (
        <EmptyState
          title="No Invoices Found."
          description="Create an invoice to see the content."
          buttonText="Create Invoice"
          href="/dashboard/invoices/create"
        />
      ) : (
        <Suspense fallback={<Skeleton className="w-full h-full flex-1" />}>
          <DashboardBlocks />
          <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
            <InvoiceGraph />
            <RecentInvoices />
          </div>
        </Suspense>
      )}
    </>
  );
};
export default Dashboard;
