import React from "react"
import { Player, PlayerEvent } from "@lottiefiles/react-lottie-player"
import spinnerLottieJson from "@/assets/lottie/verification-spinner.json"

interface SpinnerProps {
  onEvent?: (evt: PlayerEvent) => void
  autoplay?: boolean
  loop?: boolean
  controls?: boolean
  style?: React.CSSProperties
}

const Spinner: React.FC<SpinnerProps> = ({
  onEvent,
  autoplay = true,
  loop = true,
  controls = false,
  style,
}) => {
  return (
    <Player
      src={spinnerLottieJson}
      onEvent={onEvent}
      autoplay={autoplay}
      loop={loop}
      controls={controls}
      style={style}
    />
  )
}

export default Spinner
