# 📝 SurveyCore: Researcher's Edition

SurveyCore is a high-performance, minimal survey engine built on the **Laravel with React Starter Kit**. Designed to eliminate the friction between designing a study and collecting actionable data, it utilizes a **Premium Sharp** UI and **OKLCH** color accuracy for a neutral, distraction-free environment.

---

## 🧭 Platform Navigation

### 📁 Dashboard
The Dashboard is your research command center. It provides a high-level summary of account activity, showing global performance metrics at a glance.

* **Platform Overview**: A birds-eye view of your total surveys, cumulative response counts, and system health status.
* **Survey Analytics**: Aggregated data visualization across all active projects to help identify trends before the study concludes.



---

### 📁 Survey Management
The workspace where research instruments are built, refined, and deployed.

* **All Surveys**: A sharp, organized list of your existing projects. From here, you can manage active links, monitor real-time progress, or archive completed studies.


* **Create New**: Access the **SurveyBuilder**. A modular interface where you can architect everything from simple text questions to complex, multi-variable matrix grids.


---

### 📁 Data Exports
The final stage of the research workflow—moving from data collection to statistical synthesis.

* **Download Center**: Generate and access raw data files. Designed for perfect compatibility with **R, SPSS, Python (Pandas), and Excel**, ensuring your data is ready for rigorous analysis immediately.



---

## 🛠️ Installation & Setup Guide

### 1. Prerequisites
Ensure your local environment meets these requirements:
* **XAMPP**: Provides the local Apache server and MySQL database.
* **PHP (8.2+)**: Required for Laravel 11.
* **Composer**: Dependency manager for PHP.
* **Node.js (v18+) & NPM**: Required for the React/Inertia frontend.

---

### 2. Step-by-Step Installation

**A. Clone the Repository** Navigate to your web directory (e.g., `C:/xampp/htdocs`) and run:
```bash
git clone https://github.com/dbtrick/survey-platform.git
cd survey-platform
composer run dev
