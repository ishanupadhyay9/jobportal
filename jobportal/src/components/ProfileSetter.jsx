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
  const [resumeUrl, setResumeUrl] = useState("");

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
        if (data.resume_link) {
          setResumeUrl(data.resume_link);
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
    setResumeUrl("");
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
      if (res?.data?.profile?.resume_link) {
        setResumeUrl(res.data.profile.resume_link);
      }
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
            {/* ... other fields ... */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-black">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileFileChange}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label className="block mb-1 text-black">Resume (PDF)</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleResumeChange}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded px-4 py-2 mt-4 hover:bg-blue-700"
            >
              Save Profile
            </button>
          </form>
          {/* Resume Display Box */}
          {resumeUrl && (
            <div className="mt-8 p-4 border border-gray-300 rounded bg-gray-50">
              <h2 className="font-semibold mb-2 text-black">Your Resume:</h2>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View or Download Resume
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSetter;
