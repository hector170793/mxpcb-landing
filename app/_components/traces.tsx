export function Traces() {
  return (
    <svg
      className="traces"
      viewBox="0 0 760 620"
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden="true"
    >
      <path d="M760 90 H560 L500 150 H300" style={{ animationDelay: ".1s" }} />
      <path d="M760 170 H620 L560 230 H360 L320 270 H150" style={{ animationDelay: ".25s" }} />
      <path d="M760 260 H660 L600 320 H420" style={{ animationDelay: ".4s" }} />
      <path d="M760 350 H590 L530 410 H330 L290 450 H180" style={{ animationDelay: ".55s" }} />
      <path d="M760 460 H650 L590 520 H400" style={{ animationDelay: ".7s" }} />
      <path d="M700 30 V120 L640 180 V300" style={{ animationDelay: ".85s" }} />
      <path d="M470 620 V520 L530 460 V360" style={{ animationDelay: "1s" }} />
      <circle cx="500" cy="150" r="4" style={{ animationDelay: ".4s" }} />
      <circle cx="320" cy="270" r="4" style={{ animationDelay: "1.1s" }} />
      <circle cx="600" cy="320" r="4" style={{ animationDelay: ".8s" }} />
      <circle cx="290" cy="450" r="4" style={{ animationDelay: "1.5s" }} />
      <circle cx="590" cy="520" r="4" style={{ animationDelay: "2s" }} />
      <circle cx="640" cy="180" r="4" style={{ animationDelay: "1.3s" }} />
    </svg>
  );
}
