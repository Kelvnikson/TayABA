import { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import PatientRow, { PatientRowProps } from "./PatientRow";
import PatientForm from "./PatientForm";

const API_URL = "http://localhost:4000/patients";

const PatientsList = () => {
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState<PatientRowProps[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState<PatientRowProps | null>(null);

  // Buscar pacientes do backend ao carregar
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setPatients(data));
  }, []);

  // Filtra pacientes pelo nome digitado
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setEditingPatient(null);
    setShowForm(true);
  };

  const handleEdit = (patient: PatientRowProps) => {
    setEditingPatient(patient);
    setShowForm(true);
  };

  const handleDelete = async (patient: any) => {
    if (window.confirm(`Deseja remover ${patient.name}?`)) {
      await fetch(`${API_URL}/${patient._id}`, { method: "DELETE" });
      setPatients((prev) => prev.filter((p) => p._id !== patient._id));
    }
  };

  const handleSave = async (patient: any) => {
    if (editingPatient && editingPatient._id) {
      // Editar paciente
      const res = await fetch(`${API_URL}/${editingPatient._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient),
      });
      const updated = await res.json();
      setPatients((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p))
      );
    } else {
      // Adicionar paciente
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient),
      });
      const created = await res.json();
      setPatients((prev) => [...prev, created]);
    }
    setShowForm(false);
    setEditingPatient(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-xl font-semibold mb-4">Pacientes</h2>
        <button
          className="flex items-center gap-2 px-3 py-1 bg-primary text-white rounded hover:bg-primary/90"
          onClick={handleAdd}
        >
          <Plus size={16} /> Adicionar
        </button>
      </div>
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar pacientes..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="divide-y">
        {filteredPatients.map((patient, idx) => (
          <div key={patient._id || idx} className="flex items-center justify-between group">
            <PatientRow {...patient} />
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <button
                className="p-1 rounded hover:bg-gray-100"
                title="Editar"
                onClick={() => handleEdit(patient)}
              >
                <Edit size={16} />
              </button>
              <button
                className="p-1 rounded hover:bg-gray-100 text-red-500"
                title="Remover"
                onClick={() => handleDelete(patient)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {filteredPatients.length === 0 && (
          <div className="p-4 text-center text-muted-foreground">
            Nenhum paciente encontrado.
          </div>
        )}
      </div>
      {showForm && (
        <PatientForm
          patient={editingPatient}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default PatientsList;
