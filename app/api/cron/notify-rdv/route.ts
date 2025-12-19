import { format } from "date-fns";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (
    !req.headers.get("authorization") ||
    req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response("Unauthorized", { status: 401 });
  }

  const response = await notifyRdv();
  return NextResponse.json(response);
}

const notifyRdv = async () => {
  try {
    const rdvs = await prisma.rdv.findMany();

    if (rdvs.length === 0) {
      throw new Error("Aucune donnée disponible");
    }

    // Création du transport SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_SMTP_HOST,
      port: Number(process.env.NEXT_PUBLIC_SMTP_PORT),
      secure: false, // use TLS (STARTTLS) on port 587
      auth: {
        user: process.env.NEXT_PUBLIC_SMTP_USER,
        pass: process.env.NEXT_PUBLIC_SMTP_PASS,
      },
    });

    // Notify RDV
    for (const rdv of rdvs) {
      const today = new Date();
      const rdvDate = new Date(rdv.date);

      const user = await prisma.user.findFirst({
        where: { id: rdv.userId },
        select: { email: true, firstname: true, lastname: true },
      });

      if (!user) {
        throw new Error("Identification inconnu");
      }

      const fullname = `${user.firstname} ${user.lastname}`;

      // Normaliser les heures (évite les bugs de comparaison)
      today.setHours(0, 0, 0, 0);
      rdvDate.setHours(0, 0, 0, 0);

      // Date = aujourd’hui + 3 jours
      const notifyDate = new Date(today);
      notifyDate.setDate(today.getDate() + 3);

      if (rdvDate.getTime() === notifyDate.getTime()) {
        await transporter.sendMail({
          from: `"Daily SaaS" <${process.env.NEXT_PUBLIC_SMTP_USER}>`,
          to: user.email,
          subject: "RDV dans 3 jours!",
          html: `
            <!DOCTYPE html>
            <html lang="fr">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Rappel de rendez-vous</title>
              </head>
              <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:24px 0;">
                  <tr>
                    <td align="center">
                      <!-- Container -->
                      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">

                        <!-- Banner -->
                        <tr>
                          <td>
                            <img
                              src="cid:emailBanner"
                              alt="Bannière"
                              width="600"
                              style="display:block; width:100%; height:auto;"
                            />
                          </td>
                        </tr>

                        <!-- Content -->
                        <tr>
                          <td style="padding:32px; color:#333333;">
                            <h1 style="margin:0 0 16px; font-size:22px; color:#111111;">
                              ⏰ Rappel de votre rendez-vous
                            </h1>

                            <p style="margin:0 0 16px; font-size:15px; line-height:1.6;">
                              Bonjour <strong>${fullname}</strong>,
                            </p>

                            <p style="margin:0 0 24px; font-size:15px; line-height:1.6;">
                              Ceci est un rappel : votre rendez-vous a lieu dans <strong>3 jours</strong>.
                            </p>

                            <!-- RDV Card -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc; border-radius:6px; padding:16px;">
                              <tr>
                                <td style="font-size:14px; line-height:1.6;">
                                  <p style="margin:0 0 8px;"><strong>📌 Sujet :</strong> ${
                                    rdv.title
                                  }</p>
                                  <p style="margin:0 0 8px;"><strong>📅 Date :</strong> ${format(
                                    new Date(rdv.date),
                                    "dd/MM/yyyy à HH'h'mm"
                                  )}</p>
                                  <p style="margin:0 0 8px;"><strong>👤 Avec :</strong> ${
                                    rdv.withWhom
                                  }</p>
                                  <p style="margin:0;"><strong>📍 Adresse :</strong> ${
                                    rdv.address
                                  }</p>
                                </td>
                              </tr>
                            </table>


                            <p style="margin:24px 0 0; font-size:14px; color:#555555;">
                              Si vous avez besoin de modifier ou d'annuler ce rendez-vous, merci de vous connecter à votre espace.
                            </p>
                          </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                          <td style="background-color:#f1f5f9; padding:20px; text-align:center; font-size:12px; color:#666666;">
                            <p style="margin:0;">© ${new Date().getFullYear()} Daily SaaS — Tous droits réservés</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
          `,

          attachments: [
            {
              filename: "banner.png",
              path: "./public/banner.png",
              cid: "emailBanner",
            },
          ],
        });
      }
    }

    return {
      success: true,
      message: "RDV notifié!",
    };
  } catch (err) {
    if (err instanceof SyntaxError) {
      return { success: false, message: err.message as string };
    } else if (typeof err === "object" && err !== null && "message" in err) {
      return { success: false, message: err.message as string };
    } else {
      return { success: false, message: "Internal server error" as string };
    }
  }
};
