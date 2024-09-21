
# AI-Powered Healthcare Report Analyzer

### Bridging Gaps in Personalized and Accessible Healthcare
-LINK TO VIDEO DEMO AND PRESENTATION [Google Drive Folder](https://drive.google.com/drive/u/1/folders/1pQJ8HLkOUUn6BuxV291umtcUK1KIQgE5)

---

## Project Overview

**Healthify- AI-Powered Healthcare Report Analyzer** is a platform designed to simplify medical report analysis, providing patients with easy-to-understand summaries and personalized healthcare plans. This platform is focused on improving healthcare access, especially in underserved areas. By utilizing cutting-edge technologies like **Google Gemini AI** for report analysis, **SQL with Drizzle ORM** for backend management, and **Privy** for secure authentication, the project aims to make healthcare more understandable and accessible.

### Key Features

- **AI-Powered Medical Report Analysis**: Automatically generates simplified, easy-to-read summaries from complex medical reports using Google Gemini AI.
- **Personalized Care Plans**: Tailored healthcare plans based on individual medical profiles, including treatment suggestions and lifestyle changes.
- **Responsive Design**: A user-friendly React.js frontend optimized for smooth navigation across all devices.
- **Data Security**: Privy authentication ensures sensitive medical data is securely stored and accessed only by authorized users.

---

## Tech Stack
- **Frontend**: React.js
  - The highly responsive frontend, built using React.js, provides an intuitive user interface. Patients can seamlessly upload medical reports, view personalized care plans, and access detailed summaries from a user-friendly dashboard.
- **CSS**: Tailwind CSS
  - Tailwind CSS ensures that the design is sleek, modern, and responsive across devices.
- **Backend**: Node.js and SQL with Drizzle ORM
  - The platform’s backend manages vast amounts of medical data using Node.js and SQL with Drizzle ORM. The system efficiently stores, retrieves, and analyzes data to deliver fast performance, ensuring user data is handled with precision.
- **Authentication**: Privy
  - Privy authentication ensures user data privacy and security, maintaining the highest standards of confidentiality for sensitive medical information.
- **AI**: Google Gemini API
  - Google Gemini API powers the core AI functionality, providing accurate interpretations of medical reports and personalized care plans based on the analysis.


## Installation and Setup

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure that you have the following installed:
- **Node.js** (version 14 or higher)
- **npm** (Node package manager)

### Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add necessary environment variables for **Google Gemini API**, **Privy**, and other services as required.
   
   - Make sure to replace `'your_api_key_here'` with an actual placeholder or instruction for users on how to obtain their API key.
   - model : Google Gemini-1.5-pro


4. Run the project in development mode:

   ```bash
   npm run dev
   ```

5. Build the project for production:

   ```bash
   npm run build
   ```

6. Start the project preview:

   ```bash
   npm run preview
   ```

---

## Deployment

To deploy the project, you can use the following script that builds the project and uploads the production build:

```bash
yarn build && npx thirdweb@latest upload dist
```

Make sure that your third-party services like Google Gemini AI and Privy are properly set up in your deployment environment.

---

## Team Information

- **Team Name**: X-Team
- **Hackathon**: Matrix 2.0 at IITM College
- **Members**:
  - Priyansh Padhi (priyansh56701@gmail.com)
  - Arman Singh (armansr205@gmail.com)
  - Utkarsh Sharma (utkarsh.an.sharma@gmail.com)
  - Shubham Mangai (mamgai75@gmail.com)

---

## Revenue Model

1. **Subscription Model**: Users can access premium features like detailed report analysis and custom care plans via subscriptions.
2. **Partnerships**: Collaborations with healthcare providers and pharmaceutical companies offer exclusive discounts and expand the platform's reach.
3. **Government Grants**: Integration with government initiatives like Ayushman Bharat could unlock funding and support for expansion.

---

## Benefits and Impact

- **Increased Access to Healthcare**: Provides affordable, accessible healthcare services in rural areas.
- **Enhanced Patient Understanding**: Improves patient literacy with simplified medical reports, empowering informed health decisions.
- **Improved Communication**: Enables doctors to quickly understand patient conditions, enhancing consultation efficiency.
- **Reduced Healthcare Costs**: Early detection and preventive care reduce long-term healthcare expenses.
- **Early Disease Detection**: AI analysis allows for early diagnosis
