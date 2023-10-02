import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { PiGoogleLogoDuotone } from "react-icons/pi";
import { auth, googleProvider } from "../../firebase-settings";
import { signInWithPopup } from "firebase/auth";
import { logar } from "../../services/login";
import { Cache, Cryptography } from "../../core";
import { useAuth } from "../../hooks";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from 'react-hook-form';
import { IAuthRequest } from '../../types';
import { signIn } from '../../services/';

const LoginPage = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IAuthRequest>();

  const form = watch();

  const onSubmit: SubmitHandler<IAuthRequest> = async (data: any) => {
    try {
      const response = await signIn(data)
      if (response.response.accessToken) {
        saveAccessToken(response.response.accessToken)
        navigate('/')
      }
    }
    catch (err) {
      window.alert(err)
    }

  };

  const { saveAccessToken } = useAuth();
  const navigate = useNavigate();
  // const signInWithGoogle = async () => {
  //   try {
  //     const response = (await signInWithPopup(auth, googleProvider)) as any;
  //     if (response.user) {
  //       const apiLogarResponse = await logar(
  //         response._tokenResponse.oauthAccessToken
  //       );
  //       apiLogarResponse.expires_in = new Date().getTime() + 3600000;
  //       const userToken = Cryptography.encodeToken(apiLogarResponse);
  //       saveAccessToken(userToken);
  //       navigate("/");
  //       Cache.set({
  //         key: "token",
  //         value: apiLogarResponse.token,
  //       });
  //       console.log(response.user.stsTokenManager.refreshToken);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <Box
      bg={useColorModeValue("#827397", "gray.900")}
      backgroundImage={"url('/FULLSCREEN.png')"}
      backgroundSize={'contain'}
      backgroundPosition={'center'}
      backgroundRepeat={'no-repeat'}
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
              Entre na sua conta
            </Heading>
            <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
              <span>Não tem conta? </span>
              <Link
                style={{ color: "#8d7b17", textDecoration: "underline" }}
                to="/cadastro"
              >
                cadastre-se
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
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input type="email" autoComplete="email"
                    {...register("email", { required: true })}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Senha</FormLabel>
                  <Input
                    type="password"
                    autoComplete="password"
                    {...register("senha", { required: true })}
                  />
                </FormControl>

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
                  {/* <Button onClick={() => signInWithGoogle()}>
                    {" "}
                    <PiGoogleLogoDuotone /> Login Com Google
                  </Button> */}

                </Stack>
              </Stack>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
