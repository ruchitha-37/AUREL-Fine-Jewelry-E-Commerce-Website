export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerLinks = {
    Collections: ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'New Arrivals'],
    'About AUREL': ['Our Story', 'Craftsmanship', 'Sustainability', 'Press'],
    'Client Care': ['Contact Us', 'Shipping & Returns', 'Size Guide', 'FAQ'],
  };

  return (
    <footer id="footer" className="bg-onyx text-ivory/80">
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <span className="text-rose-gold text-sm tracking-[0.3em] uppercase">Stay Connected</span>
          <h3 className="font-serif text-3xl md:text-4xl text-ivory mt-3 mb-4">Join the AUREL World</h3>
          <p className="text-silver-metal/60 text-sm max-w-md mx-auto mb-8">Be the first to discover new collections, exclusive events, and bespoke offers.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input type="email" id="newsletter-email" placeholder="Your email address"
              className="w-full px-5 py-3 bg-white/5 border border-white/10 text-ivory text-sm tracking-wider placeholder-silver-metal/40 rounded-full focus:outline-none focus:border-rose-gold/50 transition-colors" />
            <button id="newsletter-subscribe"
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-rose-gold to-deep-rose text-white text-sm tracking-[0.15em] uppercase font-semibold rounded-full hover:shadow-[0_0_20px_rgba(183,110,121,0.4)] transition-all whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-gold to-deep-rose flex items-center justify-center">
                <span className="text-white font-serif text-sm font-bold">A</span>
              </div>
              <span className="font-serif text-xl tracking-[0.15em] text-ivory">AUREL</span>
            </div>
            <p className="text-silver-metal/50 text-sm leading-relaxed mb-4">Where heritage craftsmanship meets contemporary elegance. Each piece is a testament to timeless beauty.</p>
            <div className="flex gap-3">
              {['Instagram', 'Pinterest', 'Facebook'].map((s) => (
                <a key={s} href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-silver-metal/50 hover:border-rose-gold/50 hover:text-rose-gold transition-all" aria-label={s}>
                  <span className="text-xs">{s[0]}</span>
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs tracking-[0.2em] uppercase text-rose-gold mb-4 font-semibold">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}><a href="#" className="text-sm text-silver-metal/50 hover:text-ivory transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-silver-metal/40 text-xs tracking-wider">© {currentYear} AUREL Fine Jewelry. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((l) => (
              <a key={l} href="#" className="text-silver-metal/40 text-xs hover:text-ivory transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
