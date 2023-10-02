import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { SimpleSlider } from "../../../shared/components";
import { BiArrowBack, BiSolidDog, BiSolidMessageAlt } from "react-icons/bi";
import { useEffect, useState } from 'react';
import { getPetsById } from '../../../services';
import { useParams } from 'react-router-dom';
import { IPetResponse } from '../../../types';

const Field: React.FC<{ title: string; value?: string | any, isTextarea?: boolean, width?: number }> = ({
  title,
  value = '',
  isTextarea = false,
  width
}) => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      <Text
        fontSize={"sm"}
        fontFamily={"body"}
        fontWeight={500}
        textTransform={"uppercase"}
        color={"gray.800"}
        mt={3}
      >
        {title}
      </Text>
      {
        isTextarea ? (
          <Textarea readOnly value={value} width={width ? width : 'full'} height={150} />
        ) : (
          <Input readOnly value={value} />
        )
      }
    </Flex>
  );
};

export const PetProfile = () => {

  const [pet, setPet] = useState<IPetResponse>()
  const params = useParams<{ id: string }>()

  useEffect(() => {
    const getPetFromApi = async () => {
      if (params.id) {
        const petResponse = await getPetsById(+params.id)
        if (petResponse.response) {
          setPet(petResponse.response)
        }
      }
    }
    getPetFromApi()
  }, [])

  return (
    <Box
      width={"full"}
      height={"full"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      paddingX={{ base: 0, md: 20 }}
    >
      <BiArrowBack
        onClick={() => window.history.back()}
        fontSize={30}
        style={{ position: 'absolute', top: 80, left: 100, cursor: 'pointer', zIndex: 2 }}
      />
      <Box
        width={"full"}
        height={"full"}
        display={"flex"}
        alignItems={"center"}
        gap={16}
        paddingTop={8}
        flexDirection={"column"}
        paddingX={20}
        // bg={useColorModeValue("white", "gray.800")}
        boxShadow={{ base: "none", md: "2xl" }}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          width={"full"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          fontSize={"5xl"}
          gap={3}
        >
          {" "}
          <BiSolidDog />{" "}
          <Text
            fontSize={"2xl"}
            fontFamily={"body"}
            fontWeight={500}
            textTransform={"uppercase"}
            color={"gray.800"}
            mt={2.5}
          >
            {pet?.nome}
          </Text>
          <Text
            fontSize={"sm"}
            fontFamily={"body"}
            display={"flex"}
            fontWeight={500}
            textTransform={"uppercase"}
            color={"gray.500"}
            mt={3}
          >
            - {pet?.idade} meses
          </Text>
        </Box>
        <Flex
          width={'full'}
          gap={{ base: 4, md: 32 }}
          flexDirection={{ base: "column", lg: "row" }}
        >
          <Box
            width={{ base: "full", lg: "25%" }}
            display={{ base: "flex", lg: "block" }}
            alignItems={"center"}
            justifyContent={"center"}
          >

            <SimpleSlider>
              <Image
                rounded={"lg"}
                mt={-12}
                pos={"relative"}
                height={{ base: 300, lg: 'container.sm' }}
                src="/dog-profile.png"
              />
              <Image
                rounded={"lg"}
                mt={-12}
                pos={"relative"}
                height={{ base: 300, lg: 'container.sm' }}
                src="/dog-profile.png"
              />
            </SimpleSlider>
          </Box>

          <Box
            display={"flex"}
            alignItems={"center"}
            width={'full'}
            justifyContent={{ base: "center", lg: "space-between" }}
            flexDirection={"column"}
          >
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              width={"full"}
              gap={{ base: 4, md: 16 }}
              flexDirection={{ base: "column", md: "row" }}
            >
              <Field title={"Raça"} value={pet?.raca} />

              <Field title={"Sexo"} value={pet?.sexo} />
              <Field title={"idade"} value={pet?.idade} />
            </Flex>
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              width={"full"}
              gap={{ base: 4, md: 16 }}
              flexDirection={{ base: "column", md: "row" }}
            >
              <Field title={"Especie"} value={"Cachorro"} />
              <Field title={"Porte"} value={"Pequeno"} />
              <Box>
                <Field title='Encontro com adotante' value={pet?.descricao} width={220} isTextarea />
              </Box>
            </Flex>
            <Box width={'full'}>
              <Field title='sobre' value={pet?.descricao} isTextarea />
            </Box>

            <Flex
              width={'full'}
              paddingBottom={2}
              gap={{ base: 4, md: 16 }}
              alignItems={"center"}
              justifyContent={"flex-end"}
              flexDirection={{ base: "column", md: "row" }}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
              >
                <Avatar
                  src='/cat-profile.png'
                />
                Julio Andrade
              </Box>

              <Button
                bg={"yellow.600"}
                textColor={"white"}
                _hover={{ bg: "yellow.500" }}
                display={'flex'}
                gap={2}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <BiSolidMessageAlt />{" "}
                Quero adotar Diego
              </Button>

            </Flex>
          </Box>
        </Flex>

      </Box >
    </Box >
  );
};
