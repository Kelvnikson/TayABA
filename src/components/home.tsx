import DashboardHeader from "./DashboardHeader";
import MetricsOverview from "./MetricsOverview";
import PatientsList from "./PatientsList";
import UpcomingSessions from "./UpcomingSessions";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <MetricsOverview />
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PatientsList />
        </div>
        <div>
          <UpcomingSessions />
        </div>
      </div>
    </div>
  );
}

export default Home;
