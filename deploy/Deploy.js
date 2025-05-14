const axios = require('axios');
const { walkDir, prepareFilesObject } = require('./fileUtilis'); // adjust as needed

async function deployUserSite(siteId, siteFolderPath) {
  const files = walkDir(siteFolderPath);
  const filesManifest = prepareFilesObject(files);

  const NETLIFY_AUTH_TOKEN = process.env.NETLIFY_AUTH_TOKEN;

  const deployUrl = `https://api.netlify.com/api/v1/sites/${siteId}/deploys`;

  try {
    const response = await axios.post(
      deployUrl,
      { files: filesManifest },
      {
        headers: {
          Authorization: `Bearer ${NETLIFY_AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      deployId: response.data.id,
      deployUrl: response.data.deploy_ssl_url || response.data.deploy_url,
    };
  } catch (error) {
    console.error('Deploy failed:', error.response?.data || error.message);
    throw new Error('Failed to deploy user site');
  }
}

module.exports = { deployUserSite };
