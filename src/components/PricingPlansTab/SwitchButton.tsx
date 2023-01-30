import React from "react"
import { PlanType, PLAN_TYPES } from "./PricingPlansTab.data"
import "./SwitchButton.css"

interface IProps {
  planType: PlanType
  setPlanType: (val: PlanType) => void
}

const SwitchButton = (props: IProps) => {
  return (
    <div className="switcher">
      <input
        id={`switcher--${PLAN_TYPES.basic}`}
        type="radio"
        name="planType"
        value={PLAN_TYPES.basic}
        className={`switcher__input switcher__input--${PLAN_TYPES.basic}`}
        checked={props.planType === PLAN_TYPES.basic ? true : false}
      />
      <label
        htmlFor={`switcher--${PLAN_TYPES.basic}`}
        className="switcher__label"
        onClick={() => props.setPlanType(PLAN_TYPES.basic)}
      >
        Basic
      </label>

      <input
        id={`switcher--${PLAN_TYPES.premium}`}
        type="radio"
        name="planType"
        value={PLAN_TYPES.premium}
        className={`switcher__input switcher__input--${PLAN_TYPES.premium}`}
        checked={props.planType === PLAN_TYPES.premium ? true : false}
      />
      <label
        htmlFor={`switcher--${PLAN_TYPES.premium}`}
        className="switcher__label"
        onClick={() => props.setPlanType(PLAN_TYPES.premium)}
      >
        Premium
      </label>
      <span className="switcher__toggle"></span>
    </div>
  )
}

export default SwitchButton
