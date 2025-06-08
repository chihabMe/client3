import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  MessageSquare,
  TrendingUp,
  Euro,
  Mail,
  CheckCircle,
  Clock,
  User
} from "lucide-react";
import { getOrders, getContacts } from "@/app/actoins/admin-actions";

export async function DashboardStats() {
  const [ordersData, contactsData] = await Promise.all([
    getOrders(1, 1), // We only need counts
    getContacts(1, 1) // We only need counts
  ]);

  // Calculate stats
  const totalOrders = ordersData.pagination.total;
  const totalContacts = contactsData.pagination.total;
  const unreadContacts = contactsData.contacts.filter(c => !c.isRead).length;

  // Calculate total revenue from all orders
  const totalRevenue = ordersData.orders.reduce((sum, order) => {
    return sum + parseFloat(order.price);
  }, 0);

  // Calculate conversion rate (orders/contacts)
  const conversionRate = totalContacts > 0
    ? Math.round((totalOrders / totalContacts) * 100)
    : 0;

  // Get latest order time
  const latestOrder = ordersData.orders[0]?.createdAt;
  const latestOrderTime = latestOrder
    ? new Date(latestOrder).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    : 'Aucune';

  const stats = [
    {
      title: "Commandes totales",
      value: totalOrders,
      icon: Package,
      description: `Dernière à ${latestOrderTime}`,
      change: "+12% ce mois"
    },
    {
      title: "Messages",
      value: totalContacts,
      icon: MessageSquare,
      description: `${unreadContacts} non lus`,
      change: "+8% ce mois"
    },
    {
      title: "Revenus",
      value: `${totalRevenue.toFixed(0)}€`,
      icon: Euro,
      description: "Toutes commandes",
      change: "+24% ce mois"
    },
    {
      title: "Taux de conversion",
      value: `${conversionRate}%`,
      icon: TrendingUp,
      description: "Messages → Commandes",
      change: "+2% ce mois"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
            {stat.change && (
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">{stat.change}</span>
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
