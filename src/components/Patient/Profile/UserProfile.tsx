import { useState, useEffect } from "react";
import { Navbar } from "../../Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchPatientById } from "../../Hooks/Patient/useFetchPatientById";
import type { PatientDetailType } from "../../../types/ProfileDetailTypes";
import { getUpdatedField } from "../../Hooks/Forms/getUpdatedField";
import { useUpdatePatientById } from "../../Hooks/Patient/useUpdatePatientById";
import { toast } from "sonner";
import PatientDetailForm from "../PatientDetailForm/PatientDetailForm";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [patient, setPatient] = useState<
    Omit<PatientDetailType, "id" | "email">
  >({
    patientname: "",
    age: null,
    gender: "",
    bloodGroup: null,
    phone: null,
    address: "",
    height: null,
    weight: null,
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const safeId = id || "";
  const { data: patientData } = useFetchPatientById(safeId);

  useEffect(() => {
    if (patientData) {
      setPatient({
        patientname: patientData.patientname || "",
        phone: patientData.phone,
        age: patientData.age,
        gender: patientData.gender || "",
        bloodGroup: patientData.bloodGroup,
        address: patientData.address || "",
        height: patientData.height,
        weight: patientData.weight,
      });
    }
  }, [patientData]);

  const handleCreateProfile = () => {
    setShowCreateForm(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPatient((prev) => {
      const updatedValue =
        ["age", "height", "weight", "phone"].includes(name) && value !== ""
          ? Number(value)
          : value === ""
          ? null
          : value;

      return { ...prev, [name]: updatedValue };
    });
  };

  const handleEditToggle = () => setIsEditing(!isEditing);
  const { mutate: updateDetails } = useUpdatePatientById(id ?? "");
  const updatedFields = getUpdatedField(patient, patientData);

  const handleSaveButton = () => {
    if (!id || !patientData) return;

    updateDetails(updatedFields);
    setIsEditing(false);
    toast.success("Profile updated!");
  };

  const handleAppointmentButton = () => {
    navigate(`/userprofile/${id}/appointments/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {!patientData && !showCreateForm && (
            <div className="flex flex-col items-center justify-center mt-10 space-y-4">
              <p className="text-gray-600 text-center">
                User profile not found
              </p>
              <button
                onClick={handleCreateProfile}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-xl shadow"
              >
                Create a profile
              </button>
            </div>
          )}

          {showCreateForm && (
            <PatientDetailForm
              onSubmitButtonClick={() => setShowCreateForm(false)}
            />
          )}

          {patientData && (
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    {patient.patientname}
                  </h2>
                  <p className="text-gray-500 text-sm">Patient Profile</p>
                </div>
                <div className="flex gap-3">
                  <button
                    className="px-4 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                    onClick={handleAppointmentButton}
                  >
                    Show Appointments
                  </button>
                  <button
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={handleEditToggle}
                  >
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Name", key: "patientname" },
                  { label: "Phone", key: "phone" },
                  { label: "Age", key: "age" },
                  { label: "Gender", key: "gender" },
                  { label: "Blood Group", key: "bloodGroup" },
                  { label: "Address", key: "address" },
                  { label: "Height", key: "height" },
                  { label: "Weight", key: "weight" },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-gray-600 font-medium mb-1">
                      {label}
                    </label>
                    {isEditing ? (
                      <input
                        name={key}
                        value={(patient as any)[key] ?? ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md shadow-sm"
                      />
                    ) : (
                      <p className="text-gray-800">{(patient as any)[key]}</p>
                    )}
                  </div>
                ))}
              </div>

              {isEditing && (
                <div className="flex justify-end mt-8">
                  <button
                    type="button"
                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    onClick={handleSaveButton}
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
