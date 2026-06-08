import { Activity, Clock, ShieldCheck, Map, ArrowRight, Focus } from "lucide-react";

export default function Expectations() {
  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            The Reality of the System
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          
          {/* What Happens After Entry */}
          <div className="nidc-surface bg-background p-8 lg:p-10 border-border group hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary">
                <Map className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold">What Happens After Entry</h3>
            </div>
            
            <ul className="space-y-4">
              {[
                "You receive structured guidance",
                "Your development is tracked",
                "You gain access to aligned opportunities",
                "You are gradually integrated into real systems"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Expectations */}
          <div className="nidc-surface bg-background p-8 lg:p-10 border-border group hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold">Expectations</h3>
            </div>
            
            <ul className="space-y-4">
              {[
                "Consistency over time",
                "Accountability for your progress",
                "Willingness to grow through structured effort",
                "Commitment to contribution"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Current Stage - Spans full width */}
          <div className="md:col-span-2 nidc-surface bg-primary text-primary-foreground p-8 lg:p-10 border-transparent relative overflow-hidden">
            {/* Background design */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute left-0 bottom-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold tracking-widest uppercase mb-4">
                  <Clock className="w-3 h-3" />
                  Current Stage
                </div>
                <h3 className="text-2xl font-semibold mb-2">Selecting Initial Cohort</h3>
                <p className="text-primary-foreground/80 max-w-xl">
                  We are currently selecting a small initial cohort. The focus is on building the system properly — not scaling prematurely.
                </p>
              </div>
              
              <div className="shrink-0 w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <Focus className="w-10 h-10 text-accent" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
