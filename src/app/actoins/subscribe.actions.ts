"use server";
import { resend } from "@/lib/email";
import { z } from "zod";
import { publicActionsClient } from "@/lib/safe-actions";

const subscribeSchema = z.object({
  fullName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide." }),
  phoneNumber: z.string().min(10, { message: "Veuillez entrer un numéro de téléphone valide." }),
  planName: z.string(),
  duration: z.string(),
  price: z.string(),
});

export const subscribeActions = publicActionsClient
  .schema(subscribeSchema)
  .action(async ({ parsedInput }) => {
    const { fullName, email, planName, duration, price } = parsedInput;
    const orderId = Math.floor(Math.random() * 900000 + 100000); // Ex: 6 chiffres aléatoires

    await resend.emails.send({
      to: email,
      from: process.env.EMAIL_FROM ?? "",
      subject: `Confirmation de commande #${orderId}`,
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
    .section {
      background-color: #f0f7ff;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      border-left: 4px solid #1a73e8;
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
    @media only screen and (max-width: 600px) {
      .content, .header, .footer {
        padding: 15px;
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
      <p>Votre commande <strong>#${orderId}</strong> a été reçue avec succès. Nous allons activer votre abonnement très prochainement.</p>

      <div class="section">
        <h2>📦 Votre commande</h2>
        <ul>
          <li><strong>Forfait :</strong> ${planName}</li>
          <li><strong>Durée :</strong> ${duration}</li>
          <li><strong>Prix :</strong> ${price} €</li>
        </ul>
      </div>

      <div class="section" style="background-color:#e8f0fe;">
        <h2>💳 Finaliser votre paiement</h2>
        <p>Pour une activation rapide, nous vous recommandons PayPal qui vous offre sécurité, protection et activation instantanée de votre service.</p>
        <ol>
          <li>Accédez à PayPal</li>
          <li>Dans le souci d’éviter la suspension de notre site ainsi que le blocage de tout abonnement, nous vous invitons à saisir la formule « <strong>Service numérique 12 mois</strong> » dans la case de justification du paiement (« Pourquoi ce paiement »).</li>
          <li>Notre adresse email PayPal : <strong>yacinezitouni94@yahoo.fr</strong></li>
          <li>Votre compte sera activé immédiatement</li>
        </ol>
        <div style="text-align: center;">
          <a href="${process.env.PAYMENT_LINK ?? "#"}" class="btn" target="_blank">Payer maintenant via PayPal</a>
        </div>
      </div>

      <h3>📩 Pour toute question, contactez-nous :</h3>
      <p>Email : <a href="mailto:bourouznadir@gmail.com">bourouznadir@gmail.com</a><br>
      WhatsApp : <a href="https://wa.me/213773941700">+213773941700</a></p>

      <p>Merci de votre compréhension.</p>
    </div>

    <div class="footer">
      <p>L’équipe <strong>MEDIA FRANCE</strong></p>
      <p style="font-size: 12px; margin-top: 15px;">© 2025 MEDIA FRANCE. Tous droits réservés.</p>
    </div>
  </div>
</body>
</html>
      `,
    });

    return {
      status: "success",
      message: `Merci ${fullName}, vous êtes maintenant abonné à notre service !`,
    };
  });
