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
  return `https://img.icons8.com/ios-filled/48/${hex}/${iconName}.png`; };  const normalizeUrl = (url) => { const trimmed = (url \vert{}\vert{} '').trim(); if (!trimmed) return ''; if (/^(https?:\/\/\vert{}mailto:\vert{}tel:)/i.test(trimmed)) return trimmed; return `https://${trimmed}`;
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
    const img = `<img src="${safeLogoUrl}" alt="${safeCompany \vert{}\vert{} 'Company Logo'}" width="${w}" style="display: block; width: ${w}px; max-width:${w}px; height: auto; border: 0; outline: none; text-decoration: none;" />`;
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
        <td style="background-color: ${accentColor}; border-radius: 4px; padding: 6px 14px; text-align: center; border: 2px solid${accentColor};">
          <a href="${safeCtaUrl || '#'}" target="_blank" style="font-family: ${currentFontStack}; font-size:${tinySize}px; font-weight: bold; color: #ffffff; text-decoration: none; display: inline-block; white-space: nowrap;">
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
          <a href="${safeCta2Url \vert{}\vert{} '#'}" target="_blank" style="font-family: ${currentFontStack}; font-size: ${tinySize}px; font-weight: bold; color:${primaryColor}; text-decoration: none; display: inline-block; white-space: nowrap;">
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
      `<td style="padding
