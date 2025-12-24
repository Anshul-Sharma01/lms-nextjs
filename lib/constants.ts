export const emailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Password Reset</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#2563eb; padding:20px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:24px;">
                Password Reset Request
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#333333;">
              <p style="font-size:16px; margin-bottom:16px;">
                Hello,
              </p>

              <p style="font-size:16px; margin-bottom:16px;">
                We received a request to reset your password. Use the token below to proceed with resetting your password.
              </p>

              <!-- Token Box -->
              <div style="background-color:#f1f5f9; border-radius:6px; padding:16px; text-align:center; margin:24px 0;">
                <p style="margin:0; font-size:14px; color:#555;">
                  Your password reset token:
                </p>
                <p style="margin:8px 0 0 0; font-size:18px; font-weight:bold; letter-spacing:1px;">
                  {{RESET_TOKEN}}
                </p>
              </div>

              <p style="font-size:14px; color:#555;">
                This token is valid for a limited time. If you did not request a password reset, you can safely ignore this email.
              </p>

              <p style="font-size:14px; color:#555; margin-top:24px;">
                Thanks,<br />
                <strong>Your App Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc; padding:16px; text-align:center; font-size:12px; color:#888;">
              © 2025 Your App. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`