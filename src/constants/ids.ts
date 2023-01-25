export const LANDING_PAGE_IDS = {
  "landing-navbar": "landing-page--navbar",
  "banner-section": "landing-page--banner-section",
  "benefits-section": "landing-page--benefits-section",
  "working-section": "landing-page--working-section",
  "contact-us-section": "landing-page--contact-us-section",
  "footer-section": "landing-page--footer-section",
} as const

export const SIGN_IN_FORM_IDS = {
  email: "sign-in--email",
  password: "sign-in--password",
  checkbox: "sign-in--checkbox",
} as const

const IDS = {
  landing: LANDING_PAGE_IDS,
  signin: {
    form: SIGN_IN_FORM_IDS,
  },
} as const

export default IDS
