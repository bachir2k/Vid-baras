interface IleDeFranceMapProps {
  selectedDept: string | null;
  hoveredDept: string | null;
  onDeptClick: (deptId: string) => void;
  onDeptHover: (deptId: string | null) => void;
}

export default function IleDeFranceMap({ selectedDept, hoveredDept, onDeptClick, onDeptHover }: IleDeFranceMapProps) {
  const getDeptColor = (deptId: string) => {
    const isActive = hoveredDept === deptId || selectedDept === deptId;
    return isActive ? '#3B82F6' : 'rgba(255, 255, 255, 0.1)';
  };

  const getDeptStroke = (deptId: string) => {
    const isActive = hoveredDept === deptId || selectedDept === deptId;
    return isActive ? '#3B82F6' : 'rgba(255, 255, 255, 0.3)';
  };

  const getDeptStrokeWidth = (deptId: string) => {
    const isActive = hoveredDept === deptId || selectedDept === deptId;
    return isActive ? '3' : '1.5';
  };

  return (
    <svg
      viewBox="0 0 600 600"
      className="w-full h-auto max-w-2xl mx-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="ile-de-france">
        <path
          id="val-doise"
          d="M 200 80 L 320 60 L 400 80 L 420 120 L 400 160 L 350 180 L 300 170 L 250 150 L 220 120 Z"
          fill={getDeptColor('val-doise')}
          stroke={getDeptStroke('val-doise')}
          strokeWidth={getDeptStrokeWidth('val-doise')}
          className="cursor-pointer transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
          onClick={() => onDeptClick('val-doise')}
          onMouseEnter={() => onDeptHover('val-doise')}
          onMouseLeave={() => onDeptHover(null)}
        />
        <text
          x="310"
          y="125"
          fontSize="14"
          fontWeight="600"
          fill="white"
          textAnchor="middle"
          pointerEvents="none"
          className="select-none"
        >
          95
        </text>

        <path
          id="seine-et-marne"
          d="M 420 120 L 480 140 L 540 200 L 540 280 L 500 340 L 450 360 L 400 340 L 380 280 L 400 240 L 420 200 L 400 160 Z"
          fill={getDeptColor('seine-et-marne')}
          stroke={getDeptStroke('seine-et-marne')}
          strokeWidth={getDeptStrokeWidth('seine-et-marne')}
          className="cursor-pointer transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
          onClick={() => onDeptClick('seine-et-marne')}
          onMouseEnter={() => onDeptHover('seine-et-marne')}
          onMouseLeave={() => onDeptHover(null)}
        />
        <text
          x="460"
          y="240"
          fontSize="14"
          fontWeight="600"
          fill="white"
          textAnchor="middle"
          pointerEvents="none"
          className="select-none"
        >
          77
        </text>

        <path
          id="yvelines"
          d="M 80 200 L 160 180 L 220 200 L 250 240 L 240 300 L 200 360 L 140 380 L 80 340 L 60 280 Z"
          fill={getDeptColor('yvelines')}
          stroke={getDeptStroke('yvelines')}
          strokeWidth={getDeptStrokeWidth('yvelines')}
          className="cursor-pointer transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
          onClick={() => onDeptClick('yvelines')}
          onMouseEnter={() => onDeptHover('yvelines')}
          onMouseLeave={() => onDeptHover(null)}
        />
        <text
          x="155"
          y="280"
          fontSize="14"
          fontWeight="600"
          fill="white"
          textAnchor="middle"
          pointerEvents="none"
          className="select-none"
        >
          78
        </text>

        <path
          id="essonne"
          d="M 200 360 L 240 300 L 280 320 L 300 360 L 320 420 L 300 480 L 240 500 L 180 480 L 160 440 L 140 380 Z"
          fill={getDeptColor('essonne')}
          stroke={getDeptStroke('essonne')}
          strokeWidth={getDeptStrokeWidth('essonne')}
          className="cursor-pointer transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
          onClick={() => onDeptClick('essonne')}
          onMouseEnter={() => onDeptHover('essonne')}
          onMouseLeave={() => onDeptHover(null)}
        />
        <text
          x="245"
          y="415"
          fontSize="14"
          fontWeight="600"
          fill="white"
          textAnchor="middle"
          pointerEvents="none"
          className="select-none"
        >
          91
        </text>

        <path
          id="hauts-de-seine"
          d="M 220 200 L 250 180 L 280 200 L 300 240 L 280 270 L 250 280 L 220 260 L 210 230 Z"
          fill={getDeptColor('hauts-de-seine')}
          stroke={getDeptStroke('hauts-de-seine')}
          strokeWidth={getDeptStrokeWidth('hauts-de-seine')}
          className="cursor-pointer transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
          onClick={() => onDeptClick('hauts-de-seine')}
          onMouseEnter={() => onDeptHover('hauts-de-seine')}
          onMouseLeave={() => onDeptHover(null)}
        />
        <text
          x="250"
          y="235"
          fontSize="14"
          fontWeight="600"
          fill="white"
          textAnchor="middle"
          pointerEvents="none"
          className="select-none"
        >
          92
        </text>

        <path
          id="seine-saint-denis"
          d="M 300 170 L 350 180 L 380 200 L 380 240 L 360 260 L 330 270 L 300 240 L 280 200 Z"
          fill={getDeptColor('seine-saint-denis')}
          stroke={getDeptStroke('seine-saint-denis')}
          strokeWidth={getDeptStrokeWidth('seine-saint-denis')}
          className="cursor-pointer transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
          onClick={() => onDeptClick('seine-saint-denis')}
          onMouseEnter={() => onDeptHover('seine-saint-denis')}
          onMouseLeave={() => onDeptHover(null)}
        />
        <text
          x="330"
          y="220"
          fontSize="14"
          fontWeight="600"
          fill="white"
          textAnchor="middle"
          pointerEvents="none"
          className="select-none"
        >
          93
        </text>

        <path
          id="val-de-marne"
          d="M 280 270 L 330 270 L 360 280 L 380 320 L 360 360 L 320 380 L 280 360 L 260 340 L 250 300 Z"
          fill={getDeptColor('val-de-marne')}
          stroke={getDeptStroke('val-de-marne')}
          strokeWidth={getDeptStrokeWidth('val-de-marne')}
          className="cursor-pointer transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
          onClick={() => onDeptClick('val-de-marne')}
          onMouseEnter={() => onDeptHover('val-de-marne')}
          onMouseLeave={() => onDeptHover(null)}
        />
        <text
          x="315"
          y="325"
          fontSize="14"
          fontWeight="600"
          fill="white"
          textAnchor="middle"
          pointerEvents="none"
          className="select-none"
        >
          94
        </text>

        <path
          id="paris"
          d="M 280 220 L 300 240 L 280 270 L 250 280 L 220 260 L 240 230 L 260 220 Z"
          fill={getDeptColor('paris')}
          stroke={getDeptStroke('paris')}
          strokeWidth={getDeptStrokeWidth('paris')}
          className="cursor-pointer transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
          onClick={() => onDeptClick('paris')}
          onMouseEnter={() => onDeptHover('paris')}
          onMouseLeave={() => onDeptHover(null)}
        />
        <text
          x="260"
          y="255"
          fontSize="16"
          fontWeight="700"
          fill="white"
          textAnchor="middle"
          pointerEvents="none"
          className="select-none"
        >
          75
        </text>
      </g>
    </svg>
  );
}
