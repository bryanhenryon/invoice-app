import { colors } from "./variables";

export const lightTheme = {
  // Global
  blackToWhite: colors.dark,
  greyToWhite: colors.grey,
  paleVioletToWhite: colors.paleViolet,
  paleVioletToGrey: colors.paleViolet,
  paleVioletToLightPaleViolet: colors.paleViolet,

  // Views
  viewsContainerBackground: colors.bgLight,

  // Sidebar
  sidebarBackground: "#373b53",

  // Invoice card
  invoiceCard: colors.white,

  // Input
  inputLabelColor: colors.paleViolet,
  inputBackgroundColor: colors.white,
  inputBorderColor: "#dfe3fa",
  activeInputBorderColor: "#7c5dfa",

  // Draft status badge
  draftStatusBadgeBulletPoint: "#373B53",
  draftStatusBadgeBackground: "rgba(55, 59, 83, 0.06)",
  draftStatusBadgeColor: "#373B53",

  // Status filter
  statusFilterDropdownBackground: colors.white,
  statusFilterDropdownBoxShadow: "0px 10px 20px rgba(72, 84, 159, 0.25)",
  statusFilterCheckboxBackground: colors.lightPaleViolet,

  // Light variant button
  buttonVariantLightBackground: "#F9FAFE",
  buttonVariantLightBackgroundHover: colors.lightPaleViolet,
  buttonVariantLightColor: colors.paleViolet,

  // Invoice items background
  invoiceItemsBackground: "#f9fafe",

  // Invoice grand total
  invoiceGrandTotalBackground: "#373b53",
};

export const darkTheme = {
  // Global
  blackToWhite: colors.white,
  greyToWhite: colors.white,
  paleVioletToWhite: colors.white,
  paleVioletToGrey: colors.grey,
  paleVioletToLightPaleViolet: colors.lightPaleViolet,

  // Views
  viewsContainerBackground: colors.bgDark,

  // Invoice card
  invoiceCard: colors.lightDark,

  // Sidebar
  sidebarBackground: colors.lightDark,

  // Input
  inputLabelColor: colors.white,
  inputBackgroundColor: colors.lightDark,
  inputBorderColor: colors.lighterDark,
  activeInputBorderColor: colors.lighterDark,

  // Draft status badge
  draftStatusBadgeBulletPoint: colors.lightPaleViolet,
  draftStatusBadgeBackground: "rgba(223, 227, 250, 0.06)",
  draftStatusBadgeColor: colors.lightPaleViolet,

  // Status filter
  statusFilterDropdownBackground: colors.lighterDark,
  statusFilterDropdownBoxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)",
  statusFilterCheckboxBackground: colors.lightDark,

  // Light variant button
  buttonVariantLightBackground: colors.lighterDark,
  buttonVariantLightBackgroundHover: colors.white,
  buttonVariantLightColor: colors.lightPaleViolet,

  // Invoice items background
  invoiceItemsBackground: colors.lighterDark,

  // Invoice grand total
  invoiceGrandTotalBackground: colors.dark,
};
