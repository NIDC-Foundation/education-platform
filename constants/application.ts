export const applicationSteps = [
    { step: 1, label: "Basic Info", description: "Your name, contact details, location, and current status" },
    { step: 2, label: "Direction & Focus", description: "The area you're most interested in and why" },
    { step: 3, label: "Thinking", description: "Your perspective on national challenges and recent self-growth" },
    { step: 4, label: "Commitment", description: "Why you want in, and what you're willing to commit" },
    { step: 5, label: "Reality Check", description: "A practical scenario and a commitment confirmation" },
    { step: 6, label: "Review & Submit", description: "Final review of all information before formal submission" },
] as const;

export const programChoices = [
    "Energy Systems",
    "Manufacturing & Industrial Systems",
    "Digital Infrastructure",
    "Not fully decided",
] as const;

export const currentStatusOptions = [
    { value: "student", label: "Student" },
    { value: "graduate", label: "Graduate" },
    { value: "working", label: "Working" },
] as const;

export const commitmentOptions = [
    { value: "time", label: "Time (weekly hours)" },
    { value: "long_term", label: "Long-term participation" },
    { value: "effort", label: "Effort toward development" },
] as const;
