import { Users, Calendar, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const MetricCard = ({ icon: Icon, title, value, trend }: any) => (
  <Card className="flex-1">
    <CardContent className="pt-6">
      <div className="flex items-center justify-between">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <span
          className={`text-sm ${trend > 0 ? "text-green-500" : "text-red-500"}`}
        >
          {trend > 0 ? "+" : ""}
          {trend}%
        </span>
      </div>
      <h3 className="mt-4 text-2xl font-bold">{value}</h3>
      <p className="text-sm text-muted-foreground">{title}</p>
    </CardContent>
  </Card>
);

const MetricsOverview = () => {
  const metrics = [
    { icon: Users, title: "Total de Pacientes", value: "42", trend: 12 },
    { icon: Calendar, title: "Sessões Esta Semana", value: "156", trend: 8 },
    { icon: TrendingUp, title: "Taxa de Progresso", value: "78%", trend: 5 },
    { icon: Clock, title: "Tempo Médio de Sessão", value: "45m", trend: -2 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-white">
      {metrics.map((metric, idx) => (
        <MetricCard key={idx} {...metric} />
      ))}
    </div>
  );
};

export default MetricsOverview;
