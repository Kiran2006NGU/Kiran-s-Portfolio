import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Send, 
  Copy, 
  Check, 
  CheckCircle2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const ContactSection: React.FC = () => {
  const { portfolio } = usePortfolio();
  const personalInfo = portfolio.personalInfo;

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>LET'S CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Get In Touch With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{personalInfo.shortName}</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 light-theme:text-slate-600">
            Open for software engineering internships, research projects, open-source collaborations, and hackathon teams.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Direct Details & Social Links */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Info Cards */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-800 light-theme:border-slate-200">
              <h3 className="text-xl font-bold">Contact Details</h3>

              <div className="space-y-4">
                
                {/* Email Box */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 light-theme:bg-slate-100 border border-slate-800 light-theme:border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">EMAIL</div>
                      <a href={`mailto:${personalInfo.email}`} className="text-xs sm:text-sm font-semibold hover:text-blue-400 transition-colors">
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(personalInfo.email, 'email')}
                    className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 light-theme:bg-slate-200 transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone Box */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 light-theme:bg-slate-100 border border-slate-800 light-theme:border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">PHONE</div>
                      <a href={`tel:${personalInfo.phone}`} className="text-xs sm:text-sm font-semibold hover:text-amber-400 transition-colors">
                        +91 {personalInfo.phone}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(personalInfo.phone, 'phone')}
                    className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 light-theme:bg-slate-200 transition-colors"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Location Box */}
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/60 light-theme:bg-slate-100 border border-slate-800 light-theme:border-slate-200">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">LOCATION</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-200 light-theme:text-slate-800">
                      {personalInfo.location}
                    </div>
                  </div>
                </div>

              </div>

              {/* Social Profiles & QR Code Banner */}
              <div className="pt-2 space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase">PROFILES & NETWORKING</div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-900/80 light-theme:bg-slate-200 border border-slate-800 hover:border-blue-500 transition-all text-xs font-bold"
                  >
                    <Github className="w-4 h-4 text-blue-400" />
                    GitHub
                  </a>

                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-900/80 light-theme:bg-slate-200 border border-slate-800 hover:border-blue-500 transition-all text-xs font-bold"
                  >
                    <Linkedin className="w-4 h-4 text-indigo-400" />
                    LinkedIn
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Block: Interactive Message Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-800 light-theme:border-slate-200 relative">
              
              <div className="space-y-1">
                <h3 className="text-xl font-bold">Send a Message</h3>
                <p className="text-xs text-slate-400">
                  Fill out the form below to directly drop an inquiry or internship proposal to Kiran.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-in zoom-in-95 duration-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-300">Message Delivered Successfully!</h4>
                  <p className="text-xs text-slate-300 light-theme:text-slate-700">
                    Thank you for reaching out. Kiran will review your message and reply promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-bold text-slate-400">Your Name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Smith"
                        className="w-full bg-slate-950 light-theme:bg-white text-slate-200 light-theme:text-slate-900 px-4 py-3 rounded-xl text-xs border border-slate-800 light-theme:border-slate-300 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-bold text-slate-400">Email Address *</label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@company.com"
                        className="w-full bg-slate-950 light-theme:bg-white text-slate-200 light-theme:text-slate-900 px-4 py-3 rounded-xl text-xs border border-slate-800 light-theme:border-slate-300 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="text-xs font-bold text-slate-400">Subject</label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Internship Opportunity / Research Collaboration"
                      className="w-full bg-slate-950 light-theme:bg-white text-slate-200 light-theme:text-slate-900 px-4 py-3 rounded-xl text-xs border border-slate-800 light-theme:border-slate-300 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-bold text-slate-400">Message *</label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your inquiry or proposal message here..."
                      className="w-full bg-slate-950 light-theme:bg-white text-slate-200 light-theme:text-slate-900 px-4 py-3 rounded-xl text-xs border border-slate-800 light-theme:border-slate-300 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <button
                    id="submit-contact-form-btn"
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-lg hover:shadow-blue-500/25 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
