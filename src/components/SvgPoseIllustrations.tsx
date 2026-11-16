import React from 'react';

interface SvgPoseProps {
  type: string;
  className?: string;
  isAnimated?: boolean;
}

export const SvgPoseIllustration: React.FC<SvgPoseProps> = ({
  type,
  className = 'w-full h-full max-h-72',
  isAnimated = true,
}) => {
  // Base SVG wrapper with warm spiritual aesthetic
  const renderPoseGraphic = () => {
    switch (type) {
      case 'tadasana': // Mountain Pose - Standing tall and aligned
        return (
          <g>
            {/* Ground Line */}
            <line x1="60" y1="260" x2="240" y2="260" stroke="#d6cfc4" strokeWidth="3" strokeLinecap="round" />
            {/* Plumb Alignment Center Line (Subtle) */}
            <line x1="150" y1="35" x2="150" y2="255" stroke="#e07a5f" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
            
            {/* Head */}
            <circle cx="150" cy="55" r="16" fill="#b85d38" />
            {/* Neck */}
            <line x1="150" y1="71" x2="150" y2="85" stroke="#b85d38" strokeWidth="8" strokeLinecap="round" />
            {/* Torso */}
            <path d="M 132 95 L 168 95 L 160 165 L 140 165 Z" fill="#4a7c59" opacity="0.9" />
            {/* Spine Axis */}
            <line x1="150" y1="85" x2="150" y2="165" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            
            {/* Arms reaching down with open palms */}
            <path d="M 132 95 Q 118 130 115 170" fill="none" stroke="#b85d38" strokeWidth="6" strokeLinecap="round" />
            <circle cx="115" cy="172" r="4" fill="#b85d38" />
            <path d="M 168 95 Q 182 130 185 170" fill="none" stroke="#b85d38" strokeWidth="6" strokeLinecap="round" />
            <circle cx="185" cy="172" r="4" fill="#b85d38" />

            {/* Legs straight, grounded */}
            <line x1="143" y1="165" x2="140" y2="255" stroke="#3d405b" strokeWidth="9" strokeLinecap="round" />
            <line x1="157" y1="165" x2="160" y2="255" stroke="#3d405b" strokeWidth="9" strokeLinecap="round" />
            
            {/* Feet */}
            <path d="M 130 258 L 145 258" stroke="#b85d38" strokeWidth="5" strokeLinecap="round" />
            <path d="M 155 258 L 170 258" stroke="#b85d38" strokeWidth="5" strokeLinecap="round" />

            {/* Upward Energy Flow Arrow */}
            <path d="M 150 25 L 150 15 M 145 20 L 150 15 L 155 20" stroke="#e07a5f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );

      case 'vrikshasana': // Tree Pose - Balanced on one leg, hands in prayer
        return (
          <g>
            <line x1="60" y1="260" x2="240" y2="260" stroke="#d6cfc4" strokeWidth="3" strokeLinecap="round" />
            {/* Standing Left Leg */}
            <line x1="150" y1="160" x2="150" y2="255" stroke="#3d405b" strokeWidth="9" strokeLinecap="round" />
            <path d="M 140 258 L 160 258" stroke="#b85d38" strokeWidth="5" strokeLinecap="round" />
            
            {/* Lifted Right Leg - Knee out, foot on inner thigh */}
            <path d="M 150 165 L 195 195 L 152 195" fill="none" stroke="#3d405b" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="152" cy="195" r="4" fill="#b85d38" />

            {/* Torso */}
            <path d="M 134 95 L 166 95 L 158 165 L 142 165 Z" fill="#4a7c59" opacity="0.9" />
            <line x1="150" y1="85" x2="150" y2="165" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />

            {/* Head */}
            <circle cx="150" cy="55" r="16" fill="#b85d38" />

            {/* Arms overhead in Anjali Mudra (Prayer) */}
            <path d="M 134 95 Q 115 65 145 28" fill="none" stroke="#b85d38" strokeWidth="6" strokeLinecap="round" />
            <path d="M 166 95 Q 185 65 155 28" fill="none" stroke="#b85d38" strokeWidth="6" strokeLinecap="round" />
            {/* Hands joined overhead */}
            <circle cx="150" cy="26" r="5" fill="#e07a5f" />
            {/* Balance Aura */}
            <circle cx="150" cy="140" r="75" fill="none" stroke="#e07a5f" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          </g>
        );

      case 'virabhadrasana': // Warrior II - Strong lunge and extended arms
        return (
          <g>
            <line x1="30" y1="260" x2="270" y2="260" stroke="#d6cfc4" strokeWidth="3" strokeLinecap="round" />
            {/* Front Leg bent at 90 degrees */}
            <path d="M 140 160 L 195 170 L 195 255" fill="none" stroke="#3d405b" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 188 258 L 210 258" stroke="#b85d38" strokeWidth="5" strokeLinecap="round" />

            {/* Back Leg straight and angled */}
            <line x1="130" y1="160" x2="70" y2="255" stroke="#3d405b" strokeWidth="9" strokeLinecap="round" />
            <path d="M 60 258 L 80 258" stroke="#b85d38" strokeWidth="5" strokeLinecap="round" />

            {/* Torso upright and centered */}
            <path d="M 125 95 L 155 95 L 148 165 L 130 165 Z" fill="#4a7c59" opacity="0.9" />
            <circle cx="140" cy="65" r="15" fill="#b85d38" />

            {/* Arms extended horizontally */}
            <line x1="50" y1="98" x2="230" y2="98" stroke="#b85d38" strokeWidth="6" strokeLinecap="round" />
            <circle cx="50" cy="98" r="4" fill="#b85d38" />
            <circle cx="230" cy="98" r="4" fill="#b85d38" />

            {/* Gaze pointer forward */}
            <line x1="155" y1="65" x2="190" y2="65" stroke="#e07a5f" strokeWidth="2" strokeDasharray="3 3" opacity="0.7" />
          </g>
        );

      case 'marjaryasana': // Cat-Cow spinal wave in tabletop
        return (
          <g>
            <line x1="30" y1="260" x2="270" y2="260" stroke="#d6cfc4" strokeWidth="3" strokeLinecap="round" />
            {/* Knees and hands grounded */}
            {/* Front Arms */}
            <line x1="85" y1="160" x2="85" y2="255" stroke="#b85d38" strokeWidth="7" strokeLinecap="round" />
            {/* Back Thighs/Knees */}
            <line x1="215" y1="170" x2="215" y2="255" stroke="#3d405b" strokeWidth="8" strokeLinecap="round" />

            {/* Fluid spinal curve (Cat-Cow wave) */}
            <path d="M 85 160 Q 150 130 215 170" fill="none" stroke="#4a7c59" strokeWidth="12" strokeLinecap="round" />
            {/* Spine marker */}
            <path d="M 85 160 Q 150 130 215 170" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" />

            {/* Head lifted gently */}
            <circle cx="65" cy="140" r="14" fill="#b85d38" />
            {/* Breath wave indicator */}
            <path d="M 120 195 Q 150 180 180 195" fill="none" stroke="#e07a5f" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
          </g>
        );

      case 'bhujangasana': // Cobra Pose - Chest lifted from floor
        return (
          <g>
            <line x1="20" y1="260" x2="280" y2="260" stroke="#d6cfc4" strokeWidth="3" strokeLinecap="round" />
            {/* Grounded legs and hips */}
            <path d="M 260 255 L 140 255" stroke="#3d405b" strokeWidth="9" strokeLinecap="round" />
            {/* Feet extended */}
            <line x1="260" y1="255" x2="275" y2="255" stroke="#b85d38" strokeWidth="4" strokeLinecap="round" />

            {/* Rising spine curve */}
            <path d="M 140 255 Q 110 230 90 160" fill="none" stroke="#4a7c59" strokeWidth="11" strokeLinecap="round" />
            <path d="M 140 255 Q 110 230 90 160" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" />

            {/* Arms supporting lightly */}
            <path d="M 100 180 L 115 255" stroke="#b85d38" strokeWidth="6" strokeLinecap="round" />
            {/* Head and throat opening */}
            <circle cx="80" cy="135" r="15" fill="#b85d38" />
            {/* Heart expansion lines */}
            <path d="M 75 160 Q 60 160 50 160" stroke="#e07a5f" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            <path d="M 77 150 Q 62 145 52 140" stroke="#e07a5f" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          </g>
        );

      case 'setubandhasana': // Bridge Pose - Reclined hips lifted
        return (
          <g>
            <line x1="30" y1="260" x2="270" y2="260" stroke="#d6cfc4" strokeWidth="3" strokeLinecap="round" />
            {/* Shoulders and head on ground */}
            <circle cx="60" cy="245" r="14" fill="#b85d38" />
            <path d="M 65 250 L 130 255" stroke="#b85d38" strokeWidth="6" strokeLinecap="round" />

            {/* Arching Bridge - Torso and Hips Lifted */}
            <path d="M 75 240 Q 140 145 200 200" fill="none" stroke="#4a7c59" strokeWidth="12" strokeLinecap="round" />
            <path d="M 75 240 Q 140 145 200 200" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" />

            {/* Thighs and Knees to grounded feet */}
            <line x1="200" y1="200" x2="220" y2="255" stroke="#3d405b" strokeWidth="8" strokeLinecap="round" />
            <line x1="210" y1="258" x2="235" y2="258" stroke="#b85d38" strokeWidth="5" strokeLinecap="round" />

            {/* Heart/Hip Elevation Indicator */}
            <line x1="140" y1="140" x2="140" y2="120" stroke="#e07a5f" strokeWidth="2" strokeLinecap="round" />
            <path d="M 135 125 L 140 120 L 145 125" stroke="#e07a5f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );

      case 'balasana': // Child's Pose - Resting sanctuary fold
        return (
          <g>
            <line x1="30" y1="260" x2="270" y2="260" stroke="#d6cfc4" strokeWidth="3" strokeLinecap="round" />
            {/* Hips resting on heels */}
            <circle cx="215" cy="235" r="18" fill="#3d405b" />
            {/* Folded legs */}
            <path d="M 225 245 L 175 255" stroke="#3d405b" strokeWidth="8" strokeLinecap="round" />

            {/* Rounded back surrendered to earth */}
            <path d="M 215 225 Q 155 190 95 245" fill="none" stroke="#4a7c59" strokeWidth="12" strokeLinecap="round" />
            <path d="M 215 225 Q 155 190 95 245" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" />

            {/* Head resting on mat */}
            <circle cx="85" cy="245" r="14" fill="#b85d38" />
            {/* Arms extending forward */}
            <line x1="110" y1="240" x2="45" y2="255" stroke="#b85d38" strokeWidth="5" strokeLinecap="round" />

            {/* Soft restorative aura */}
            <circle cx="150" cy="215" r="45" fill="#e07a5f" opacity="0.08" />
          </g>
        );

      case 'shavasana': // Corpse Pose - Complete horizontal relaxation
        return (
          <g>
            <line x1="20" y1="260" x2="280" y2="260" stroke="#d6cfc4" strokeWidth="3" strokeLinecap="round" />
            {/* Head on ground */}
            <circle cx="55" cy="245" r="14" fill="#b85d38" />
            {/* Torso flat, relaxed */}
            <line x1="70" y1="248" x2="160" y2="248" stroke="#4a7c59" strokeWidth="10" strokeLinecap="round" />
            {/* Arms beside body, palms open */}
            <line x1="85" y1="252" x2="150" y2="254" stroke="#b85d38" strokeWidth="5" strokeLinecap="round" />
            {/* Legs and feet relaxing outward */}
            <line x1="160" y1="248" x2="250" y2="252" stroke="#3d405b" strokeWidth="8" strokeLinecap="round" />
            <line x1="248" y1="250" x2="262" y2="246" stroke="#b85d38" strokeWidth="4" strokeLinecap="round" />

            {/* Peaceful wave pulsations */}
            <path d="M 90 220 Q 150 205 210 220" fill="none" stroke="#e07a5f" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
            <path d="M 110 200 Q 150 190 190 200" fill="none" stroke="#e07a5f" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          </g>
        );

      case 'sukhasana': // Easy Seated Pose - Classic cross-legged meditation
      default:
        return (
          <g>
            <line x1="50" y1="260" x2="250" y2="260" stroke="#d6cfc4" strokeWidth="3" strokeLinecap="round" />
            {/* Cross-legged base / Grounded sit bones */}
            <ellipse cx="150" cy="245" rx="55" ry="16" fill="#3d405b" opacity="0.9" />
            <circle cx="105" cy="245" r="7" fill="#b85d38" />
            <circle cx="195" cy="245" r="7" fill="#b85d38" />

            {/* Vertical spine upright */}
            <path d="M 134 140 L 166 140 L 160 235 L 140 235 Z" fill="#4a7c59" opacity="0.9" />
            <line x1="150" y1="120" x2="150" y2="235" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />

            {/* Head in serene alignment */}
            <circle cx="150" cy="95" r="16" fill="#b85d38" />

            {/* Arms resting on knees in Chin Mudra */}
            <path d="M 134 140 Q 110 185 108 238" fill="none" stroke="#b85d38" strokeWidth="6" strokeLinecap="round" />
            <path d="M 166 140 Q 190 185 192 238" fill="none" stroke="#b85d38" strokeWidth="6" strokeLinecap="round" />
            {/* Mudra points */}
            <circle cx="108" cy="238" r="4" fill="#e07a5f" />
            <circle cx="192" cy="238" r="4" fill="#e07a5f" />

            {/* Sushumna Channel Light Glow */}
            <line x1="150" y1="75" x2="150" y2="60" stroke="#e07a5f" strokeWidth="2" strokeLinecap="round" />
            <circle cx="150" cy="55" r="3" fill="#e07a5f" />
          </g>
        );
    }
  };

  return (
    <div className={`flex items-center justify-center p-3 rounded-xl bg-slate-100/60 dark:bg-[#111f32]/60 border border-slate-200/80 dark:border-slate-700/60 transition-all ${isAnimated ? 'hover:shadow-sm' : ''}`}>
      <svg
        viewBox="0 0 300 280"
        className={className}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={`Visual alignment diagram for ${type}`}
      >
        {/* Soft background grid lines for anatomical alignment */}
        <defs>
          <pattern id={`pose-grid-${type}`} width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#ece7df" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="300" height="280" fill={`url(#pose-grid-${type})`} opacity="0.7" rx="8" />

        {renderPoseGraphic()}
      </svg>
    </div>
  );
};
