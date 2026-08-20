interface PlotterGraphicProps {
  className?: string;
  dark?: boolean;
}

export default function PlotterGraphic({ className = '', dark = false }: PlotterGraphicProps) {
  const stroke = dark ? 'rgba(255,255,255,.72)' : 'rgba(11,12,15,.7)';
  const faint = dark ? 'rgba(255,255,255,.14)' : 'rgba(11,12,15,.14)';
  const fill = dark ? '#111318' : '#ECEFF1';

  return (
    <svg
      viewBox="0 0 760 620"
      role="img"
      aria-label="Ilustración técnica de un plotter de gran formato"
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="paperGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={dark ? '#F4F5F6' : '#FFFFFF'} />
          <stop offset="1" stopColor={dark ? '#D5D9DD' : '#E8ECEF'} />
        </linearGradient>
      </defs>

      <g data-plotter-machine>
        <path d="M114 184H646V454H114V184Z" fill={fill} stroke={stroke} strokeWidth="2" />
        <path d="M145 216H615V341H145V216Z" stroke={faint} strokeWidth="2" />
        <path d="M114 184L150 144H610L646 184" stroke={stroke} strokeWidth="2" />
        <path d="M170 454V548" stroke={stroke} strokeWidth="8" />
        <path d="M590 454V548" stroke={stroke} strokeWidth="8" />
        <path d="M146 548H214" stroke={stroke} strokeWidth="8" />
        <path d="M556 548H624" stroke={stroke} strokeWidth="8" />
        <path d="M114 393H646" stroke={faint} strokeWidth="2" />

        <g data-plotter-paper>
          <path d="M207 342H552V499L526 524H232L207 499V342Z" fill="url(#paperGradient)" stroke={stroke} strokeWidth="2" />
          <path d="M247 382H512" stroke="#3D63FF" strokeWidth="5" />
          <path d="M247 408H460" stroke={faint} strokeWidth="2" />
          <path d="M247 427H494" stroke={faint} strokeWidth="2" />
          <path d="M247 446H431" stroke={faint} strokeWidth="2" />
        </g>

        <path d="M178 257H582" stroke={stroke} strokeWidth="3" />
        <g data-plotter-carriage>
          <rect x="302" y="232" width="92" height="52" rx="2" fill={dark ? '#20242A' : '#D9DEE1'} stroke={stroke} strokeWidth="2" />
          <rect x="319" y="245" width="58" height="10" fill="#3D63FF" />
          <path d="M330 284V302" stroke={stroke} strokeWidth="2" />
          <path d="M366 284V302" stroke={stroke} strokeWidth="2" />
        </g>

        <rect x="504" y="159" width="92" height="36" fill={dark ? '#0B0C0F' : '#FFFFFF'} stroke={stroke} strokeWidth="2" />
        <circle data-plotter-led cx="574" cy="177" r="5" fill="#3D63FF" />
        <path d="M519 174H552" stroke={faint} strokeWidth="3" />
        <path d="M519 181H544" stroke={faint} strokeWidth="3" />
      </g>

      <g opacity="0.7">
        <path d="M78 120H252" stroke={faint} />
        <path d="M508 120H682" stroke={faint} />
        <text x="78" y="105" fill={stroke} fontFamily="JetBrains Mono, monospace" fontSize="13">PPC / LARGE FORMAT</text>
        <text x="557" y="105" fill={stroke} fontFamily="JetBrains Mono, monospace" fontSize="13">01 — READY</text>
        <path d="M78 573H274" stroke={faint} />
        <path d="M486 573H682" stroke={faint} />
        <text x="78" y="598" fill={stroke} fontFamily="JetBrains Mono, monospace" fontSize="11">VENTA · INSTALACIÓN · SOPORTE</text>
        <text x="560" y="598" fill={stroke} fontFamily="JetBrains Mono, monospace" fontSize="11">MÉXICO</text>
      </g>
    </svg>
  );
}
