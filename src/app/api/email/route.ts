import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { ReportData } from '@/types';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const { type, data } = await request.json();
    const targetEmail = process.env.NOTIFICATION_EMAIL;

    if (!targetEmail) {
      throw new Error('Notification email not configured');
    }

    const reportData = data as ReportData;
    const subject = type === 'report' 
      ? `Incorrect Alumni Data Report - ${reportData.alumni.studentName} - Batch: ${reportData.alumni.batch}`
      : `New Alumni Data Submission - ${reportData.alumni.studentName} - Batch: ${reportData.alumni.batch}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: targetEmail,
      subject,
      html: `
        <h2>${subject}</h2>
        <h3>Alumni Details:</h3>
        <ul>
          <li><strong>Batch:</strong> ${reportData.alumni.batch}</li>
          <li><strong>Name:</strong> ${reportData.alumni.studentName}</li>
          <li><strong>Country:</strong> ${reportData.alumni.countryOfResidence || '-'}</li>
          <li><strong>Current Role:</strong> ${reportData.alumni.currentRole || '-'}</li>
          <li><strong>Role Function:</strong> ${reportData.alumni.roleFunction || '-'}</li>
          <li><strong>Organization:</strong> ${reportData.alumni.organization || '-'}</li>
          <li><strong>LinkedIn:</strong> ${reportData.alumni.linkedinUrl || '-'}</li>
        </ul>
        <h3>Remark:</h3>
        <p>${reportData.remark}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}