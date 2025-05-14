const path = require('path');
const { createNetlifySite } = require('../utilis/netlify');
const { deployUserSite } = require('../deploy/Deploy');

async function launchUserWebsite(req, res) {
  try {
    const siteName = req.body.siteName;
    const folderName = req.body.folderName; // sent from frontend
    const siteFolderPath = path.join(__dirname, '..', 'user_sites', folderName); // adjust path

    const { siteId, siteUrl } = await createNetlifySite(siteName);
    const { deployUrl } = await deployUserSite(siteId, siteFolderPath);

    // optionally save siteId & siteUrl to DB here

    res.status(200).json({
      success: true,
      siteUrl,
      deployUrl,
      message: 'Website launched successfully!',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Deployment failed' });
  }
}

module.exports = { launchUserWebsite };
