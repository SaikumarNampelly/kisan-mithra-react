import Spinner from "@/components/ui/spinner";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import ScheduledCard from "@/src/components/ScheduledCard";
// import Chat from "@/src/pages/Dashboards/DoctorDashboard/Sections/Chat";
import Chat from "./Chat";

import { APPWRITE_APPOINTMENTS_TABLE_ID } from "@/src/Utils/Appwrite/constants";
import useAuthStore from "@/store/authStore";
import { Query } from "appwrite";
import { useEffect, useState } from "react";

const MyAppointments = () => {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [activeChatUserId, setActiveChatUserId] = useState(null);

  const currentUser = useAuthStore((state) => state.currentUser);
  const appwriteTablesDB = new AppwriteTablesDB();

  useEffect(() => {
    if (!currentUser) return;

    const fetchAppointments = async () => {
      try {
        const result = await appwriteTablesDB.listRows(
          APPWRITE_APPOINTMENTS_TABLE_ID,
          [
            Query.equal("doctorId", currentUser.$id),
            Query.equal("status", "accepted"),
          ],
        );

        setAppointments(result.rows);
      } catch (error) {
        console.error("listRows error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [currentUser]);

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold mb-4">📅 My Appointments</h2>

      <p className="text-gray-600 mb-4">
        Your confirmed appointments will show here.
      </p>

      {loading ? (
        <div className="min-h-50 flex items-center justify-center">
          <Spinner className="size-10 text-emerald-600 animate-spin" />
        </div>
      ) : appointments.length === 0 ? (
        <p className="text-gray-500">No confirmed appointments yet.</p>
      ) : (
        appointments.map((appointment) => (
          <ScheduledCard
            key={appointment.$id}
            farmerId={appointment.farmerId}
            farmerName={appointment.farmerName}
            issue={appointment.issue}
            appointmentDate={appointment.appointmentDate}
            imageIds={appointment.imageIds}
              audioId={appointment.audioId} 
            onChat={() => setActiveChatUserId(appointment.farmerId)}
          />
        ))
      )}

      {/* 💬 CHAT POPUP */}
      {activeChatUserId && (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg relative">
            <button
              onClick={() => setActiveChatUserId(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <Chat otherUserId={activeChatUserId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
