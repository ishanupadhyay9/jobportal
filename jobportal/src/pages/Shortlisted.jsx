
import React, { useState } from 'react';
import CandidateCard from '../components/Shortlist/CandidateCard.jsx';           // <— separate file
import { FaFileAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const sampleCandidates = [
  {
    id: 1,
    name: 'John Smith',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    resumeLink: 'https://cfbarhtisgjcqlkwbvfn.supabase.co/storage/v1/object/public/resume-storage/resumes/enrollform.pdf',
    resumeImage: 'https://cfbarhtisgjcqlkwbvfn.supabase.co/storage/v1/object/public/resume-storage/resumes/enrollform.pdf'
  },
  {
    id: 1,
    name: 'John Smith',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    resumeLink: 'https://cfbarhtisgjcqlkwbvfn.supabase.co/storage/v1/object/public/resume-storage/resumes/enrollform.pdf',
    resumeImage: 'https://cfbarhtisgjcqlkwbvfn.supabase.co/storage/v1/object/public/resume-storage/resumes/enrollform.pdf'
  },
  {
    id: 1,
    name: 'John Smith',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    resumeLink: 'https://cfbarhtisgjcqlkwbvfn.supabase.co/storage/v1/object/public/resume-storage/resumes/enrollform.pdf',
    resumeImage: 'https://cfbarhtisgjcqlkwbvfn.supabase.co/storage/v1/object/public/resume-storage/resumes/enrollform.pdf'
  },
  {
    id: 1,
    name: 'John Smith',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    resumeLink: 'https://cfbarhtisgjcqlkwbvfn.supabase.co/storage/v1/object/public/resume-storage/resumes/enrollform.pdf',
    resumeImage: 'https://cfbarhtisgjcqlkwbvfn.supabase.co/storage/v1/object/public/resume-storage/resumes/enrollform.pdf'
  },
    {
    id: 1,
    name: 'John Smith',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    resumeLink: 'https://cfbarhtisgjcqlkwbvfn.supabase.co/storage/v1/object/public/resume-storage/resumes/enrollform.pdf',
    resumeImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=480&q=80'
  },
    {
    id: 1,
    name: 'John Smith',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    resumeLink: 'https://cfbarhtisgjcqlkwbvfn.supabase.co/storage/v1/object/public/resume-storage/resumes/enrollform.pdf',
    resumeImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=480&q=80'
  },
    {
    id: 1,
    name: 'John Smith',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    resumeLink: 'https://cfbarhtisgjcqlkwbvfn.supabase.co/storage/v1/object/public/resume-storage/resumes/enrollform.pdf',
    resumeImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=480&q=80'
  },
    {
    id: 1,
    name: 'John Smith',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    resumeLink: 'https://cfbarhtisgjcqlkwbvfn.supabase.co/storage/v1/object/public/resume-storage/resumes/enrollform.pdf',
    resumeImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=480&q=80'
  },
    {
    id: 1,
    name: 'John Smith',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    resumeLink: 'https://cfbarhtisgjcqlkwbvfn.supabase.co/storage/v1/object/public/resume-storage/resumes/enrollform.pdf',
    resumeImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=480&q=80'
  },

  {
    id: 1,
    name: 'John Smith',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    resumeLink: 'https://example.com/resume-john.pdf',
    resumeImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=480&q=80'
  },
  {
    id: 1,
    name: 'John Smith',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    resumeLink: 'https://example.com/resume-john.pdf',
    resumeImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=480&q=80'
  },
  {
    id: 1,
    name: 'John Smith',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    resumeLink: 'https://example.com/resume-john.pdf',
    resumeImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=480&q=80'
  },{
    id: 1,
    name: 'John Smith',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    resumeLink: 'https://example.com/resume-john.pdf',
    resumeImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=480&q=80'
  },{
    id: 1,
    name: 'John Smith',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    resumeLink: 'https://example.com/resume-john.pdf',
    resumeImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=480&q=80'
  },{
    id: 1,
    name: 'John Smith',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    resumeLink: 'https://example.com/resume-john.pdf',
    resumeImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=480&q=80'
  },{
    id: 1,
    name: 'John Smith',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    resumeLink: 'https://example.com/resume-john.pdf',
    resumeImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=480&q=80'
  },{
    id: 1,
    name: 'John Smith',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    resumeLink: 'https://example.com/resume-john.pdf',
    resumeImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=480&q=80'
  },{
    id: 1,
    name: 'John Smith',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    resumeLink: 'https://example.com/resume-john.pdf',
    resumeImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=480&q=80'
  },
  // …add more candidates
];

const ResumeModal = ({ candidate, isOpen, onClose }) => {
  if (!isOpen || !candidate) return null;

  const openDoc = () => window.open(candidate.resumeLink, '_blank');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{candidate.name}&nbsp;—&nbsp;Resume</h2>
          <button onClick={onClose} className="text-2xl font-bold text-gray-500 hover:text-gray-700">×</button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <img
            src={candidate.image}
            alt="Resume preview"
            className="mx-auto max-w-full h-72 object-cover rounded-lg shadow"
          />

          <div className="text-center">
            <button
              onClick={openDoc}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              <FaFileAlt /> Open Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Shortlisted = ({
  companyLogo = 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  companyName = 'Microsoft',
  jobTitle    = 'Software Engineer',
  candidates  = sampleCandidates
}) => {
  const [page, setPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCandidate, setActiveCandidate] = useState(null);

  const PER_PAGE   = 10;
  const pagesTotal = Math.ceil(candidates.length / PER_PAGE);
  const start      = page * PER_PAGE;
  const view       = candidates.slice(start, start + PER_PAGE);

  const handleShowResume = c => { setActiveCandidate(c); setModalOpen(true); };
  const closeModal       = () => { setModalOpen(false); setActiveCandidate(null); };

  return (
   <div className='w-full'>
    <Navbar/>

     <div className="min-h-screen  p-4">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-6 bg-white rounded-xl shadow-sm p-6 flex items-center gap-6">
        <img src={companyLogo} alt="Logo" className="w-16 h-16 object-contain" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{companyName}</h1>
          <p className="text-lg text-gray-600">{jobTitle}</p>
          <p className="text-sm text-gray-500 mt-1">{candidates.length} candidates</p>
        </div>
      </header>

      {/* Grid */}
      <section className="max-w-6xl mx-auto">
        {view.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {view.map((c, idx) => (
              <CandidateCard
                key={c.id}
                candidate={c}
                number={start + idx + 1}
                onConnect={id => console.log('Connect', id)}
                onRemove={id => console.log('Remove', id)}
                onSelect={(id, sel) => console.log('Select', id, sel)}
                onShowResume={handleShowResume}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-12">No candidates found.</p>
        )}
      </section>

      {/* Pagination */}
      {pagesTotal > 1 && (
        <nav className="flex justify-center gap-2 mt-6">
          <button
            disabled={page === 0}
            onClick={() => setPage(p => Math.max(p - 1, 0))}
            className={`px-3 py-2 rounded-lg text-sm ${
              page === 0 ? 'bg-gray-600 text-white' : 'bg-white text-black shadow-sm border hover:bg-gray-50'
            }`}
          >
            ← Prev
          </button>

          {Array.from({ length: pagesTotal }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-8 h-8 rounded-lg text-sm ${
                page === i ? 'bg-blue-600 text-white' : 'bg-white text-black shadow-sm border hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === pagesTotal - 1}
            onClick={() => setPage(p => Math.min(p + 1, pagesTotal - 1))}
            className={`px-3 py-2 rounded-lg text-sm ${
              page === pagesTotal - 1 ? 'bg-gray-600 text-gray-200' : 'bg-white text-black shadow-sm border hover:bg-gray-50'
            }`}
          >
            Next →
          </button>
        </nav>
      )}

      {/* Resume Modal */}
      <ResumeModal candidate={activeCandidate} isOpen={modalOpen} onClose={closeModal} />
    </div>
   </div>
  );
};

export default Shortlisted;
