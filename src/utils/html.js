exports.buildOgPreview = (link) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${link.title}</title>
  <meta name="description" content="${link.description || ''}">
  <meta property="og:title" content="${link.title}">
  <meta property="og:description" content="${link.description || ''}">
  ${link.og_image_url ? `<meta property="og:image" content="${link.og_image_url}">` : ''}
  <meta property="og:url" content="${link.primary_target_url}">
  <meta name="twitter:card" content="summary_large_image">
</head>
<body>
  <p>Redirecting to ${link.title}...</p>
</body>
</html>
`;
