import { useState } from "react";
import { PatientRowProps } from "./PatientRow";

interface PatientFormProps {
  patient: PatientRowProps | null;
  onSave: (patient: PatientRowProps) => void;
  onCancel: () => void;
}

const statusOptions = [
  { value: "active", label: "Ativo" },
  { value: "pending", label: "Pendente" },
  { value: "completed", label: "Concluído" },
];

const PatientForm = ({ patient, onSave, onCancel }: PatientFormProps) => {
  const [name, setName] = useState(patient?.name || "");
  const [age, setAge] = useState(patient?.age || 0);
  const [nextSession, setNextSession] = useState(patient?.nextSession || "");
  const [progress, setProgress] = useState(patient?.progress || 0);
  const [status, setStatus] = useState<"active" | "pending" | "completed">(
    (patient?.status as any) || "active"
  );
  const [avatarSeed, setAvatarSeed] = useState(patient?.avatarSeed || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    onSave({
      name,
      age,
      nextSession,
      progress,
      status,
      avatarSeed: avatarSeed || name.split(" ")[0].toLowerCase(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <form
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-2">
          {patient ? "Editar Paciente" : "Adicionar Paciente"}
        </h2>
        <div>
          <label className="block text-sm mb-1">Nome</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Idade</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={age}
            min={0}
            onChange={(e) => setAge(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Próxima Sessão</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={nextSession}
            onChange={(e) => setNextSession(e.target.value)}
            placeholder="Ex: Amanhã, 14:00"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Progresso (%)</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={progress}
            min={0}
            max={100}
            onChange={(e) => setProgress(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Status</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Avatar (opcional)</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={avatarSeed}
            onChange={(e) => setAvatarSeed(e.target.value)}
            placeholder="Ex: nome ou apelido"
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;