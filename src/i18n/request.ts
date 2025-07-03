// import { headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  // const allHeaders = headers();
  // const url = (await allHeaders).get("referer");
  // const pathname = new URL(url || "").pathname; // not reliable

  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = "en";
  const messages = [];

  // Load the default messages for the locale
  const defaultMessages = (await import(`./locales/${locale}/common.json`))
    .default;
  messages.push(defaultMessages);
  const partnerMessages = (await import(`./locales/${locale}/delivery.json`))
    .default;
  const userMessages = (await import(`./locales/${locale}.json`)).default;
  const vendorMessages = await import(`./locales/${locale}/vendor.json`);
  const authMessages = (await import(`./locales/${locale}/auth.json`)).default;
  messages.push(partnerMessages, userMessages, authMessages, vendorMessages);

  // if (pathname.startsWith("/user")) {
  //   // Use Next.js server context to determine which messages to load
  //   const userMessages = (await import(`./locales/${locale}.json`)).default;
  //   messages.push(userMessages);
  // } else if (pathname.startsWith("/delivery-partner")) {
  //   const partnerMessages = (await import(`./locales/${locale}/delivery.json`))
  //     .default;
  //   messages.push(partnerMessages);
  //   // } else if (pathname.startsWith("/vendor")) {
  //   //   const vendorMessages = (await import(`./locales/${locale}/vendor.json`))
  //   //     .default;
  //   //   messages.push(vendorMessages);
  // } else {
  //   const authMessages = (await import(`./locales/${locale}/auth.json`))
  //     .default;
  //   messages.push(authMessages);
  // }

  // Merge all message objects into a single object
  const mergedMessages = Object.assign({}, ...messages);

  return {
    locale,
    messages: mergedMessages,
  };
});
