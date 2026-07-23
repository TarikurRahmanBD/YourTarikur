const hyperbotBase = "/assets/hyperbot/hyperbot-base.png";
const hyperbotElbow = "/assets/hyperbot/hyperbot-elbow.png";
const hyperbotWrist = "/assets/hyperbot/hyperbot-wrist.png";
const wholeRobotAnnotated = "/assets/hyperbot/whole-robot-annotated.png";
const shoulderJoint = "/assets/hyperbot/shoulder-joint.png";
const endEffectorAttachments = "/assets/hyperbot/end-effector-attachments.png";
const systemArchitecture = "/assets/hyperbot/system-architecture.png";
const wholeRobotReal = "/assets/hyperbot/whole-robot-real.jpg";

export const HYPERBOT_IMAGES = {
  base: hyperbotBase,
  elbow: hyperbotElbow,
  wrist: hyperbotWrist,
};

export const HYPERBOT_EXECUTIVE_SUMMARY =
  "Hyperbot is a modular 3-DOF robotic arm mounted on a four-wheeled mobile platform, purpose-built for hazard response and remote surveillance. It can grab objects, spray water to fight fires, and stream live video — all controlled wirelessly through an intuitive interface. Every structural part is either 3D-printed or laser-cut, making the whole system low-cost, easy to assemble, repair, and customize on the fly.";

export const HYPERBOT_PROBLEM_STATEMENTS = [
  "Deploying humans into hazardous environments — chemical spills, structural collapses, active fires — puts lives at unnecessary risk.",
  "Purpose-built rescue robots are expensive and hard to maintain, making them impractical in low-resource settings.",
  "Most existing solutions are single-purpose: a firefighting bot can't do surveillance, and a surveillance bot can't move debris.",
  "Affordable, multi-functional robots that combine manipulation, firefighting, and reconnaissance in one platform simply didn't exist.",
];

export const HYPERBOT_FEATURES = [
  {
    id: 1,
    title: "Object Manipulation",
    description:
      "A custom gripper with both concave and flat contact surfaces lets Hyperbot securely grab spherical and cubic objects. Mounted at the wrist, it can lift up to 1.2 kg — enough to clear debris or retrieve critical items from dangerous zones.",
  },
  {
    id: 2,
    title: "Fire Detection & Suppression",
    description:
      "An onboard water sprayer connected to a reservoir at the base can be aimed independently using the arm's 3 degrees of freedom. Fire is detected in real-time through HSV color-space analysis on the camera feed, triggering the suppression response.",
  },
  {
    id: 3,
    title: "AI-Powered Surveillance",
    description:
      "An ESP32 camera module running YOLO NAS performs real-time object detection — identifying people, vehicles, and hazards on the fly. The camera's mount on the arm gives it an elevated, independent field of view far wider than a fixed-position sensor.",
  },
  {
    id: 4,
    title: "Hot-Swappable Modules",
    description:
      "The wrist uses precisely designed slots to quickly attach different end effectors — gripper, camera, or water sprayer — without any tools. Swap capabilities in seconds to adapt to changing mission requirements.",
  },
  {
    id: 5,
    title: "3-DOF Articulated Arm",
    description:
      "Shoulder, elbow, and wrist joints each driven by high-torque servos, with full inverse kinematics control. The arm's reach extends well beyond the base height, and bearings at each joint reduce servo strain for longer operational life.",
  },
  {
    id: 6,
    title: "Mobile Platform",
    description:
      "A four-wheeled differential-drive base houses the battery pack, motor drivers, and shoulder actuator. The low center of gravity keeps the robot stable even when the arm is fully extended and carrying a payload.",
  },
];

export const HYPERBOT_TECH = [
  "ATmega328p",
  "ESP32-CAM",
  "YOLO NAS",
  "HSV Color Detection",
  "Bluetooth",
  "3D Printed",
  "Laser-cut Acrylic",
  "Fution 360",
  "OpenCV",
];

export const HYPERBOT_GALLERY = [
  { label: "Full Assembly", src: wholeRobotAnnotated },
  { label: "Shoulder Joint", src: shoulderJoint },
  { label: "End Effector Attachments", src: endEffectorAttachments },
  { label: "Assembled Robot", src: wholeRobotReal },
  { label: "System Architecture", src: systemArchitecture, hidden: true },
];

export const HYPERBOT_AWARDS = [
  {
    title: "Champion — Project Showcase",
    subtitle: "IEEE Branch Fest 2023",
    description:
      "Won first place at IEEE Branch Fest 2023, hosted by Bangladesh University of Professionals, for the Hyperbot project showcase.",
    venue: "Bangladesh University of Professionals",
    year: "2023",
    type: "award",
    newsUrl:
      "https://www.dhakatribune.com/bangladesh/323377/iub-engineering-students-win-multiple-titles-at",
  },
  {
    title: "ICCAS 2023 — IEEE Publication",
    subtitle:
      "23rd International Conference on Control, Automation and Systems",
    description:
      "Published and presented at ICCAS 2023, Yeosu, South Korea. The full paper covering design methodology, kinematic analysis, and AI integration is available on IEEE Xplore.",
    venue: "Yeosu, South Korea",
    year: "2023",
    type: "publication",
    publicationUrl: "https://doi.org/10.23919/iccas59377.2023.10316812",
  },
  {
    title: "Runner-up — Pick And Place Robot Race",
    subtitle: "TechFest IUB, Autumn 2022",
    description:
      "Secured second place in the Pick And Place Robot Race at TechFest IUB, demonstrating Hyperbot's precision manipulation capabilities in a competitive setting.",
    venue: "Independent University, Bangladesh",
    year: "2022",
    type: "award",
  },
];
