# Full-Stack Engineer Intern Assignment - README

## Project Overview

This project is a web application that allows users to log in using Google OAuth, fetch their last X emails from Gmail, and classify them into different categories using Google Gemini. The application includes the following functionality:

- **User Authentication:** Users can log in using Google OAuth.
- **API Key Storage:** Users can input their Google Gemini API key, which is stored in localStorage (A test key is also provided for testing purposes).
- **Fetch Emails:** Emails are fetched from Gmail using the Gmail API.
- **Classify Emails:** Emails are classified into categories such as Important, Promotional, Social, Marketing, and Spam using Google Gemini.

## Technologies Used

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Next.js API routes, Langchain.js
- **Authentication:** Google OAuth
- **API Integration:** Gmail API, Gemini GPT

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Gemini API key other wise there is option to copy test key.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/iasadk/InboxSensi.ai.git
   cd project-name
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add the following:
   `    GOOGLE_CLIENT_ID=your-google-client-id
        GOOGLE_CLIENT_SECRET=your-google-client-secret
        NEXTAUTH_SECRET=your-next-auth-secret
        NEXTAUTH_URL=your-website-url or http://localhost:3000
   `

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

### Setting Up Google OAuth

1. **Go to the Google Cloud Console:**
   [Google Cloud Console](https://console.cloud.google.com/)

2. **Create a new project:**

   - Go to the project selector page and click on "New Project".
   - Name your project and click "Create".

3. **Set up OAuth 2.0 credentials:**

   - Go to the "APIs & Services" > "Credentials" page.
   - Click on "Create Credentials" and select "OAuth 2.0 Client IDs".
   - Configure the OAuth consent screen with your details.
   - Add your application’s URL (e.g., `http://localhost:3000`) as an authorized redirect URI.
   - Copy the Client ID and Client Secret and add them to your `.env.local` file.

4. **Add Test Users:**
   - I have added the test user's for mine you can choose your's

### Running the Application

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Log in with Google:**

   - Navigate to [http://localhost:3000](http://localhost:3000).
   - Click on the "Login with Google" button and log in using your Google account.

3. **Fetch and Classify Emails:**
   - After logging in, you will see buttons to fetch and classify emails.
   - Click "Fetch Emails" to retrieve your last X emails from Gmail.
   - Click "Classify Emails" to categorize them using OpenAI GPT.

## Deployment

Deployment for this is done using vercel.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## Contact

For any questions or inquiries, you can reach out to:

- Twitter: [@iasad0017](https://twitter.com/iasad0017)
- LinkedIn: [Mohammad Asad Khan](https://www.linkedin.com/in/mohammad-asad-khan/)
- Email: iasad0017@gmail.com

All the best 🤝

---

