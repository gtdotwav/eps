"use client";
import React from "react";
import Link from "next/link";
import { TimelineUI } from "@/components/ui/timeline";
import { IconClock, IconAlertCircle, IconGavel, IconHandStop, IconSearch, IconCurrencyDollar, IconSkull, IconScale, IconStar } from "@tabler/icons-react";

const typeConfig: Record<string, { color: string; bg: string; label: string }> = {
  arrest: { color: "text-red-400", bg: "bg-red-600/20 border-red-600/40", label: "Arrest" },
  prosecution: { color: "text-orange-400", bg: "bg-orange-600/20 border-orange-600/40", label: "Prosecution" },
  investigation: { color: "text-blue-400", bg: "bg-blue-600/20 border-blue-600/40", label: "Investigation" },
  settlement: { color: "text-purple-400", bg: "bg-purple-600/20 border-purple-600/40", label: "Settlement" },
  "key-event": { color: "text-yellow-400", bg: "bg-yellow-600/20 border-yellow-600/40", label: "Key Event" },
  death: { color: "text-zinc-400", bg: "bg-zinc-600/20 border-zinc-600/40", label: "Death" },
  law: { color: "text-emerald-400", bg: "bg-emerald-600/20 border-emerald-600/40", label: "Legal Reform" },
};

function Badge({ type }: { type: string }) {
  const cfg = typeConfig[type] || typeConfig["key-event"];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${cfg.bg} ${cfg.color}`}>
      {cfg.label}
    </span>
  );
}

function PeopleLinks({ names }: { names: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {names.map((name) => (
        <Link
          key={name}
          href={`/search?q=${encodeURIComponent(name)}`}
          className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 hover:border-red-600 hover:text-red-400 transition-all"
        >
          {name}
        </Link>
      ))}
    </div>
  );
}

function DocTypeLink({ type }: { type: string }) {
  return (
    <Link
      href={`/search?q=${encodeURIComponent(type)}`}
      className="text-xs px-2 py-1 rounded bg-zinc-900 text-zinc-500 border border-zinc-800 hover:border-red-600 hover:text-red-400 transition-all"
    >
      Related: {type}
    </Link>
  );
}

const timelineData = [
  {
    title: "1996–2005",
    content: (
      <div className="space-y-3">
        <Badge type="key-event" />
        <h4 className="text-lg font-bold text-white">Systematic Abuse & Trafficking Network</h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li>• Epstein and Maxwell build a network for trafficking and abuse of minors across multiple residences</li>
          <li>• Victims recruited from schools, malls, and through existing victims (&quot;pyramid scheme&quot; of recruitment)</li>
          <li>• Abuse occurs at Palm Beach estate, NYC townhouse, Zorro Ranch (NM), and private island</li>
          <li>• Flight logs document hundreds of flights on &quot;Lolita Express&quot; with high-profile passengers</li>
        </ul>
        <PeopleLinks names={["Jeffrey Epstein", "Ghislaine Maxwell", "Virginia Giuffre"]} />
        <div className="mt-2"><DocTypeLink type="Flight Log" /></div>
      </div>
    ),
  },
  {
    title: "2005",
    content: (
      <div className="space-y-3">
        <Badge type="investigation" />
        <h4 className="text-lg font-bold text-white">Palm Beach Police Investigation Begins</h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li>• A parent reports to Palm Beach PD that Epstein abused their 14-year-old daughter</li>
          <li>• Detective Joseph Recarey leads investigation, interviews over 30 victims</li>
          <li>• Police execute search warrant on Epstein&apos;s Palm Beach estate</li>
          <li>• Evidence includes hidden cameras, nude photos, and &quot;massage&quot; tables</li>
        </ul>
        <PeopleLinks names={["Jeffrey Epstein"]} />
        <div className="mt-2"><DocTypeLink type="Police Report" /></div>
      </div>
    ),
  },
  {
    title: "2006",
    content: (
      <div className="space-y-3">
        <Badge type="investigation" />
        <h4 className="text-lg font-bold text-white">FBI Enters Investigation</h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li>• Palm Beach PD completes investigation, recommends multiple felony charges</li>
          <li>• State Attorney Barry Krischer reduces charges — Palm Beach PD goes to FBI</li>
          <li>• FBI opens federal investigation into sex trafficking</li>
          <li>• Grand jury convened but only returns single charge of solicitation</li>
        </ul>
        <PeopleLinks names={["Jeffrey Epstein", "Alexander Acosta"]} />
        <div className="mt-2"><DocTypeLink type="Legal Filing" /></div>
      </div>
    ),
  },
  {
    title: "2007",
    content: (
      <div className="space-y-3">
        <Badge type="key-event" />
        <h4 className="text-lg font-bold text-white">Secret Non-Prosecution Agreement Negotiated</h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li>• US Attorney Alexander Acosta negotiates secretly with Epstein&apos;s lawyers</li>
          <li>• Dream team of attorneys: Alan Dershowitz, Kenneth Starr, Jay Lefkowitz</li>
          <li>• Victims NOT informed of plea deal as required by Crime Victims&apos; Rights Act</li>
          <li>• Agreement grants immunity to &quot;potential co-conspirators&quot; — unprecedented breadth</li>
        </ul>
        <PeopleLinks names={["Alexander Acosta", "Alan Dershowitz", "Kenneth Starr"]} />
        <div className="mt-2"><DocTypeLink type="Non-Prosecution Agreement" /></div>
      </div>
    ),
  },
  {
    title: "2008",
    content: (
      <div className="space-y-3">
        <Badge type="settlement" />
        <h4 className="text-lg font-bold text-white">Plea Deal — 13 Months County Jail</h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li>• Epstein pleads guilty to two state felony charges of solicitation of prostitution</li>
          <li>• Sentenced to 18 months in county jail (not federal prison)</li>
          <li>• Granted work release — allowed to leave jail 6 days/week, 12 hours/day</li>
          <li>• Serves only 13 months; registers as sex offender</li>
          <li>• Federal NPA keeps case sealed — public and victims unaware of scope</li>
        </ul>
        <PeopleLinks names={["Jeffrey Epstein", "Alexander Acosta"]} />
        <div className="mt-2"><DocTypeLink type="Court Document" /></div>
      </div>
    ),
  },
  {
    title: "2009–2014",
    content: (
      <div className="space-y-3">
        <Badge type="key-event" />
        <h4 className="text-lg font-bold text-white">Years of Continued Freedom</h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li>• Epstein released, resumes lavish lifestyle in NYC and other properties</li>
          <li>• Continues to host parties and events with high-profile guests</li>
          <li>• Civil lawsuits filed by victims but largely settled quietly</li>
          <li>• Black book and flight logs circulate but gain little mainstream attention</li>
        </ul>
        <PeopleLinks names={["Jeffrey Epstein", "Ghislaine Maxwell"]} />
        <div className="mt-2"><DocTypeLink type="Financial Record" /></div>
      </div>
    ),
  },
  {
    title: "2015",
    content: (
      <div className="space-y-3">
        <Badge type="prosecution" />
        <h4 className="text-lg font-bold text-white">Virginia Giuffre Files Federal Lawsuit</h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li>• Giuffre files suit against Ghislaine Maxwell for defamation</li>
          <li>• Names Prince Andrew, Alan Dershowitz, and others in court filings</li>
          <li>• Lawsuit begins process of unsealing thousands of documents</li>
          <li>• Giuffre describes being trafficked to powerful men worldwide from age 15</li>
        </ul>
        <PeopleLinks names={["Virginia Giuffre", "Ghislaine Maxwell", "Prince Andrew", "Alan Dershowitz"]} />
        <div className="mt-2"><DocTypeLink type="Deposition" /></div>
      </div>
    ),
  },
  {
    title: "2016",
    content: (
      <div className="space-y-3">
        <Badge type="investigation" />
        <h4 className="text-lg font-bold text-white">Flight Logs & Black Book Released</h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li>• Court orders release of flight logs from Epstein&apos;s private jets</li>
          <li>• Logs reveal prominent names including politicians, businessmen, celebrities</li>
          <li>• Epstein&apos;s &quot;Black Book&quot; of contacts becomes public — contains hundreds of names</li>
          <li>• Public begins to understand the scale of Epstein&apos;s network</li>
        </ul>
        <PeopleLinks names={["Jeffrey Epstein", "Bill Clinton", "Donald Trump"]} />
        <div className="mt-2"><DocTypeLink type="Flight Log" /></div>
      </div>
    ),
  },
  {
    title: "Nov 2018",
    content: (
      <div className="space-y-3">
        <Badge type="investigation" />
        <h4 className="text-lg font-bold text-white">Miami Herald &quot;Perversion of Justice&quot; Series</h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li>• Julie K. Brown publishes explosive investigative series for Miami Herald</li>
          <li>• Details how Epstein evaded justice through the 2008 sweetheart deal</li>
          <li>• Interviews dozens of victims, many speaking publicly for the first time</li>
          <li>• Triggers renewed public outrage and renewed federal investigation</li>
        </ul>
        <PeopleLinks names={["Jeffrey Epstein", "Alexander Acosta"]} />
        <div className="mt-2"><DocTypeLink type="Investigation Report" /></div>
      </div>
    ),
  },
  {
    title: "July 6, 2019",
    content: (
      <div className="space-y-3">
        <Badge type="arrest" />
        <h4 className="text-lg font-bold text-white">Epstein Arrested by SDNY</h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li>• FBI arrests Epstein at Teterboro Airport returning from Paris</li>
          <li>• Southern District of New York charges sex trafficking of minors</li>
          <li>• Bail denied despite offering $100M+ bond package</li>
          <li>• Safe containing diamonds, cash, and expired foreign passport found in NYC townhouse</li>
          <li>• Alexander Acosta resigns as Secretary of Labor over his role in 2008 deal</li>
        </ul>
        <PeopleLinks names={["Jeffrey Epstein", "Alexander Acosta"]} />
        <div className="mt-2"><DocTypeLink type="Indictment" /></div>
      </div>
    ),
  },
  {
    title: "Aug 10, 2019",
    content: (
      <div className="space-y-3">
        <Badge type="death" />
        <h4 className="text-lg font-bold text-white">Epstein Found Dead in MCC Cell</h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li>• Found unresponsive in Metropolitan Correctional Center, Manhattan</li>
          <li>• Medical examiner rules death a suicide by hanging</li>
          <li>• Both guards assigned to monitor him had fallen asleep and falsified records</li>
          <li>• CCTV cameras outside cell reported malfunctioning</li>
          <li>• Previous suicide attempt weeks earlier — removed from suicide watch prematurely</li>
          <li>• Pathologist hired by Epstein family disputes official finding</li>
        </ul>
        <PeopleLinks names={["Jeffrey Epstein"]} />
        <div className="mt-2"><DocTypeLink type="Autopsy Report" /></div>
      </div>
    ),
  },
  {
    title: "2020",
    content: (
      <div className="space-y-3">
        <Badge type="investigation" />
        <h4 className="text-lg font-bold text-white">Massive Document Unsealing Begins</h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li>• Courts begin unsealing thousands of documents from Giuffre v. Maxwell</li>
          <li>• Depositions, flight logs, photographs, and correspondence made public</li>
          <li>• Documents reveal details of trafficking network operations</li>
          <li>• FBI continues investigation into potential co-conspirators</li>
        </ul>
        <PeopleLinks names={["Ghislaine Maxwell", "Virginia Giuffre"]} />
        <div className="mt-2"><DocTypeLink type="Court Document" /></div>
      </div>
    ),
  },
  {
    title: "July 2, 2020",
    content: (
      <div className="space-y-3">
        <Badge type="arrest" />
        <h4 className="text-lg font-bold text-white">Ghislaine Maxwell Arrested</h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li>• FBI arrests Maxwell at a secluded New Hampshire property</li>
          <li>• Charged with conspiracy, enticement, and sex trafficking of minors</li>
          <li>• Had been hiding for nearly a year since Epstein&apos;s death</li>
          <li>• Property purchased through LLC to conceal her identity</li>
        </ul>
        <PeopleLinks names={["Ghislaine Maxwell"]} />
        <div className="mt-2"><DocTypeLink type="Indictment" /></div>
      </div>
    ),
  },
  {
    title: "Dec 2021",
    content: (
      <div className="space-y-3">
        <Badge type="prosecution" />
        <h4 className="text-lg font-bold text-white">Maxwell Found Guilty on 5 of 6 Counts</h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li>• Convicted of sex trafficking of a minor, conspiracy, and transportation</li>
          <li>• Four victims testified at trial about years of abuse</li>
          <li>• Jury deliberated for five full days before reaching verdict</li>
          <li>• Faces up to 65 years in federal prison</li>
        </ul>
        <PeopleLinks names={["Ghislaine Maxwell"]} />
        <div className="mt-2"><DocTypeLink type="Trial Transcript" /></div>
      </div>
    ),
  },
  {
    title: "Feb 2022",
    content: (
      <div className="space-y-3">
        <Badge type="death" />
        <h4 className="text-lg font-bold text-white">Jean-Luc Brunel Found Dead in Prison</h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li>• Modeling agent Brunel found hanged in Paris prison cell</li>
          <li>• Was awaiting trial on charges of trafficking minors for Epstein</li>
          <li>• Second high-profile death in custody connected to Epstein network</li>
          <li>• French investigation into his role continues posthumously</li>
        </ul>
        <PeopleLinks names={["Jean-Luc Brunel", "Jeffrey Epstein"]} />
      </div>
    ),
  },
  {
    title: "Feb 2022",
    content: (
      <div className="space-y-3">
        <Badge type="settlement" />
        <h4 className="text-lg font-bold text-white">Prince Andrew Settles with Giuffre</h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li>• Settlement reported at approximately $15 million</li>
          <li>• No admission of wrongdoing or guilt by Prince Andrew</li>
          <li>• Andrew pledges donation to Giuffre&apos;s victims&apos; rights charity</li>
          <li>• Settlement comes weeks before case was set for trial</li>
        </ul>
        <PeopleLinks names={["Prince Andrew", "Virginia Giuffre"]} />
        <div className="mt-2"><DocTypeLink type="Settlement" /></div>
      </div>
    ),
  },
  {
    title: "June 2022",
    content: (
      <div className="space-y-3">
        <Badge type="prosecution" />
        <h4 className="text-lg font-bold text-white">Maxwell Sentenced to 20 Years</h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li>• Sentenced to 20 years in federal prison by Judge Alison Nathan</li>
          <li>• Judge: Maxwell was &quot;instrumental&quot; in Epstein&apos;s abuse scheme</li>
          <li>• Victims deliver impact statements at sentencing hearing</li>
          <li>• Maxwell maintains innocence, appeals conviction</li>
        </ul>
        <PeopleLinks names={["Ghislaine Maxwell"]} />
        <div className="mt-2"><DocTypeLink type="Sentencing Memo" /></div>
      </div>
    ),
  },
  {
    title: "Jan 2024",
    content: (
      <div className="space-y-3">
        <Badge type="law" />
        <h4 className="text-lg font-bold text-white">Massive Document Release — &quot;Epstein List&quot;</h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li>• Federal judge orders release of over 900 pages of previously sealed documents</li>
          <li>• Documents from Giuffre v. Maxwell case reveal names of associates</li>
          <li>• Media coverage reaches global scale — &quot;Epstein List&quot; trends worldwide</li>
          <li>• Renewed calls for investigation into named individuals</li>
        </ul>
        <PeopleLinks names={["Virginia Giuffre", "Ghislaine Maxwell", "Bill Clinton", "Prince Andrew"]} />
        <div className="mt-2"><DocTypeLink type="Court Document" /></div>
      </div>
    ),
  },
  {
    title: "2025",
    content: (
      <div className="space-y-3">
        <Badge type="investigation" />
        <h4 className="text-lg font-bold text-white">DOJ Releases 3.5 Million Pages</h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li>• Department of Justice releases unprecedented volume of Epstein files</li>
          <li>• 3.5 million pages of documents made available through justice.gov/epstein</li>
          <li>• Includes FBI records, grand jury materials, and investigation files</li>
          <li>• Public overwhelmed by volume — platforms like this one created to make files accessible</li>
          <li>• Ongoing analysis by researchers, journalists, and citizen investigators worldwide</li>
        </ul>
        <PeopleLinks names={["Jeffrey Epstein", "Ghislaine Maxwell"]} />
        <div className="mt-2"><DocTypeLink type="Government Document" /></div>
      </div>
    ),
  },
];

export function Timeline() {
  return (
    <div className="min-h-screen bg-black pt-20 md:pt-0">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 pt-10 pb-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 flex items-center gap-4">
          <IconClock size={48} className="text-red-600" />
          Case Timeline
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-3xl">
          A chronological investigation into the Epstein network — from the first known crimes to the DOJ&apos;s
          release of 3.5 million pages of documents. Scroll to explore.
        </p>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-6">
          {Object.entries(typeConfig).map(([type, cfg]) => (
            <div key={type} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium ${cfg.bg} ${cfg.color}`}>
              {cfg.label}
            </div>
          ))}
        </div>
      </div>

      {/* Aceternity UI Timeline */}
      <TimelineUI data={timelineData} />

      {/* Context Box */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 pb-20">
        <div className="p-6 bg-red-600/10 border border-red-600/30 rounded-lg">
          <div className="flex gap-3">
            <IconAlertCircle size={24} className="text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white mb-2">About This Timeline</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                This timeline documents key events in the Epstein case based on publicly available
                court records, government documents, and verified reporting. Events span three decades
                of abuse, investigation, prosecution, and ongoing accountability. Click on any person
                or document type to explore related files in the database.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
