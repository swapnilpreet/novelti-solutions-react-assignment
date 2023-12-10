import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Select,
  useToast,
} from "@chakra-ui/react";
import code from "./mobilecode.json";
import { GetCountry, GetState } from "../ApiCalls/Api";
import Multiselect from "multiselect-react-dropdown";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { DeleteUser, EditUser, GetUsersByID } from "../ApiCalls/RegisterUser";
import { GetAllUsers } from "../redux/User";
import style from "../Pages/home.module.css";




const UserList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const data = useSelector((state) => state?.users?.data?.data);
  const dispatch = useDispatch();
  const [inputValidate, setinputValidate] = useState(false);
  const [ValidateLastName, setValidateLastName] = useState(false);
  const [validAddress1, setvalidAddress1] = useState(false);
  const [showValidEmail, setshowValidEmail] = useState(true);
  const [CountryData, setCountryData] = useState([]);
  const [StateData, setStateData] = useState([]);
  const [selectedCountry, setselectedCountry] = useState();
  const [selectedState, setselectedState] = useState();
  const [FirstName, setFirstName] = useState();
  const [LastName, setLastName] = useState();
  const [Email, setEmail] = useState();
  const [CountryCode, setCountryCode] = useState();
  const [Mobile, setMobile] = useState();
  const [Adress1, setAdress1] = useState();
  const [Adress2, setAdress2] = useState();
  const [ZipCode, setZipCode] = useState();
  const [id, setid] = useState();
  const [UpdateUser, setUpdateUser] = useState(false);

  const handleChange = (event) => {
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (event.target.name === "FirstName") {
      if (event.target.value === " " || event.target.value.length <= 4) {
        setinputValidate(true);
        setFirstName(event.target.value);
      } else {
        setinputValidate(false);
        setFirstName(event.target.value);
      }
    }

    if (event.target.name === "LastName") {
      if (event.target.value === " " || event.target.value.length <= 4) {
        setValidateLastName(true);
        setLastName(event.target.value);
      } else {
        setValidateLastName(false);
        setLastName(event.target.value);
      }
    }

    if (event.target.name === "Email") {
      if (event.target?.value && event.target.value.match(isValidEmail)) {
        setshowValidEmail(true);
        setEmail(event.target.value);
      } else {
        setEmail(event.target.value);
        setshowValidEmail(false);
      }
    }

    if (event.target.name === "Adress1") {
      if (event.target?.value !== "") {
        setvalidAddress1(false);
        setAdress1(event.target.value);
      } else {
        setvalidAddress1(true);
        setAdress1(event.target.value);
      }
    }

    if (event.target.name === "Adress2") {
      setAdress2(event.target.value);
    }

    if (event.target.name === "Mobile") {
      setMobile(event.target.value);
    }
  };

  const registerUserHandle = async () => {
    const payload = {
      id,
      FirstName,
      LastName,
      Email,
      CountryCode,
      Mobile,
      Adress1,
      Adress2,
      ZipCode,
      selectedState,
      selectedCountry,
    };
    try {
      const response = await EditUser(payload);
      if (response) {
        toast({
          title: "User Edit successfully.",
          description: "We've created your account for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        dispatch(GetAllUsers());
        if (UpdateUser) {
          setUpdateUser(false);
        }
      } else {
        throw new Error("error occurred in Edit user");
      }
    } catch (error) {
      toast({
        title: "Error Occured Edit user",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getuser = async (userId) => {
    try {
      setid(userId);
      const response = await GetUsersByID(userId);
      if (response) {
        setFirstName(response.data.FirstName);
        setLastName(response.data.LastName);
        setEmail(response.data.Email);
        setCountryCode(response.data.CountryCode);
        setMobile(response.data.Mobile);
        setAdress1(response.data.Adress1);
        setAdress2(response.data.Adress2);
        setZipCode(response.data.ZipCode);
        setselectedCountry(response.data.Country);
        setselectedState(response.data.State);
      } else {
        throw new Error("error occurred in register user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await DeleteUser(id);
      if (response) {
        toast({
          title: "User Delete successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      dispatch(GetAllUsers());
    } catch (error) {
      toast({
        title: "Error Occured Delete user",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSelectCountry = (selectedcountry) => {
    setselectedCountry([...selectedcountry]);
  };

  const handleSelectState = (selectedstate) => {
    setselectedState([...selectedstate]);
  };

  const GetallUser = async () => {
    dispatch(GetAllUsers());
  };

  const handleCLick = async (event) => {
    let last = event[event?.length - 1];
    try {
      const response = await GetState(last);
      if (response) {
        setStateData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log("error on GetCountry", error);
    }
  };

  useEffect(() => {
    const onFinished = async () => {
      try {
        const response = await GetCountry();
        if (response) {
          setCountryData(response);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        console.log("error on GetCountry", error);
      }
    };
    onFinished();
    // GetallUser();
  }, []);

  useEffect(() => {
    GetallUser();
  }, []);

  return (
    <Box>
      <Heading>List of Users</Heading>
      <TableContainer>
        <Table variant="striped" colorScheme="blackAlpha" size="sm">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Email</Th>
              <Th isNumeric>Mobile</Th>
              <Th>Adress</Th>
              <Th>Country</Th>
              <Th>State</Th>
              <Th>Zipcode</Th>
              <Th>Edit</Th>
              <Th>Update</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item) => (
              <Tr>
                <Td>{item.FirstName}</Td>
                <Td>{item.LastName}</Td>
                <Td>{item.Email}</Td>
                <Td isNumeric>
                  {item.CountryCode} {item.Mobile}
                </Td>
                <Td maxW={"300px"} overflow={"auto"}>
                  {item.Adress1} {item.Adress2}
                </Td>
                <Td>{item.Country.join(" ")}</Td>
                <Td>{item.State.join(" ")}</Td>
                <Td>{item.ZipCode}</Td>
                <Td>
                  <Button
                    colorScheme="green"
                    variant="outline"
                    onClick={() => {
                      getuser(item._id);
                      onOpen();
                    }}
                  >
                    Edit
                  </Button>
                </Td>
                <Td>
                  <Button
                    colorScheme="yellow"
                    variant="outline"
                    onClick={() => {
                      getuser(item._id);
                      onOpen();
                      setUpdateUser(true);
                    }}
                  >
                    Update
                  </Button>
                </Td>
                <Td>
                  <Button
                    colorScheme="red"
                    variant="outline"
                    onClick={() => handleDeleteUser(item._id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent alignItems={"center"} className={style.navbar} maxWidth={'600px'}>
            <ModalHeader fontSize={"30px"} fontWeight={500}  >
              {UpdateUser ? "Update User" : "Edit User"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box padding={"10px"} bg={"white"} borderRadius={"10px"}>
                <FormControl color={'grey'}>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    name="FirstName"
                    value={FirstName}
                    onChange={handleChange}
                    required
                    minLength={5}
                  />
                  {inputValidate && (
                    <FormHelperText color={'red'}>
                      Dont have empty or have at least 5 character
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel color={'grey'}>Last Name</FormLabel>
                  <Input
                    type="text"
                    name="LastName"
                    value={LastName}
                    minLength={5}
                    required
                    onChange={handleChange}
                  />
                  {ValidateLastName && (
                    <FormHelperText color={'red'}>
                      Dont have empty or have at least 5 character
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel color={'grey'}>Email</FormLabel>
                  <Input
                    type="email"
                    name="Email"
                    value={Email}
                    required
                    onChange={handleChange}
                  />
                  {!showValidEmail && (
                    <FormHelperText color={'red'}>Type a Valid Email</FormHelperText>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel color={'grey'}>Mobile</FormLabel>
                  <Flex>
                    <Select
                      w={"30%"}
                      selectedValues={CountryCode}
                      name="CountryCode"
                      value={CountryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                    >
                      {code.countries.map((cod) => (
                        <option key={cod.name} value={cod.code}>
                          {cod.code}
                          {"  "}
                          {cod.name}
                        </option>
                      ))}
                    </Select>
                    <Input
                      type="tel"
                      name="Mobile"
                      value={Mobile}
                      required
                      maxLength={10}
                      onChange={handleChange}
                    />
                  </Flex>
                  {!CountryCode && (
                    <FormHelperText color={'red'}>select Country Code</FormHelperText>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel color={'grey'}>Address1</FormLabel>
                  <Input
                    type="text"
                    name="Adress1"
                    value={Adress1}
                    required
                    onChange={handleChange}
                  />
                  {validAddress1 && (
                    <FormHelperText color={'red'}>Mernditary to fill</FormHelperText>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel color={'grey'}>Adress2</FormLabel>
                  <Input
                    type="text"
                    name="Adress2"
                    value={Adress2}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel color={'grey'}>Country</FormLabel>
                  <Multiselect
                    isObject={false}
                    selectedValues={selectedCountry}
                    options={CountryData?.map((item) => {
                      return item.country;
                    })}
                    onSelect={(event) => {
                      handleSelectCountry(event);
                      handleCLick(event);
                    }}
                    onRemove={(event) => handleSelectCountry(event)}
                  />

                  <FormLabel color={'grey'}>State</FormLabel>
                  <Multiselect
                    isObject={false}
                    selectedValues={selectedState}
                    options={StateData?.map((item) => {
                      return item.state_name;
                    })}
                    onSelect={(event) => handleSelectState(event)}
                    onRemove={(event) => handleSelectState(event)}
                  />
                </FormControl>

                <FormLabel color={'grey'}>Zipcode</FormLabel>
                <Input
                  type="number"
                  name="ZipCode"
                  value={ZipCode}
                  required
                  onChange={(e) => setZipCode(e.target.value)}
                />
                <Flex justifyContent={"center"} marginTop={"20px"}>
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    isDisabled={
                      !selectedState ||
                      !selectedCountry ||
                      !showValidEmail ||
                      validAddress1 ||
                      ValidateLastName ||
                      inputValidate ||
                      !ZipCode ||
                      !CountryCode
                    }
                    onClick={() => {
                      registerUserHandle();
                      onClose();
                    }}
                  >
                    {UpdateUser ? "Update User" : "Edit User"}
                  </Button>
                </Flex>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Close Window
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </TableContainer>
    </Box>
  );
};

export default UserList;
