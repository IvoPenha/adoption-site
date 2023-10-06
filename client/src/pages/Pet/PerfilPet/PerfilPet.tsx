import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { SimpleSlider, warningAlert } from "../../../shared/components";
import {
  BiArrowBack,
  BiEdit,
  BiSolidDog,
  BiSolidMessageAlt,
  BiTrashAlt,
} from "react-icons/bi";
import { useEffect, useState } from "react";
import { deletePet, getPetsById } from "../../../services";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IPetResponse } from "../../../types";
import { useAuth } from "../../../hooks";
import { CommonUsuarioClaims } from "../../../types/CommonUsuario";

const Field: React.FC<{
  title: string;
  value?: string | any;
  isTextarea?: boolean;
  width?: number;
}> = ({ title, value = "", isTextarea = false, width }) => {
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
      {isTextarea ? (
        <Textarea
          readOnly
          value={value}
          width={width ? width : "full"}
          height={150}
        />
      ) : (
        <Input readOnly value={value} />
      )}
    </Flex>
  );
};

export const PetProfile = () => {
  const [pet, setPet] = useState<IPetResponse>();
  const params = useParams<{ id: string }>();

  const { getCurrentAccount } = useAuth();

  const currentAccount = getCurrentAccount<CommonUsuarioClaims>();

  const [isOwner, setIsOwner] = useState(pet?.user.id === currentAccount?.id);

  const navigate = useNavigate();

  useEffect(() => {
    const getPetFromApi = async () => {
      if (params.id) {
        const petResponse = await getPetsById(+params.id);
        if (petResponse.response) {
          setPet(petResponse.response);
          setIsOwner(petResponse.response.user.id === currentAccount?.id);
        }
      }
    };
    getPetFromApi();
  }, []);

  return (
    <Box
      width={"full"}
      height={"full"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      paddingX={{ base: 0, md: 20 }}
    >
      <Box
        pos={"absolute"}
        marginTop={{ lg: -950, base: -880 }}
        left={{ md: 100, base: 5 }}
        cursor={"pointer"}
        _hover={{
          color: "yellow.500",
        }}
        width={{ base: "95%", md: "75%", lg: "80%" }}
        zIndex={2}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <BiArrowBack onClick={() => navigate("/")} fontSize={30} />
        <Box>
          {isOwner && pet && (
            <Flex gap={6}>
              <Link to={"/pet/editar/" + pet?.id}>
                <IconButton
                  icon={<BiEdit />}
                  aria-label="s"
                  fontSize={30}
                  zIndex={3}
                  color={"yellow.500"}
                  bg={"gray.50"}
                />
              </Link>
              <IconButton
                icon={<BiTrashAlt />}
                aria-label="s"
                fontSize={30}
                zIndex={3}
                color={"red.500"}
                bg={"gray.50"}
                onClick={() => {
                  warningAlert(
                    "Quer mesmo tirar o bichinho da adoção?",
                    "Não é possível desfazer essa ação",
                    () => {
                      deletePet(pet.id).then(() => navigate("/"));
                    }
                  );
                }}
              />
            </Flex>
          )}
        </Box>
      </Box>
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
            {pet?.idade && `- ${pet.idade} meses`}
          </Text>
        </Box>
        <Flex
          width={"full"}
          gap={{ base: 4, md: 32 }}
          flexDirection={{ base: "column", lg: "row" }}
        >
          <Box
            width={{ base: "full", lg: "25%" }}
            display={{ base: "flex", lg: "block" }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {!pet || pet.fotos.length === 0 ? (
              <Image
                rounded={"lg"}
                mt={-12}
                pos={"relative"}
                height={{ base: 300, lg: "container.sm" }}
                src={`/dogprofile.jpg`}
              />
            ) : (
              <SimpleSlider>
                {pet.fotos.map((foto, index) => (
                  <Box
                    key={index}
                    rounded={"lg"}
                    mt={-12}
                    pos={"relative"}
                    height={{ base: 300, lg: "container.sm" }}
                    bgImage={`${foto}`}
                    bgSize={{ lg: "contain", base: "revert" }}
                    bgRepeat={"no-repeat"}
                    bgPosition={"center"}
                  />
                ))}
              </SimpleSlider>
            )}
          </Box>

          <Box
            display={"flex"}
            alignItems={"center"}
            width={"full"}
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
                <Field
                  title="Encontro com adotante"
                  value={pet?.descricao}
                  width={220}
                  isTextarea
                />
              </Box>
            </Flex>
            <Box width={"full"}>
              <Field title="sobre" value={pet?.descricao} isTextarea />
            </Box>

            <Flex
              width={"full"}
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
                <Avatar src="/cat-profile.png" />
                <Text
                  fontSize={"sm"}
                  fontFamily={"body"}
                  fontWeight={500}
                  textTransform={"uppercase"}
                  color={"gray.800"}
                  mt={3}
                >
                  {pet?.user.nome}
                </Text>
              </Box>

              <Button
                bg={"yellow.600"}
                textColor={"white"}
                _hover={{ bg: "yellow.500" }}
                display={"flex"}
                gap={2}
                alignItems={"center"}
                justifyContent={"center"}
                onClick={() =>
                  window.open(
                    `https://wa.me/+55${pet?.user.telefone}/?text=Olá, vi ${pet?.nome} no Adopt.me e gostaria de adotar!`
                  )
                }
              >
                <BiSolidMessageAlt /> Quero adotar {pet?.nome}
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
