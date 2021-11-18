import { colors } from "./variables";

export const lightTheme = {
  viewsContainerBackground: colors.bgLight,
  sidebarBackground: "#373b53",
  invoiceCard: colors.white,
  baseTextColor: colors.dark,
  baseGreyTextColor: colors.grey,
  inputLabelColor: colors.paleViolet,
  inputBackgroundColor: colors.white,
  inputBorderColor: "#dfe3fa",
  activeInputBorderColor: "#7c5dfa",
  draftStatusBadgeBulletPoint: "#373B53",
  draftStatusBadgeBackground: "rgba(55, 59, 83, 0.06)",
  draftStatusBadgeColor: "#373B53",
};

export const darkTheme = {
  viewsContainerBackground: colors.bgDark,
  sidebarBackground: colors.lightDark,
  invoiceCard: colors.lightDark,
  baseTextColor: colors.white,
  baseGreyTextColor: colors.white,
  inputLabelColor: colors.white,
  inputBackgroundColor: colors.lightDark,
  inputBorderColor: colors.lighterDark,
  activeInputBorderColor: colors.lighterDark,
  draftStatusBadgeBulletPoint: colors.lightPaleViolet,
  draftStatusBadgeBackground: "rgba(223, 227, 250, 0.06)",
  draftStatusBadgeColor: colors.lightPaleViolet,
};
