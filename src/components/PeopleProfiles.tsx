"use client";
import { AnimatedTestimonials } from "./ui/animated-testimonials";

type PersonProfile = {
  quote: string;
  name: string;
  designation: string;
  initials: string;
  color: string;
};

const keyPeople: PersonProfile[] = [
  {
    name: "Jeffrey Epstein",
    designation: "Perpetrator & Financier",
    quote:
      "American financier and registered sex offender. Convicted of sex trafficking and operating a scheme to abuse minors. Died in custody in 2019.",
    initials: "JE",
    color: "bg-red-700",
  },
  {
    name: "Ghislaine Maxwell",
    designation: "Co-Conspirator",
    quote:
      "British socialite and accomplice. Recruited and groomed victims for Epstein. Convicted of sex trafficking in 2021. Serving 20-year sentence.",
    initials: "GM",
    color: "bg-red-600",
  },
  {
    name: "Virginia Giuffre",
    designation: "Victim & Plaintiff",
    quote:
      "Key accuser and victim. Trafficked by Epstein and Maxwell from age 16. Named Prince Andrew and others in civil lawsuit. Major figure in bringing case to light.",
    initials: "VG",
    color: "bg-blue-600",
  },
  {
    name: "Prince Andrew",
    designation: "Named Defendant",
    quote:
      "Duke of York. Named in court documents by Virginia Giuffre. Settled lawsuit for $15 million without admission of wrongdoing.",
    initials: "PA",
    color: "bg-purple-700",
  },
  {
    name: "Alan Dershowitz",
    designation: "Named Associate",
    quote:
      "Former Harvard law professor. Named by accusers as participant. Helped represent Epstein in 2008 plea deal. Denied all allegations.",
    initials: "AD",
    color: "bg-indigo-700",
  },
  {
    name: "Jean-Luc Brunel",
    designation: "Model Agent & Associate",
    quote:
      "French model agent. Connected to Epstein's network. Recruited victims from modeling industry. Convicted in France. Died in prison in 2023.",
    initials: "JB",
    color: "bg-pink-700",
  },
  {
    name: "Sarah Kellen",
    designation: "Associate & Facilitator",
    quote:
      "Epstein employee. Alleged to have helped coordinate flights and assisted in grooming victims. Named in multiple depositions and court filings.",
    initials: "SK",
    color: "bg-orange-700",
  },
  {
    name: "Alexander Acosta",
    designation: "Former US Attorney",
    quote:
      "Signed 2008 Non-Prosecution Agreement that allowed Epstein minimal consequences. Later became Secretary of Labor. Called the deal 'non-prosecution agreement'.",
    initials: "AA",
    color: "bg-slate-700",
  },
  {
    name: "Leslie Wexner",
    designation: "Financier & Benefactor",
    quote:
      "L Brands founder and Epstein's primary benefactor for decades. Cut ties in 2007. Settled lawsuit claims regarding knowledge of trafficking.",
    initials: "LW",
    color: "bg-cyan-700",
  },
  {
    name: "Nadia Marcinkova",
    designation: "Victim & Alleged Associate",
    quote:
      "Trafficked by Epstein from age 15. Later became pilot for his planes. Cooperated with authorities. Complex victim-perpetrator dynamic in case.",
    initials: "NM",
    color: "bg-lime-700",
  },
];

export function PeopleProfiles() {
  return (
    <div className="min-h-screen bg-black pt-20 md:pt-0">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Key Figures
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Individuals central to the Epstein case: perpetrators, victims, associates,
            and those involved in the legal process.
          </p>
        </div>

        <AnimatedTestimonials
          testimonials={keyPeople}
          autoplay={false}
          className="mb-20"
        />

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Perpetrators</h2>
            <div className="space-y-4">
              <div className="p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg hover:border-red-600 transition-colors">
                <h3 className="font-bold text-white mb-1">Jeffrey Epstein</h3>
                <p className="text-sm text-zinc-400">
                  Primary perpetrator. Financier convicted of operating sex trafficking
                  network targeting minors.
                </p>
              </div>
              <div className="p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg hover:border-red-600 transition-colors">
                <h3 className="font-bold text-white mb-1">Ghislaine Maxwell</h3>
                <p className="text-sm text-zinc-400">
                  Co-conspirator who recruited and groomed victims. Serving 20-year
                  sentence.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Key Victims</h2>
            <div className="space-y-4">
              <div className="p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg hover:border-blue-600 transition-colors">
                <h3 className="font-bold text-white mb-1">Virginia Giuffre</h3>
                <p className="text-sm text-zinc-400">
                  Trafficked from age 16. Named Prince Andrew and others. Major voice in
                  public accountability.
                </p>
              </div>
              <div className="p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg hover:border-blue-600 transition-colors">
                <h3 className="font-bold text-white mb-1">Nadia Marcinkova</h3>
                <p className="text-sm text-zinc-400">
                  Victim turned pilot. Evidence of Epstein's recruitment and control tactics.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-zinc-800/30 border border-zinc-700 rounded-lg mb-20">
          <h2 className="text-2xl font-bold text-white mb-4">Network Overview</h2>
          <p className="text-zinc-300 mb-4">
            The Epstein case involved a complex network of perpetrators, facilitators,
            victims, and institutional figures. Key aspects include:
          </p>
          <ul className="space-y-2 text-zinc-400 text-sm">
            <li>
              <span className="font-semibold text-white">Trafficking Network:</span> Coordinated
              recruitment and abuse of minors across multiple locations
            </li>
            <li>
              <span className="font-semibold text-white">Elite Connections:</span> Relationships
              with prominent figures in business, politics, and royalty
            </li>
            <li>
              <span className="font-semibold text-white">Financial Structure:</span> Use of
              wealth and resources to enable crimes and evade accountability
            </li>
            <li>
              <span className="font-semibold text-white">Legal Failures:</span> 2008
              non-prosecution agreement and subsequent cover-ups
            </li>
            <li>
              <span className="font-semibold text-white">Victim Impact:</span> Decades of
              trauma and ongoing efforts for justice and healing
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
