import { requireUser } from "@/app/utils/hooks";
import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";
import { emailClient } from "@/app/utils/mailtrap";

export async function POST(
  _: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  },
) {
  try {
    const session = await requireUser();
    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice Not Found" }, { status: 404 });
    }

    const sender = {
      email: "hello@demomailtrap.com",
      name: "TNKU | SEIJA",
    };

    emailClient.send({
      from: sender,
      to: [{ email: "ariefmaizaki1@gmail.com" }], // replace with client email  ${invoiceData.clientEmail}
      template_uuid: "0c378777-f197-48cf-8ff3-0c15b5099b9d",
      template_variables: {
        company_info_name: "TNKUSEIJA.Corp",
        first_name: invoiceData.clientName,
        company_info_address: "Sigma St 690, Skibidi",
        company_info_city: "Cikarang",
        company_info_zip_code: "69690",
        company_info_country: "Indonesia",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to send email reminder" },
      { status: 500 },
    );
  }
}
