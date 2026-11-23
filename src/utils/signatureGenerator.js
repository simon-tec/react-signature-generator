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

export const generateHTML = (data) => {
  const {
    name, title, department, phone, mobile, showMobile, email, website, address, showAddress,
    company, linkedin, showLinkedin, tag1, tag2, showTags, tip, showTip, layout, disclaimer, showDisclaimer,
    bannerType, bannerImgUrl, bannerLinkUrl, bannerHtmlText, bannerBgColor, bannerTextColor,
    logoUrl, primaryColor, accentColor, secondaryColor, selectedFont, textSize, logoWidth,
    clientMode, showCta, ctaText, ctaUrl, showCta2, cta2Text, cta2Url
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
      ctaHtml += `
        <td style="background-color: transparent; border-radius: 4px; padding: 6px 14px; text-align: center; border: 2px solid ${primaryColor};">
          <a href="${cta2Url}" target="_blank" style="font-family: ${currentFontStack}; font-size: ${tinySize}px; font-weight: bold; color: ${primaryColor}; text-decoration: none; display: inline-block;">
            ${cta2Text}
          </a>
        </td>`;
    }
    
    ctaHtml += `</tr></table>`;
  }

  const disclaimerHtml = showDisclaimer && disclaimer ? `
    <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 15px; border-collapse: collapse; width: 100%; max-width: 520px;">
      <tr>
        <td style="font-family: ${currentFontStack}; font-size: ${disclaimerSize}px; color: #94a3b8; line-height: 1.4; text-align: justify; border-top: 1px solid #e2e8f0; padding-top: 10px;">
          ${disclaimer}
        </td>
      </tr>
    </table>` : '';

  const tipHtml = showTip && tip ? `
    <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px; border-collapse: collapse; width: 100%; max-width: 520px;">
      <tr>
        <td style="font-family: ${currentFontStack}; font-size: ${tinySize}px; color: #64748b; line-height: 1.4; font-style: italic;">
          ${tip}
        </td>
      </tr>
    </table>` : '';

  const tagsHtml = showTags && (tag1 || tag2) ? `
    <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px; border-collapse: collapse;">
      <tr>
        ${tag1 ? `<td style="background-color: #f1f5f9; border: 1px solid ${primaryColor}; border-radius: 12px; padding: 3px 10px; font-family: ${currentFontStack}; font-weight: 600; font-size: ${tinySize}px; color: ${primaryColor};">${tag1}</td>` : ''}
        ${tag1 && tag2 ? `<td width="6" style="width: 6px; font-size: 0px;">&nbsp;</td>` : ''}
        ${tag2 ? `<td style="background-color: #f1f5f9; border: 1px solid ${primaryColor}; border-radius: 12px; padding: 3px 10px; font-family: ${currentFontStack}; font-weight: 600; font-size: ${tinySize}px; color: ${primaryColor};">${tag2}</td>` : ''}
      </tr>
    </table>
  ` : '';

  const contactDetailsHtml = `
    <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px; font-size: ${contactSize}px; color: ${secondaryColor}; font-family: ${currentFontStack}; border-collapse: collapse;">
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
  `;

  // SPLIT LAYOUT - Featuring the vertical two-tone divider line
  const splitBaseHtml = `
${isOutlook ? '<!--[if mso]><table role="presentation" border="0" cellspacing="0" cellpadding="0" width="520"><tr><td width="' + (Number(logoWidth) + 18) + '" valign="top"><![endif]-->' : ''}
<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${currentFontStack}; font-size: ${baseSize}px; color: ${primaryColor}; line-height: 1.45; border-collapse: collapse; text-align: left;">
  <tr>
    <td valign="top" style="padding-right: 18px; width: ${logoWidth}px;" width="${logoWidth}">
      <a href="${website}" target="_blank" style="text-decoration: none; display: block;">
        <img src="${logoUrl}" alt="${company}" width="${logoWidth}" style="display: block; width: ${logoWidth}px; max-width: ${logoWidth}px; height: auto; border: 0; outline: none; text-decoration: none;" />
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
        <tr><td style="font-size: ${nameSize}px; font-weight: 700; color: ${primaryColor}; font-family: ${currentFontStack}; line-height: 1.2;">${name}</td></tr>
        <tr><td style="font-size: ${titleSize}px; font-weight: 500; color: ${secondaryColor}; font-family: ${currentFontStack}; padding-top: 2px;">${title}${department ? ` <span style="color: ${accentColor}; font-weight: bold;">|</span> ${department}` : ''}</td></tr>
        ${company ? `<tr><td style="font-size: ${contactSize}px; font-weight: 600; color: ${accentColor}; font-family: ${currentFontStack}; padding-top: 1px;">${company}</td></tr>` : ''}
      </table>
      ${contactDetailsHtml}
      ${tagsHtml}
      ${ctaHtml}
    </td>
  </tr>
</table>
${isOutlook ? '<!--[if mso]></td></tr></table><![endif]-->' : ''}
`;

  let layoutHtml = '';
  
  if (layout === 'stacked') {
    // STACKED (LEFT) LAYOUT - Featuring the horizontal two-tone divider line
    layoutHtml = `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${currentFontStack}; font-size: ${baseSize}px; color: ${primaryColor}; line-height: 1.45; border-collapse: collapse; text-align: left;">
  <tr>
    <td valign="top" style="padding-bottom: 12px;">
      <div style="font-size: ${nameSize + 2}px; font-weight: 700; color: ${primaryColor}; line-height: 1.2;">${name}</div>
      <div style="font-size: ${titleSize}px; font-weight: 500; color: ${secondaryColor}; padding-top: 2px;">${title}${department ? ` <span style="color: ${accentColor}; font-weight: bold;">|</span> ${department}` : ''}</div>
      ${company ? `<div style="font-size: ${contactSize}px; font-weight: 600; color: ${accentColor}; padding-top: 2px;">${company}</div>` : ''}
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
      <div style="margin-top: 12px;">
        <a href="${website}" target="_blank" style="text-decoration: none; display: block;">
          <img src="${logoUrl}" alt="${company}" width="${logoWidth}" style="display: block; width: ${logoWidth}px; max-width: ${logoWidth}px; height: auto; border: 0;" />
        </a>
      </div>
      ${ctaHtml}
    </td>
  </tr>
</table>`;
  } else if (layout === 'terminal-code') {
    
    // Dynamically build the JSON contact fields
    const jsonFields = [];
    jsonFields.push(`&nbsp;&nbsp;"phone": "${phone}"`);
    if (showMobile && mobile) jsonFields.push(`&nbsp;&nbsp;"mobile": "${mobile}"`);
    jsonFields.push(`&nbsp;&nbsp;"email": "<a href="mailto:${cleanEmail}" style="color: #60a5fa; text-decoration: none;">${email}</a>"`);
    jsonFields.push(`&nbsp;&nbsp;"web": "<a href="${website}" target="_blank" style="color: #60a5fa; text-decoration: none;">${displayWebsite}</a>"`);
    if (showLinkedin && linkedin) jsonFields.push(`&nbsp;&nbsp;"linkedin": "<a href="${linkedin}" target="_blank" style="color: #60a5fa; text-decoration: none;">${linkedin.replace(/^https?:\/\//i, '')}</a>"`);
    if (showAddress && address) jsonFields.push(`&nbsp;&nbsp;"location": "${address}"`);
    const jsonString = jsonFields.join(',<br/>\n         ');

    // Dynamically build the Tags array
    let tagsCodeHtml = '';
    if (showTags && (tag1 || tag2)) {
      const tagArr = [];
      if (tag1) tagArr.push(`&quot;${tag1}&quot;`);
      if (tag2) tagArr.push(`&quot;${tag2}&quot;`);
      tagsCodeHtml = `
      <div style="margin-top: 12px;">
        <span style="color: ${accentColor}; font-weight: bold;">guest@${company.toLowerCase().replace(/[^a-z0-9]/g, '')}:~$</span> echo $SERVICES<br/>
        <span style="color: #94a3b8; display: inline-block; margin-top: 5px;">[${tagArr.join(', ')}]</span>
      </div>`;
    }

    layoutHtml = `
<table cellpadding="12" cellspacing="0" border="0" style="background-color: #0f172a; border-radius: 6px; font-family: 'Courier New', Courier, monospace; color: #cbd5e1; font-size: ${contactSize}px; border-collapse: collapse; text-align: left; width: 520px; max-width: 100%;">
  <tr>
    <td valign="top" style="border-bottom: 1px dashed #334155; padding-bottom: 10px;">
       <span style="color: ${accentColor}; font-weight: bold;">guest@${company.toLowerCase().replace(/[^a-z0-9]/g, '')}:~$</span> whoami<br/>
       <span style="color: #f8fafc; font-size: ${nameSize}px; font-weight: bold; margin-top: 5px; display: inline-block;">${name}</span><br/>
       <span style="color: #94a3b8;">${title}${department ? ` <span style="color: ${accentColor}; font-weight: bold;">|</span> ${department}` : ''}</span>
    </td>
  </tr>
  <tr>
    <td valign="top" style="padding-top: 10px;">
       <span style="color: ${accentColor}; font-weight: bold;">guest@${company.toLowerCase().replace(/[^a-z0-9]/g, '')}:~$</span> cat contact.json<br/>
       <div style="padding-top: 5px; color: #a5b4fc;">
         {<br/>
         ${jsonString}<br/>
         }
       </div>
       ${tagsCodeHtml}
       ${ctaHtml ? `<div style="margin-top: 12px;">${ctaHtml}</div>` : ''}
    </td>
  </tr>
</table>`;
  } else if (layout === 'grid-block') {
    const monospaced = `"Consolas", "Menlo", "Courier New", monospace`;
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
  <tr>
    <td colspan="2" style="padding: 16px 0 6px 0;">
      <a href="${website}" target="_blank" style="text-decoration: none; display: block;">
        <img src="${logoUrl}" alt="${company}" width="${logoWidth}" style="display: block; width: ${logoWidth}px; max-width: ${logoWidth}px; height: auto; border: 0; outline: none; text-decoration: none;" />
      </a>
    </td>
  </tr>
  <tr>
    <td valign="top" style="padding: 10px 28px 0 0; width: 50%;">
      <div style="font-size: ${nameSize + 2}px; font-weight: 700; color: #1e293b; margin-bottom: 2px;">${name}</div>
      <div style="font-size: ${titleSize}px; color: ${secondaryColor};">${title}${department ? ` <span style="color: ${accentColor}; font-weight: bold;">|</span> ${department}` : ''}</div>
      ${company ? `<div style="font-size: ${baseSize}px; font-weight: 600; color: ${primaryColor}; margin-top: 2px;">${company}</div>` : ''}
    </td>
    <td valign="top" style="padding: 10px 0 0 0; width: 50%;">
      ${contactDetailsHtml}
    </td>
  </tr>
  ${showTags && (tag1 || tag2) ? `<tr><td colspan="2" style="padding-top: 12px;">${tagsHtml}</td></tr>` : ''}
  ${(showCta || showCta2) ? `<tr><td colspan="2" style="padding-top: 12px;">${ctaHtml}</td></tr>` : ''}
</table>`;
  } else if (layout === 'terminal-clean') {
    const monospaced = `"Consolas", "Menlo", "Courier New", monospace`;
    layoutHtml = `
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 520px; font-family: ${currentFontStack}; font-size: ${baseSize}px; color: ${primaryColor}; border-collapse: collapse; text-align: left;">
  <tr>
    <td valign="top" style="padding-bottom: 12px;">
      <a href="${website}" target="_blank" style="text-decoration: none; display: block;">
        <img src="${logoUrl}" alt="${company}" width="${logoWidth}" style="display: block; width: ${logoWidth}px; max-width: ${logoWidth}px; height: auto; border: 0; outline: none; text-decoration: none;" />
      </a>
    </td>
  </tr>
  <tr>
    <td valign="top">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td bgcolor="#f8fafc" style="background-color: #f8fafc; border-left: 3px solid ${accentColor}; padding: 12px 20px 12px 16px;">
            <div style="font-size: ${nameSize}px; font-weight: 700; color: ${primaryColor}; margin-bottom: 2px;">${name}</div>
            <div style="font-size: ${contactSize}px; color: ${secondaryColor}; margin-bottom: 10px;">${title}${department ? ` <span style="color: ${accentColor}; font-weight: bold;">|</span> ${department}` : ''}${company ? ` &bull; ${company}` : ''}</div>
            
            <div style="font-family: ${monospaced}; font-size: ${contactSize}px; color: ${primaryColor}; line-height: 1.6;">
              <span style="color: ${accentColor}; font-weight: bold;">&gt;</span> tel &nbsp;&nbsp;&nbsp;&nbsp; <a href="tel:${cleanPhone}" style="color: ${primaryColor}; text-decoration: none;">${phone}</a><br/>
              ${showMobile && mobile ? `<span style="color: ${accentColor}; font-weight: bold;">&gt;</span> mob &nbsp;&nbsp;&nbsp;&nbsp; <a href="tel:${cleanMobile}" style="color: ${primaryColor}; text-decoration: none;">${mobile}</a><br/>` : ''}
              <span style="color: ${accentColor}; font-weight: bold;">&gt;</span> email &nbsp;&nbsp; <a href="mailto:${cleanEmail}" style="color: ${primaryColor}; text-decoration: none;">${email}</a><br/>
              <span style="color: ${accentColor}; font-weight: bold;">&gt;</span> web &nbsp;&nbsp;&nbsp;&nbsp; <a href="${website}" target="_blank" style="color: ${primaryColor}; text-decoration: none;">${displayWebsite}</a>
              ${showLinkedin && linkedin ? `<br/><span style="color: ${accentColor}; font-weight: bold;">&gt;</span> in &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="${linkedin}" target="_blank" style="color: ${primaryColor}; text-decoration: none;">LinkedIn</a>` : ''}
              ${showAddress && address ? `<br/><span style="color: ${accentColor}; font-weight: bold;">&gt;</span> loc &nbsp;&nbsp;&nbsp;&nbsp; ${address}` : ''}
            </div>
            
            ${showTags && (tag1 || tag2) ? `
            <div style="padding-top: 8px;">
              ${tag1 ? `<div style="font-family: ${monospaced}; font-size: ${contactSize}px; color: ${primaryColor}; line-height: 1.6;"><span style="color: ${accentColor}; font-weight: bold;">&gt;</span> ${tag1}</div>` : ''}
              ${tag2 ? `<div style="font-family: ${monospaced}; font-size: ${contactSize}px; color: ${primaryColor}; line-height: 1.6;"><span style="color: ${accentColor}; font-weight: bold;">&gt;</span> ${tag2}</div>` : ''}
            </div>` : ''}
            ${ctaHtml ? `<div style="margin-top: 10px;">${ctaHtml}</div>` : ''}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
  } else {
    layoutHtml = splitBaseHtml; // Default split layout
  }

  // Appended Modular Banner Logic
  let bannerHtml = '';
  if (bannerType === 'image' && bannerImgUrl) {
    const imgTag = `<img src="${bannerImgUrl}" alt="Promotional Banner" style="display: block; width: 100%; max-width: 520px; height: auto; border-radius: 6px; border: 0;" />`;
    bannerHtml = `
<table cellpadding="0" cellspacing="0" border="0" style="margin-top: 15px; border-collapse: collapse; width: 100%; max-width: 520px;">
  <tr>
    <td>
      ${bannerLinkUrl ? `<a href="${bannerLinkUrl}" target="_blank" style="text-decoration: none;">${imgTag}</a>` : imgTag}
    </td>
  </tr>
</table>`;
  } else if (bannerType === 'html' && bannerHtmlText) {
    bannerHtml = `
<table cellpadding="0" cellspacing="0" border="0" style="margin-top: 15px; border-collapse: collapse; width: 100%; max-width: 520px;">
  <tr>
    <td style="background-color: ${bannerBgColor}; border-radius: 6px; padding: 12px 20px; text-align: center;">
      <span style="font-family: ${currentFontStack}; font-size: ${baseSize}px; font-weight: 600; color: ${bannerTextColor}; text-decoration: none; display: inline-block;">
        ${bannerHtmlText}
      </span>
    </td>
  </tr>
</table>`;
  }

  return `${darkModeStyles}\n${layoutHtml}\n${bannerHtml}\n${tipHtml}\n${disclaimerHtml}`.trim();
};
