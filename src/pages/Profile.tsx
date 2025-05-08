import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialProfile = {
  firstName: 'Nagasiva',
  lastName: '',
  headline: '',
  bio: '',
  email: 'nagasivakumari26@gmail.com',
  linkedin: '',
  tiktok: '',
  x: '',
  youtube: '',
};

const sidebarLinks = [
  { label: 'View public profile', path: '#' },
  { label: 'Profile', path: '#', active: true },
  { label: 'Photo', path: '#' },
  { label: 'Account Security', path: '#' },
  { label: 'Subscriptions', path: '#' },
  { label: 'Payment methods', path: '#' },
  { label: 'Privacy', path: '#' },
  { label: 'Notification Preferences', path: '#' },
  { label: 'API clients', path: '#' },
  { label: 'Close account', path: '#' },
];

const Profile: React.FC = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [savedProfile, setSavedProfile] = useState(initialProfile);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedProfile(profile);
    setSaved(true);
    setTimeout(() => navigate('/dashboard'), 800);
  };

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(savedProfile);
    setSaved(false);
    navigate('/dashboard');
  };

  return (
    <div className="section" style={{ background: '#fafbfc', minHeight: '80vh' }}>
      <div className="container" style={{ display: 'flex', maxWidth: 1100, margin: '0 auto' }}>
        {/* Sidebar */}
        <aside style={{ minWidth: 240, marginRight: 40 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#222', color: 'white', fontSize: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              N
            </div>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Nagasiva</div>
          </div>
          <nav>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {sidebarLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.path}
                    style={{
                      display: 'block',
                      padding: '10px 16px',
                      borderRadius: 6,
                      marginBottom: 4,
                      background: link.active ? '#e6e8ea' : 'none',
                      color: link.active ? '#222' : '#555',
                      fontWeight: link.active ? 600 : 400,
                      textDecoration: 'none',
                      transition: 'background 0.2s',
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        {/* Main Content */}
        <main style={{ flex: 1, background: 'white', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '2.5rem 2rem' }}>
          <h1 className="section-title" style={{ fontSize: 28, marginBottom: 24 }}>Public Profile</h1>
          <form>
            <div className="grid grid-2" style={{ gap: '2rem' }}>
              <div>
                <label className="form-label">First Name *</label>
                <input className="form-input" name="firstName" value={profile.firstName} onChange={handleChange} required />
              </div>
              <div>
                <label className="form-label">Last Name</label>
                <input className="form-input" name="lastName" value={profile.lastName} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Headline</label>
              <input className="form-input" name="headline" value={profile.headline} onChange={handleChange} maxLength={60} placeholder="e.g. Blockchain Developer" />
              <div style={{ color: '#888', fontSize: '0.9rem' }}>Add a professional headline like, "Instructor at SkillChain" or "Architect."</div>
            </div>
            <div className="form-group">
              <label className="form-label">Bio</label>
              <textarea className="form-input" name="bio" value={profile.bio} onChange={handleChange} rows={4} placeholder="Tell us about yourself..." />
            </div>
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input className="form-input" name="email" value={profile.email} onChange={handleChange} type="email" required />
            </div>
            <h3 style={{ margin: '2rem 0 1rem' }}>Social Links <span style={{ color: '#888', fontWeight: 400 }}>(optional)</span></h3>
            <div className="grid grid-2" style={{ gap: '2rem' }}>
              <input className="form-input" name="linkedin" value={profile.linkedin} onChange={handleChange} placeholder="LinkedIn profile URL" />
              <input className="form-input" name="tiktok" value={profile.tiktok} onChange={handleChange} placeholder="TikTok username" />
              <input className="form-input" name="x" value={profile.x} onChange={handleChange} placeholder="X (Twitter) username" />
              <input className="form-input" name="youtube" value={profile.youtube} onChange={handleChange} placeholder="YouTube username" />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="submit" className="btn btn-primary" onClick={handleSave} style={{ width: 120 }}>
                Save
              </button>
              <button className="btn btn-secondary" onClick={handleCancel} style={{ width: 120 }}>
                Cancel
              </button>
              {saved && <span style={{ color: 'green', marginLeft: '1rem', alignSelf: 'center' }}>Profile saved!</span>}
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Profile; 