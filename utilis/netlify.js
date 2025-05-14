const axios = require('axios');

async function createNetlifySite(siteName) {
  const response = await axios.post(
    'https://api.netlify.com/api/v1/sites',
    {
      name: siteName, // or omit to let Netlify generate a name
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.NETLIFY_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const siteId = response.data.id;
  const siteUrl = response.data.url;

  return { siteId, siteUrl };
}

module.exports = { createNetlifySite };
