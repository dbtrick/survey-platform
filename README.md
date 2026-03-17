# 📝 SurveyCore: Premium Research & Survey Engine

A high-performance, minimal survey management platform built with **Inertia.js**, **React**, and **Tailwind CSS**. Designed for researchers who demand precision, speed, and a high-fidelity user experience.



---

## 🔬 Researcher's Workflow
SurveyCore is engineered to mirror the scientific survey lifecycle—moving seamlessly from hypothesis design to actionable data synthesis.

### 1. Architectural Phase (Design)
The `SurveyBuilder` allows researchers to construct structured instruments with surgical precision.
* **Standardized Scales**: Utilize the **Grid/Matrix system** to measure Likert scales or frequency with consistent visual spacing and zero bias.
* **Input Validation**: Define mandatory fields to ensure data integrity and reduce non-response bias.
* **Cognitive Load Reduction**: The "Premium Sharp" UI keeps the focus on question phrasing rather than fighting the interface.

### 2. Validation Phase (Preview)
Before deployment, simulate the participant experience to ensure methodological soundness.
* **Visual Neutrality**: The "Minimal Blue" theme (OKLCH-based) provides a professional, unbiased environment for respondents.
* **Cross-Device Audit**: Seamlessly verify how complex matrix questions collapse for mobile participants to maintain accessibility standards.

### 3. Distribution Phase (Deployment)
Transition from builder to field in a single click.
* **Immutable Slugs**: Generate unique, public-facing URLs instantly.
* **Clipboard Sync**: Quick-copy tools for rapid distribution via email, LMS, or social channels.



### 4. Collection & Monitoring
Track the health of your study in real-time.
* **Sample Size Tracking**: Monitor your $N$ (response count) at a glance from the primary dashboard.
* **Real-time Synchronization**: Responses are logged instantly, allowing for mid-study progress audits.

### 5. Analysis & Synthesis (Export)
The final stage involves preparing data for deep-dive statistical analysis.
* **Clean Data Architecture**: Standardized JSON/CSV-ready structures for easy import into R, SPSS, or Python (Pandas).
* **High-Level Analytics**: Get immediate descriptive statistics before diving into raw data sets.



---

## ✨ Key Features

* **OKLCH Color Precision**: Utilizing the `oklch` color space for ultra-consistent "Minimal Blue" branding.
* **Premium Sharp UI**: High-contrast headers and architectural borders for a professional "SaaS" feel.
* **Responsive Matrix**: A custom-engineered Grid system that remains readable on any screen size.
* **Tactile Interactivity**: Smooth `rounded-xl` corners and `scale-98` active states for a premium, responsive feel.

---

## 🛠️ Technical Stack

| Technology | Role |
| :--- | :--- |
| **Laravel 11** | Robust Backend & API Management |
| **Inertia.js** | The bridge for a seamless Single Page App (SPA) experience |
| **React 18** | High-performance state management for the Builder |
| **Tailwind CSS** | Precision styling with OKLCH variable support |
| **Lucide Icons** | Consistent, minimal iconography |

---

## 🏗️ Installation

1. **Clone & Install**
   ```bash
   git clone https://github.com/dbtrick/survey-platform.git
   cd survey-platform
   composer install && npm install
