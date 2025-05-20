"use server";
import { resend } from "@/lib/email";
import { z } from "zod";
import { publicActionsClient } from "@/lib/safe-actions";

const subscribeSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z
    .string()
    .email({ message: "Veuillez entrer une adresse email valide." }),
  phoneNumber: z
    .string()
    .min(10, { message: "Veuillez entrer un numéro de téléphone valide." }),
  planName: z.string(),
  duration: z.string(),
  price: z.string(),
});

export const subscribeActions = publicActionsClient
  .schema(subscribeSchema)
  .action(async ({ parsedInput }) => {
    const { fullName, email, planName, duration, price } = parsedInput;
    const paypalLink = process.env.PAYMENT_LINK ?? "";
    const contactEmail = process.env.CONTACT_EMAIL || "";
    const whatsappNumber = process.env.WHATSUP_NUMBER || "";
    const siteName = process.env.SITE_NAME ?? "";

    await resend.emails.send({
      to: email,
      from: process.env.EMAIL_FROM ?? "",
      subject: "Confirmation d'abonnement",
      html: `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirmation de commande</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #1a73e8;
      color: white;
      padding: 20px;
      text-align: center;
    }
    .content {
      padding: 30px;
    }
    .order-details, .payment-section {
      background-color: #f0f7ff;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      border-left: 4px solid #1a73e8;
    }
    .payment-section {
      background-color: #e8f0fe;
    }
    .btn {
      display: inline-block;
      background-color: #1a73e8;
      color: white;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 4px;
      font-weight: bold;
      margin: 15px 0;
      text-align: center;
    }
    .btn:hover {
      background-color: #0d62d6;
    }
    .footer {
      background-color: #f5f5f5;
      padding: 20px;
      text-align: center;
      color: #666;
      font-size: 14px;
      border-top: 1px solid #e0e0e0;
    }
    .contact-info {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin: 20px 0;
      flex-wrap: wrap;
    }
    @media only screen and (max-width: 600px) {
      .content, .header, .footer {
        padding: 15px;
      }
      .contact-info {
        flex-direction: column;
        align-items: center;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Confirmation de votre commande</h1>
    </div>

    <div class="content">
      <p>Bonjour <strong>${fullName}</strong>,</p>
      <p>Merci d’avoir choisi notre service ! Votre commande a bien été reçue.</p>

      <div class="order-details">
        <h2>📦 Détails de votre commande</h2>
        <ul>
          <li><strong>Forfait :</strong> ${planName}</li>
          <li><strong>Durée :</strong> ${duration}</li>
          <li><strong>Prix :</strong> ${price} €</li>
        </ul>
      </div>

      <div class="payment-section">
        <h2>💳 Finalisez votre paiement</h2>
        <p>Pour activer votre abonnement rapidement, suivez ces étapes :</p>
        <ol>
          <li>Cliquez sur le bouton ci-dessous</li>
          <li>Effectuez votre paiement en toute sécurité</li>
          <li>Votre compte sera activé dès confirmation</li>
        </ol>
        <div style="text-align: center;">
          <a href="${paypalLink}" class="btn" target="_blank">Payer maintenant via PayPal</a>
        </div>
        <p style="font-size: 14px; color: #666; text-align: center;">
          Pour éviter tout blocage, indiquez « Service numérique 12 mois » en motif de paiement.
        </p>
      </div>

      <h3>Besoin d'aide ?</h3>
      <p>Notre équipe reste à votre disposition pour toute question :</p>
      <div class="contact-info">
        <a href="mailto:${contactEmail}">${contactEmail}</a>
        <a href="https://wa.me/${whatsappNumber}">WhatsApp : ${whatsappNumber}</a>
      </div>
    </div>

    <div class="footer">
      <p>Merci pour votre confiance !</p>
      <p>L’équipe <strong>${siteName}</strong></p>
      <p style="font-size: 12px; margin-top: 15px;">
        © 2025 <strong>${siteName}</strong>. Tous droits réservés.
      </p>
    </div>
  </div>
</body>
</html>`,
    });

    return {
      status: "success",
      message: `Merci ${fullName}, vous êtes maintenant abonné à notre service !`,
    };
  });
