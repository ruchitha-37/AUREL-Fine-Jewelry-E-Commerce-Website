import { marqueeItems } from '../data/products';

export default function MarqueeBar() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div id="marquee" className="bg-gradient-to-r from-onyx via-charcoal to-onyx py-3.5 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-onyx to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-onyx to-transparent z-10" />
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="mx-8 text-sm tracking-[0.15em] text-white font-sans font-light">{item}</span>
        ))}
      </div>
    </div>
  );
}
