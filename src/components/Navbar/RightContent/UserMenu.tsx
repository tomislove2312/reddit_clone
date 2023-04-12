//joined button needs to be fixed after you logout, on tutorial 2:20 and 4:50

import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Icon,
  Flex,
  MenuDivider,
  Box,
  Text,
} from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";

import React from "react";
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";
import { CgLogOut, CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { auth } from "@/src/firebase/clientApp";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "@/src/atoms/authModalAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { communityState } from "@/src/atoms/communitiesAtom";

type UserMenuProps = {};

const UserMenu: React.FC<UserMenuProps> = () => {
  const resetCommunityState = useResetRecoilState(communityState);
  const [authModal, setModalState] = useRecoilState(authModalState);
  const [user] = useAuthState(auth);

  const logout = async () => {
    await signOut(auth);
    // resetCommunityState;
  };

  return (
    <Menu>
      <MenuButton
        cursor="ponter"
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex align="center">
          <Flex align="center">
            {user ? (
              <>
                <Icon
                  fontSize={24}
                  mr={1}
                  color="gray.300"
                  as={FaRedditSquare}
                />
                <Box
                  display={{ base: "none", lg: "flex" }}
                  flexDirection="column"
                  fontSize="8pt"
                  alignItems="flex-start"
                  mr={8}
                >
                  <Text fontWeight={700}>
                    {user?.displayName || user?.email?.split("@")[0]}
                  </Text>
                  <Flex alignItems="center">
                    <Icon as={IoSparkles} color="brand.100" mr={1} />
                    <Text color="gray.400">1 karma</Text>
                  </Flex>
                </Box>
              </>
            ) : (
              <Icon fontSize={24} color="gray.400" mr={1} as={VscAccount} />
            )}
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue", color: "white" }}
            >
              <Flex>
                <Icon fontSize={20} mr={2} as={CgProfile} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue", color: "white" }}
              onClick={logout}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                Logout
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
            {" "}
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue", color: "white" }}
              onClick={() => setModalState({ open: true, view: "login" })}
            >
              <Flex>
                <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                Login /Sign Up
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
