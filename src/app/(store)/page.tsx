import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: "RigCables — Hand-Assembled RF Cables Built to Your Spec",
  description:
    "Custom RF cable assemblies for ham radio, military, commercial, maritime, and government. Times Microwave LMR, Amphenol connectors, built to your exact specifications.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "RigCables — Hand-Assembled RF Cables Built to Your Spec",
    description: "Custom RF cable assemblies built to your exact specifications. Ham radio, military, commercial, and more.",
    type: "website",
    url: siteConfig.url,
  },
}

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ── Feature Banners (3-col) ──────────────────────────────────────────── */}
      <section className="w-full xl:py-[50px] xl:px-[25px]">
        <div className="flex flex-col md:flex-row md:gap-9 md:max-w-[1600px] md:mx-auto">
          {[
            {
              img: "/images/feature-times-microwave.jpg",
              alt: "Times Microwave & Amphenol RF cables and connectors",
              headline: "Times Microwave & Amphenol",
              body: "Times Microwave and Amphenol products aren't just a collection — they're a testament to uncompromising excellence in RF connectivity.",
              cta: "Shop Now",
              href: "/shop",
            },
            {
              img: "/images/feature-custom-assemblies.jpg",
              alt: "RigCables premium and RG military spec custom cable assemblies",
              headline: "RigCables Premium and RG Military Spec Cables",
              body: "Whether you're running 100 watts with a wire, or a big gun station, we'll build quality cables to your exact specifications.",
              cta: "Build Your Cable",
              href: "/build",
            },
            {
              img: "/images/feature-dc-power.jpg",
              alt: "DC power cables and Powerpole products",
              headline: "DC Power",
              body: "RigCables sells premium DC cable by the foot and Powerpole® products and tools.",
              cta: "Shop Now",
              href: "/shop",
            },
          ].map(({ img, alt, headline, body, cta, href }, i) => (
            <div key={headline} className="relative flex flex-1 flex-col justify-end min-h-[400px] xl:min-h-[600px] overflow-hidden">
              <Image src={img} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" priority={i === 0} />
              {/* flat uniform 43% black overlay — matches live site */}
              <div className="absolute inset-0 bg-black/[0.43]" />
              <div className="relative z-10 p-6 md:p-10 text-center text-white">
                <h2 className="text-2xl font-semibold mb-4">{headline}</h2>
                <p className="text-sm font-semibold leading-relaxed mb-6">{body}</p>
                <Link
                  href={href}
                  className="inline-flex items-center gap-2 rounded bg-white px-5 py-2.5 text-sm font-bold text-neutral-900 transition-opacity hover:opacity-90"
                >
                  {cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Text Stack ───────────────────────────────────────────────────────── */}
      <section className="w-full px-[30px] py-[30px] text-center xl:py-[50px]">
        <div className="mx-auto max-w-[1920px]">
          <h2 className="text-[42px] font-normal leading-tight text-[#222]">
            Precision-Built Cables <strong>for Every Connection</strong>
          </h2>
          <p className="mt-4 text-[32px] leading-snug text-[#222]">
            Supporting Ham Radio, Military, Commercial Industry, Maritime and Government.<br />
            OEM &amp; Private Label Cable Assemblies
          </p>
        </div>
      </section>

      {/* ── Applications Grid ────────────────────────────────────────────────── */}
      <section className="w-full px-[15px] py-[30px] xl:px-[30px]">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 xl:gap-x-20 xl:gap-y-9">
          {[
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.9548 9.05444C20.265 10.3669 21.0008 12.1455 21.0008 13.9999C21.0008 15.8544 20.265 17.633 18.9548 18.9454" stroke="white" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22.2542 5.75513C24.4392 7.94266 25.6665 10.9081 25.6665 14C25.6665 17.0918 24.4392 20.0573 22.2542 22.2448" stroke="white" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.74584 22.2448C3.56082 20.0573 2.3335 17.0918 2.3335 14C2.3335 10.9081 3.56082 7.94266 5.74584 5.75513" stroke="white" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.04515 18.9454C7.735 17.633 6.99915 15.8544 6.99915 13.9999C6.99915 12.1455 7.735 10.3669 9.04515 9.05444" stroke="white" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 16.3333C15.2887 16.3333 16.3333 15.2886 16.3333 14C16.3333 12.7113 15.2887 11.6666 14 11.6666C12.7113 11.6666 11.6667 12.7113 11.6667 14C11.6667 15.2886 12.7113 16.3333 14 16.3333Z" stroke="white" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              label: "Ham Radio",
              desc: "Custom cables for amateur radio enthusiasts and operators",
              href: "/ham-radio",
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 23.3334H14.0117" stroke="white" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2.33331 10.29C5.54178 7.42027 9.69537 5.83374 14 5.83374C18.3046 5.83374 22.4582 7.42027 25.6666 10.29" stroke="white" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.83331 15.0022C8.01415 12.8646 10.9462 11.6672 14 11.6672C17.0538 11.6672 19.9858 12.8646 22.1666 15.0022" stroke="white" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.91669 19.1673C11.0071 18.0984 12.4731 17.4998 14 17.4998C15.5269 17.4998 16.9929 18.0984 18.0834 19.1673" stroke="white" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              label: "Wi-Fi Systems",
              desc: "High-performance cables for wireless network infrastructure",
              href: "/wifi-systems",
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.33337 14L8.16671 2.33337" stroke="white" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.16663 14L14 2.33337" stroke="white" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 14L19.8333 2.33337" stroke="white" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.8334 14L25.6667 2.33337" stroke="white" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.25 8.16663H22.75" stroke="white" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 18.6666V25.6666" stroke="white" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              label: "DAS Systems",
              desc: "Distributed Antenna System solutions for seamless connectivity",
              href: "/das-systems",
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 25.6667V4.66671C7 4.04787 7.24583 3.45438 7.68342 3.01679C8.121 2.57921 8.71449 2.33337 9.33333 2.33337H18.6667C19.2855 2.33337 19.879 2.57921 20.3166 3.01679C20.7542 3.45438 21 4.04787 21 4.66671V25.6667H7Z" stroke="white" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.00001 14H4.66668C4.04784 14 3.45435 14.2458 3.01676 14.6834C2.57918 15.121 2.33334 15.7145 2.33334 16.3333V23.3333C2.33334 23.9522 2.57918 24.5457 3.01676 24.9832C3.45435 25.4208 4.04784 25.6667 4.66668 25.6667H7.00001" stroke="white" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 10.5H23.3333C23.9522 10.5 24.5457 10.7458 24.9832 11.1834C25.4208 11.621 25.6667 12.2145 25.6667 12.8333V23.3333C25.6667 23.9522 25.4208 24.5457 24.9832 24.9832C24.5457 25.4208 23.9522 25.6667 23.3333 25.6667H21" stroke="white" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.6667 7H16.3333" stroke="white" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.6667 11.6666H16.3333" stroke="white" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.6667 16.3334H16.3333" stroke="white" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.6667 21H16.3333" stroke="white" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              label: "Telecommunications",
              desc: "Reliable cable assemblies for telecom infrastructure",
              href: "/telecommunications",
            },
          ].map(({ icon, label, desc, href }) => (
            <div key={label} className="flex flex-col gap-4 rounded-2xl border border-slate-200/60 bg-white p-[25px] shadow-sm">
              <span className="inline-flex self-start rounded-2xl bg-[#333] p-3.5 shadow-lg">
                {icon}
              </span>
              <h3 className="text-[#0F172B] text-lg font-semibold leading-snug">{label}</h3>
              <p className="text-[#45556C] text-sm leading-relaxed">{desc}</p>
              <Link href={href} aria-label={`Learn more about ${label}`} className="text-[#0A0A0A] text-[15px] font-medium mt-auto">
                Learn More
              </Link>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* ── Value Propositions ───────────────────────────────────────────────── */}
      <section className="mx-[12px] my-9 xl:mx-0 xl:my-[72px]">
        <div className="mx-auto max-w-[1440px] rounded-3xl bg-[#FCFAFA] px-8 py-6 md:px-24 md:py-12 xl:px-24 xl:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 xl:gap-x-20 xl:gap-y-9">
            {[
              {
                icon: (
                  <svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5934 12.5274C14.4356 12.5274 14.3077 12.3994 14.3077 12.2416V1.35981C14.3077 1.08469 13.957 0.968527 13.7927 1.18926L2.84873 15.8978C2.49811 16.369 2.83444 17.0385 3.42179 17.0385H9.40661C9.5644 17.0385 9.69232 17.1664 9.69232 17.3242V28.206C9.69232 28.4811 10.043 28.5973 10.2073 28.3766L21.1513 13.668C21.5019 13.1968 21.1656 12.5274 20.5782 12.5274H14.5934Z" stroke="#ED1C24" strokeWidth="2.14286"/>
                  </svg>
                ),
                title: "Precision Engineering",
                body: "Schleuniger automation ensures a perfect fit every time, with accuracy down to 1/1000 of an inch.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.27307 15.4158L11.4609 22.991C12.8411 24.4456 15.1586 24.4456 16.5388 22.991L23.7266 15.4158C26.3131 12.6899 26.3131 8.27042 23.7267 5.54453C21.1402 2.81865 16.9466 2.81865 14.3601 5.54454C14.1643 5.75092 13.8354 5.75092 13.6396 5.54454C11.0531 2.81865 6.85956 2.81865 4.27306 5.54453C1.68657 8.27042 1.68657 12.6899 4.27307 15.4158Z" stroke="#ED1C24" strokeWidth="1.75"/>
                  </svg>
                ),
                title: "Family-Owned Values",
                body: "We listen, customize, and deliver with care. Your satisfaction is our priority.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.9998 21.9997C17.5226 21.9997 21.9997 17.5226 21.9997 11.9998C21.9997 6.47706 17.5226 1.99997 11.9998 1.99997C6.47706 1.99997 1.99997 6.47706 1.99997 11.9998C1.99997 17.5226 6.47706 21.9997 11.9998 21.9997ZM11.9998 23.9997C5.37251 23.9997 0 18.6272 0 11.9998C0 5.37251 5.37251 0 11.9998 0C18.6272 0 23.9997 5.37251 23.9997 11.9998C23.9997 18.6272 18.6272 23.9997 11.9998 23.9997ZM10.5668 14.6411L6.7068 10.7834L5.29304 12.198L10.5688 17.4706L19.0477 8.97287L17.632 7.56024L10.5668 14.6411Z" fill="#ED1C24"/>
                  </svg>
                ),
                title: "Tested & Trusted",
                body: "Every cable is verified for continuity, high-voltage integrity, and performance.",
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="flex flex-col items-center gap-4 text-center">
                <span className="inline-flex h-[60px] w-[60px] items-center justify-center rounded-full border-[3px] border-[#ED1C24]">
                  {icon}
                </span>
                <h3 className="text-[#1D1D1D] text-2xl font-semibold leading-snug">{title}</h3>
                <p className="text-[#1D1D1D] text-xl leading-snug">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1440px] px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">Our Story</p>
            <h2 className="text-4xl font-bold tracking-tight mb-6">Built by Experts,<br />Backed by Passion</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At RigCables, we combine family values with precision engineering. Using state-of-the-art Schleuniger automation, we craft coax cables accurate to 1/1000 of an inch — ensuring performance you can count on.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              From ham radio hobbyists to defense professionals, we make it easy to get high-quality, tested cables built for your needs. We're here to keep you connected.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
            <Image src="/images/about.jpg" alt="RigCables team building precision RF cables" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────────────────────────── */}
      <section className="bg-neutral-50 border-t">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-4xl font-bold tracking-tight mb-3">Some of our Builds</h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Using state-of-the-art Schleuniger automation, we craft coax cables accurate to 1/1000 of an inch. From ham radio hobbyists to defense professionals.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-200">
                <Image src={`/images/builds-${n}.jpg`} alt={`RigCables custom build ${n}`} fill className="object-cover" sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────────── */}
      <section className="border-t">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold tracking-tight text-center mb-14">Our Customers' Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Howard Epstein",
                callsign: "W1RJ",
                photo: "/images/testimonial-w1rj.jpg",
                quote: "I am quite pleased with your service and delivery! You not only met my custom cable requirements, but you went the extra mile to ensure that it was accurate and for that I am forever in-debited to you! You are the finest radio amateur business that I have worked with to date.",
              },
              {
                name: "Mark Klemm",
                callsign: "KC1SOW",
                photo: "/images/testimonial-kc1sow.png",
                quote: "It doesn't get any better than this. The gold standard in quality, price and superb customer service. I shopped 5 competitors, Dave and his TEAM beat the lowest price by $100.00. RIGCables. Get some.",
              },
              {
                name: "Rick Zach",
                callsign: "KK1RZ",
                photo: "/images/testimonial-kk1rz.png",
                quote: "Rig Cables built a custom mount with cable to adapt my current antenna mount from 3/8 to MNO. It works perfectly and is well built.",
              },
            ].map(({ name, callsign, photo, quote }) => (
              <div key={name} className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-8">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <blockquote className="flex-1 text-base text-muted-foreground leading-relaxed">
                  &ldquo;{quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-2 border-t border-border">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-neutral-200 flex-shrink-0">
                    <Image src={photo} alt={name} fill className="object-cover" sizes="40px" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{name}</p>
                    <p className="text-xs font-mono text-muted-foreground">{callsign}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────────── */}
      <section className="bg-neutral-950 text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Get Started</p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-3">Looking for Custom?</h2>
          <p className="text-xl font-semibold text-neutral-300 mb-4">Built with Precision. Backed by Passion.</p>
          <p className="text-lg text-neutral-400 max-w-lg mb-10">
            Order your next cable from a team that cares about every connection.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild className="bg-white text-neutral-950 hover:bg-neutral-100">
              <Link href="/build">
                Build Your Cable <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/30 text-white hover:bg-white/10">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>


    </div>
  )
}
