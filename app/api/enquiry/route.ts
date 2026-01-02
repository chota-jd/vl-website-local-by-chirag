import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, organization, projectScope } = await request.json();

    if (!fullName || !email || !organization || !projectScope) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Version Labs <noreply@email.versionlabs.co>', 
      to: ['daxeel@versionlabs.co'],
      subject: `New Institutional Enquiry - ${fullName}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Institutional Enquiry</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07); overflow: hidden;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 40px 40px 30px 40px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td>
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; line-height: 1.2;">
                              New Institutional Enquiry
                            </h1>
                            <p style="margin: 12px 0 0 0; color: #cbd5e1; font-size: 14px; font-weight: 400; letter-spacing: 0.5px; text-transform: uppercase;">
                              Version Labs Portal
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        
                        <!-- Full Name Row -->
                        <tr>
                          <td style="padding: 0 0 30px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                              <tr>
                                <td style="padding: 0 0 8px 0;">
                                  <p style="margin: 0; color: #3b82f6; font-size: 18px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">
                                    Full Name
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                  <p style="margin: 0; color: #1e293b; font-size: 16px; font-weight: 500; line-height: 1.5;">
                                    ${fullName}
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        
                        <!-- Institutional Email Row -->
                        <tr>
                          <td style="padding: 0 0 30px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                              <tr>
                                <td style="padding: 0 0 8px 0;">
                                  <p style="margin: 0; color: #3b82f6; font-size: 18px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">
                                    Institutional Email
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                  <p style="margin: 0; color: #1e293b; font-size: 16px; font-weight: 500; line-height: 1.5;">
                                    <a href="mailto:${email}" style="color: #3b82f6; text-decoration: underline; text-decoration-color: #93c5fd;">${email}</a>
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        
                        <!-- Organization / Ministry Row -->
                        <tr>
                          <td style="padding: 0 0 30px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                              <tr>
                                <td style="padding: 0 0 8px 0;">
                                  <p style="margin: 0; color: #3b82f6; font-size: 18px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">
                                    Organization / Ministry
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                  <p style="margin: 0; color: #1e293b; font-size: 16px; font-weight: 500; line-height: 1.5;">
                                    ${organization}
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        
                        <!-- Project Scope & Scale Row -->
                        <tr>
                          <td style="padding: 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                              <tr>
                                <td style="padding: 0 0 8px 0;">
                                  <p style="margin: 0; color: #3b82f6; font-size: 18px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">
                                    Project Scope & Scale
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                  <p style="margin: 0; color: #1e293b; font-size: 16px; font-weight: 400; line-height: 1.6;">
                                    ${projectScope}
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8fafc; padding: 30px 40px; border-top: 1px solid #e2e8f0;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td align="center">
                            <p style="margin: 0; color: #64748b; font-size: 15px; font-weight: 400; line-height: 1.5;">
                              This enquiry was submitted through the<br>
                              <strong style="color: #1e293b;">Version Labs Institutional Enquiry Portal</strong>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Enquiry submitted successfully',
      emailId: data?.id 
    });
  } catch (error) {
    console.error('Enquiry API error:', error);
    return NextResponse.json(
      { 
        error: 'An error occurred while processing your enquiry',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

