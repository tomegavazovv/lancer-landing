import React from 'react';

interface HexagonIconProps {
  size?: number;
  iconColor?: string;
  className?: string;
}

export const HexagonIcon = React.forwardRef<HTMLDivElement, HexagonIconProps>(
  ({ size = 40, iconColor = '#001e00', className = '', ...props }, ref) => {
    const dashValue = 119.38052083641213;

    return (
      <div
        ref={ref}
        className={`air3-progress-circle-icons ${className}`}
        style={{ '--badge-circle-dash': dashValue } as React.CSSProperties}
        {...props}
      >
        {/* Progress Circle SVG */}
        <svg
          aria-hidden="true"
          viewBox="0 0 40 40"
          className="air3-progress-circle-svg"
          width={size}
          height={size}
        >
          <circle cx="20" cy="20" r="19" className="air3-progress-circle-bg" />
          <circle
            cx="20"
            cy="20"
            r="19"
            strokeDasharray={`${dashValue} ${dashValue}`}
            className="air3-progress-circle-fg air3-progress-circle-100"
          />
        </svg>

        {/* House Icon */}
        <div className="air3-icon md" data-test="UpCIcon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            aria-hidden="true"
            viewBox="0 0 24 24"
            role="img"
          >
            <path
              fill={iconColor}
              fillRule="evenodd"
              d="M18.37 19.002H5.63v-1.867h12.74v1.867zm.02-3.736H5.608L3 8.314l4.992 1.664L12 5l4.008 4.978L21 8.314l-2.61 6.952z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    );
  }
);

HexagonIcon.displayName = 'HexagonIcon';

