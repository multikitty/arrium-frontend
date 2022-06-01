import { defaultRoutes, Plans, UserRoles } from "@/constants/common"
import { UserType } from "@/types/auth"
import { PlansType } from "@/types/common"
import { nanoid } from "nanoid"

export interface SignInResponse extends NonNullable<UserType> {
  href: string
}

export const signIn = (email: string, password: string) =>
  new Promise<SignInResponse>((resolve, reject) => {
    switch (email) {
      case "mhussain@gmail.com":
        if (password === "#h3!!O!23")
          resolve({
            firstName: "Mo",
            lastName: "Hussain",
            country: "GB",
            phoneNumber: "+44 12 34 5678",
            email: "mhussain@gmail.com",
            isPhoneVerified: true,
            isEmailVerified: true,
            role: UserRoles.admin,
            id: nanoid(),
            href: defaultRoutes.admin,
          })
        else reject(new Error("Invalid username or password"))
        break
      case "sales_agent@gmail.com":
        resolve({
          firstName: "Sales",
          lastName: "Agent",
          country: "GB",
          phoneNumber: "+44 12 34 5678",
          email: "sales_agent@gmail.com",
          isPhoneVerified: true,
          isEmailVerified: true,
          role: UserRoles.salesAgent,
          id: nanoid(),
          href: defaultRoutes.salesAgent,
        })
        break
      case "mudittiwari2000@gmail.com":
        resolve({
          firstName: "Mudit",
          lastName: "Tiwari",
          country: "IN",
          phoneNumber: "+91 98 24 587652",
          email: "mudittiwari2000@gmail.com",
          isPhoneVerified: true,
          isEmailVerified: true,
          role: UserRoles.driver,
          plan: Plans.premium as PlansType,
          id: nanoid(),
          href: defaultRoutes.driver,
        })
        break
      default:
        resolve({
          firstName: "Eliza",
          lastName: "Doolittle",
          country: "GB",
          phoneNumber: "+44 12 34 5678",
          email: "eliza.doolittle@gmail.com",
          isPhoneVerified: true,
          isEmailVerified: false,
          role: UserRoles.driver,
          plan: Plans.basic as PlansType,
          id: nanoid(),
          href: defaultRoutes.driver,
        })
    }
  })
