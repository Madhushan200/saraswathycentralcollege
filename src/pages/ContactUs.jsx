import React from 'react';
import SectionTitle from '../components/SectionTitle';
import ContactForm from '../components/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const FacebookSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const YoutubeSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19c1.71.46 8.59.46 8.59.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

const LinkedinSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const ContactUs = () => {
  return (
    <div className="pt-24 md:pt-28 font-sans">
      {/* Banner */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-school-navy-dark/75 z-10" />
        <img src="/school-building.jpg" alt="Contact Banner" className="absolute inset-0 w-full h-full object-cover" />
        <div className="max-w-7xl mx-auto px-6 relative z-20 text-center space-y-4">
          <span className="text-school-gold font-bold text-sm uppercase tracking-widest font-semibold block">
            Connect With Us
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Contact Us
          </h1>
          <div className="h-1 w-20 bg-school-gold mx-auto" />
        </div>
      </section>

      {/* Main Form & Info Grid */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Info cards */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold text-school-navy mb-4 tracking-tight">
                Get in Touch
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Whether you are a prospective parent seeking admission guidelines, an alumnus looking to reconnect, or have general queries regarding school activities, our office is ready to assist.
              </p>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-school-navy-light/10 text-school-navy flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-school-navy text-base mb-1">Campus Location</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Saraswathy Central College,<br />
                    Saraswathy Lane, Karaveddy,<br />
                    Northern Province, Sri Lanka.
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-school-navy-light/10 text-school-navy flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-school-navy text-base mb-1">Telephone Contacts</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Main Office: +94 21 222 1234<br />
                    Administration: +94 21 222 5678
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-school-navy-light/10 text-school-navy flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-school-navy text-base mb-1">Email Addresses</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Inquiries: info@saraswathycc.edu.lk<br />
                    Principal Office: principal@saraswathycc.edu.lk
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-school-navy-light/10 text-school-navy flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-school-navy text-base mb-1">Office Hours</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Monday - Friday: 7:30 AM - 2:00 PM<br />
                    Closed on Saturdays, Sundays, and Public Holidays.
                  </p>
                </div>
              </div>
            </div>

            {/* Social media connections */}
            <div className="pt-4 space-y-3">
              <h4 className="font-bold text-school-navy text-sm uppercase tracking-wider">
                Follow Us Online
              </h4>
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-school-navy hover:text-school-gold flex items-center justify-center text-slate-600 transition-colors border border-slate-200">
                  <FacebookSVG className="w-5 h-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-school-navy hover:text-school-gold flex items-center justify-center text-slate-600 transition-colors border border-slate-200">
                  <TwitterSVG className="w-5 h-5" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-school-navy hover:text-school-gold flex items-center justify-center text-slate-600 transition-colors border border-slate-200">
                  <YoutubeSVG className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-school-navy hover:text-school-gold flex items-center justify-center text-slate-600 transition-colors border border-slate-200">
                  <LinkedinSVG className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Google Maps Embed Section */}
      <section className="h-[450px] w-full border-t border-slate-200 bg-slate-100">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.2582845681615!2d80.20914841530733!3d9.744111393026362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afe05763ca7b96b%3A0xe54ef3945f3c051a!2sSaraswathy%20Central%20College!5e0!3m2!1sen!2slk!4v1655000000000!5m2!1sen!2slk" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy"
          title="Saraswathy Central College Map Campus"
          className="grayscale opacity-90 hover:grayscale-0 transition-all duration-300"
        />
      </section>
    </div>
  );
};

export default ContactUs;
