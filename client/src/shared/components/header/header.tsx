import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  AiOutlineCloseCircle as CloseIcon,
  AiOutlineMenuFold as HamburgerIcon,
} from "react-icons/ai";
import { GiSittingDog } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import { BiDoorOpen } from 'react-icons/bi';
import { useAuth } from '../../../hooks';

interface Props {
  children: React.ReactNode;
}

const Links = ["Conheça o Criador"];

const NavLink = (props: Props) => {
  const { children } = props;
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      target='_blank'
      href={"https://github.com/IvoPenha"}
    >
      {children}
    </Box>
  );
};

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { removeAccessToken, accessToken } = useAuth();
  const navigate = useNavigate();
  const navigateHome = () => navigate('/');
  const navigateLogin = () => navigate('/login');
  const navigateSignUp = () => navigate('/cadastro');
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"} zIndex={3}>
          <IconButton
            fontSize={25}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none", base: 'flex' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"} >
            <Box fontSize={25} display={"flex"} alignItems={"center"} gap={2}
              _hover={{ cursor: 'pointer' }}
              onClick={navigateHome}
            >
              {" "}
              <Box textColor={"peru"}>
                {" "}
                <GiSittingDog />
              </Box>{" "}
              Adopt.me
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
              zIndex={10}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {accessToken !== '' && accessToken !== undefined ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                </MenuButton>
                <MenuList>
                  <Link to="/colocar-para-adocao">
                    <MenuItem>Pôr para adoção</MenuItem>
                  </Link>
                  <MenuItem display={'flex'} justifyContent={'space-between'}
                    onClick={removeAccessToken}
                  >Sair
                    <Text
                      fontSize={'25px'}
                    >
                      <BiDoorOpen />
                    </Text>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem>Ver Perfil</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Stack
                flex={{ base: 1, md: 0 }}
                justify={"flex-end"}
                direction={"row"}
                spacing={6}
              >
                <Button
                  as={"a"}
                  fontSize={"sm"}
                  fontWeight={400}
                  variant={"link"}
                  cursor={'pointer'}
                  onClick={navigateLogin}
                >
                  Sign In
                </Button>
                <Button
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"yellow.600"}
                  _hover={{
                    bg: "yellow.700",
                  }}
                  onClick={navigateSignUp}
                >
                  Sign Up
                </Button>
              </Stack>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
