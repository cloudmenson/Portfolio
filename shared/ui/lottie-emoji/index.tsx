"use client";

import Lottie from "lottie-react";

interface ILottieEmoji {
  loop?: boolean;
  className?: string;
  autoplay?: boolean;
  animationData: object;
}

export const LottieEmoji = ({
  className,
  loop = true,
  animationData,
  autoplay = true,
}: ILottieEmoji) => {
  return (
    <Lottie
      loop={loop}
      autoplay={autoplay}
      className={className}
      animationData={animationData}
    />
  );
};
