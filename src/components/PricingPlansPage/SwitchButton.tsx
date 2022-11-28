import React, { useEffect } from "react"
import "./SwitchButton.css"

interface IProps {
  planType: string
  setPlanType: (val: string) => void
}

export default function SwitchButton(props: IProps) {
  return (
    <div className="switcher">
      <input
        type="radio"
        name="planType"
        value="basic"
        className="switcher__input switcher__input--basic"
        checked={props.planType === "basic" ? true : false}
      />
      <label
        htmlFor="basic"
        className="switcher__label"
        onClick={() => props.setPlanType("basic")}
      >
        Basic
      </label>

      <input
        type="radio"
        name="planType"
        value="premium"
        className="switcher__input switcher__input--premium"
        checked={props.planType === "premium" ? true : false}
      />
      <label
        htmlFor="premium"
        className="switcher__label"
        onClick={() => props.setPlanType("premium")}
      >
        Premium
      </label>
      <span className="switcher__toggle"></span>
    </div>
  )
}
