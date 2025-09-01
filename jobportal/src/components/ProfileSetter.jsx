import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, setUserProfile, updateUserProfile } from "../services/apicalls/authApi";
import { toast } from "react-hot-toast";
import { setRole, setUserData, setUserId } from "../redux/slices/authSlice";
import LoadingScreen from "./LoadingScreen";

const ProfileSetter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [exists, setExists] = useState(false);
  const [formData, setFormData] = useState({
    profilePicture: null,
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    city: "",
    state: "",
    country: "",
    tenthPercentage: "",
    twelfthPercentage: "",
    undergradCourse: "",
    undergradCGPA: "",
    undergradInstitute: "",
    postgradCourse: "",
    postgradCGPA: "",
    postgradInstitute: "",
    resume: null
  });
  const [profilePreview, setProfilePreview] = useState(null);
  const [resumeFileName, setResumeFileName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await getUser(dispatch, token);
        console.log("getUser response:", res);
        const data = res.data;
        dispatch(setUserData(data));
        dispatch(setUserId(data.user_id));
        dispatch(setRole("user"));
        setExists(true);
        setFormData({
          profilePicture: data.user_avatar_link,
          firstName: data.firstname,
          lastName: data.lastname,
          age: data.age,
          gender: data.male ? "male" : "female",
          city: data.city,
          state: data.state,
          country: data.country,
          tenthPercentage: data["10th_percentage"],
          twelfthPercentage: data["12_percentage"],
          undergradCourse: data.undergrad_degree,
          undergradCGPA: data.undergrad_cgpa,
          undergradInstitute: data.undergrad_institute,
          postgradCourse: data.postgrad_degree,
          postgradCGPA: data.postgrad_cgpa,
          postgradInstitute: data.postgrad_institute,
          resume: data.resume_link
        });
        if (data.user_avatar_link) {
          setProfilePreview(data.user_avatar_link);
        }
      } catch (err) {
        if (err.response?.status === 404) {
          setExists(false);
        } else {
          console.error("Error fetching profile:", err);
          toast.error("Error loading profile");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [dispatch, token]);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, profilePicture: file }));
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setProfilePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (file && file.type !== "application/pdf") {
      toast.error("Please upload a PDF resume.");
      e.target.value = "";
      return;
    }
    setFormData(prev => ({ ...prev, resume: file }));
    setResumeFileName(file?.name || "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName) {
      toast.error("Please enter first and last name.");
      return;
    }
    if (!formData.resume) {
      toast.error("Please upload resume (PDF).");
      return;
    }
    setLoading(true);
    try {
      let res;
      if (exists) {
        res = await updateUserProfile(
          dispatch,
          navigate,
          formData.firstName,
          formData.lastName,
          formData.age ? Number(formData.age) : "",
          formData.gender === "male",
          formData.city,
          formData.state,
          formData.country,
          formData.tenthPercentage,
          formData.twelfthPercentage,
          formData.undergradCGPA,
          formData.undergradInstitute,
          formData.postgradCGPA,
          formData.postgradInstitute,
          formData.undergradCourse,
          formData.postgradCourse,
          formData.resume,
          formData.profilePicture
        );
      } else {
        res = await setUserProfile(
          dispatch,
          navigate,
          formData.firstName,
          formData.lastName,
          formData.age ? Number(formData.age) : "",
          formData.gender === "male",
          formData.city,
          formData.state,
          formData.country,
          formData.tenthPercentage,
          formData.twelfthPercentage,
          formData.undergradCGPA,
          formData.undergradInstitute,
          formData.postgradCGPA,
          formData.postgradInstitute,
          formData.undergradCourse,
          formData.postgradCourse,
          formData.resume,
          formData.profilePicture
        );
      }
      console.log("save response:", res);
    } catch (err) {
      console.error("Error saving profile:", err);
      toast.error("Failed to save profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-black">Update Your Profile</h1>
          {profilePreview && (
            <div className="flex justify-center mb-6">
              <img
                src={profilePreview}
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-gray-200"
              />
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="border border-gray-300 rounded px-4 py-2 w-full text-black placeholder-black"
              />
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="border border-gray-300 rounded px-4 py-2 w-full text-black placeholder-black"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="age"
                type="number"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Age"
                className="border border-gray-300 rounded px-4 py-2 w-full text-black placeholder-black"
                min={0}
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-4 py-2 w-full text-black"
              >
                <option value="" className="text-black">Select Gender</option>
                <option value="male" className="text-black">Male</option>
                <option value="female" className="text-black">Female</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className="border border-gray-300 rounded px-4 py-2 w-full text-black placeholder-black"
              />
              <input
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State"
                className="border border-gray-300 rounded px-4 py-2 w-full text-black placeholder-black"
              />
              <input
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Country"
                className="border border-gray-300 rounded px-4 py-2 w-full text-black placeholder-black"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="tenthPercentage"
                value={formData.tenthPercentage}
                onChange={handleInputChange}
                placeholder="10th %"
                className="border border-gray-300 rounded px-4 py-2 w-full text-black placeholder-black"
              />
              <input
                name="twelfthPercentage"
                value={formData.twelfthPercentage}
                onChange={handleInputChange}
                placeholder="12th %"
                className="border border-gray-300 rounded px-4 py-2 w-full text-black placeholder-black"
              />
            </div>

            <div className="border-t pt-4">
              <h2 className="font-semibold mb-3 text-black">Undergraduate</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <select
                  name="undergradCourse"
                  value={formData.undergradCourse}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-4 py-2 w-full text-black"
                >
                  <option value="">Degree</option>
                  {["B.Sc","B.Tech","B.E","B.Com","B.A","BCA","Other"].map(c => (
                    <option key={c} value={c} className="text-black">{c}</option>
                  ))}
                </select>
                <input
                  name="undergradCGPA"
                  value={formData.undergradCGPA}
                  onChange={handleInputChange}
                  placeholder="CGPA"
                  className="border border-gray-300 rounded px-4 py-2 w-full text-black placeholder-black"
                />
                <input
                  name="undergradInstitute"
                  value={formData.undergradInstitute}
                  onChange={handleInputChange}
                  placeholder="Institute"
                  className="border border-gray-300 rounded px-4 py-2 w-full text-black placeholder-black"
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <h2 className="font-semibold mb-3 text-black">Postgraduate (if any)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <select
                  name="postgradCourse"
                  value={formData.postgradCourse}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-4 py-2 w-full text-black"
                >
                  <option value="">Degree</option>
                  {["M.Sc","M.Tech","M.E","M.Com","M.A","MCA","MBA","Other"].map(c => (
                    <option key={c} value={c} className="text-black">{c}</option>
                  ))}
                </select>
                <input
                  name="postgradCGPA"
                  value={formData.postgradCGPA}
                  onChange={handleInputChange}
                  placeholder="CGPA"
                  className="border border-gray-300 rounded px-4 py-2 w-full text-black placeholder-black"
                />
                <input
                  name="postgradInstitute"
                  value={formData.postgradInstitute}
                  onChange={handleInputChange}
                  placeholder="Institute"
                  className="border border-gray-300 rounded px-4 py-2 w-full text-black placeholder-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-black">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileFileChange}
                  className="border border-gray-300 rounded p-2 w-full"
                  name="profilePicture"
                />
              </div>
              <div>
                <label className="block mb-1 text-black">Resume (PDF)</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleResumeChange}
                  className="border border-gray-300 rounded p-2 w-full"
                  name="resume"
                />
                {resumeFileName && (
                  <div className="flex items-center mt-2">
                    <span className="text-black mr-2">{resumeFileName}</span>
                    <button
                      type="button"
                      onClick={() => { setFormData(prev => ({...prev, resume:null})); setResumeFileName(""); }}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded px-4 py-2 mt-4 hover:bg-blue-700"
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetter;
