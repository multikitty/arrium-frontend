import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { UserByRoleResultData } from "@/lib/interfaces/user"

const referralsSchema = Yup.object().shape({
  country: Yup.string().required("This field is mandatory"),
  region: Yup.string().required("This field is mandatory"),
  station: Yup.string().required("This field is mandatory"),
  numberOfReferrals: Yup.number().required("This field is mandatory"),
  assignTo: Yup.mixed<UserByRoleResultData>()
    .nullable()
    .required("This field is mandatory"),
})

const referralsOptions = {
  resolver: yupResolver(referralsSchema),
  defaultValues: {
    country: "",
    region: "",
    station: "",
    numberOfReferrals: 1,
    assignTo: null as UserByRoleResultData | null,
  },
}

export default referralsOptions
