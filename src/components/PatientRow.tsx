import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export interface PatientRowProps {
  name: string;
  age: number;
  nextSession: string;
  progress: number;
  status: "Ativo" | "Pen" | "completed";
  avatarSeed?: string;
}

const PatientRow = ({
  name = "John Doe",
  age = 8,
  nextSession = "Amanhã, 14:00",
  progress = 75,
  status = "active",
  avatarSeed = "patient1",
}: PatientRowProps) => {
  const statusColors = {
    active: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-blue-100 text-blue-800",
  };

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 border-b">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`}
          />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">{age} anos de idade</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-sm">
          <p className="text-muted-foreground">Próxima Sessão</p>
          <p>{nextSession}</p>
        </div>

        <div className="w-32">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Progresso</span>
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary rounded-full h-2"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Badge variant="secondary" className={statusColors[status]}>
          {status === "active"
            ? "Ativo"
            : status === "pending"
            ? "Pendente"
            : status === "completed"
            ? "Concluído"
            : status}
        </Badge>
      </div>
    </div>
  );
};

export default PatientRow;
