import React from 'react';

const CalendarAppIcon = ({ size = 80, style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    {/* Rounded square background */}
    <rect
      x="4"
      y="4"
      width="72"
      height="72"
      rx="20"
      fill="url(#bgGradient)"
      filter="url(#shadow)"
    />
    {/* Calendar body */}
    <rect
      x="18"
      y="20"
      width="44"
      height="36"
      rx="8"
      fill="#e6e6f7"
      stroke="#d1d5db"
      strokeWidth="1.5"
      filter="url(#calendarShadow)"
    />
    {/* Calendar header */}
    <rect
      x="18"
      y="20"
      width="44"
      height="8"
      rx="4"
      fill="#b6b8e6"
    />
    {/* Calendar grid (5x4) */}
    {Array.from({ length: 4 }).map((_, row) =>
      Array.from({ length: 5 }).map((_, col) => {
        // Highlight one day (e.g., row 2, col 3)
        const isHighlight = row === 2 && col === 3;
        return (
          <rect
            key={`${row}-${col}`}
            x={24 + col * 8}
            y={32 + row * 8}
            width="6"
            height="6"
            rx="3.5"
            fill={isHighlight ? '#3b82f6' : '#fff'}
            stroke="#c7c9e6"
            strokeWidth="1"
            style={{
              filter: isHighlight
                ? 'drop-shadow(0 1px 2px #3b82f655)'
                : 'drop-shadow(0 1px 1px #e5e7eb88)',
            }}
          />
        );
      })
    )}
    <defs>
      <linearGradient id="bgGradient" x1="4" y1="4" x2="76" y2="76" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2a4170" />
        <stop offset="1" stopColor="#1a3665" />
      </linearGradient>
      <filter id="shadow" x="0" y="0" width="80" height="80" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#1a3665" floodOpacity="0.18" />
      </filter>
      <filter id="calendarShadow" x="14" y="16" width="52" height="44" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#b6b8e6" floodOpacity="0.12" />
      </filter>
    </defs>
  </svg>
);

export default CalendarAppIcon; 