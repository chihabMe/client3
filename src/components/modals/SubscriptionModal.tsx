"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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
      // Here you would send the data to your API
      const response = await subscribeActions(data);
      if (response?.data?.status !== "success") {
        throw new Error("Subscription failed");
      }

      toast({
        title: "Abonnement réussi!",
        description: `Merci de vous être abonné au forfait ${plan.name}. Veuillez vérifier votre email pour les instructions de paiement.`,
        variant: "default",
      });

      form.reset();
      onClose();
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

  // This would be your actual API call

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <DialogContent className="sm:max-w-[500px]    ">
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
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
