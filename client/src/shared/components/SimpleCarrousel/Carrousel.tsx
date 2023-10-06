import { Box } from "@chakra-ui/react";
import React, { useRef } from "react";
import Slider, { Settings } from "react-slick";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";

export const SimpleSlider = ({ children }: { children: React.ReactNode[] }) => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const sliderRef = useRef<any>();

  const handlePrevious = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      gap={6}
    >
      <Box onClick={handlePrevious} cursor={'pointer'} >
        <GrCaretPrevious />
      </Box>
      <Box width={300} height={'full'}>
        <Slider {...settings} ref={sliderRef}>
          {children}
        </Slider>
      </Box>
      <Box onClick={handleNext} cursor={'pointer'}>
        <GrCaretNext />
      </Box>
    </Box>
  );
};
