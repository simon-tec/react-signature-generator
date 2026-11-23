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

  let ctaHtml = '';
  if (showCta || showCta2) {
    ctaHtml = `<table cellpadding="0" cellspacing="0" border="0" style="margin-top: 12px; border-collapse: collapse;"><tr>`;
    
    if (showCta) {
      ctaHtml += `
        <td style="background-color: ${accentColor}; border-radius: 4px; padding: 6px 14px; text-align: center; border: 2px solid${accentColor};">
          <a href="${ctaUrl}" target="_blank" style="font-family: ${currentFontStack}; font-size:${tinySize}px; font-weight: bold; color: #ffffff; text-decoration: none; display: inline-block;">
            ${ctaText}
          </a>
        </td>`;
    }

    if (showCta && showCta2) {
      ctaHtml += `<td width="8" style="width: 8px; font-size: 0px;">&nbsp;</td>`;
    }

    if (showCta2) {
      ctaHtml += `
        <td style="background-color: transparent; border-radius: 4px; padding: 6px 14px; text-align: center; border: 2px solid ${primaryColor};">
          <a href="${cta2Url}" target="_blank" style="font-family: ${currentFontStack}; font-size: ${tinySize}px; font-weight: bold; color:${primaryColor}; text-decoration: none; display: inline-block;">
            ${cta2Text}
          </a>
        </td>`;
    }
    
    ctaHtml += `</tr></table>`;
  }

  // --- SOCIAL ICONS LOGIC ---
  const activeSocials = [
    { url: socialGithub, net: 'github', icon: getPngIcon('github', primaryColor) },
    { url: socialLinkedin, net: 'linkedin', icon: getPngIcon('linkedin', primaryColor) },
    { url: socialFacebook, net: 'facebook', icon: getPngIcon('facebook', primaryColor) },
    { url: socialInstagram, net: 'instagram', icon: getPngIcon('instagram', primaryColor) },
    { url: socialYoutube, net: 'youtube', icon: getPngIcon('youtube', primaryColor) },
    { url: socialTwitter, net: 'twitter', icon: getPngIcon('twitter', primaryColor) },
    { url: socialTiktok, net: 'tiktok', icon: getPngIcon('tiktok', primaryColor) },
    { url: socialPinterest, net: 'pinterest', icon: getPngIcon('pinterest', primaryColor) },
    { url: socialWhatsapp, net: 'whatsapp', icon: getPngIcon('whatsapp', primaryColor) },
    { url: customLink1, net: 'custom1', icon: customIcon1 || getPngIcon('link', primaryColor) },
    { url: customLink2, net: 'custom2', icon: customIcon2 || getPngIcon('link', primaryColor) }
  ].filter(s => s.url);

  let socialIconsHtml = '';
  if (activeSocials.length > 0) {
    socialIconsHtml = `
    <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px; border-collapse: collapse;">
      <tr>
        ${activeSocials.map(s => `
        <td style="padding-right: 6px;">
          <a href="${s.url}" target="_blank" style="text-decoration: none; display: block;">
            <img src="${s.icon}" alt="${s.net}" width="24" height="24" style="display: block; width: 24px; height: 24px; border-radius: 4px; border: 0;" />
          </a>
        </td>
        `).join('')}
      </tr>
    </table>`;
  }

  let socialTerminalCleanHtml = '';
  if (activeSocials.length > 0) {
    socialTerminalCleanHtml = `
    <br/><span style="color: ${accentColor}; font-weight: bold;">&gt;</span> social &nbsp;&nbsp;
    ${activeSocials.map(s => `
      <a href="${s.url}" target="_blank" style="text-decoration: none; display: inline-block; vertical-align: middle; margin-right: 6px;">
        <img src="${s.icon}" alt="${s.net}" width="16" height="16" style="display: block; width: 16px; height: 16px; border-radius: 3px; border: 0;" />
      </a>
    `).join('')}
    `;
  }
  // --------------------------

  const disclaimerHtml = showDisclaimer && disclaimer ? `
    <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 15px; border-collapse: collapse; width: 100%; max-width: 520px;">
      <tr>
        <td style="font-family: ${currentFontStack}; font-size:${disclaimerSize}px; color: #94a3b8; line-height: 1.4; text-align: justify; border-top: 1px solid #e2e8f0; padding-top: 10px;">
          ${disclaimer}
        </td>
      </tr>
    </table>` : '';

  const tipHtml = showTip && tip ? `
    <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px; border-collapse: collapse; width: 100%; max-width: 520px;">
      <tr>
        <td style="font-family: ${currentFontStack}; font-size:${tinySize}px; color: #64748b; line-height: 1.4; font-style: italic;">
          ${tip}
        </td>
      </tr>
    </table>` : '';

  const tagsHtml = showTags && (tag1 || tag2) ? `
    <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px; border-collapse: collapse;">
      <tr>
        ${tag1 ? `<td style="background-color: #f1f5f9; border: 1px solid ${primaryColor}; border-radius: 12px; padding: 3px 10px; font-family: ${currentFontStack}; font-weight: 600; font-size: ${tinySize}px; color: ${primaryColor}; white-space: nowrap;">${tag1}</td>` : ''}
        ${tag1 && tag2 ? `<td width="6" style="width: 6px; font-size: 0px;">&nbsp;</td>` : ''}
        ${tag2 ? `<td style="background-color: #f1f5f9; border: 1px solid ${primaryColor}; border-radius: 12px; padding: 3px 10px; font-family: ${currentFontStack}; font-weight: 600; font-size: ${tinySize}px; color: ${primaryColor}; white-space: nowrap;">${tag2}</td>` : ''}
      </tr>
    </table>
  ` : '';

  const contactDetailsHtml = `
    <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px; font-size: ${contactSize}px; color: ${secondaryColor}; font-family:${currentFontStack}; border-collapse: collapse;">
      <tr>
        <td style="padding-bottom: 3px; font-family: ${currentFontStack};">
          <strong style="color: ${accentColor}; display: inline-block; width: 16px;">P:</strong> <a href="tel:${cleanPhone}" style="color: ${secondaryColor}; text-decoration: none;">${phone}</a>
        </td>
      </tr>
      ${showMobile && mobile ? `
      <tr>
        <td style="padding-bottom: 3px; font-family: ${currentFontStack};">
          <strong style="color: ${accentColor}; display: inline-block; width: 16px;">M:</strong> <a href="tel:${cleanMobile}" style="color: ${secondaryColor}; text-decoration: none;">${mobile}</a>
        </td>
      </tr>` : ''}
      <tr>
        <td style="padding-bottom: 3px; font-family: ${currentFontStack};">
          <strong style="color: ${accentColor}; display: inline-block; width: 16px;">E:</strong> <a href="mailto:${cleanEmail}" style="color: ${accentColor}; text-decoration: none;">${email}</a>
        </td>
      </tr>
      <tr>
        <td style="padding-bottom: 3px; font-family: ${currentFontStack};">
          <strong style="color: ${accentColor}; display: inline-block; width: 16px;">W:</strong> <a href="${website}" target="_blank" style="color: ${accentColor}; text-decoration: none;">${displayWebsite}</a>
        </td>
      </tr>
      ${showLinkedin && linkedin ? `
      <tr>
        <td style="padding-bottom: 3px; font-family: ${currentFontStack};">
          <strong style="color: ${accentColor}; display: inline-block; width: 16px;">in:</strong> <a href="${linkedin}" target="_blank" style="color: ${accentColor}; text-decoration: none;">LinkedIn</a>
        </td>
      </tr>` : ''}
      ${showAddress && address ? `
      <tr>
        <td style="padding-bottom: 3px; font-family: ${currentFontStack}; color: ${secondaryColor};">
          <strong style="color: ${accentColor}; display: inline-block; width: 16px;">A:</strong> ${address}
        </td>
      </tr>` : ''}
    </table>
    ${socialIconsHtml}
  `;

  // SPLIT LAYOUT
  const splitBaseHtml = `
${isOutlook ? '<!--[if mso]><table role="presentation" border="0" cellspacing="0" cellpadding="0" width="520"><tr><td width="' + (Number(logoWidth) + 18) + '" valign="top"><![endif]-->' : ''}
<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${currentFontStack}; font-size: ${baseSize}px; color:${primaryColor}; line-height: 1.45; border-collapse: collapse; text-align: left;">
  <tr>
    <td valign="top" style="padding-right: 18px; width: ${logoWidth}px;" width="${logoWidth}">
      <a href="${website}" target="_blank" style="text-decoration: none; display: block;">
        <img src="${logoUrl}" alt="${company}" width="${logoWidth}" style="display: block; width: ${logoWidth}px; max-width:${logoWidth}px; height: auto; border: 0; outline: none; text-decoration: none;" />
      </a>
    </td>
    ${isOutlook ? '<!--[if mso]></td><td width="2" valign="top" bgcolor="' + primaryColor + '"><![endif]-->' : ''}
    <td width="2" style="width: 2px; background-color: ${primaryColor};" valign="top">
      <table width="2" cellpadding="0" cellspacing="0" border="0" style="width: 2px; border-collapse: collapse;">
        <tr><td height="32" style="height: 32px; background-color: ${accentColor}; font-size: 0; line-height: 0;">&nbsp;</td></tr>
      </table>
    </td>
    ${isOutlook ? '<!--[if mso]></td><td width="300" valign="top"><![endif]-->' : ''}
    <td valign="top" style="padding-left: 18px;">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
        <tr><td style="font-size: ${nameSize}px; font-weight: 700; color:${primaryColor}; font-family: ${currentFontStack}; line-height: 1.2;">${name}</td></tr>
        <tr><td style="font-size: ${titleSize}px; font-weight: 500; color: ${secondaryColor}; font-family:${currentFontStack}; padding-top: 2px;">${title}${department ? ` <span style="color: ${accentColor}; font-weight: bold;">|</span> ${department}` : ''}</td></tr>
        ${company ? `<tr><td style="font-size: ${contactSize}px; font-weight: 600; color: ${accentColor}; font-family: ${currentFontStack}; padding-top: 1px;">${company}</td></tr>` : ''}
      </table>
      ${contactDetailsHtml}
      ${tagsHtml}${ctaHtml}
    </td>
  </tr>
</table>
${isOutlook ? '<!--[if mso]></td></tr></table><![endif]-->' : ''}
`;

  let layoutHtml = '';
  
  if (layout === 'stacked') {
    // STACKED (LEFT) LAYOUT
    layoutHtml = `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${currentFontStack}; font-size: ${baseSize}px; color:${primaryColor}; line-height: 1.45; border-collapse: collapse; text-align: left;">
  <tr>
    <td valign="top" style="padding-bottom: 12px;">
      <div style="font-size: ${nameSize + 2}px; font-weight: 700; color: ${primaryColor}; line-height: 1.2;">${name}</div>
      <div style="font-size: ${titleSize}px; font-weight: 500; color:${secondaryColor}; padding-top: 2px;">${title}${department ? ` <span style="color: ${accentColor}; font-weight: bold;">|</span> ${department}` : ''}</div>
      ${company ? `<div style="font-size: ${contactSize}px; font-weight: 600; color: ${accentColor}; padding-top: 2px;">${company}</div>` : ''}
    </td>
  </tr>
  <tr>
    <td valign="top" style="padding-top: 4px;">
      <table width="100%"
