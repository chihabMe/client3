import { getUserOrRedirectToLogin } from "@/lib/auth"
import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Package,
  MessageSquare,
  TrendingUp,
  Euro,
  Mail,
  Check,
  X
} from "lucide-react";
import { getOrders, getContacts, markContactAsRead } from "@/app/actoins/admin-actions";
import Link from "next/link";
import { DashboardStats } from "./_components/DashboardStats";

// ... (keep the existing DashboardStats and RecentOrders components as they are)

async function RecentContacts() {
  const { contacts } = await getContacts(1, 5);

  const handleMarkAsRead = async (contactId: string, isRead: boolean) => {
    'use server';
    await markContactAsRead(contactId, isRead);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Messages récents</CardTitle>
          <CardDescription>
            Les 5 derniers messages reçus
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/contacts">
            Voir tout
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {contacts.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Aucun message récent</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div key={contact.id} className="flex items-start space-x-4 p-3 rounded-lg border">
                <div className="flex-shrink-0">
                  <div className={`w-2 h-2 mt-2 rounded-full ${contact.isRead ? 'bg-gray-400' : 'bg-blue-500'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-medium truncate">
                      {contact.fullName} - {contact.subject || 'Sans objet'}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {new Date(contact.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {contact.email} {contact.phoneNumber && `• ${contact.phoneNumber}`}
                  </p>
                  <p className="text-sm mt-1 line-clamp-2">
                    {contact.message}
                  </p>
                </div>
                <div className="flex flex-col space-y-1">
                  <form action={() => handleMarkAsRead(contact.id, !contact.isRead)}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      {contact.isRead ? (
                        <X className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                    </Button>
                  </form>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                    <Link href={`mailto:${contact.email}`}>
                      <Mail className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function AdminDashboard() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
        </div>

        <Suspense fallback={
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-[120px] w-full rounded-xl" />
            ))}
          </div>
        }>
          <DashboardStats />
        </Suspense>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-xl" />}>
              <RecentOrders />
            </Suspense>
          </div>
          <div className="col-span-3">
            <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-xl" />}>
              <RecentContacts />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
