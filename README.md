# Open Source Alumni Website

A customizable alumni directory website built with Next.js that allows educational institutions to showcase their alumni network. The website features a searchable directory of alumni with their professional information, current locations, and LinkedIn profiles.

## Features

- 🔍 Search and filter alumni by batch, country, and organization
- 📱 Responsive design that works on desktop and mobile
- 📊 Integration with Google Sheets as a simple database
- ✉️ Email notification system for data corrections and new submissions
- 🎨 Easy to customize design and branding

## Prerequisites

- Node.js 16.x or later
- A Google Cloud Platform account
- An email account for sending notifications

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd opensource-alumni-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Google Sheets API**
   - Go to the [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project
   - Enable the Google Sheets API
   - Create a service account and download the credentials JSON file
   - Create a new Google Sheet and share it with the service account email
   - Copy the Sheet ID from the URL

4. **Configure environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   GOOGLE_SHEET_ID=your_sheet_id
   GOOGLE_SERVICE_ACCOUNT_KEY={"your":"service-account-json"}
   EMAIL_USER=your_email@example.com
   EMAIL_PASSWORD=your_email_app_password
   NOTIFICATION_EMAIL=notifications@yourdomain.com
   ```
   A sample has been provided in the repo.

   For Gmail users, to set up the email password:
   - Enable 2-Step Verification in your Google Account:
     1. Go to your Google Account settings
     2. Navigate to Security
     3. Enable 2-Step Verification if not already enabled
   - Generate an App Password:
     1. Go to your Google Account settings
     2. Navigate to Security > 2-Step Verification
     3. Scroll to the bottom and select "App passwords"
     4. Select "Other (Custom name)" from the app dropdown
     5. Enter "Alumni Website" or any name you prefer
     6. Click "Generate"
     7. Use the generated 16-character password as your EMAIL_PASSWORD
   
   Note: Regular Gmail passwords won't work for security reasons. You must use an App Password.

5. **Set up the Google Sheet**
   Create a sheet named 'Summary' with the following columns:
   - Batch (Column A)
   - Student Name (Column B)
   - Country of Residence (Column C)
   - Current Role (Column D)
   - Role Function (Column E)
   - Organization (Column F)
   - LinkedIn URL (Column G)

6. **Customize the website**
   - Update the logo and favicon in the `public` directory
   - Modify the color scheme in `src/app/globals.css`
   - Update the institution name and other text in `src/app/layout.tsx`

7. **Run the development server**
   ```bash
   npm run dev
   ```

8. **Build for production**
   ```bash
   npm run build
   ```

## Deployment

The application can be deployed to any platform that supports Next.js applications. We recommend using Vercel for the easiest deployment experience:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Uses [Google Sheets API](https://developers.google.com/sheets/api) for data storage