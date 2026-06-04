import React from "react";
import { Landmark, CreditCard, Building } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CONTRIBUTION_WAYS = [
  {
    title: "Bank Transfer",
    description: "You can support directly via bank transfer. Account details will be provided upon full incorporation.",
    icon: Landmark,
    status: "Pending Incorporation",
    action: null
  },
  {
    title: "Online Contribution",
    description: "Secure online payments will be available via our payment platform.",
    icon: CreditCard,
    status: "Coming Soon",
    action: null
  },
  {
    title: "Institutional Support",
    description: "For partnerships, grants, and structured funding.",
    icon: Building,
    status: "Active",
    action: {
      label: "Contact Partnerships",
      href: "mailto:partnerships@nidcfoundation.org"
    }
  }
];

export default function ContributionWays() {
  return (
    <section id="ways-to-contribute" className="relative w-full overflow-hidden bg-background px-4 py-24 md:px-8 lg:py-32 scroll-mt-20">
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Ways to Contribute
            </span>
          </div>
          
          <h2 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            How to <span className="text-primary">Support</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CONTRIBUTION_WAYS.map((way, index) => (
            <article 
              key={index}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-border/50 bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-foreground/70">
                    <way.icon className="h-6 w-6" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${way.status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    {way.status}
                  </span>
                </div>
                
                <h3 className="mb-4 text-2xl font-bold tracking-tight text-foreground">
                  {way.title}
                </h3>
                
                <p className="mb-8 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {way.description}
                </p>
              </div>

              <div className="relative z-10 mt-auto pt-6 border-t border-border/40">
                {way.action ? (
                  <Button asChild variant="outline" className="w-full rounded-xl group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                    <Link href={way.action.href}>
                      {way.action.label}
                    </Link>
                  </Button>
                ) : (
                  <div className="w-full text-center text-sm font-medium text-muted-foreground py-2">
                    Details Available Soon
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
