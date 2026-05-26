import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{8,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message content is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="bg-white border border-slate-100 p-6 md:p-10 rounded-3xl shadow-lg relative overflow-hidden">
      {submitSuccess && (
        <div className="absolute inset-0 bg-white/95 z-10 flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
          <CheckCircle className="w-16 h-16 text-emerald-500 mb-4 animate-scaleUp" />
          <h3 className="text-2xl font-bold text-school-navy mb-2">Message Sent Successfully!</h3>
          <p className="text-slate-600 max-w-sm mb-6">
            Thank you for reaching out to Saraswathy Central College. We will review your message and respond as soon as possible.
          </p>
          <button 
            onClick={() => setSubmitSuccess(false)}
            className="px-6 py-2 bg-school-navy text-white hover:bg-school-navy-light text-sm font-bold rounded-lg transition-colors"
          >
            Send Another Message
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name field */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-bold text-school-navy mb-2">
              Full Name *
            </label>
            <input 
              type="text" 
              id="name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Priyanthan Shanmugam"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name ? 'border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-school-navy'
              } outline-none transition-colors text-slate-800`}
            />
            {errors.name && (
              <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
              </span>
            )}
          </div>

          {/* Email field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-bold text-school-navy mb-2">
              Email Address *
            </label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. priyanthan@example.com"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? 'border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-school-navy'
              } outline-none transition-colors text-slate-800`}
            />
            {errors.email && (
              <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phone field */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm font-bold text-school-navy mb-2">
              Phone Number *
            </label>
            <input 
              type="text" 
              id="phone" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +94 77 123 4567"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.phone ? 'border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-school-navy'
              } outline-none transition-colors text-slate-800`}
            />
            {errors.phone && (
              <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
              </span>
            )}
          </div>

          {/* Subject field */}
          <div className="flex flex-col">
            <label htmlFor="subject" className="text-sm font-bold text-school-navy mb-2">
              Subject *
            </label>
            <input 
              type="text" 
              id="subject" 
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. Inquiry about Advanced Level Admissions"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.subject ? 'border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-school-navy'
              } outline-none transition-colors text-slate-800`}
            />
            {errors.subject && (
              <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.subject}
              </span>
            )}
          </div>
        </div>

        {/* Message field */}
        <div className="flex flex-col">
          <label htmlFor="message" className="text-sm font-bold text-school-navy mb-2">
            Message *
          </label>
          <textarea 
            id="message" 
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.message ? 'border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-school-navy'
            } outline-none transition-colors text-slate-800 resize-none`}
          />
          {errors.message && (
            <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
            </span>
          )}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full md:w-auto px-8 py-4 bg-school-navy hover:bg-school-navy-light text-white hover:text-school-gold font-bold rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>Sending...</span>
          ) : (
            <>
              <span>Send Message</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
