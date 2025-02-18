export const baseTemplate = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email</title>
  <style>
    /* Reset styles */
    body, div, p, h1, h2, h3, h4, h5, h6 {
      margin: 0;
      padding: 0;
    }

    /* Base styles */
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #81016e;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Container styles */
    .container {
/*max-width: 600px;*/
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
    }

    .container img {
      max-width: 100%;
      margin: 20px 0;
    }

    /* Header styles */
    .header {
      text-align: center;
      padding: 30px 20px;
      background-color: #f8f9fa;
      border-radius: 8px 8px 0 0;
    }

    .header h1 {
      color: #333;
      font-size: 28px;
      margin: 0;
    }

    /* Content styles */
    .content {
      padding: 30px 20px;
      background-color: #ffffff;
    }

    .content h2 {
      color: #333;
      font-size: 24px;
      margin-bottom: 20px;
    }

    .content p {
      color: #555;
      font-size: 16px;
      margin-bottom: 15px;
    }

    /* Button styles */
    .button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #81016e;
      color: white !important;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      margin: 15px 0;
      text-align: center;
      -webkit-transition: background-color 0.3s ease;
      transition: background-color 0.3s ease;
    }

    .button:hover {
      background-color:#81016e;
    }

    /* Footer styles */
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 14px;
      color: #666;
      background-color: #f8f9fa;
      border-radius: 0 0 8px 8px;
    }

    .footer p {
      margin: 5px 0;
    }

    /* Responsive styles */
    @media screen and (max-width: 600px) {
      .container {
        width: 100% !important;
        padding: 10px !important;
      }

      .header {
        padding: 20px 15px !important;
      }

      .header h1 {
        font-size: 24px !important;
      }

      .content {
        padding: 20px 15px !important;
      }

      .content h2 {
        font-size: 20px !important;
      }

      .content p {
        font-size: 15px !important;
      }

      .button {
        display: block !important;
        width: 100% !important;
        padding: 15px !important;
        box-sizing: border-box !important;
      }

      .footer {
        padding: 15px !important;
        font-size: 12px !important;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #1a1a1a !important;
      }

      .container {
        background-color: #2d2d2d !important;
      }

      .header, .footer {
        background-color: #252525 !important;
      }

      .header h1, .content h2 {
        color: #ffffff !important;
      }

      .content p {
        color: #e0e0e0 !important;
      }

      .footer {
        color: #999999 !important;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>{{companyName}}</h1>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>© {{year}} {{companyName}}. Tous droits réservés.</p>
      <p>{{address}}</p>
    </div>
  </div>
</body>
</html>
`;
