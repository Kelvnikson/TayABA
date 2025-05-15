import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Session {
  patientName: string;
  time: string;
  duration: string;
  type: string;
  avatarSeed: string;
}

const API_URL = "http://localhost:4000/patients";

const SessionCard = ({ session }: { session: Session }) => (
  <Card className="mb-3">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${session.avatarSeed}`}
            />
            <AvatarFallback>
              {session.patientName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium">{session.patientName}</h4>
            <p className="text-sm text-muted-foreground">{session.type}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium">{session.time}</p>
          <p className="text-sm text-muted-foreground">{session.duration}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

function isToday(nextSession: string) {
  // Espera formato: "Hoje, 15:00" ou "Amanhã, 14:00" ou "15/05/2025, 14:00"
  if (!nextSession) return false;
  const [datePart] = nextSession.split(",");
  const today = new Date();
  const todayStr = today.toLocaleDateString("pt-BR");
  if (datePart.trim().toLowerCase() === "hoje") return true;
  if (datePart.trim() === todayStr) return true;
  return false;
}

const UpcomingSessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const mapped = data
          .filter((p: any) => isToday(p.nextSession))
          .map((p: any) => ({
            patientName: p.name,
            time: p.nextSession.split(",")[1]?.trim() || "",
            duration: "45 min", // ajuste conforme necessário
            type: "Sessão Individual", // ajuste conforme necessário
            avatarSeed: p.avatarSeed || p.name.split(" ")[0].toLowerCase(),
          }));
        setSessions(mapped);
      });
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">
          Sessões de Hoje
        </CardTitle>
        <Calendar className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {sessions.length > 0 ? (
          sessions.map((session, idx) => (
            <SessionCard key={idx} session={session} />
          ))
        ) : (
          <div className="text-center text-muted-foreground py-4">
            Nenhuma sessão agendada para hoje.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingSessions;
