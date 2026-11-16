import { LevelInfo, DailySessionData, YogaPose, BreathPattern } from '../types/yoga';

// Master library of clean illustrated poses
export const POSE_LIBRARY: Record<string, YogaPose> = {
  tadasana: {
    id: 'tadasana',
    name: 'Mountain Pose',
    sanskritName: 'Tādāsana',
    durationSeconds: 90,
    targetFocus: 'Rooting, upright posture, spine decompression',
    svgType: 'tadasana',
    instructions: [
      'Stand with feet parallel, grounding firmly into four corners of both feet.',
      'Engage thigh muscles gently, lifting knee caps without locking joints.',
      'Lengthen the spine toward the sky while relaxing shoulders down and back.',
      'Keep palms facing gently forward, crown of head rising like a mountain peak.'
    ],
    alignmentCues: [
      'Weight distributed equally between left and right feet',
      'Neutral pelvis, tailbone lightly anchored downward',
      'Ears, shoulders, hips, and ankles aligned in one vertical plane',
      'Smooth, steady diaphragmatic breathing through the nose'
    ],
    ageAdaptation: {
      all: 'Steady stance with eyes focused softly on a steady horizon point.',
      seniors: 'Keep feet hip-width apart; feel free to rest one hand lightly against a wall or chair back for balance.',
      adults: 'Actively engage the deep core transverse abdominal wall and gently draw chin level to release desk neck tension.',
      kids: 'Stand tall and strong like a 100-year-old oak tree that cannot be blown down by any wind!'
    }
  },
  vrikshasana: {
    id: 'vrikshasana',
    name: 'Tree Pose',
    sanskritName: 'Vṛkṣāsana',
    durationSeconds: 90,
    targetFocus: 'Balance, concentration, hip opening, mental equilibrium',
    svgType: 'vrikshasana',
    instructions: [
      'Shift your weight gently onto your standing foot and root down.',
      'Place the sole of the opposite foot on the inner calf or upper thigh (never directly on the knee).',
      'Bring hands together in front of the chest in Anjali Mudra (prayer pose).',
      'Once stable, optionally extend arms overhead like reaching branches.'
    ],
    alignmentCues: [
      'Fix drishti (gaze) on an unmoving point 5 feet ahead',
      'Press foot and inner leg equally into one another',
      'Keep hips squared forward, avoid tilting sideways',
      'Maintain continuous deep inhalations and exhalations'
    ],
    ageAdaptation: {
      all: 'Focus on steadiness of breath over how high the foot is placed.',
      seniors: 'Keep the toes of the lifted foot lightly resting on the floor as a kickstand, with hands on a sturdy chair.',
      adults: 'Engage standing leg gluteus medius and elevate rib cage away from hips.',
      kids: 'Imagine birds nesting in your branches! If you wobble in the breeze, laugh and re-root like a joyful tree.'
    }
  },
  marjaryasana: {
    id: 'marjaryasana',
    name: 'Cat-Cow Flow',
    sanskritName: 'Mārjāryāsana-Biṭilāsana',
    durationSeconds: 120,
    targetFocus: 'Spine articulation, synchronization of movement with breath',
    svgType: 'marjaryasana',
    instructions: [
      'Begin on hands and knees in tabletop position with wrists under shoulders and knees under hips.',
      'Inhale: Drop belly gently, lift heart and tailbone to the sky (Cow Pose).',
      'Exhale: Draw navel to spine, round the back, tuck chin to chest (Cat Pose).',
      'Flow smoothly between both states with your natural respiratory rhythm.'
    ],
    alignmentCues: [
      'Fingers spread wide like starfish to distribute wrist pressure',
      'Movement initiates from the base of the spine and ripples to neck',
      'Keep shoulder blades gliding smoothly without crunching neck',
      'Inhale opens the chest; exhale empties the lungs completely'
    ],
    ageAdaptation: {
      all: 'Gentle spinal wave without forcing either extreme.',
      seniors: 'Can be performed seated on a sturdy chair, placing hands on knees and rolling the spine forward and back.',
      adults: 'Emphasize thoracic spine mobility, releasing stiffness from prolonged seated work.',
      kids: 'Make a soft cat meow on the round and a playful cow sound on the open stretch!'
    }
  },
  bhujangasana: {
    id: 'bhujangasana',
    name: 'Cobra Pose',
    sanskritName: 'Bhujaṅgāsana',
    durationSeconds: 90,
    targetFocus: 'Upper back strength, chest opening, thyroid and adrenal stimulation',
    svgType: 'bhujangasana',
    instructions: [
      'Lie face down with legs extended, tops of feet pressing gently into the mat.',
      'Place hands under shoulders, elbows hugging close to ribs.',
      'Inhale: Using back strength more than arm push, gently lift chest and collarbones.',
      'Gaze softly forward without compressing the back of the neck.'
    ],
    alignmentCues: [
      'Pubic bone stays grounded into the floor',
      'Shoulders rolled down away from ears',
      'Elbows slightly bent and pinned inward',
      'Breathe into the front lobes of the lungs'
    ],
    ageAdaptation: {
      all: 'Lift only to a comfortable height where breath remains easy and natural.',
      seniors: 'Baby Cobra or Sphinx Pose (resting on forearms) to eliminate wrist and lower-back strain.',
      adults: 'Engage posterior chain muscles, awakening dormant spinal extensors.',
      kids: 'Hiss softly like a majestic golden cobra rising calmly from the grass!'
    }
  },
  balasana: {
    id: 'balasana',
    name: 'Child Pose',
    sanskritName: 'Bālāsana',
    durationSeconds: 120,
    targetFocus: 'Restoration, hip surrender, autonomic nervous system soothing',
    svgType: 'balasana',
    instructions: [
      'Kneel on the floor, big toes touching, knees separated comfortably wide.',
      'Lower hips back toward heels and fold your torso gently between thighs.',
      'Extend arms forward on the mat or rest them alongside your body.',
      'Rest forehead gently on the mat, letting all worldly thoughts drain into the earth.'
    ],
    alignmentCues: [
      'Hips sink heavily toward heels with each exhalation',
      'Chest softens toward the floor',
      'Jaw, tongue, and facial muscles completely relaxed',
      'Deep belly breaths expand the lower back ribs'
    ],
    ageAdaptation: {
      all: 'Safe sanctuary pose to return to whenever rest is needed.',
      seniors: 'Place a folded blanket under knees or a pillow between hips and heels for gentle joint cushioning.',
      adults: 'Focus on releasing lumbar pressure and lowering cortisol levels.',
      kids: 'Curl up like a peaceful little seed sleeping warmly under the winter earth waiting for spring.'
    }
  },
  virabhadrasana: {
    id: 'virabhadrasana',
    name: 'Warrior Pose',
    sanskritName: 'Vīrabhadrāsana II',
    durationSeconds: 90,
    targetFocus: 'Stamina, hip opening, grounded courage, focused intention',
    svgType: 'virabhadrasana',
    instructions: [
      'Step feet wide apart (3 to 4 feet). Turn front foot forward, back foot slightly inward (90°).',
      'Bend front knee so it stacks directly above the ankle.',
      'Extend arms out parallel to the floor, reaching actively through fingertips.',
      'Gaze calmly over front middle finger with unwavering focus.'
    ],
    alignmentCues: [
      'Front knee tracks directly towards second toe, not caving inward',
      'Torso remains centered between both hips, upright spine',
      'Shoulders relaxed, shoulder blades resting down the back',
      'Both feet rooting firmly into the earth'
    ],
    ageAdaptation: {
      all: 'Builds physical stamina and unwavering mental composure.',
      seniors: 'Narrow the stance slightly or practice sitting astride a chair for support with arms extended.',
      adults: 'Sink hips lower to ignite quadriceps and activate pelvic stability.',
      kids: 'Be a peaceful protector of nature! Feel strong in your legs and kind in your heart.'
    }
  },
  setubandhasana: {
    id: 'setubandhasana',
    name: 'Bridge Pose',
    sanskritName: 'Setu Bandhāsana',
    durationSeconds: 90,
    targetFocus: 'Glute activation, chest expansion, spine flexibility, thyroid stimulation',
    svgType: 'setubandhasana',
    instructions: [
      'Lie on your back with knees bent, feet hip-width apart and flat on the floor close to sit bones.',
      'Rest arms alongside body, palms down.',
      'Inhale: Press feet into mat and lift hips upward toward the ceiling.',
      'Roll shoulders underneath you and keep neck long and relaxed.'
    ],
    alignmentCues: [
      'Knees stay parallel, avoiding splaying outwards',
      'Weight carried on shoulders and feet, never on cervical neck',
      'Chest expands toward chin while chin points gently upward',
      'Steady abdominal and thoracic breathing'
    ],
    ageAdaptation: {
      all: 'Invigorates the spine and opens the anterior chest.',
      seniors: 'Place a yoga block or thick folded cushion under sacrum for a restorative, effortless lift.',
      adults: 'Firmly contract glutes and hamstrings to reverse long hours of chair sitting.',
      kids: 'Build a bridge with your body and imagine boats sailing peacefully underneath!'
    }
  },
  sukhasana: {
    id: 'sukhasana',
    name: 'Easy Seated Pose',
    sanskritName: 'Sukhāsana',
    durationSeconds: 120,
    targetFocus: 'Meditative alignment, grounded pelvis, vertical spine channel',
    svgType: 'sukhasana',
    instructions: [
      'Sit comfortably with legs crossed, sitting bones grounded evenly.',
      'Lengthen the spine from the tailbone all the way to crown of head.',
      'Rest hands on knees with palms facing up (Chin Mudra: thumb and index finger touching).',
      'Close eyes gently or soften gaze downward at a 45-degree angle.'
    ],
    alignmentCues: [
      'Pelvis slightly tilted forward so spine naturally curves with ease',
      'Shoulders relaxed directly above the hips',
      'Throat and jaw relaxed, subtle smile on lips',
      'Clear pranic airway along the central axis (Sushumna)'
    ],
    ageAdaptation: {
      all: 'The classic foundational seat of contemplation and inner peace.',
      seniors: 'Sit comfortably on a chair with feet flat on the floor, or sit elevated on a firm cushion.',
      adults: 'Check that shoulders are not rounding forward; draw shoulder blades slightly together.',
      kids: 'Sit like an ancient mountain sage listening to the gentle whispers of the forest.'
    }
  },
  shavasana: {
    id: 'shavasana',
    name: 'Corpse Pose (Deep Rest)',
    sanskritName: 'Śavāsana',
    durationSeconds: 180,
    targetFocus: 'Total surrender, nervous system integration, cellular rejuvenation',
    svgType: 'shavasana',
    instructions: [
      'Lie flat on your back, legs separated naturally with feet falling softly outward.',
      'Arms alongside body, slightly away from torso with palms facing upward.',
      'Allow the entire weight of your body to melt completely into the earth.',
      'Release control of the breath; simply observe its gentle, effortless tide.'
    ],
    alignmentCues: [
      'Body in complete symmetrical balance',
      'Eyes rested deeply in their sockets',
      'Tongue resting away from roof of mouth',
      'Pure conscious surrender without falling asleep'
    ],
    ageAdaptation: {
      all: 'Essential closure to allow the body to assimilate all benefits of practice.',
      seniors: 'Place a small pillow under head and a bolster under knees to alleviate lumbar pressure.',
      adults: 'Consciously scan from crown to toes, releasing held micro-tensions.',
      kids: 'Imagine floating like a fluffy cloud drifting across a warm blue afternoon sky.'
    }
  }
};

// Breathing patterns across the journey
export const BREATH_PATTERNS: Record<string, BreathPattern> = {
  dirgha: {
    name: 'Three-Part Yogic Breath',
    sanskritName: 'Dīrgha Prāṇāyāma',
    inhale: 4,
    holdIn: 2,
    exhale: 4,
    holdOut: 2,
    instructions: 'Fill the abdomen first, then the ribcage, then the upper chest. Exhale in reverse order smoothly.',
    benefits: 'Calms anxiety, oxygenates lower lung lobes, lowers heart rate.',
    ageAdaptation: {
      all: 'Smooth, natural wave of breath with zero strain or gasping.',
      seniors: 'Breath can be gentle 3-count without any prolonged retention.',
      adults: 'Full deep lung expansion, stimulating the vagus nerve.',
      kids: 'Imagine inflating a colorful party balloon in your belly, then letting the air out slowly!'
    }
  },
  nadiShodhana: {
    name: 'Alternate Nostril Balancing',
    sanskritName: 'Nāḍī Śodhana',
    inhale: 4,
    holdIn: 4,
    exhale: 4,
    holdOut: 2,
    instructions: 'Use right thumb to close right nostril, inhale left. Close left, exhale right. Inhale right, close right, exhale left.',
    benefits: 'Harmonizes left (Ida) and right (Pingala) hemispheres, clears mental fog.',
    ageAdaptation: {
      all: 'Balances the nervous system and creates deep mental clarity.',
      seniors: 'Can be done mentally without using fingers if hands or arms tire easily.',
      adults: 'Great antidote to analytical screen fatigue and decision overload.',
      kids: 'Imagine smelling a sweet rose on one side, and gently blowing out a birthday candle on the other!'
    }
  },
  bhramari: {
    name: 'Humming Bee Breath',
    sanskritName: 'Bhrāmarī',
    inhale: 4,
    holdIn: 1,
    exhale: 6,
    holdOut: 1,
    instructions: 'Inhale deeply through both nostrils. On the long exhalation, make a soft, continuous humming bee sound (Mmmm) in throat and crown.',
    benefits: 'Produces nitric oxide in nasal airways, instantly soothes anger, quiets obsessive thoughts.',
    ageAdaptation: {
      all: 'Vibrational therapy for the central nervous system.',
      seniors: 'Soft, gentle humming stimulates throat energy and peaceful sleep.',
      adults: 'High therapeutic value for relieving chronic migraines and work tension.',
      kids: 'Make the buzzing sound of a happy bumblebee collecting sweet nectar from flowers!'
    }
  },
  boxBreathing: {
    name: 'Sama Vritti (Box Breathing)',
    sanskritName: 'Sama Vṛtti',
    inhale: 4,
    holdIn: 4,
    exhale: 4,
    holdOut: 4,
    instructions: 'Equal length for all four phases: Inhale 4s, Hold full 4s, Exhale 4s, Hold empty 4s.',
    benefits: 'Instills mental mastery, emotional composure under pressure, steady heart coherence.',
    ageAdaptation: {
      all: 'Geometric breath for balance and centered focus.',
      seniors: 'Use a comfortable 3-3-3-3 second count without holding tightly.',
      adults: 'Focus on absolute steadiness at the pauses (Kumbhaka).',
      kids: 'Trace the four sides of an imaginary magical golden square with your finger in the air!'
    }
  },
  sheetali: {
    name: 'Cooling Breath',
    sanskritName: 'Śītalī Prāṇāyāma',
    inhale: 4,
    holdIn: 2,
    exhale: 5,
    holdOut: 1,
    instructions: 'Curl the tongue into a tube (or inhale through teeth with lips parted). Draw cool air inward, swallow gently, and exhale warm air through nose.',
    benefits: 'Cools internal Pitta fire, reduces blood pressure, quenches thirst and fatigue.',
    ageAdaptation: {
      all: 'Refreshing cooling tonic for body and mind.',
      seniors: 'If curling tongue is difficult, simply draw air gently through teeth (Sitkari).',
      adults: 'Cools workplace anger, acidity, and physical heat.',
      kids: 'Pretend you are sipping an icy cold fruit smoothie through a straw!'
    }
  },
  ujjayi: {
    name: 'Oceanic Victory Breath',
    sanskritName: 'Ujjāyī Prāṇāyāma',
    inhale: 5,
    holdIn: 2,
    exhale: 5,
    holdOut: 1,
    instructions: 'Gently constrict the glottis at the back of the throat, creating a soft, rhythmic whispering sound like ocean waves on both inhale and exhale.',
    benefits: 'Warms the internal core, calms brainwaves into alpha state, stabilizes posture holds.',
    ageAdaptation: {
      all: 'Anchor your attention entirely to the sound of the ocean inside your throat.',
      seniors: 'Very soft, whisper-light sound that keeps the mind peacefully present.',
      adults: 'Use to generate steady internal heat and unwavering mental endurance.',
      kids: 'Listen to the sea shell inside your throat like whispering to a friendly dolphin!'
    }
  }
};

// 12 Levels Data Structure
export const LEVELS_DATA: LevelInfo[] = [
  {
    id: 1,
    month: 1,
    name: 'Level 1: Aarambha',
    sanskritName: 'आरम्भ (Foundation & Awakening)',
    dailyMinutes: 15,
    stageDurations: {
      theory: 180,     // 3 mins
      breathwork: 240, // 4 mins
      poses: 300,      // 5 mins
      meditation: 180  // 3 mins
    },
    tagline: 'Awakening Body & Breath Awareness',
    description: 'Establish the sacred habit of daily yoga. Learn the roots of conscious breath, spinal posture, and mental calm designed for beginners of all ages.',
    chakraFocus: 'Mūlādhāra (Root Chakra - Grounding & Safety)',
    masterQuote: 'Yoga does not ask you to be flexible in your body first; it asks you to be flexible in your willingness to arrive on the mat.',
    keyBenefits: [
      'Gentle relief from postural stiffness and back ache',
      'Introduction to conscious diaphragmatic breathing',
      'Daily 15-minute grounding routine suitable for any schedule',
      'Accessible adaptations for seniors, adults, and kids'
    ],
    sampleSession: {
      dayNumber: 1,
      title: 'Arrival into Stillness & Sacred Breath',
      sanskritTitle: 'Aarambha Sthiti',
      sankalpa: 'Today, I honor my body with patience, gratitude, and gentle presence.',
      theory: {
        philosophyTitle: 'The Principle of Ahimsa (Non-Harm & Kindness to Self)',
        darshanQuote: 'In the tradition of Manoj YogaWala, the first posture is compassion toward your own body.',
        teaching: 'Yoga begins not with touching your toes, but with observing your breath without judgment. When we sit or stand with awareness, we establish the bridge between the transient mind and the timeless witness within. Today is your foundation.',
        anatomicalInsight: 'Proper spinal alignment relieves 60% of unnecessary strain on the lumbar vertebrae and instantly opens the diaphragm.',
        practicalLifeLesson: 'Whenever stress arises in your day, take three conscious breaths before speaking or reacting.',
        ageGuidance: {
          all: 'Practice at your own pace without comparing yourself to anyone else.',
          seniors: 'Feel free to sit on a comfortable chair with upright spine; your presence is what matters.',
          adults: 'Notice where you store tension—in the jaw or shoulders—and deliberately soften there.',
          kids: 'Have fun stretching tall like a growing tree and listening to your magical heartbeat!'
        }
      },
      breathwork: BREATH_PATTERNS.dirgha,
      poses: [
        POSE_LIBRARY.sukhasana,
        POSE_LIBRARY.tadasana,
        POSE_LIBRARY.marjaryasana,
        POSE_LIBRARY.balasana
      ],
      meditation: {
        title: 'Rooting into the Living Earth',
        focusType: 'breath',
        guidanceText: 'Sit comfortably with a straight spine. Close your eyes. Feel the physical points of contact between your body and the floor. With every exhalation, let gravity carry away fatigue. With every inhalation, welcome fresh golden vitality.',
        mantraOrSeedSound: 'So-Hum (I am That)',
        reflectionPrompt: 'What tension can I gently give permission to leave my body right now?',
        ambientSetting: 'sunrise'
      }
    }
  },
  {
    id: 2,
    month: 2,
    name: 'Level 2: Sthira',
    sanskritName: 'स्थिर (Steadiness & Joint Freedom)',
    dailyMinutes: 15,
    stageDurations: {
      theory: 180,
      breathwork: 240,
      poses: 300,
      meditation: 180
    },
    tagline: 'Cultivating Stability and Fluid Mobility',
    description: 'Build physical steadiness and lubricate joint capsules. Understand the principle of Sthira-Sukham (steadiness without rigidity).',
    chakraFocus: 'Svādhiṣṭhāna (Sacral Chakra - Ease & Fluidity)',
    masterQuote: 'Sthira sukham asanam — posture should be steady and comfortable. If you strain, you have left yoga.',
    keyBenefits: [
      'Joint lubrication and release of morning stiffness',
      'Balance stabilization and fall prevention',
      'Gentle spine elongation and pelvic alignment',
      'Strengthening of foot arches and ankle stabilizers'
    ],
    sampleSession: {
      dayNumber: 1,
      title: 'Steadiness of Feet, Freedom of Mind',
      sanskritTitle: 'Sthira Pada',
      sankalpa: 'I stand rooted like an ancient mountain, unwavering amid the winds of circumstance.',
      theory: {
        philosophyTitle: 'Sthira-Sukham Asanam (Steadiness & Ease)',
        darshanQuote: 'True strength is not rigid force, but the graceful ability to remain calm while holding posture.',
        teaching: 'Patāñjali teaches that posture becomes perfected when effort becomes effortless, and attention merges with the infinite. Notice when you clench your teeth or hold your breath in posture; invite softness back into the steady frame.',
        anatomicalInsight: 'Grounding into the four corners of each foot activates the deep arch reflexes and relieves strain from the knee joints.',
        practicalLifeLesson: 'When life feels turbulent, return your awareness to your feet on the ground and take one steady breath.',
        ageGuidance: {
          all: 'Maintain an upright spine without arching your lower back.',
          seniors: 'Keep one hand near a chair or wall during standing balances to maintain complete confidence.',
          adults: 'Balance desk hours by lengthening the front hip flexors and stabilizing the pelvis.',
          kids: 'Test your balance like a flamingo resting peacefully on one leg!'
        }
      },
      breathwork: BREATH_PATTERNS.boxBreathing,
      poses: [
        POSE_LIBRARY.tadasana,
        POSE_LIBRARY.vrikshasana,
        POSE_LIBRARY.balasana,
        POSE_LIBRARY.shavasana
      ],
      meditation: {
        title: 'The Still Center of the Cyclone',
        focusType: 'body-scan',
        guidanceText: 'Turn your attention inward. Notice how thoughts move like weather across the sky, while the sky itself remains untouched. Rest as the calm sky.',
        mantraOrSeedSound: 'Om Shanti (Peace in Mind, Speech, Body)',
        reflectionPrompt: 'Where in my life can I bring more steadiness instead of rushing?',
        ambientSetting: 'sanctuary'
      }
    }
  },
  {
    id: 3,
    month: 3,
    name: 'Level 3: Sukham',
    sanskritName: 'सुखम् (Ease & Deep Nervous Calm)',
    dailyMinutes: 15,
    stageDurations: {
      theory: 180,
      breathwork: 240,
      poses: 300,
      meditation: 180
    },
    tagline: 'Deep Rest & Neurological Reset',
    description: 'Learn to down-regulate the nervous system, release chronic sub-conscious bracing, and discover the nectar of profound relaxation.',
    chakraFocus: 'Maṇipūra & Anāhata (Solar to Heart Harmonization)',
    masterQuote: 'Rest is not laziness; it is the sacred soil from which all genuine strength, wisdom, and health blossom.',
    keyBenefits: [
      'Down-regulation of the sympathetic fight-or-flight response',
      'Enhanced sleep quality and reduced restlessness',
      'Gentle opening of the chest and shoulders',
      'Cultivation of self-compassion across all ages'
    ],
    sampleSession: {
      dayNumber: 1,
      title: 'The Art of Conscious Surrender',
      sanskritTitle: 'Vishranti Darshan',
      sankalpa: 'I surrender tension and welcome peace into every single cell of my being.',
      theory: {
        philosophyTitle: 'Santosha (Contentment in the Present Moment)',
        darshanQuote: 'Contentment is not the absence of desire, but the profound realization that this breath is already complete.',
        teaching: 'When we practice Santosha, we stop fighting reality. We soften our grip on how things "should" be, and allow the body to heal in its natural intelligence. Your practice today is an offering of rest.',
        anatomicalInsight: 'Prolonged smooth exhalations trigger the vagus nerve, reducing heart rate and dilating blood vessels.',
        practicalLifeLesson: 'Notice today whenever you are hurrying for no reason. Slow down your step by 10%.',
        ageGuidance: {
          all: 'Allow every muscle to feel heavy, supported, and relaxed.',
          seniors: 'Support the neck and lower back with pillows during reclining postures.',
          adults: 'Let go of performance pressure; your worth is not measured by posture difficulty.',
          kids: 'Pretend you are melting like warm honey on a sunny slice of bread!'
        }
      },
      breathwork: BREATH_PATTERNS.bhramari,
      poses: [
        POSE_LIBRARY.marjaryasana,
        POSE_LIBRARY.setubandhasana,
        POSE_LIBRARY.balasana,
        POSE_LIBRARY.shavasana
      ],
      meditation: {
        title: 'Nectar of Quiet Joy (Santosha)',
        focusType: 'gratitude',
        guidanceText: 'Breathe softly. Bring to mind three small blessings from today: the breath in your lungs, the roof over your head, and this moment of stillness. Rest in silent gratitude.',
        mantraOrSeedSound: 'Anando Hum (I am Joyful Nature)',
        reflectionPrompt: 'What simple blessing am I grateful for right now in this exact moment?',
        ambientSetting: 'sunrise'
      }
    }
  },
  {
    id: 4,
    month: 4,
    name: 'Level 4: Prana Jagran',
    sanskritName: 'प्राण जागरण (Vital Energy Awakening)',
    dailyMinutes: 25,
    stageDurations: {
      theory: 240,     // 4 mins
      breathwork: 360, // 6 mins
      poses: 600,      // 10 mins
      meditation: 300  // 5 mins
    },
    tagline: 'Igniting Vital Life Energy & Nadi Balance',
    description: 'Transitioning into 25-minute practice. We awaken the Pranamaya Kosha (energy sheath) and balance the subtle solar and lunar energy channels.',
    chakraFocus: 'Anāhata (Heart Center - Unconditional Compassion)',
    masterQuote: 'When the breath wanders, the mind is unsteady; when the breath is calm, the mind is steady and the yogi lives long.',
    keyBenefits: [
      'Increased lung vital capacity and breath control',
      'Balancing of both brain hemispheres with Nadi Shodhana',
      'Enhanced daily stamina and emotional poise',
      'Deeper postural endurance and pelvic stability'
    ],
    sampleSession: {
      dayNumber: 1,
      title: 'Awakening the Solar and Lunar Currents',
      sanskritTitle: 'Ida Pingala Samanvaya',
      sankalpa: 'May my vital energy flow freely, bringing health, clarity, and kindness.',
      theory: {
        philosophyTitle: 'The Five Prana Vayus (The Subtle Winds of Life)',
        darshanQuote: 'Manoj YogaWala reminds us: The breath you inhale is universal life honoring your temple.',
        teaching: 'Within us flow five currents of prana: Prana (inward intake), Apana (downward release), Samana (digestive equilibrium), Udana (upward aspiration), and Vyana (circulation). When these vayus are balanced through asana and pranayama, disease and agitation dissolve.',
        anatomicalInsight: 'Alternate nostril breathing alters autonomic tone and balances sympathetic and parasympathetic activity.',
        practicalLifeLesson: 'Pay attention to how your breath mirrors your mood. Calm breath produces calm speech.',
        ageGuidance: {
          all: 'Maintain rhythmic pacing throughout the 25 minutes.',
          seniors: 'Keep breaths unforced; do not hold longer than feels effortlessly comfortable.',
          adults: 'Engage gentle Ujjayi throat sound to keep the mind tethered to the moment.',
          kids: 'Imagine two sparkling rivers inside your chest meeting in a lake of pure light!'
        }
      },
      breathwork: BREATH_PATTERNS.nadiShodhana,
      poses: [
        POSE_LIBRARY.tadasana,
        POSE_LIBRARY.virabhadrasana,
        POSE_LIBRARY.bhujangasana,
        POSE_LIBRARY.balasana,
        POSE_LIBRARY.shavasana
      ],
      meditation: {
        title: 'Golden River of Prana',
        focusType: 'light',
        guidanceText: 'Visualize a luminous golden light flowing up your spine on the inhale, and radiating out into your heart space on the exhale. You are bathed in vibrant life.',
        mantraOrSeedSound: 'Prana Rupini (Embodiment of Vital Force)',
        reflectionPrompt: 'How can I direct my energy toward what truly matters today?',
        ambientSetting: 'sanctuary'
      }
    }
  },
  {
    id: 5,
    month: 5,
    name: 'Level 5: Surya Shakti',
    sanskritName: 'सूर्य शक्ति (Solar Vitality & Core Power)',
    dailyMinutes: 25,
    stageDurations: {
      theory: 240,
      breathwork: 360,
      poses: 600,
      meditation: 300
    },
    tagline: 'Solar Strength, Courage & Core Equilibrium',
    description: 'Cultivate inner resilience and digestive vitality. Strengthen the core girdle, back extensors, and the inner fire (Jatharagni) of transformation.',
    chakraFocus: 'Maṇipūra (Solar Plexus - Willpower & Courage)',
    masterQuote: 'Yoga does not take time; it gives time back by giving you clarity and vitality.',
    keyBenefits: [
      'Core musculature strengthening and lumbar protection',
      'Stimulation of healthy digestion and cellular metabolism',
      'Cultivation of self-confidence and radiant posture',
      'Better circulatory health and arterial tone'
    ],
    sampleSession: {
      dayNumber: 1,
      title: 'Kindling the Inner Solar Fire (Agni)',
      sanskritTitle: 'Agni Deepana',
      sankalpa: 'I possess the quiet strength to transform challenges into wisdom and fuel.',
      theory: {
        philosophyTitle: 'Tapas (Transformational Heat & Spiritual Discipline)',
        darshanQuote: 'Tapas is the gold refined in the fire. We do not practice to suffer, but to burn away inertia and doubt.',
        teaching: 'In yogic science, inertia is called Tamas. When we feel sluggish, unmotivated, or reactive, Tapas is the conscious spark that moves us onto the mat. Through steady postures and focused breath, we awaken our natural luminosity.',
        anatomicalInsight: 'Activating the transversus abdominis and gluteal muscles relieves compression on lumbar discs by up to 40%.',
        practicalLifeLesson: 'Choose to do the meaningful task first today rather than deferring it.',
        ageGuidance: {
          all: 'Keep joints aligned; never sacrifice form for intensity.',
          seniors: 'Focus on posture lifts with chair backing; build core strength gently through steady seated breathing.',
          adults: 'Maintain active pelvic tuck in Warrior and Bridge poses to maximize spinal stability.',
          kids: 'Shine like the bright morning sun warming the whole Earth!'
        }
      },
      breathwork: BREATH_PATTERNS.boxBreathing,
      poses: [
        POSE_LIBRARY.tadasana,
        POSE_LIBRARY.virabhadrasana,
        POSE_LIBRARY.setubandhasana,
        POSE_LIBRARY.marjaryasana,
        POSE_LIBRARY.shavasana
      ],
      meditation: {
        title: 'The Unshakable Sun Within',
        focusType: 'om',
        guidanceText: 'Rest your awareness in the navel center. Visualize a steady sun blazing warmly, dissolving all fatigue and fear. Rest in its infinite warmth.',
        mantraOrSeedSound: 'Ram (Seed Sound of Fire & Will)',
        reflectionPrompt: 'What habit or doubt am I ready to burn away and leave behind?',
        ambientSetting: 'sunrise'
      }
    }
  },
  {
    id: 6,
    month: 6,
    name: 'Level 6: Ananda',
    sanskritName: 'आनन्द (Heart Radiance & Emotional Harmony)',
    dailyMinutes: 25,
    stageDurations: {
      theory: 240,
      breathwork: 360,
      poses: 600,
      meditation: 300
    },
    tagline: 'Opening the Heart & Emotional Equilibrium',
    description: 'Halfway through the 1-year journey. Dissolve armor around the heart, expand chest freedom, and cultivate Anandamaya Kosha (the bliss body).',
    chakraFocus: 'Anāhata (Heart - Unstruck Sound of Love)',
    masterQuote: 'The heart that breaks open becomes the temple where the entire universe finds room to sit.',
    keyBenefits: [
      'Relief from hunched shoulders and closed thoracic posture',
      'Emotional release and release of accumulated grief or anxiety',
      'Harmonization of blood pressure and cardiac rhythm',
      'Profound sense of gratitude and connectedness'
    ],
    sampleSession: {
      dayNumber: 1,
      title: 'The Unconditional Heart (Anahata)',
      sanskritTitle: 'Hridaya Darshan',
      sankalpa: 'My heart is open, generous, and at peace with all living beings.',
      theory: {
        philosophyTitle: 'Maitri & Karuna (Loving Kindness & Compassion)',
        darshanQuote: 'Manoj YogaWala teaches: To forgive another is a kindness to them; to forgive yourself is liberation.',
        teaching: 'The word Anahata means "unstruck"—the pure vibration that exists before two objects collide. Behind our temporary moods, there is an unstruck source of love and wholeness in the heart. Today, we open the chest to let that light breathe.',
        anatomicalInsight: 'Chest extension stretches the pectoral fascia, allowing full excursion of the ribcage and enhancing venous return to the heart.',
        practicalLifeLesson: 'Silently wish happiness to the next three strangers you see today.',
        ageGuidance: {
          all: 'Open the chest without straining the lower back.',
          seniors: 'Gently clasp hands behind the chair back to open the shoulders comfortably.',
          adults: 'Roll shoulders back and draw collarbones wide; feel the physical relief of breathing fully.',
          kids: 'Send a big hug of happy light to everyone in your family and all your friends!'
        }
      },
      breathwork: BREATH_PATTERNS.bhramari,
      poses: [
        POSE_LIBRARY.sukhasana,
        POSE_LIBRARY.bhujangasana,
        POSE_LIBRARY.setubandhasana,
        POSE_LIBRARY.balasana,
        POSE_LIBRARY.shavasana
      ],
      meditation: {
        title: 'Loving Kindness for All Beings (Metta)',
        focusType: 'gratitude',
        guidanceText: 'Place your right hand gently on the center of your chest. Repeat silently: May I be peaceful. May I be healthy. May I live with ease. Now radiate this wish to all beings everywhere.',
        mantraOrSeedSound: 'Yam (Seed Sound of the Heart)',
        reflectionPrompt: 'Who in my life could use an unspoken blessing of peace today?',
        ambientSetting: 'sanctuary'
      }
    }
  },
  {
    id: 7,
    month: 7,
    name: 'Level 7: Tejas',
    sanskritName: 'तेजस् (Inner Fire & Cellular Cleansing)',
    dailyMinutes: 35,
    stageDurations: {
      theory: 300,     // 5 mins
      breathwork: 480, // 8 mins
      poses: 840,      // 14 mins
      meditation: 480  // 8 mins
    },
    tagline: 'Deepening Strength, Flow & Pranic Mastery',
    description: 'Entering the 35-minute progressive tier. Cleanse deep tissues, lengthen breath cycles, and build authentic internal luminosity and endurance.',
    chakraFocus: 'Maṇipūra & Viśuddha (Fire to Throat Purification)',
    masterQuote: 'Purity of body is not cleanliness of the skin; it is the clarity of consciousness that shines through every pore.',
    keyBenefits: [
      'Elevated stamina and cardiovascular resilience',
      'Purification of the breath through rhythmic Kumbhaka (retention)',
      'Detoxification of organs through gentle twists and deep diaphragmatic action',
      'Deeper stillness and mental fortitude'
    ],
    sampleSession: {
      dayNumber: 1,
      title: 'Cellular Purification and Luminous Energy',
      sanskritTitle: 'Shaucha & Tejas',
      sankalpa: 'I cleanse my mind of old burdens and welcome radiant vitality.',
      theory: {
        philosophyTitle: 'Shaucha (Clarity, Cleanliness & Inner Space)',
        darshanQuote: 'When the mirror is wiped clean of dust, it reflects the sun naturally. Yoga is the wiping of the mirror.',
        teaching: 'Shaucha is both external cleanliness and the internal clarity of thoughts. In our 35-minute session today, we learn to breathe not just with our lungs, but as if every cell is drinking in the divine nectar of Prana.',
        anatomicalInsight: 'Longer exhalation cycles encourage cellular clearance of carbonic waste and reset the autonomic nervous system.',
        practicalLifeLesson: 'Clear physical clutter from one space in your home today to invite mental clarity.',
        ageGuidance: {
          all: 'Listen to the body; adjust rhythm whenever needed.',
          seniors: 'Take pauses between poses; breathe deeply and hydrate mindfully.',
          adults: 'Deepen the holds in standing postures; observe your mind when heat builds.',
          kids: 'Imagine taking a warm bath of pure starlight that washes away all grumpiness!'
        }
      },
      breathwork: BREATH_PATTERNS.ujjayi,
      poses: [
        POSE_LIBRARY.tadasana,
        POSE_LIBRARY.virabhadrasana,
        POSE_LIBRARY.marjaryasana,
        POSE_LIBRARY.bhujangasana,
        POSE_LIBRARY.setubandhasana,
        POSE_LIBRARY.shavasana
      ],
      meditation: {
        title: 'The Inner Radiant Flame (Jyoti)',
        focusType: 'light',
        guidanceText: 'Visualize a golden flame in the center of your heart. It does not waver in the wind. It burns brightly, illuminating your path with pure peace and wisdom.',
        mantraOrSeedSound: 'Tejomayo Hum (I am Composed of Radiant Light)',
        reflectionPrompt: 'What negative self-talk am I ready to release into the flame?',
        ambientSetting: 'sunrise'
      }
    }
  },
  {
    id: 8,
    month: 8,
    name: 'Level 8: Dharana',
    sanskritName: 'धारणा (Unwavering Concentration)',
    dailyMinutes: 35,
    stageDurations: {
      theory: 300,
      breathwork: 480,
      poses: 840,
      meditation: 480
    },
    tagline: 'Single-Pointed Focus & Awakening the Spine',
    description: 'Master the sixth limb of Ashtanga Yoga: Dharana. Train the wandering monkey-mind into an obedient, razor-sharp instrument of awareness.',
    chakraFocus: 'Ājñā (Third Eye - Intuition & Discernment)',
    masterQuote: 'Concentration is the binding of consciousness to a single locus. Where attention goes, energy flows.',
    keyBenefits: [
      'Sharpened focus and reduction of digital attention fragmentation',
      'Advanced balance mastery and proprioceptive awareness',
      'Spinal decompression and deep core stabilization',
      'Effortless transition into peaceful meditation'
    ],
    sampleSession: {
      dayNumber: 1,
      title: 'Taming the Restless Mind (Chitta Vritti)',
      sanskritTitle: 'Ekagrata Darshan',
      sankalpa: 'My mind is steady, sharp, and anchored in the living presence.',
      theory: {
        philosophyTitle: 'Yoga Chitta Vritti Nirodha (Quietude of the Mental Lake)',
        darshanQuote: 'The lake cannot reflect the moon when waves are turbulent. When the waves settle, the moon reveals itself.',
        teaching: 'Patāñjali opens the Yoga Sutras with the definition of yoga: the calming of the whirlpools of the mind. When we train the eyes to hold a steady gaze (Drishti), the visual cortex calms, and the mind ceases to jump from past regrets to future anxieties.',
        anatomicalInsight: 'Fixing the gaze on a steady point activates cerebellar balance networks and slows ocular micro-saccades.',
        practicalLifeLesson: 'When doing any task today, do only that one thing without multitasking for 20 minutes.',
        ageGuidance: {
          all: 'Keep eyes steady on a single point without squinting.',
          seniors: 'Gaze softly at eye level; maintain calm breathing to keep balance completely secure.',
          adults: 'Notice how your mind wants to check notifications; redirect attention back to breath.',
          kids: 'Pretend you are an eagle high on a snowy peak spotting a tiny silver fish from miles away!'
        }
      },
      breathwork: BREATH_PATTERNS.nadiShodhana,
      poses: [
        POSE_LIBRARY.vrikshasana,
        POSE_LIBRARY.virabhadrasana,
        POSE_LIBRARY.sukhasana,
        POSE_LIBRARY.balasana,
        POSE_LIBRARY.shavasana
      ],
      meditation: {
        title: 'The Third Eye Anchor (Bhrumadhya)',
        focusType: 'om',
        guidanceText: 'Gently direct your inner gaze to the space between your eyebrows. Do not strain. Simply rest your attention there like a feather landing on calm water.',
        mantraOrSeedSound: 'Aum (Universal Vibration)',
        reflectionPrompt: 'When I silence external noise, what truth whispers in my heart?',
        ambientSetting: 'sanctuary'
      }
    }
  },
  {
    id: 9,
    month: 9,
    name: 'Level 9: Vairagya',
    sanskritName: 'वैराग्य (Equanimity & Non-Attachment)',
    dailyMinutes: 35,
    stageDurations: {
      theory: 300,
      breathwork: 480,
      poses: 840,
      meditation: 480
    },
    tagline: 'Deep Restorative Release & Transcendent Peace',
    description: 'Learn the liberating art of letting go. Cultivate Vairagya—freedom from attachment to praise, blame, gain, or loss—experiencing sublime freedom.',
    chakraFocus: 'Viśuddha & Sahasrāra (Throat to Crown Elevation)',
    masterQuote: 'You only lose what you cling to. When you open your hands, the entire world is yours.',
    keyBenefits: [
      'Profound relief from chronic stress and psychological burnout',
      'Harmonization of thyroid function and expressive voice',
      'Deep fascial release and nervous system restorative renewal',
      'Steadiness through life’s inevitable changes'
    ],
    sampleSession: {
      dayNumber: 1,
      title: 'The Freedom of Non-Attachment (Vairagya)',
      sanskritTitle: 'Moksha Sparsha',
      sankalpa: 'I release all need to control; I trust the sacred timing of life.',
      theory: {
        philosophyTitle: 'Abhyasa & Vairagya (The Two Wings of the Spiritual Bird)',
        darshanQuote: 'Manoj YogaWala says: Practice (Abhyasa) gives you wings; Surrender (Vairagya) gives you direction.',
        teaching: 'A bird cannot fly with only one wing. If you only put in effort without detachment, you burn out. If you only practice detachment without effort, you become stagnant. Together, effort and surrender lift you into the boundless sky.',
        anatomicalInsight: 'Prolonged passive stretching (yin holds) releases tension held in the deep fascial matrix and increases hyaluronic acid lubrication.',
        practicalLifeLesson: 'When an outcome doesn’t go your way today, take a breath and say: "I accept this as my teacher."',
        ageGuidance: {
          all: 'Surrender fully into postures; let the breath do the work.',
          seniors: 'Use pillows and cushions freely to feel completely supported by the earth.',
          adults: 'Notice perfectionist tendencies in the pose; smile and soften by 10%.',
          kids: 'Let go of old worries like releasing a helium balloon high into the blue clouds!'
        }
      },
      breathwork: BREATH_PATTERNS.sheetali,
      poses: [
        POSE_LIBRARY.sukhasana,
        POSE_LIBRARY.marjaryasana,
        POSE_LIBRARY.setubandhasana,
        POSE_LIBRARY.balasana,
        POSE_LIBRARY.shavasana
      ],
      meditation: {
        title: 'Dissolving into the Ocean of Being',
        focusType: 'silence',
        guidanceText: 'Imagine yourself as a drop of pure rainwater returning to the vast, calm ocean. The drop does not vanish; it becomes the ocean. Rest as the whole.',
        mantraOrSeedSound: 'Shivo Hum (I am Pure Consciousness)',
        reflectionPrompt: 'What heavy expectation can I lay down today so my heart can fly light?',
        ambientSetting: 'sunrise'
      }
    }
  },
  {
    id: 10,
    month: 10,
    name: 'Level 10: Kundalini Chetana',
    sanskritName: 'कुण्डलिनी चेतना (Subtle Energy & Spiritual Radiance)',
    dailyMinutes: 45,
    stageDurations: {
      theory: 360,      // 6 mins
      breathwork: 600,  // 10 mins
      poses: 1080,      // 18 mins
      meditation: 660   // 11 mins
    },
    tagline: 'Mastery Tier: Awakening Higher Vitality',
    description: 'Entering the culminating 45-minute master tier. Harmonize the spinal axis (Sushumna Nadi), integrate energy locks (Bandhas), and ignite higher intuition.',
    chakraFocus: 'Sushumnā Nādī & Sahasrāra (Spinal Conduit to Infinity)',
    masterQuote: 'The spine is the altar of God. Keep it flexible, vibrant, and aligned, and divine grace flows effortlessly.',
    keyBenefits: [
      'Complete 45-minute daily transformational practice',
      'Advanced breath control and cellular energy enhancement',
      'Profound spinal longevity and nervous system coherence',
      'Spiritual clarity and alignment with your highest purpose'
    ],
    sampleSession: {
      dayNumber: 1,
      title: 'The Vertical Highway of the Soul (Sushumna)',
      sanskritTitle: 'Chidambaram Darshan',
      sankalpa: 'I am a clear channel of wisdom, vitality, and universal love.',
      theory: {
        philosophyTitle: 'The Architecture of the Subtle Body (Chakras & Nadis)',
        darshanQuote: 'Manoj YogaWala teaches: You are not a human being trying to awaken spirituality; you are pure Spirit awakening through a human frame.',
        teaching: 'Along your spine lie 72,000 subtle energy rivers (Nadis). When the body is cleansed through asana and the mind through pranayama, the dormant energy awakens and rises along the Sushumna, bringing bliss, clarity, and spontaneous compassion.',
        anatomicalInsight: 'Spinal waves and axial lengthening hydrate the intervertebral discs and facilitate cerebrospinal fluid pulsation.',
        practicalLifeLesson: 'Walk through your day with an upright, dignified spine—it immediately changes how you feel and how the world responds.',
        ageGuidance: {
          all: 'Keep attention centered along the spinal axis throughout the 45-minute journey.',
          seniors: 'Perform all poses with grace; your rich life experience infuses your practice with natural wisdom.',
          adults: 'Embrace the longer 10-minute breathwork; let it wash away years of accumulated stress.',
          kids: 'Feel like a superhero whose spine glows with rainbow starlight!'
        }
      },
      breathwork: BREATH_PATTERNS.dirgha,
      poses: [
        POSE_LIBRARY.tadasana,
        POSE_LIBRARY.vrikshasana,
        POSE_LIBRARY.virabhadrasana,
        POSE_LIBRARY.bhujangasana,
        POSE_LIBRARY.setubandhasana,
        POSE_LIBRARY.sukhasana,
        POSE_LIBRARY.shavasana
      ],
      meditation: {
        title: 'Spinal Column of White Light',
        focusType: 'light',
        guidanceText: 'Inhale from the base of your spine to the crown of your head as liquid golden light. Exhale from the crown down to the base as cool silver starlight. Feel the sacred symmetry.',
        mantraOrSeedSound: 'Om Hreem Namah',
        reflectionPrompt: 'How can my life become an instrument of blessing for others?',
        ambientSetting: 'sanctuary'
      }
    }
  },
  {
    id: 11,
    month: 11,
    name: 'Level 11: Samadhi Sparsha',
    sanskritName: 'समाधि स्पर्श (Transcendent Stillness & Pure Being)',
    dailyMinutes: 45,
    stageDurations: {
      theory: 360,
      breathwork: 600,
      poses: 1080,
      meditation: 660
    },
    tagline: 'Touching the State of Supreme Stillness',
    description: 'Deepening into the eighth limb: Samadhi. Moving beyond thought, beyond anxiety, into the silent eternal witness (Sakshi Bhava).',
    chakraFocus: 'Sahasrāra (Thousand-Petaled Lotus of Pure Awareness)',
    masterQuote: 'Silence is the language of the Divine; all else is poor translation.',
    keyBenefits: [
      'Mastery of mental stillness and emotional immunity',
      'Integration of all prior 10 months of learning into intuitive flow',
      'Deep, unconditioned inner peace that remains through life storms',
      'Profound connection with timeless nature and community'
    ],
    sampleSession: {
      dayNumber: 1,
      title: 'The Timeless Witness Within (Sakshi Bhava)',
      sanskritTitle: 'Sakshi Darshan',
      sankalpa: 'I am the calm witness of life, joyful, serene, and eternally free.',
      theory: {
        philosophyTitle: 'The Pure Witness (Sakshi Bhava)',
        darshanQuote: 'You are not the thoughts that come and go; you are the radiant awareness in which thoughts appear and dissolve.',
        teaching: 'In Samadhi Sparsha, we stop trying to stop thoughts. Instead, we realize we are already the vast space in which all thoughts play. When you realize you are the sky, the clouds no longer trouble you.',
        anatomicalInsight: 'Prolonged meditation increases gray matter density in the hippocampus and strengthens neuroplastic resilience.',
        practicalLifeLesson: 'When someone speaks harshly to you, remain as the calm mirror; do not absorb their agitation.',
        ageGuidance: {
          all: 'Rest in quiet dignity and open awareness.',
          seniors: 'Acknowledge the sacred temple of your body that has carried you faithfully through so many decades.',
          adults: 'Let go of deadlines and goals; this 45-minute practice is timeless.',
          kids: 'Listen so quietly that you can hear the secret song of the stars in the night sky!'
        }
      },
      breathwork: BREATH_PATTERNS.boxBreathing,
      poses: [
        POSE_LIBRARY.tadasana,
        POSE_LIBRARY.marjaryasana,
        POSE_LIBRARY.virabhadrasana,
        POSE_LIBRARY.setubandhasana,
        POSE_LIBRARY.balasana,
        POSE_LIBRARY.sukhasana,
        POSE_LIBRARY.shavasana
      ],
      meditation: {
        title: 'Vast Ocean of Awareness',
        focusType: 'silence',
        guidanceText: 'Rest without seeking anything. There is nothing to achieve, nothing to fix, nothing to change. Simply be. You are home.',
        mantraOrSeedSound: 'Aham Brahmasmi (I am One with Infinite Reality)',
        reflectionPrompt: 'Who am I when I let go of all my titles, fears, and memories?',
        ambientSetting: 'sunrise'
      }
    }
  },
  {
    id: 12,
    month: 12,
    name: 'Level 12: Darshan Moksha',
    sanskritName: 'दर्शन मोक्ष (Living Yoga & Universal Integration)',
    dailyMinutes: 45,
    stageDurations: {
      theory: 360,
      breathwork: 600,
      poses: 1080,
      meditation: 660
    },
    tagline: 'The Pinnacle: Living Yoga in Every Breath',
    description: 'Completion of the 12-month transformation. Yoga is no longer something you do for 45 minutes on a mat; it is the harmonious way you live, breathe, and serve.',
    chakraFocus: 'Sarva Chakra Samanvaya (Harmonious Integration of All Centers)',
    masterQuote: 'Yoga is the journey of the self, through the self, to the Self. You have returned home.',
    keyBenefits: [
      'Completion of the full 365-day yogic transformation',
      'Effortless integration of breath, posture, and meditation into everyday life',
      'Unshakable peace, vitality, and clarity across all age stages',
      'Becoming a beacon of calm, patience, and love for your family and society'
    ],
    sampleSession: {
      dayNumber: 1,
      title: 'The Living Darshan of Manoj YogaWala',
      sanskritTitle: 'Purna Darshan',
      sankalpa: 'Every breath I take is an offering of peace and love to all creation.',
      theory: {
        philosophyTitle: 'Jivanmukti (Liberation While Living in the World)',
        darshanQuote: 'True yoga does not end when you roll up your mat; it truly begins the moment you step off it into the world.',
        teaching: 'Congratulations on walking the 12 Levels of VidyaTech Darshan with Manoj YogaWala. You have trained the body to be strong yet supple, the breath to be deep and steady, the mind to be focused, and the spirit to rest in joy. Now, share this light wherever you walk.',
        anatomicalInsight: 'One year of daily practice rewires autonomic regulation, stabilizes telomere health, and promotes systemic anti-inflammatory balance.',
        practicalLifeLesson: 'Be the calmest person in every room you enter. Your presence will heal more than words ever could.',
        ageGuidance: {
          all: 'You are now an anchor of peace for your community and family.',
          seniors: 'Your wisdom and steady breath inspire generations younger than you.',
          adults: 'Carry this mindfulness into your work, parenting, and daily interactions.',
          kids: 'You are a master yogi! Always keep a gentle smile in your heart and help those around you.'
        }
      },
      breathwork: BREATH_PATTERNS.nadiShodhana,
      poses: [
        POSE_LIBRARY.sukhasana,
        POSE_LIBRARY.tadasana,
        POSE_LIBRARY.vrikshasana,
        POSE_LIBRARY.virabhadrasana,
        POSE_LIBRARY.bhujangasana,
        POSE_LIBRARY.setubandhasana,
        POSE_LIBRARY.balasana,
        POSE_LIBRARY.shavasana
      ],
      meditation: {
        title: 'The Eternal Shanti Mandala',
        focusType: 'om',
        guidanceText: 'Sit in majesty. Feel the sacred lineage of all yogis, teachers, and seekers who have breathed before you. Rest in eternal gratitude. Om Shanti, Shanti, Shanti.',
        mantraOrSeedSound: 'Om Purnamadah Purnamidam (The Whole arises from the Whole)',
        reflectionPrompt: 'How will I radiate this peace and light into the world today?',
        ambientSetting: 'sanctuary'
      }
    }
  }
];

// Helper to get session for any day 1-30 in a level
export function getDailySession(levelId: number, dayNumber: number): DailySessionData {
  const level = LEVELS_DATA.find(l => l.id === levelId) || LEVELS_DATA[0];
  const base = level.sampleSession;
  
  if (dayNumber === 1) {
    return base;
  }

  // Generate customized daily variation for days 2-30
  const dayTitles = [
    'Awakening Inner Stillness', 'Rooting into Grounded Strength', 'Fluid Breath & Soft Spine',
    'Opening the Ribcage & Heart', 'Finding the Point of Balance', 'The Sacred Space Between Thoughts',
    'Strengthening the Core Pillar', 'Releasing Ancient Tension', 'Cultivating Gentle Patience',
    'The Harmony of Breath & Body', 'Courage in the Steady Posture', 'Dissolving Morning Restlessness',
    'Nourishing the Nerve Channels', 'The Jewel of Contentment (Santosha)', 'Spine Elongation & Vitality',
    'The Medicine of Slow Exhalations', 'Releasing Hip & Shoulder Armor', 'Steadiness of the Mental Gaze',
    'The River of Vital Energy', 'Listening to the Unspoken Body', 'Purity of Action & Thought',
    'Opening to Universal Grace', 'The Sanctuary of Inner Silence', 'Strength Without Tension',
    'Aligning the Microcosm Within', 'The Gift of Conscious Rest', 'Kindness as the Highest Practice',
    'Illuminating the Spiritual Axis', 'Resting in Sacred Completeness', 'Mastery in Every Living Breath'
  ];

  const titleIndex = (dayNumber - 1) % dayTitles.length;
  const currentTitle = dayTitles[titleIndex];

  return {
    ...base,
    dayNumber,
    title: `Day ${dayNumber}: ${currentTitle}`,
    sanskritTitle: `${base.sanskritTitle} - Dina ${dayNumber}`,
    sankalpa: `On Day ${dayNumber} of ${level.name}, I honor my progress and cultivate deep presence with every breath.`,
    theory: {
      ...base.theory,
      darshanQuote: `Manoj YogaWala (Day ${dayNumber}): "Consistency on the mat creates an unshakeable foundation for life outside it."`,
      practicalLifeLesson: `Notice today’s transition from Day ${dayNumber - 1} to Day ${dayNumber}. Real transformation happens in quiet, consistent steps.`
    }
  };
}
