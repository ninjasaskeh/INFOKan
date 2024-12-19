import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Graph from "@/components/Graph";
import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";

const getInvoices = async (userId: string) => {
  const rawData = await prisma.invoice.findMany({
    where: {
      userId: userId,
      status: "PAID",
      createdAt: {
        lte: new Date(),
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    },
    select: {
      createdAt: true,
      total: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Group an aggregate data by date(data di tanggal yang sama)
  const aggregatedData = rawData.reduce(
    (acc: { [key: string]: number }, curr) => {
      const date = new Date(curr.createdAt).toLocaleDateString("id-ID", {
        month: "short",
        day: "numeric",
      });

      acc[date] = (acc[date] || 0) + curr.total;

      return acc;
    },
    {},
  );

  // convert data to Object karna chart harus {[]}
  const transformData = Object.entries(aggregatedData)
    .map(([date, amount]) => ({
      date,
      amount,
      originalDate: new Date(date + ", " + new Date().getFullYear()),
    }))
    .sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
    .map(({ date, amount }) => ({ date, amount }));

  return transformData;
};

const InvoiceGraph = async () => {
  const session = await requireUser();
  const data = await getInvoices(session.user?.id as string);

  return (
    <Card className="lg:col-span-2 ">
      <CardHeader>
        <CardTitle>Paid Invoice</CardTitle>
        <CardDescription>
          Invoice which has been paid in the last 30 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Graph data={data} />
      </CardContent>
    </Card>
  );
};
export default InvoiceGraph;
