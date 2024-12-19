import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { formatCurrency } from "@/app/utils/formatCurrency";

const getData = async (userId: string) => {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      clientName: true,
      clientEmail: true,
      total: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });

  return data;
};

const RecentInvoices = async () => {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoice</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {data.map(({ id, clientName, clientEmail, total }) => (
          <div key={id} className="flex items-center gap-4">
            <Avatar className="hidden sm:flex size-9">
              <AvatarFallback>{clientName.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium leading-none">{clientName}</p>
              <p className="text-sm text-muted-foreground">{clientEmail}</p>
            </div>
            <div className="ml-auto font-medium">
              +{formatCurrency({ amount: total, currency: "IDR" })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
export default RecentInvoices;
