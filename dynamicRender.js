
export default function handler(req, res) {
    const { title, description, image } = req.query

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <!-- SEO Meta Tags -->
        <meta name="description" content="Creative • Aware • Inspired" />
        <meta name="author" content="Guillermo Sotelo" />
        <meta property="og:title" content="${title || 'by Dany Garcia'}" />
        <meta property="og:description" content="${description || 'Creative • Aware • Inspired'}" />
        <meta property="og:image" content="${image || 'https://www.bydanygarcia.com/static/media/landing-1.c9e189a7c1b0d856d4aa.jpg'}" />
        <!-- Other meta tags -->
        <title>by Dany Garcia</title>
      </head>
    
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
        <script
          type="text/javascript"
          async
          defer
          src="//assets.pinterest.com/js/pinit.js"
        ></script>
      </body>
    </html>               
    `

    res.setHeader('Content-Type', 'text/html')
    res.status(200).send(htmlContent)
}