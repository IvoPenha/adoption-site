import { useRef } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import { Box, Button, Text } from "@chakra-ui/react";
interface props {
  children: React.ReactNode[];
  className?: string;
  title: string;
  autodisplay?: boolean;
  isCommingSoon?: boolean;
  toShow?: number;
}
export const CarouselContainer = ({
  children,
  className,
  title,
  autodisplay,
}: props) => {
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: autodisplay && true,
    arrows: false,
    autoplaySpeed: 200,
    slidesToShow: 4.5,
    slidesToScroll: 1.55,
    initialSlide: 0.5,
    draggable: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1.75,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4.5,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5.5,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const sliderRef = useRef<any>();

  const handlePrevious = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        width={"100%"}
        height={"100%"}
        gap={8}
        borderRadius={8}
        padding={4}
        boxShadow={"md"}
      >
        <Text fontSize={"xl"} fontWeight={"bold"} color={"blackAlpha.700"}>
          {title}
        </Text>
        <Button onClick={handlePrevious} bg={"yellow.600"} textColor={"white"}
          _hover={{ bg: 'yellow.500' }}
        >
          {" "}
          {"<"}{" "}
        </Button>
        <Button onClick={handleNext} bg={"yellow.600"} textColor={"white"}
          _hover={{ bg: 'yellow.500' }}>
          {" "}
          {">"}{" "}
        </Button>
      </Box>
      <Slider {...settings} className={className} ref={sliderRef}>
        {children}
      </Slider>
    </Box>
  );
};
