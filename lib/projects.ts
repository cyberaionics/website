export interface Project {
  slug: string;
  index: string;
  name: string;
  tags: string[];
  desc: string;
  github: string | null;
}

export const PROJECTS: Project[] = [
  {
    slug: 'ring-lwe',
    index: '01',
    name: 'Post-Quantum Cryptography: Ring-LWE',
    tags: ['Cryptography', 'Python', 'Quantum'],
    desc: 'From-scratch Ring-LWE scheme modeled after NIST CRYSTALS-Kyber. Optimized polynomial multiplication with Gaussian noise distribution logic.',
    github: 'https://github.com/cyberaionics/Kyber-KEM',
  },
  {
    slug: 'qubo-qaoa',
    index: '02',
    name: 'Quantum Optimization: QUBO & QAOA',
    tags: ['Qiskit', 'Quantum', 'NISQ'],
    desc: 'Applied QUBO to solve differential equations. Mapped physical constraints onto NISQ-era hardware via QAOA.',
    github: null,
  },
  {
    slug: 'bayes-frontier',
    index: '03',
    name: 'Bayes Frontier: Autonomous Drone Station',
    tags: ['Embedded', 'Raspberry Pi', 'Bayesian'],
    desc: 'Autonomous docking via Bayesian inference for precise navigation. Firmware manages charging cycles under variable conditions.',
    github: 'https://github.com/cyberaionics/ASCEND-ISRO-2026',
  },
  {
    slug: 'hashlock',
    index: '04',
    name: 'HashLock — SIH 2025',
    tags: ['Cryptography', 'Hardware', 'Security'],
    desc: 'Tamper-detection for industrial instruments using cryptographic hashing to ensure hardware integrity.',
    github: null,
  },
  {
    slug: 'deepfake-detection',
    index: '05',
    name: 'Deepfake Detection System',
    tags: ['ML', 'PyTorch', 'CV'],
    desc: 'ML pipeline using computer vision to identify facial inconsistencies in synthetic media.',
    github: 'https://github.com/cyberaionics/Deepfake_Image_Detection_Model',
  },
  {
    slug: 'semg-eureka',
    index: '06',
    name: 'Eureka: sEMG Interpretation',
    tags: ['Signal Processing', 'HCI', 'ML'],
    desc: 'Signal processing pipeline for sEMG data improving human-computer interaction via biological feedback.',
    github: 'https://github.com/cyberaionics/sEMG_GNN',
  },
  {
    slug: 'badusb',
    index: '07',
    name: 'BadUSB HID PoC',
    tags: ['Arduino', 'Security', 'Hardware'],
    desc: 'Arduino keystroke injection PoC for security awareness training with documented mitigation strategies.',
    github: 'https://github.com/cyberaionics',
  },
  {
    slug: 'robotic-arm',
    index: '08',
    name: 'Robotic Arm Plotter',
    tags: ['Arduino', 'Robotics', 'C++'],
    desc: 'Multi-axis arm with inverse kinematics solving on Arduino for high-precision plotting tasks.',
    github: 'https://github.com/cyberaionics/Eureka-Submission',
  },
  {
    slug: 'morris-ai',
    index: '09',
    name: 'Morris AI — Agentic HR Manager',
    tags: ['Agentic AI', 'LLM', 'Multi-Agent', 'Python'],
    desc: 'AI-powered HR system using multi-agentic workflows to autonomously handle resume validation, candidate onboarding, interview scheduling, employee record management, and all tasks a human HR performs.',
    github: 'https://github.com/cyberaionics/Morris-AI',
  },
];
