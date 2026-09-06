import { Helmet } from 'react-helmet-async'
import { useParams, Link } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/landing/Footer'

const GUIDES = {
  'how-to-write-arranged-marriage-biodata': {
    title: 'How to Write the Perfect Arranged Marriage Biodata (2026 Guide)',
    description: 'Learn exactly what to include in your marriage biodata to make a great first impression. Tips for families and individuals.',
    content: `
      <h2>1. Start with the Basics</h2>
      <p>The first thing families look at is the basic details: Name, Age, Height, Religion, and Caste. Ensure these are accurate and prominently displayed. Transparency at this stage saves everyone time.</p>
      
      <h2>2. Education and Career (Be Specific)</h2>
      <p>Instead of just "Software Engineer", write "Senior Software Engineer at XYZ Corp". Mention your highest degree clearly. If you have a strong career trajectory, highlight it—modern families value ambition.</p>

      <h2>3. Family Background</h2>
      <p>In Indian arranged marriages, two families unite. Include your father's occupation, mother's background, and details about your siblings. Keeping it concise but informative shows respect for family values.</p>

      <h2>4. The "About Me" Section (Your Secret Weapon)</h2>
      <p>This is where you stand out. Avoid clichés like "I am simple and loving." Instead, write about your actual hobbies, your weekend routine, and your worldview. Are you an introverted bookworm or a weekend trekker?</p>

      <h2>5. Clear Match Preferences</h2>
      <p>State what you are looking for, but keep it realistic. Focus on values, education, and lifestyle compatibility rather than just superficial traits.</p>
    `
  },
  'best-biodata-format-for-marriage': {
    title: 'The Best Biodata Formats for Marriage in India',
    description: 'Discover the top marriage biodata formats. From traditional Word docs to modern mobile-first designs.',
    content: `
      <h2>Why Format Matters</h2>
      <p>A cluttered, badly formatted Word document sends the wrong message. A clean, well-designed biodata shows that you take the process seriously and have good taste.</p>

      <h2>The Traditional Format</h2>
      <p>Often text-heavy and printed on paper. While respected by older generations, it can be hard to read on WhatsApp.</p>

      <h2>The Modern PDF Format</h2>
      <p>Our recommended approach. A clean, single-page PDF with a well-cropped photo, structured sections, and elegant typography. It looks great on both mobile screens and when printed.</p>

      <h2>Live Web Profiles</h2>
      <p>The newest trend is sharing a secure web link. This allows you to include a photo gallery, update details in real-time, and control privacy (e.g., taking the link down once you find a match).</p>
      
      <p><em>Create your modern biodata in 3 minutes with wymm.store's premium templates.</em></p>
    `
  }
}

export default function GuidePage() {
  const { slug } = useParams<{ slug: keyof typeof GUIDES }>()
  const guide = slug ? GUIDES[slug] : null

  if (!guide) {
    return <div className="p-24 text-center">Guide not found</div>
  }

  return (
    <>
      <Helmet>
        <title>{guide.title} | wymm</title>
        <meta name="description" content={guide.description} />
        <link rel="canonical" href={\`https://wymm.store/guide/\${slug}\`} />
      </Helmet>

      <Navbar />
      
      <main className="pt-32 pb-24 min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors">
        <div className="container max-w-3xl mx-auto">
          <Link to="/" className="text-purple-600 hover:underline mb-8 inline-block">← Back to Home</Link>
          <article className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-8 md:p-12">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight font-[Sora]">
              {guide.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 pb-10 border-b border-gray-100 dark:border-slate-800">
              {guide.description}
            </p>
            
            <div 
              className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed space-y-6 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:dark:text-white [&>h2]:mt-10 [&>p]:mb-4"
              dangerouslySetInnerHTML={{ __html: guide.content }}
            />
            
            <div className="mt-16 pt-8 border-t border-gray-100 dark:border-slate-800 text-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Ready to create your own?</h3>
              <Link to="/create" className="btn-primary">Create Your Biodata Now</Link>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
