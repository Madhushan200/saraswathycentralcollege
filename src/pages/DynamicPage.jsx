import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, isMockEnabled } from '../supabaseClient';
import SectionTitle from '../components/SectionTitle';
import { ArrowLeft, Calendar, FileText } from 'lucide-react';

const DynamicPage = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      setError(null);
      try {
        if (isMockEnabled) {
          const localPages = localStorage.getItem('saraswathy_pages');
          const allPages = localPages ? JSON.parse(localPages) : [];
          const foundPage = allPages.find(p => p.slug === slug);
          if (!foundPage) {
            throw new Error('Custom page not found in local mock database.');
          }
          setPage(foundPage);
          return;
        }

        const { data, error } = await supabase
          .from('pages')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) {
          throw error;
        }
        setPage(data);
      } catch (err) {
        console.error('Error fetching page:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-24 md:pt-28 min-h-screen flex flex-col justify-center items-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-school-navy"></div>
        <p className="mt-4 text-slate-500 font-medium animate-pulse">Loading college portal...</p>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="pt-24 md:pt-28 min-h-screen flex flex-col justify-center items-center bg-slate-50 px-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-xl space-y-6">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-school-navy">Page Not Found</h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              The college page you are looking for does not exist, was renamed, or has been temporarily removed by the administration.
            </p>
          </div>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 w-full bg-school-navy hover:bg-school-navy-light text-white font-bold rounded-xl transition-all shadow-md cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-28 font-sans">
      {/* Banner */}
      <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-school-navy-dark/75 z-10" />
        <img 
          src={page.banner_image || "/gallery-2.jpg"} 
          alt={page.title} 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="max-w-7xl mx-auto px-6 relative z-20 text-center space-y-4">
          <span className="text-school-gold font-bold text-sm uppercase tracking-widest block">
            College Information
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            {page.title}
          </h1>
          <div className="h-1 w-20 bg-school-gold mx-auto" />
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 text-school-navy hover:text-school-gold font-bold text-xs uppercase tracking-wider mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          {/* Dynamic Rich Text Content Container */}
          <div 
            className="prose max-w-none text-slate-700 leading-relaxed space-y-6 text-base md:text-lg 
              prose-headings:text-school-navy prose-headings:font-black prose-headings:tracking-tight 
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:mb-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2 prose-ol:list-decimal prose-ol:pl-6
              prose-strong:text-slate-900 prose-strong:font-bold"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </section>
    </div>
  );
};

export default DynamicPage;
