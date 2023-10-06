import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
  Text,
  Textarea,
  Image,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import React, { ChangeEvent, useEffect, useState } from "react";
import { createPet, getPetsById, updatePet } from "../../../services";
import { decodeToken } from "../../../core/cryptography/jwt";
import { CommonUsuarioClaims } from "../../../types/CommonUsuario";
import { removerPropriedade } from "../../../utils";
import { BiPlus } from "react-icons/bi";
import { successAlert } from "../../../shared/components";
import { useNavigate, useParams } from "react-router-dom";

const FormSelect = React.forwardRef<
  HTMLSelectElement,
  { propsOptions: { value: string; name: string }[] } & ReturnType<
    UseFormRegister<any>
  >
>(({ onChange, onBlur, name, propsOptions }, ref) => (
  <>
    <Select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      {propsOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </Select>
  </>
));

interface Image {
  file: File;
  preview: string;
  base64: string;
}

export const CriarPet = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<any>();

  const decodedToken = decodeToken<CommonUsuarioClaims>(
    localStorage.getItem("userToken")!
  );

  const { id: userId } = decodedToken;

  const { id } = useParams();

  useEffect(() => {
    async function getPet() {
      if (id) {
        const pet = await getPetsById(+id);
        if (pet.response) {
          setImages(
            pet.response.fotos.map((foto: string) => ({
              file: new File([], ""),
              preview: "",
              base64: foto,
            }))
          );
          setValue("nome", pet.response.nome);
          setValue("porte", pet.response.porte);
          setValue("sexo", pet.response.sexo);
          setValue("especie", pet.response.especie);
          setValue("raca", pet.response.raca);
          setValue("descricao", pet.response.descricao);
        }
      }
    }
    getPet();
  }, []);

  const [images, setImages] = useState<Image[]>([]);

  const navigate = useNavigate();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target?.files;
    if (files) {
      const newImages: Promise<Image>[] = Array.from(files).map(
        async (file) => ({
          file,
          preview: URL.createObjectURL(file),
          base64: await convertToBase64(file),
        })
      );
      Promise.all(newImages).then((imagesWithBase64) => {
        setImages([...images, ...imagesWithBase64]);
      });
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result as string);
        } else {
          reject(new Error("Failed to read the file."));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (id) {
      const pet = await updatePet(+id, data);
      if (pet.response) {
        successAlert("Sucesso", "Pet atualizado com sucesso", () =>
          navigate("/pet/" + pet.response.id)
        );
      }
    } else {
      data.userId = userId;
      removerPropriedade(data, "disponibilidade");
      const fotos = images.map((image) => image.base64);
      data.fotos = fotos;
      const pet = await createPet(data);
      if (pet.response) {
        successAlert("Sucesso", "Pet cadastrado com sucesso", () =>
          navigate("/pet/" + pet.response.id)
        );
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          spacing="6"
          py="1"
          px={{ base: "4", md: "10" }}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <FormControl id="nome">
            <FormLabel>Nome do Bichinho</FormLabel>
            <Input
              autoComplete="nome"
              {...register("nome", { required: true })}
            />
            {errors.nome && (
              <Text color="red.500" fontSize="xs">
                Insira um nome válido
              </Text>
            )}
          </FormControl>
          <Flex
            flexDirection={{ base: "column", lg: "row" }}
            gap={{ base: "6", lg: 24 }}
          >
            <FormControl id="tamanho">
              <FormLabel>Tamanho</FormLabel>
              <FormSelect
                propsOptions={[
                  { value: "pequeno", name: "Pequeno" },
                  { value: "medio", name: "Médio" },
                  { value: "grande", name: "Grande" },
                  { value: "desconhecido", name: "Não sei" },
                ]}
                {...register("porte")}
              />
            </FormControl>
            <FormControl id="sexo">
              <FormLabel>Sexo</FormLabel>
              <FormSelect
                propsOptions={[
                  { value: "m", name: "Macho" },
                  { value: "f", name: "Fêmea" },
                  { value: "", name: "Não sei" },
                ]}
                {...register("sexo")}
              />
            </FormControl>
          </Flex>
          <Flex
            flexDirection={{ base: "column", lg: "row" }}
            gap={{ base: "6", lg: 24 }}
          >
            <FormControl id="especie">
              <FormLabel>Especie</FormLabel>
              <FormSelect
                propsOptions={[
                  { value: "Cachorro", name: "Cachorro" },
                  { value: "Gato", name: "Gato" },
                ]}
                {...register("especie")}
              />
            </FormControl>
            <FormControl id="raca">
              <FormLabel>Raça</FormLabel>
              <Input {...register("raca")} type="text" />
              {errors.telefone && (
                <Text color="red.500" fontSize="xs">
                  Insira um telefone válido
                </Text>
              )}
            </FormControl>
          </Flex>
          <FormControl id="sobre">
            <FormLabel>Sobre o bichinho</FormLabel>
            <Textarea {...register("descricao")} />
          </FormControl>
          {/* <FormControl id="disponibilidade">
            <FormLabel>Disponibilidade para encontrar contratante</FormLabel>
            <Textarea {...register("disponibilidade")} />
          </FormControl> */}

          <Flex alignItems={"center"} gap={12}>
            <FormControl id="foto" maxWidth={300}>
              <FormLabel>Foto</FormLabel>
              <Box
                border={"2px"}
                borderRadius={5}
                height={"130px"}
                width={"full"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                cursor={"pointer"}
                flexDirection={"column"}
                fontSize={"5xl"}
                _hover={{
                  bg: "yellow.500",
                  borderColor: "gray.400",
                  color: "white",
                }}
                transition={"all 0.2s ease-in-out"}
              >
                <BiPlus />
                <Text fontSize={"md"}>Adicionar Imagem</Text>
                <Input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  cursor={"pointer"}
                  display={"flex"}
                  position={"absolute"}
                  top={"0"}
                  left={"0"}
                  opacity={"0"}
                  width={"full"}
                  height={"full"}
                />
              </Box>
            </FormControl>
            {images.map((image, index) => (
              <Box
                key={index}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
                width={"fit-content"}
              >
                <Image
                  src={image.preview !== "" ? image.preview : image.base64}
                  alt={`Imagem ${index}`}
                  width={200}
                  height={200}
                />
                <Button onClick={() => handleRemoveImage(index)}>
                  Remover
                </Button>
              </Box>
            ))}
          </Flex>
          <Stack spacing="10">
            <Button
              type="submit"
              bg={"yellow.600"}
              color={"white"}
              _hover={{
                bg: "yellow.700",
              }}
            >
              Achar um lar pro bichinho
            </Button>
          </Stack>
        </Stack>
      </form>
    </>
  );
};
