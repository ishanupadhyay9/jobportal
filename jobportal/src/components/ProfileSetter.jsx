import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, setUserProfile } from "../services/apicalls/authApi"; // adjust path if needed
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { setRole, setUserData, setUserId } from "../redux/slices/authSlice";
import LoadingScreen from "./LoadingScreen";

const ProfileSetter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading ,setLoading] = useState(false);
  const [formData, setFormData] = useState({
    profilePicture: null,         // will be sent as imageFile
    firstName: "",
    lastName: "",
    age: "",
    gender: "",                   // 'male' / 'female' / 'other'
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
    resume: null                  // will be sent as pdfFile
  });
  const token2 = useSelector((state)=>state.auth.token);
  const [profilePreview, setProfilePreview] = useState(null);
  const [resumeFileName, setResumeFileName] = useState("");

      useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const res = await getUser(dispatch,token2);
            console.log(res.data);
            dispatch(setUserData(res.data));
            dispatch(setUserId(res.data.user_id));
            dispatch(setRole("user"));

            const data = res.data;

setFormData({
  profilePicture: data.user_avatar_link,
  firstName: data.firstname,
  lastName: data.lastname,
  age: data.age,
  gender: data.male === true ? "male" : data.male === false ? "female" : "",

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
          } catch (error) {
            console.error("Error fetching employer:", error);
          }
          finally{
            setLoading(false);
          }
        };
        fetchData();
      }, [token2]);

  const undergraduateCourses = [
    "B.Sc",
    "B.Tech",
    "B.E",
    "B.Com",
    "B.A",
    "BCA",
    "Other"
  ];

  const postgraduateCourses = [
    "M.Sc",
    "M.Tech",
    "M.E",
    "M.Com",
    "M.A",
    "MCA",
    "MBA",
    "Other"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData(prev => ({ ...prev, profilePicture: file }));
      const reader = new FileReader();
      reader.onload = (ev) => setProfilePreview(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({ ...prev, profilePicture: null }));
      setProfilePreview(null);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Please upload a PDF resume.");
        e.target.value = "";
        return;
      }
      setFormData(prev => ({ ...prev, resume: file }));
      setResumeFileName(file.name);
    } else {
      setFormData(prev => ({ ...prev, resume: null }));
      setResumeFileName("");
    }
  };

  const removeResume = () => {
    setFormData(prev => ({ ...prev, resume: null }));
    setResumeFileName("");
    const fileInput = document.querySelector('input[name="resume"]');
    if (fileInput) fileInput.value = "";
  };

  const getFileIcon = (fileName) => {
    if (!fileName) return null;
    const ext = fileName.split(".").pop().toLowerCase();
    if (ext === "pdf") return "PDF";
    if (["doc", "docx"].includes(ext)) return "DOC";
    return "FILE";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.firstName || !formData.lastName) {
      toast.error("Please enter your first and last name.");
      setLoading(false);
      return;
    }
    if (!formData.resume) {
      toast.error("Please upload your resume (PDF).");
      setLoading(false);
      return;
    }

    try {
      await setUserProfile(
        dispatch,
        navigate,
        formData.firstName,
        formData.lastName,
        formData.age ? Number(formData.age) : "", // age as number if present
        (formData.gender.toLowerCase() === "male"), // male boolean
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
        formData.resume,          // pdfFile
        formData.profilePicture   // imageFile (optional)
      );
      // setUserProfile handles toasts/navigation on success. If it returns something falsy, show generic toast (defensive).
      // (No extra actions here to avoid duplicating navigation/toasts.)
    } catch (err) {
      console.error("Error submitting profile:", err);
      toast.error("Failed to save profile.");
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div>
    {
      (loading) ? <LoadingScreen/> :
    <div>
      <div className="min-h-screen bg-transparent flex items-center justify-center p-4 w-[100%]">
        <div className="card bg-transparent w-full shadow-xl">
          <div
            className="flex card-body justify-center ml-[50px] overflow-x-scroll items-center p-6 sm:p-8 rounded-md w-[1000px]"
            data-theme={"light"}
          >
            <div className="w-full max-w-4xl">
              <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
                Update Your Profile
              </h1>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">
                      <span className="label-text">First Name</span>
                    </label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="First name"
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Last Name</span>
                    </label>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="Last name"
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Age</span>
                    </label>
                    <input
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      type="number"
                      placeholder="Age"
                      className="input input-bordered w-full"
                      min={0}
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Gender</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="select select-bordered w-full"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="label">
                      <span className="label-text">City</span>
                    </label>
                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="City"
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">State</span>
                    </label>
                    <input
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="State"
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Country</span>
                    </label>
                    <input
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="Country"
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>

                {/* Academics - 10th / 12th */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">
                      <span className="label-text">10th Percentage</span>
                    </label>
                    <input
                      name="tenthPercentage"
                      value={formData.tenthPercentage}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="10th %"
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">12th Percentage</span>
                    </label>
                    <input
                      name="twelfthPercentage"
                      value={formData.twelfthPercentage}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="12th %"
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>

                {/* Undergraduate */}
                <div className="border p-4 rounded-md">
                  <h2 className="font-semibold mb-3">Undergraduate</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="label">
                        <span className="label-text">Degree</span>
                      </label>
                      <select
                        name="undergradCourse"
                        value={formData.undergradCourse}
                        onChange={handleInputChange}
                        className="select select-bordered w-full"
                      >
                        <option value="">Select degree</option>
                        {undergraduateCourses.map((c) => (
                          <option value={c} key={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">CGPA</span>
                      </label>
                      <input
                        name="undergradCGPA"
                        value={formData.undergradCGPA}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Undergrad CGPA"
                        className="input input-bordered w-full"
                      />
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Institute</span>
                      </label>
                      <input
                        name="undergradInstitute"
                        value={formData.undergradInstitute}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Undergrad institute"
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Postgraduate */}
                <div className="border p-4 rounded-md">
                  <h2 className="font-semibold mb-3">Postgraduate (if any)</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="label">
                        <span className="label-text">Degree</span>
                      </label>
                      <select
                        name="postgradCourse"
                        value={formData.postgradCourse}
                        onChange={handleInputChange}
                        className="select select-bordered w-full"
                      >
                        <option value="">Select degree</option>
                        {postgraduateCourses.map((c) => (
                          <option value={c} key={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">CGPA</span>
                      </label>
                      <input
                        name="postgradCGPA"
                        value={formData.postgradCGPA}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Postgrad CGPA"
                        className="input input-bordered w-full"
                      />
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Institute</span>
                      </label>
                      <input
                        name="postgradInstitute"
                        value={formData.postgradInstitute}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Postgrad institute"
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* File uploads */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="label">
                      <span className="label-text">Profile Picture (optional)</span>
                    </label>
                    <input
                      name="profilePicture"
                      type="file"
                      accept="image/*"
                      onChange={handleProfileFileChange}
                      className="file-input file-input-bordered w-full"
                    />
                    {profilePreview && (
                      <div className="mt-2">
                        <img
                          src={profilePreview}
                          alt="preview"
                          className="w-24 h-24 object-cover rounded-full border"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Resume (PDF) *</span>
                    </label>
                    <input
                      name="resume"
                      type="file"
                      accept="application/pdf"
                      onChange={handleResumeChange}
                      className="file-input file-input-bordered w-full"
                    />
                    {resumeFileName ? (
                      <div className="mt-2 flex items-center gap-3">
                        <span className="badge badge-outline">{getFileIcon(resumeFileName)}</span>
                        <span>{resumeFileName}</span>
                        <button
                          type="button"
                          onClick={removeResume}
                          className="btn btn-sm btn-ghost ml-4"
                        >
                          Remove
                        </button>
                      </div>
                    ) : null}
                    <p className="text-xs mt-2">Only PDF is accepted (resume required).</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button type="submit" className="btn btn-primary">
                    Save Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>}
    </div>
  );
};

export default ProfileSetter;