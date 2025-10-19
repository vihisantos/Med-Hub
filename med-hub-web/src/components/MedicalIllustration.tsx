import React from 'react';

interface MedHubLogoProps {
  /** Tamanho da fonte do texto 'Med Hub' */
  fontSize?: string;
  /** Cor inicial do texto Med */
  startColor?: string;
  /** Cor final do texto Hub */
  endColor?: string;
  /** Classe CSS extra para o container */
  className?: string;
  style?: React.CSSProperties;
}

export default function MedHubLogo({
  startColor = '#00C7B0',
  endColor = '#6EFFFF',
  fontSize = '65px', // Tamanho padrão da fonte logo
  className = '',
  style,
  ...rest
}: MedHubLogoProps) {
  const textStyle: React.CSSProperties = {
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    fontSize: fontSize,
    lineHeight: fontSize,
    ...style,
  };

  return (
    <div
      className={`med-hub-logo-container ${className}`}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: fontSize }}
      {...rest}
    >
      <span style={textStyle}>
        <span style={{ color: startColor }}>Med</span>
        <span style={{ color: endColor }}> Hub</span>
      </span>
    </div>
  );
}
