"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Loader2, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PricingPlan } from "../sections/pricing/PricingSection";
import { subscribeActions } from "@/app/actoins/subscribe.actions";

export const subscribeSchema = z.object({
  fullName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Veuillez entrer un numéro de téléphone valide.",
  }),
});

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PricingPlan;
}

type FormValues = z.infer<typeof subscribeSchema>;

const SubscriptionModal = ({
  isOpen,
  onClose,
  plan,
}: SubscriptionModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // Save email to show in success message
      setUserEmail(data.email);
      
      // Here you would send the data to your API
      const response = await subscribeActions({
        ...data,
        planName: plan.name,
        duration: plan.period,
        price: plan.price.toString(),
      });
      
      if (response?.data?.status !== "success") {
        throw new Error("Subscription failed");
      }

      // Show success state in modal instead of closing it
      setIsSuccess(true);
      
      toast({
        title: "Abonnement réussi!",
        description: `Merci de vous être abonné au forfait ${plan.name}.`,
        variant: "default",
      });

      form.reset();
    } catch {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} modal>
      <DialogContent className="sm:max-w-[500px]">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Abonnez-vous au forfait {plan.name}
              </DialogTitle>
              <DialogDescription>
                <div className="mt-2 flex items-baseline justify-center">
                  <span className="text-2xl font-bold text-[#0055A4]">
                    ${plan.price}
                  </span>
                  <span className="ml-1 text-gray-600">/{plan.period}</span>
                </div>
                <p className="mt-4">
                  Entrez vos informations ci-dessous pour recevoir les instructions
                  de paiement par email.
                </p>
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom complet</FormLabel>
                      <FormControl>
                        <Input placeholder="Jean Dupont" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="jean.dupont@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numéro de téléphone</FormLabel>
                      <FormControl>
                        <Input placeholder="+33 6 12 34 56 78" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0055A4] hover:bg-[#0055A4]/90 text-white py-6 rounded-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Traitement...
                      </>
                    ) : (
                      "S'abonner maintenant"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        ) : (
          <div className="flex flex-col items-center text-center py-6">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            
            <DialogTitle className="text-2xl font-bold mb-4">
              Abonnement Réussi!
            </DialogTitle>
            
            <DialogDescription className="space-y-4">
              <p>
                Merci de vous être abonné au forfait <span className="font-medium">{plan.name}</span>.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center">
                <Mail className="h-6 w-6 text-blue-500 mb-2" />
                <p className="text-sm">
                  Nous avons envoyé les instructions de paiement à <span className="font-medium">{userEmail}</span>
                </p>
                <p className="text-sm mt-2 text-amber-600 font-medium">
                  Veuillez vérifier votre boîte de réception et vos dossiers spam/indésirables.
                </p>
              </div>
            </DialogDescription>
            
            <Button
              onClick={handleClose}
              className="mt-6 bg-[#0055A4] hover:bg-[#0055A4]/90 text-white py-2 px-4 rounded-xl"
            >
              Fermer
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
