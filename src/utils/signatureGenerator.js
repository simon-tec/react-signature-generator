export const LOGO_URL = "https://images.squarespace-cdn.com/content/v1/66ac485ffc91f22009fa5c2b/f2ecda1d-b26a-46b6-a117-e90c7c274c43/SafeGuardian-logo.png";

export const FONT_OPTIONS = [
  { id: 'Inter', name: 'Inter / Modern Sans', stack: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" },
  { id: 'CenturyGothic', name: 'Century Gothic / Geometric', stack: "'Century Gothic', CenturyGothic, AppleGothic, sans-serif" },
  { id: 'SegoeUI', name: 'Segoe UI / System', stack: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  { id: 'Arial', name: 'Arial / Standard', stack: "Arial, Helvetica, sans-serif" },
  { id: 'Georgia', name: 'Georgia / Serif', stack: "Georgia, 'Times New Roman', serif" },
  { id: 'Aptos', name: 'Aptos (Microsoft 365)', stack: "Aptos, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif" },
  { id: 'Calibri', name: 'Calibri / Candara', stack: "Calibri, Candara, 'Segoe UI', Arial, sans-serif" },
  { id: 'Trebuchet', name: 'Trebuchet MS', stack: "'Trebuchet MS', 'Lucida Grande', Arial, sans-serif" }
];

const getPngIcon = (network, hexColor) => {
  const hex = hexColor.replace('#', '');
  const iconMap = {
    'github': 'github',
    'linkedin': 'linkedin',
    'facebook': 'facebook-new',
    'instagram': 'instagram-new',
    'youtube': 'youtube-play',
    'twitter': 'twitterx',
    'tiktok': 'tiktok',
    'pinterest': 'pinterest',
    'whatsapp': 'whatsapp',
    'link': 'link'
  };
  const iconName = iconMap[network] || 'link';
  return `https://img.icons8.com/ios-filled/48/${hex}/${iconName}.png`;
};

export const generateHTML = (data) => {
  const {
    name, title, department, phone, mobile, showMobile, email, website, address, showAddress,
    company, linkedin, showLinkedin, tag1, tag2, showTags, tip, showTip, layout, disclaimer, showDisclaimer,
    bannerType, bannerImgUrl, bannerLinkUrl, bannerHtmlText, bannerBgColor, bannerTextColor,
    logoUrl, primaryColor, accentColor, secondaryColor, selectedFont, textSize, logoWidth,
    clientMode, showCta, ctaText, ctaUrl, showCta2, cta2Text, cta2Url,
    socialGithub, socialLinkedin, socialFacebook, socialInstagram, socialYoutube,
    socialTwitter, socialTiktok, socialPinterest, socialWhatsapp,
    customLink1, customIcon1, customLink2, customIcon2
  } = data;

  const isOutlook = clientMode === 'outlook';
  const currentFontStack = FONT_OPTIONS.find(f => f.id === selectedFont)?.stack || FONT_OPTIONS[0].stack;
  const displayWebsite = website.replace(/^https?:\/\//i, '');
  
  // Font Size Calculations
  const baseSize = Number(textSize) || 13;
  const nameSize = baseSize + 3;
  const titleSize = baseSize;
  const contactSize = baseSize - 1;
  const tinySize = baseSize - 2;
  const disclaimerSize = baseSize - 3;
  
  // Strict Input Validation for Links
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  const cleanMobile = mobile.replace(/[^\d+]/g, '');
  const cleanEmail = email.trim();

  // Dark Mode Resilience Injection
  const darkModeStyles = `
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<style>
  :root { color-scheme: light dark; supported-color-schemes: light dark; }
</style>
`;

  // --- CTA LOGIC ---
  let ctaHtml = '';
  if (showCta || showCta2) {
    ctaHtml = `<table cellpadding="0" cellspacing="0" border="0" style="margin-top: 12px; border-collapse: collapse;"><tr>`;
    
    if (showCta) {
      ctaHtml += `
        <td style="background-color: ${accentColor}; border-radius: 4px; padding: 6px 14px; text-align: center; border: 2px solid ${accentColor};">
          <a href="${ctaUrl}" target="_blank" style="font-family: ${currentFontStack}; font-size: ${tinySize}px; font-weight: bold; color: #ffffff; text-decoration: none; display: inline-block;">
            ${ctaText}
          </a>
        </td>`;
    }

    if (showCta && showCta2) {
      ctaHtml += `<td width="8" style="width: 8px; font-size: 0px;">&nbsp;</td>`;
    }

    if (showCta2) {
      ctaHtml
