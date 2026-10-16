import type { ProfessionalPortraitData } from "@/lib/portrait";

export function ProfessionalPortrait({ portrait }: { portrait: ProfessionalPortraitData }) {
  return (
    <figure className="professional-portrait">
      <div className="professional-portrait__frame">
        <span className="professional-portrait__depth" aria-hidden="true" />
        <img src={portrait.src} alt={portrait.alt} width={portrait.width} height={portrait.height} loading="lazy" decoding="async" />
      </div>
      {portrait.caption ? <figcaption>{portrait.caption}</figcaption> : null}
    </figure>
  );
}
