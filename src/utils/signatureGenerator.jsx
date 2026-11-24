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

const normalizeUrl = (url) => {
  const trimmed = (url || '').trim();
  if (!trimmed) return '';
  if (/^(https?:\/\/|mailto:|tel:)/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

export const generateHTML = (data) => {
  const {
    name, title, department, phone, mobile, showMobile, email, website, address, showAddress,
    company, tag1, tag2, showTags, tip, showTip, layout, disclaimer, showDisclaimer,
    bannerType, bannerImgUrl, bannerLinkUrl, bannerHtmlText, bannerBgColor, bannerTextColor,
    logoUrl, primaryColor, accentColor, secondaryColor, selectedFont, textSize, logoWidth,
    clientMode, showCta, ctaText, ctaUrl, showCta2, cta2Text, cta2Url,
    socialGithub, socialLinkedin, socialFacebook, socialInstagram, socialYoutube,
    socialTwitter, socialTiktok, socialPinterest, socialWhatsapp,
    customLink1, customIcon1, customLink2, customIcon2
  } = data;

  const isOutlook = clientMode === 'outlook';
  const currentFontStack = FONT_OPTIONS.find(f => f.id === selectedFont)?.stack || FONT_OPTIONS[0].stack;

  // Trimmed & Safe Values
  const safeName = (name || '').trim();
  const safeTitle = (title || '').trim();
  const safeDept = (department || '').trim();
  const safeCompany = (company || '').trim();
  const safePhone = (phone || '').trim();
  const safeMobile = (mobile || '').trim();
  const safeEmail = (email || '').trim();
  const safeWebsite = normalizeUrl(website);
  const displayWebsite = (website || '').trim().replace(/^https?:\/\//i, '');
  const safeAddress = (address || '').trim();
  const safeLogoUrl = (logoUrl || '').trim();
  const safeTag1 = (tag1 || '').trim();
  const safeTag2 = (tag2 || '').trim();
  const safeTip = (tip || '').trim();
  const safeDisclaimer = (disclaimer || '').trim();
  const safeCtaText = (ctaText || '').trim();
  const safeCtaUrl = normalizeUrl(ctaUrl);
  const safeCta2Text = (cta2Text || '').trim();
  const safeCta2Url = normalizeUrl(cta2Url);
  const safeBannerImgUrl = (bannerImgUrl || '').trim();
  const safeBannerLinkUrl = normalizeUrl(bannerLinkUrl);
  const safeBannerHtmlText = (bannerHtmlText || '').trim();

  // Font Size Calculations
  const baseSize = Number(textSize) || 13;
  const nameSize = baseSize + 3;
  const titleSize = baseSize;
  const contactSize = baseSize - 1;
  const tinySize = baseSize - 2;
  const disclaimerSize = baseSize - 3;

  // Strict Input Validation for Links
  const cleanPhone = safePhone.replace(/[^\d+]/g, '');
  const cleanMobile = safeMobile.replace(/[^\d+]/g, '');

  // Dark Mode Resilience Injection
  const darkModeStyles = `
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<style>
  :root { color-scheme: light dark; supported-color-schemes: light dark; }
</style>
`;

  // --- LOGO HELPER ---
  const renderLogoImg = (widthOverride) => {
    if (!safeLogoUrl) return '';
    const w = widthOverride || logoWidth;
    const img = `<img src="${safeLogoUrl}" alt="${safeCompany || 'Company Logo'}" width="${w}" style="display: block; width: ${w}px; max-width: ${w}px; height: auto; border: 0; outline: none; text-decoration: none;" />`;
    return safeWebsite ? `<a href="${safeWebsite}" target="_blank" style="text-decoration: none; display: block;">${img}</a>` : img;
  };
  const logoHtml = renderLogoImg();

  // --- CTA LOGIC ---
  const hasCta1 = showCta && safeCtaText;
  const hasCta2 = showCta2 && safeCta2Text;

  let ctaHtml = '';
  if (hasCta1 || hasCta2) {
    ctaHtml = `<table cellpadding="0" cellspacing="0" border="0" style="margin-top: 12px; border-collapse: collapse;"><tr>`;

    if (hasCta1) {
      ctaHtml += `
        <td style="background-color: ${accentColor}; border-radius: 4px; padding: 6px 14px; text-align: center; border: 2px solid ${accentColor};">
          <a href="${safeCtaUrl || '#'}" target="_blank" style="font-family: ${currentFontStack}; font-size: ${tinySize}px; font-weight: bold; color: #ffffff; text-decoration: none; display: inline-block; white-space: nowrap;">
            ${safeCtaText}
          </a>
        </td>`;
    }

    if (hasCta1 && hasCta2) {
      ctaHtml += `<td width="8" style="width: 8px; font-size: 0px;">&nbsp;</td>`;
    }

    if (hasCta2) {
      ctaHtml += `
        <td style="background-color: transparent; border-radius: 4px; padding: 6px 14px; text-align: center; border: 2px solid ${primaryColor};">
          <a href="${safeCta2Url || '#'}" target="_blank" style="font-family: ${currentFontStack}; font-size: ${tinySize}px; font-weight: bold; color: ${primaryColor}; text-decoration: none; display: inline-block; white-space: nowrap;">
            ${safeCta2Text}
          </a>
        </td>`;
    }

    ctaHtml += `</tr></table>`;
  }
  const ctaWrapperHtml = ctaHtml ? `<div style="margin-top: 12px;">${ctaHtml}</div>` : '';
  const gridCtaHtml = ctaHtml ? `<tr><td colspan="2" style="padding-top: 12px;">${ctaHtml}</td></tr>` : '';

  // --- SOCIAL ICONS LOGIC ---
  const activeSocials = [
    { url: normalizeUrl(socialGithub), net: 'github', icon: getPngIcon('github', primaryColor) },
    { url: normalizeUrl(socialLinkedin), net: 'linkedin', icon: getPngIcon('linkedin', primaryColor) },
    { url: normalizeUrl(socialFacebook), net: 'facebook', icon: getPngIcon('facebook', primaryColor) },
    { url: normalizeUrl(socialInstagram), net: 'instagram', icon: getPngIcon('instagram', primaryColor) },
    { url: normalizeUrl(socialYoutube), net: 'youtube', icon: getPngIcon('youtube', primaryColor) },
    { url: normalizeUrl(socialTwitter), net: 'twitter', icon: getPngIcon('twitter', primaryColor) },
    { url: normalizeUrl(socialTiktok), net: 'tiktok', icon: getPngIcon('tiktok', primaryColor) },
    { url: normalizeUrl(socialPinterest), net: 'pinterest', icon: getPngIcon('pinterest', primaryColor) },
    { url: normalizeUrl(socialWhatsapp), net: 'whatsapp', icon: getPngIcon('whatsapp', primaryColor) },
    { url: normalizeUrl(customLink1), net: 'custom1', icon: (customIcon1 || '').trim() || getPngIcon('link', primaryColor) },
    { url: normalizeUrl(customLink2), net: 'custom2', icon: (customIcon2 || '').trim() || getPngIcon('link', primaryColor) }
  ].filter(s => s.url);

  let socialIconsHtml = '';
  if (activeSocials.length > 0) {
    const iconsList = activeSocials.map(s =>
      `<td style="padding-right: 6px;">` +
        `<a href="${s.url}" target="_blank" style="text-decoration: none; display: block;">` +
          `<img src="${s.icon}" alt="${s.net}" width="24" height="24" style="display: block; width: 24px; height: 24px; border-radius: 4px; border: 0;" />` +
        `</a>` +
      `</td>`
    ).join('');

    socialIconsHtml = `
    <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px; border-collapse: collapse;">
      <tr>${iconsList}</tr>
    </table>`;
  }

  let socialTerminalCleanHtml = '';
  if (activeSocials.length > 0) {
    const terminalIconsList = activeSocials.map(s =>
      `<a href="${s.url}" target="_blank" style="text-decoration: none; display: inline-block; vertical-align: middle; margin-right: 6px;">` +
        `<img src="${s.icon}" alt="${s.net}" width="16" height="16" style="display: block; width: 16px; height: 16px; border-radius: 3px; border: 0;" />` +
      `</a>`
    ).join('');

    socialTerminalCleanHtml = `
    <span style="color: ${accentColor}; font-weight: bold;">&gt;</span> social &nbsp;&nbsp;
    ${terminalIconsList}
    `;
  }

  // --- FOOTERS LOGIC ---
  const disclaimerHtml = showDisclaimer && safeDisclaimer ? `
    <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 15px; border-collapse: collapse; width: 100%; max-width: 520px;">
      <tr>
        <td style="font-family: ${currentFontStack}; font-size: ${disclaimerSize}px; color: #94a3b8; line-height: 1.4; text-align: justify; border-top: 1px solid #e2e8f0; padding-top: 10px;">
          ${safeDisclaimer}
        </td>
      </tr>
    </table>` : '';

  const tipHtml = showTip && safeTip ? `
    <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px; border-collapse: collapse; width: 100%; max-width: 520px;">
      <tr>
        <td style="font-family: ${currentFontStack}; font-size: ${tinySize}px; color: #64748b; line-height: 1.4; font-style: italic;">
          ${safeTip}
        </td>
      </tr>
    </table>` : '';

  // --- TAGS LOGIC ---
  const tag1Html = safeTag1 ? `<td style="background-color: #f1f5f9; border: 1px solid ${primaryColor}; border-radius: 12px; padding: 3px 10px; font-family: ${currentFontStack}; font-weight: 600; font-size: ${tinySize}px; color: ${primaryColor}; white-space: nowrap;">${safeTag1}</td>` : '';
  const tagDividerHtml = (safeTag1 && safeTag2) ? `<td width="6" style="width: 6px; font-size: 0px;">&nbsp;</td>` : '';
  const tag2Html = safeTag2 ? `<td style="background-color: #f1f5f9; border: 1px solid ${primaryColor}; border-radius: 12px; padding: 3px 10px; font-family: ${currentFontStack}; font-weight: 600; font-size: ${tinySize}px; color: ${primaryColor}; white-space: nowrap;">${safeTag2}</td>` : '';

  const tagsHtml = showTags && (safeTag1 || safeTag2) ? `
    <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px; border-collapse: collapse;">
      <tr>
        ${tag1Html}
        ${tagDividerHtml}
        ${tag2Html}
      </tr>
    </table>
  ` : '';
  const gridTagsHtml = tagsHtml ? `<tr><td colspan="2" style="padding-top: 12px;">${tagsHtml}</td></tr>` : '';

  const monospaced = `"Consolas", "Menlo", "Courier New", monospace`;
  const cleanTag1 = safeTag1 ? `<div style="font-family: ${monospaced}; font-size: ${contactSize}px; color: ${primaryColor}; line-height: 1.6;"><span style="color: ${accentColor}; font-weight: bold;">&gt;</span> ${safeTag1}</div>` : '';
  const cleanTag2 = safeTag2 ? `<div style="font-family: ${monospaced}; font-size: ${contactSize}px; color: ${primaryColor}; line-height: 1.6;"><span style="color: ${accentColor}; font-weight: bold;">&gt;</span> ${safeTag2}</div>` : '';
  const cleanTagsHtml = (showTags && (safeTag1 || safeTag2)) ? `
    <div style="padding-top: 8px;">
      ${cleanTag1}
      ${cleanTag2}
    </div>` : '';

  // --- CONTACT DETAILS LOGIC ---
  const phoneRowHtml = safePhone ? `
      <tr>
        <td style="padding-bottom: 3px; font-family: ${currentFontStack};">
          <strong style="color: ${accentColor}; display: inline-block; width: 16px;">P:</strong> <a href="tel:${cleanPhone}" style="color: ${secondaryColor}; text-decoration: none;">${safePhone}</a>
        </td>
      </tr>` : '';

  const mobileRowHtml = (showMobile && safeMobile) ? `
      <tr>
        <td style="padding-bottom: 3px; font-family: ${currentFontStack};">
          <strong style="color: ${accentColor}; display: inline-block; width: 16px;">M:</strong> <a href="tel:${cleanMobile}" style="color: ${secondaryColor}; text-decoration: none;">${safeMobile}</a>
        </td>
      </tr>` : '';

  const emailRowHtml = safeEmail ? `
      <tr>
        <td style="padding-bottom: 3px; font-family: ${currentFontStack};">
          <strong style="color: ${accentColor}; display: inline-block; width: 16px;">E:</strong> <a href="mailto:${safeEmail}" style="color: ${accentColor}; text-decoration: none;">${safeEmail}</a>
        </td>
      </tr>` : '';

  const websiteRowHtml = safeWebsite ? `
      <tr>
        <td style="padding-bottom: 3px; font-family: ${currentFontStack};">
          <strong style="color: ${accentColor}; display: inline-block; width: 16px;">W:</strong> <a href="${safeWebsite}" target="_blank" style="color: ${accentColor}; text-decoration: none;">${displayWebsite}</a>
        </td>
      </tr>` : '';

  const addressRowHtml = (showAddress && safeAddress) ? `
      <tr>
        <td style="padding-bottom: 3px; font-family: ${currentFontStack}; color: ${secondaryColor};">
          <strong style="color: ${accentColor}; display: inline-block; width: 16px;">A:</strong> ${safeAddress}
        </td>
      </tr>` : '';

  const hasAnyContact = phoneRowHtml || mobileRowHtml || emailRowHtml || websiteRowHtml || addressRowHtml;
  const contactDetailsHtml = `
    ${hasAnyContact ? `
    <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px; font-size: ${contactSize}px; color: ${secondaryColor}; font-family: ${currentFontStack}; border-collapse: collapse;">
      ${phoneRowHtml}
      ${mobileRowHtml}
      ${emailRowHtml}
      ${websiteRowHtml}
      ${addressRowHtml}
    </table>` : ''}
    ${socialIconsHtml}
  `;

  // --- IDENTITY LOGIC ---
  const titleAndDept = [safeTitle, safeDept].filter(Boolean).join(` <span style="color: ${accentColor}; font-weight: bold;">|</span> `);
  const titleRowHtml = titleAndDept ? `<tr><td style="font-size: ${titleSize}px; font-weight: 500; color: ${secondaryColor}; font-family: ${currentFontStack}; padding-top: 2px;">${titleAndDept}</td></tr>` : '';
  const compRowHtml = safeCompany ? `<tr><td style="font-size: ${contactSize}px; font-weight: 600; color: ${accentColor}; font-family: ${currentFontStack}; padding-top: 1px;">${safeCompany}</td></tr>` : '';
  const compDivHtml = safeCompany ? `<div style="font-size: ${contactSize}px; font-weight: 600; color: ${accentColor}; padding-top: 2px;">${safeCompany}</div>` : '';
  const compGridHtml = safeCompany ? `<div style="font-size: ${baseSize}px; font-weight: 600; color: ${primaryColor}; margin-top: 2px;">${safeCompany}</div>` : '';
  const compCleanHtml = safeCompany ? (titleAndDept ? ` &bull; ${safeCompany}` : safeCompany) : '';

  // --- OUTLOOK CONDITIONAL STRINGS ---
  const outlookSplitStart = (isOutlook && logoHtml) ? `<!--[if mso]><table role="presentation" border="0" cellspacing="0" cellpadding="0" width="520"><tr><td width="${Number(logoWidth) + 18}" valign="top"><![endif]-->` : '';
  const outlookSplitMiddle = (isOutlook && logoHtml) ? `<!--[if mso]></td><td width="2" valign="top" bgcolor="${primaryColor}"><![endif]-->` : '';
  const outlookSplitEndCol = (isOutlook && logoHtml) ? `<!--[if mso]></td><td width="300" valign="top"><![endif]-->` : '';
  const outlookSplitEndTable = (isOutlook && logoHtml) ? `<!--[if mso]></td></tr></table><![endif]-->` : '';

  let layoutHtml = '';

  if (layout === 'stacked') {
    // VERTICAL STACK LAYOUT
    const stackedLogoHtml = logoHtml ? `<div style="margin-top: 12px;">${logoHtml}</div>` : '';
    layoutHtml = `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${currentFontStack}; font-size: ${baseSize}px; color: ${primaryColor}; line-height: 1.45; border-collapse: collapse; text-align: left;">
  <tr>
    <td valign="top" style="padding-bottom: 12px;">
      ${safeName ? `<div style="font-size: ${nameSize + 2}px; font-weight: 700; color: ${primaryColor}; line-height: 1.2;">${safeName}</div>` : ''}
      ${titleAndDept ? `<div style="font-size: ${titleSize}px; font-weight: 500; color: ${secondaryColor}; padding-top: 2px;">${titleAndDept}</div>` : ''}
      ${compDivHtml}
    </td>
  </tr>
  <tr>
    <td valign="top" style="padding-top: 4px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse; margin-bottom: 12px;">
        <tr>
          <td width="80" style="width: 80px; border-top: 3px solid ${accentColor}; font-size: 0; line-height: 0;">&nbsp;</td>
          <td style="border-top: 3px solid ${primaryColor}; font-size: 0; line-height: 0;">&nbsp;</td>
        </tr>
      </table>
      ${contactDetailsHtml}
      ${tagsHtml}
      ${stackedLogoHtml}
      ${ctaHtml}
    </td>
  </tr>
</table>`;
  } else if (layout === 'terminal-code') {
    // DEV TERMINAL LAYOUT
    const hostSlug = (safeCompany || 'company').toLowerCase().replace(/[^a-z0-9]/g, '') || 'company';
    const jsonFields = [];
    if (safePhone) jsonFields.push(`&nbsp;&nbsp;"phone": "${safePhone}"`);
    if (showMobile && safeMobile) jsonFields.push(`&nbsp;&nbsp;"mobile": "${safeMobile}"`);
    if (safeEmail) jsonFields.push(`&nbsp;&nbsp;"email": "<a href="mailto:${safeEmail}" style="color: #60a5fa; text-decoration: none;">${safeEmail}</a>"`);
    if (safeWebsite) jsonFields.push(`&nbsp;&nbsp;"web": "<a href="${safeWebsite}" target="_blank" style="color: #60a5fa; text-decoration: none;">${displayWebsite}</a>"`);
    if (showAddress && safeAddress) jsonFields.push(`&nbsp;&nbsp;"location": "${safeAddress}"`);

    if (activeSocials.length > 0) {
      const socialJson = activeSocials.map(s => `&quot;${s.net}&quot;: &quot;<a href="${s.url}" target="_blank" style="color: #60a5fa; text-decoration: none;">${s.url}</a>&quot;`).join(', ');
      jsonFields.push(`&nbsp;&nbsp;"socials": { ${socialJson} }`);
    }

    const jsonString = jsonFields.join(',<br/>\n         ');

    let tagsCodeHtml = '';
    if (showTags && (safeTag1 || safeTag2)) {
      const tagArr = [];
      if (safeTag1) tagArr.push(`&quot;${safeTag1}&quot;`);
      if (safeTag2) tagArr.push(`&quot;${safeTag2}&quot;`);
      tagsCodeHtml = `
      <div style="margin-top: 12px;">
        <span style="color: ${accentColor}; font-weight: bold;">guest@${hostSlug}:~$</span> echo $SERVICES<br/>
        <span style="color: #94a3b8; display: inline-block; margin-top: 5px;">[${tagArr.join(', ')}]</span>
      </div>`;
    }

    layoutHtml = `
<table cellpadding="12" cellspacing="0" border="0" style="background-color: #0f172a; border-radius: 6px; font-family: 'Courier New', Courier, monospace; color: #cbd5e1; font-size: ${contactSize}px; border-collapse: collapse; text-align: left; width: 520px; max-width: 100%;">
  <tr>
    <td valign="top" style="border-bottom: 1px dashed #334155; padding-bottom: 10px;">
       <span style="color: ${accentColor}; font-weight: bold;">guest@${hostSlug}:~$</span> whoami<br/>
       ${safeName ? `<span style="color: #f8fafc; font-size: ${nameSize}px; font-weight: bold; margin-top: 5px; display: inline-block;">${safeName}</span><br/>` : ''}
       ${titleAndDept ? `<span style="color: #94a3b8;">${titleAndDept}</span>` : ''}
    </td>
  </tr>
  <tr>
    <td valign="top" style="padding-top: 10px;">
       <span style="color: ${accentColor}; font-weight: bold;">guest@${hostSlug}:~$</span> cat contact.json<br/>
       <div style="padding-top: 5px; color: #a5b4fc;">
         {<br/>
         ${jsonString}<br/>
         }
       </div>
       ${tagsCodeHtml}
       ${ctaWrapperHtml}
    </td>
  </tr>
</table>`;
  } else if (layout === 'grid-block') {
    // EXECUTIVE GRID LAYOUT
    const gridLogoRow = logoHtml ? `<tr><td colspan="2" style="padding: 16px 0 6px 0;">${logoHtml}</td></tr>` : '';
    layoutHtml = `
<table width="480" cellpadding="0" cellspacing="0" border="0" style="width: 480px; max-width: 100%; font-family: ${currentFontStack}; font-size: ${baseSize}px; color: ${primaryColor}; border-collapse: collapse; text-align: left;">
  <tr>
    <td colspan="2">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td width="120" style="width: 120px; border-top: 4px solid ${accentColor}; font-size: 0; line-height: 0;">&nbsp;</td>
          <td style="border-top: 4px solid ${primaryColor}; font-size: 0; line-height: 0;">&nbsp;</td>
        </tr>
      </table>
    </td>
  </tr>
  ${gridLogoRow}
  <tr>
    <td valign="top" style="padding: 10px 28px 0 0; width: 50%;">
      ${safeName ? `<div style="font-size: ${nameSize + 2}px; font-weight: 700; color: #1e293b; margin-bottom: 2px;">${safeName}</div>` : ''}
      ${titleAndDept ? `<div style="font-size: ${titleSize}px; color: ${secondaryColor};">${titleAndDept}</div>` : ''}
      ${compGridHtml}
    </td>
    <td valign="top" style="padding: 10px 0 0 0; width: 50%;">
      ${contactDetailsHtml}
    </td>
  </tr>
  ${gridTagsHtml}
  ${gridCtaHtml}
</table>`;
  } else if (layout === 'terminal-clean') {
    // CYBER MINIMAL LAYOUT
    const cleanLines = [];
    if (safePhone) cleanLines.push(`<span style="color: ${accentColor}; font-weight: bold;">&gt;</span> tel &nbsp;&nbsp;&nbsp;&nbsp; <a href="tel:${cleanPhone}" style="color: ${primaryColor}; text-decoration: none;">${safePhone}</a>`);
    if (showMobile && safeMobile) cleanLines.push(`<span style="color: ${accentColor}; font-weight: bold;">&gt;</span> mob &nbsp;&nbsp;&nbsp;&nbsp; <a href="tel:${cleanMobile}" style="color: ${primaryColor}; text-decoration: none;">${safeMobile}</a>`);
    if (safeEmail) cleanLines.push(`<span style="color: ${accentColor}; font-weight: bold;">&gt;</span> email &nbsp;&nbsp; <a href="mailto:${safeEmail}" style="color: ${primaryColor}; text-decoration: none;">${safeEmail}</a>`);
    if (safeWebsite) cleanLines.push(`<span style="color: ${accentColor}; font-weight: bold;">&gt;</span> web &nbsp;&nbsp;&nbsp;&nbsp; <a href="${safeWebsite}" target="_blank" style="color: ${primaryColor}; text-decoration: none;">${displayWebsite}</a>`);
    if (showAddress && safeAddress) cleanLines.push(`<span style="color: ${accentColor}; font-weight: bold;">&gt;</span> loc &nbsp;&nbsp;&nbsp;&nbsp; ${safeAddress}`);
    if (socialTerminalCleanHtml) cleanLines.push(socialTerminalCleanHtml.trim());

    const cleanLogoRow = logoHtml ? `<tr><td valign="top" style="padding-bottom: 12px;">${logoHtml}</td></tr>` : '';
    const cleanSubtitle = `${titleAndDept}${compCleanHtml}`;

    layoutHtml = `
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 520px; font-family: ${currentFontStack}; font-size: ${baseSize}px; color: ${primaryColor}; border-collapse: collapse; text-align: left;">
  ${cleanLogoRow}
  <tr>
    <td valign="top">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td bgcolor="#f8fafc" style="background-color: #f8fafc; border-left: 3px solid ${accentColor}; padding: 12px 20px 12px 16px;">
            ${safeName ? `<div style="font-size: ${nameSize}px; font-weight: 700; color: ${primaryColor}; margin-bottom: 2px;">${safeName}</div>` : ''}
            ${cleanSubtitle ? `<div style="font-size: ${contactSize}px; color: ${secondaryColor}; margin-bottom: 10px;">${cleanSubtitle}</div>` : ''}
            ${cleanLines.length > 0 ? `<div style="font-family: ${monospaced}; font-size: ${contactSize}px; color: ${primaryColor}; line-height: 1.6;">${cleanLines.join('<br/>')}</div>` : ''}
            ${cleanTagsHtml}
            ${ctaWrapperHtml}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
  } else if (layout === 'compact-inline') {
    // COMPACT INLINE LAYOUT (NEW 6TH LAYOUT)
    const inlineParts = [];
    if (safePhone) inlineParts.push(`<a href="tel:${cleanPhone}" style="color: ${secondaryColor}; text-decoration: none;">${safePhone}</a>`);
    if (showMobile && safeMobile) inlineParts.push(`<a href="tel:${cleanMobile}" style="color: ${secondaryColor}; text-decoration: none;">${safeMobile}</a>`);
    if (safeEmail) inlineParts.push(`<a href="mailto:${safeEmail}" style="color: ${accentColor}; text-decoration: none;">${safeEmail}</a>`);
    if (safeWebsite) inlineParts.push(`<a href="${safeWebsite}" target="_blank" style="color: ${accentColor}; text-decoration: none;">${displayWebsite}</a>`);

    const inlineSeparator = ` <span style="color: #cbd5e1; padding: 0 4px;">&bull;</span> `;
    const inlineContactLine = inlineParts.join(inlineSeparator);
    const compactLogoWidth = Math.min(Number(logoWidth) || 110, 120);
    const compactLogoHtml = renderLogoImg(compactLogoWidth);

    layoutHtml = `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${currentFontStack}; font-size: ${baseSize}px; color: ${primaryColor}; line-height: 1.45; border-collapse: collapse; text-align: left; max-width: 560px;">
  <tr>
    <td valign="top" style="border-left: 3px solid ${accentColor}; padding-left: 12px;">
      <div style="font-size: ${nameSize}px; font-weight: 700; color: ${primaryColor}; line-height: 1.25;">
        ${safeName}${safeCompany ? ` <span style="font-weight: 400; color: #cbd5e1;">|</span> <span style="font-size: ${titleSize}px; font-weight: 600; color: ${accentColor};">${safeCompany}</span>` : ''}
      </div>
      ${titleAndDept ? `<div style="font-size: ${contactSize}px; font-weight: 500; color: ${secondaryColor}; padding-top: 2px;">${titleAndDept}</div>` : ''}
      ${inlineContactLine ? `<div style="font-size: ${contactSize}px; color: ${secondaryColor}; padding-top: 5px;">${inlineContactLine}</div>` : ''}
      ${(showAddress && safeAddress) ? `<div style="font-size: ${tinySize}px; color: #64748b; padding-top: 2px;">${safeAddress}</div>` : ''}
      ${socialIconsHtml}
      ${tagsHtml}
      ${ctaHtml}
      ${compactLogoHtml ? `<div style="margin-top: 10px;">${compactLogoHtml}</div>` : ''}
    </td>
  </tr>
</table>`;
  } else {
    // CLASSIC SPLIT LAYOUT (DEFAULT)
    const splitLogoCols = logoHtml ? `
    <td valign="top" style="padding-right: 18px; width: ${logoWidth}px;" width="${logoWidth}">
      ${logoHtml}
    </td>
    ${outlookSplitMiddle}
    <td width="2" style="width: 2px; background-color: ${primaryColor};" valign="top">
      <table width="2" cellpadding="0" cellspacing="0" border="0" style="width: 2px; border-collapse: collapse;">
        <tr><td height="32" style="height: 32px; background-color: ${accentColor}; font-size: 0; line-height: 0;">&nbsp;</td></tr>
      </table>
    </td>
    ${outlookSplitEndCol}` : '';

    layoutHtml = `
${outlookSplitStart}
<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${currentFontStack}; font-size: ${baseSize}px; color: ${primaryColor}; line-height: 1.45; border-collapse: collapse; text-align: left;">
  <tr>
    ${splitLogoCols}
    <td valign="top" style="${logoHtml ? 'padding-left: 18px;' : ''}">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
        ${safeName ? `<tr><td style="font-size: ${nameSize}px; font-weight: 700; color: ${primaryColor}; font-family: ${currentFontStack}; line-height: 1.2;">${safeName}</td></tr>` : ''}
        ${titleRowHtml}
        ${compRowHtml}
      </table>
      ${contactDetailsHtml}
      ${tagsHtml}
      ${ctaHtml}
    </td>
  </tr>
</table>
${outlookSplitEndTable}
`;
  }

  // Appended Modular Banner Logic
  let bannerHtml = '';
  if (bannerType === 'image' && safeBannerImgUrl) {
    const imgTag = `<img src="${safeBannerImgUrl}" alt="Promotional Banner" style="display: block; width: 100%; max-width: 520px; height: auto; border-radius: 6px; border: 0;" />`;
    const bannerLinkWrapper = safeBannerLinkUrl ? `<a href="${safeBannerLinkUrl}" target="_blank" style="text-decoration: none;">${imgTag}</a>` : imgTag;

    bannerHtml = `
<table cellpadding="0" cellspacing="0" border="0" style="margin-top: 15px; border-collapse: collapse; width: 100%; max-width: 520px;">
  <tr>
    <td>
      ${bannerLinkWrapper}
    </td>
  </tr>
</table>`;
  } else if (bannerType === 'html' && safeBannerHtmlText) {
    bannerHtml = `
<table cellpadding="0" cellspacing="0" border="0" style="margin-top: 15px; border-collapse: collapse; width: 100%; max-width: 520px;">
  <tr>
    <td style="background-color: ${bannerBgColor}; border-radius: 6px; padding: 12px 20px; text-align: center;">
      <span style="font-family: ${currentFontStack}; font-size: ${baseSize}px; font-weight: 600; color: ${bannerTextColor}; text-decoration: none; display: inline-block;">
        ${safeBannerHtmlText}
      </span>
    </td>
  </tr>
</table>`;
  }

  return `${darkModeStyles}\n${layoutHtml}\n${bannerHtml}\n${tipHtml}\n${disclaimerHtml}`.trim();
};
