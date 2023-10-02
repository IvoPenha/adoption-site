import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { signUp } from '../../services/';

export const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>();

  const form = watch();

  const onSubmit: SubmitHandler<any> = (data) => signUp(data);
  return (
    <>
      <Box
        bg={useColorModeValue("#827397", "gray.900")}
        backgroundImage={"url('/FULLSCREEN.png')"}
        backgroundSize={"contain"}
        backgroundPosition={"center"}
        backgroundRepeat={"no-repeat"}
        minH="100vh"
        py="12"
        px={{ sm: "6", lg: "8" }}
      >
        <Box maxW={{ sm: "md" }} mx={{ sm: "auto" }} w={{ sm: "full" }}>
          <Box
            bg={useColorModeValue("white", "gray.700")}
            py="8"
            px={{ base: "4", md: "10" }}
            shadow="base"
            rounded={{ sm: "lg" }}
          >
            <Box maxW="md" mx="auto">
              <Heading textAlign="center" size="xl" fontWeight="extrabold">
                Cadastre-se
              </Heading>
              <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
                <span>ou </span>

                <Link
                  style={{ color: "#8d7b17", textDecoration: "underline" }}
                  to="/login"
                >
                  Entre na sua conta
                </Link>
              </Text>
            </Box>
            <Box maxW="md" mx="auto">
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
                    <FormLabel>nome</FormLabel>
                    <Input
                      autoComplete="nome"
                      {...(register("nome", { required: true }))}
                    />
                    {errors.nome && <Text
                      color="red.500"
                      fontSize="xs"
                    >Insira um email válido</Text>}
                  </FormControl>
                  <FormControl id="email">
                    <FormLabel>Email</FormLabel>
                    <Input
                      autoComplete="email"
                      {...(register("email", { required: true, pattern: /^\S+@\S+$/i }))}
                    />
                    {errors.email && <Text
                      color="red.500"
                      fontSize="xs"
                    >Insira um email válido</Text>}
                  </FormControl>
                  <FormControl id="senha">
                    <FormLabel>Senha</FormLabel>
                    <Input
                      type="password"
                      autoComplete="senha"
                      {...(register("senha", { required: true }))}
                    />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Confirme sua senha</FormLabel>
                    <Input
                      type="password"
                      autoComplete="password"
                      {...(register("confirmPassword", { required: true, validate: (value) => value === form.senha }))}
                    />
                    {errors.confirmPassword && (<Text
                      color="red.500"
                      fontSize="xs"
                    >As senhas não coincidem</Text>
                    )}
                  </FormControl>
                  <FormControl id="nascimento">
                    <FormLabel>Data de nascimento</FormLabel>
                    <Input
                      type="date"
                      autoComplete="nascimento"
                      {...register("nascimento", { required: true, validate: (value) => new Date(value) < new Date() })}
                    />
                    {errors.nascimento && <Text
                      color="red.500"
                      fontSize="xs"
                    >Insira uma data válida</Text>}

                  </FormControl>
                  {/* <FormControl id="cpf">
                    <FormLabel>CPF</FormLabel>
                    <Input type="text" autoComplete="cpf"
                      {...register("cpf")} />

                  </FormControl> */}
                  <FormControl id="telefone">
                    <FormLabel>Telefone</FormLabel>
                    <Input
                      {...(register("telefone", { required: true, validate: (value) => value.length >= 10 }))}
                      type="text"
                      autoComplete="telefone"
                    />
                    {errors.telefone && <Text
                      color="red.500"
                      fontSize="xs"
                    >Insira um telefone válido</Text>}

                  </FormControl>
                  {/* <FormControl id="cep">
                    <FormLabel>CEP</FormLabel>
                    <Input type="text" autoComplete="cep"
                      {...register("cep")} />
                  </FormControl> */}

                  <Stack spacing="10">
                    <Button
                      type="submit"
                      bg={"yellow.600"}
                      color={"white"}
                      _hover={{
                        bg: "yellow.700",
                      }}
                    >
                      Cadastrar
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
