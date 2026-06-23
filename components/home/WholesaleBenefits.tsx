import Image from 'next/image'
import {
  CircleDollarSign,
  MailQuestion,
  PackageCheck,
  Globe,
  RefreshCcw,
  Boxes,
} from 'lucide-react'

const features = [
  {
    icon: CircleDollarSign,
    title: 'GREAT PRICES',
    desc: 'ON SPORTS & OUTDOOR',
  },
  {
    icon: MailQuestion,
    title: 'SWIFT SUPPORT',
    desc: 'VIA EMAIL',
  },
  {
    icon: PackageCheck,
    title: 'FREE SHIPPING',
    desc: 'ON ORDERS OVER $2000',
  },
  {
    icon: Globe,
    title: 'GLOBAL SHIPPING',
    desc: 'SWIFT DELIVERY',
  },
  {
    icon: RefreshCcw,
    title: '60-DAY RETURN',
    desc: 'STRESS FREE',
  },
  {
    icon: Boxes,
    title: 'EXTENSIVE SELECTION',
    desc: 'OF SKUs',
  },
]

export default function WholesaleBenefits() {
  return (
    <section className="border-t border-border bg-surface py-20">
      <div className="mx-auto max-w-container px-4 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
          
          {/* Left: Features Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-y-12 sm:grid-cols-3">
              {features.map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <Icon className="mb-4 h-10 w-10 text-text-primary" strokeWidth={1.5} />
                    <h3 className="font-display text-sm font-bold uppercase tracking-wider text-fnk">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-[11px] uppercase tracking-widest text-text-secondary">
                      {feature.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: Info Text */}
          <div className="lg:w-[400px] xl:w-[450px]">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <Image
                src="/logo.png"
                alt="FNK Distributors"
                width={180}
                height={60}
                className="mb-6 h-12 w-auto object-contain"
              />
              <p className="text-sm leading-relaxed text-text-secondary text-justify">
                As a wholesale distributor, we work directly with brands to bring you
                competitive pricing, efficient fulfillment, and a diverse catalog
                across multiple high-demand categories including Sports & Outdoors,
                Tools & Home Improvement, Automotive, Electronics, Home & Kitchen,
                Office Supplies and Industrial Products. Partner with us to gain access
                to genuine and authentic products in bulk, dependable service, and the
                support of a trusted supplier committed to helping your business grow.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
