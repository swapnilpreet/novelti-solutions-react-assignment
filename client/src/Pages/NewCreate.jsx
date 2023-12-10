import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import code from "./mobilecode.json";
import { GetCountry, GetState } from "../ApiCalls/Api";
import { RegisterUser } from "../ApiCalls/RegisterUser";
import Multiselect from "multiselect-react-dropdown";
import style from './home.module.css'


const NewCreate = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [inputValidate, setinputValidate] = useState(false);
  const [ValidateLastName, setValidateLastName] = useState(false);
  const [validAddress1, setvalidAddress1] = useState(false);
  const [showValidEmail, setshowValidEmail] = useState(false);
  const [CountryData, setCountryData] = useState([]);
  const [StateData, setStateData] = useState([]);
  const [selectedCountry, setselectedCountry] = useState();
  const [selectedState, setselectedState] = useState();

  const [customerSignUp, setCustomerSignUp] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    CountryCode: "",
    Mobile: "",
    Adress1: "",
    Adress2: "",
    ZipCode: "",
  });

  const handleChange = (event) => {
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (event.target.name === "FirstName") {
      if (event.target.value === " " || event.target.value.length <= 4) {
        setinputValidate(false);
      } else {
        setinputValidate(true);
      }
    }

    if (event.target.name === "LastName") {
      if (event.target.value === " " || event.target.value.length <= 4) {
        setValidateLastName(false);
      } else {
        setValidateLastName(true);
      }
    }

    if (event.target.name === "Email") {
      if (event.target?.value && event.target.value.match(isValidEmail)) {
        setshowValidEmail(true);
      } else {
        setshowValidEmail(false);
      }
    }

    if (event.target.name === "Adress1") {
      if (event.target?.value !== "") {
        setvalidAddress1(true);
      } else {
        setvalidAddress1(false);
      }
    }

    setCustomerSignUp({
      ...customerSignUp,
      [event.target.name]: event.target.value,
    });
  };

  const registerUserHandle = async () => {
    try {
      const response = await RegisterUser({
        payload: { customerSignUp, selectedCountry, selectedState },
      });
      if (response) {
        console.log(response);
        toast({
          title: "User created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/listuser");
      } else {
        throw new Error("error occurred in register user");
      }
    } catch (error) {
      toast({
        title: "Error Occured Creating User",
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
  }, []);

  return (
    <Box className={style.maintainers}>
    <Flex className={style.inputbox} w={["100%","80%","60%","30%"]}   margin={'auto'} marginTop={"50px"}>
      <Box  >
        <FormControl>
          <FormLabel color={'grey'}>First Name</FormLabel>
          <Input
            type="text"
            name="FirstName"
            value={customerSignUp.FirstName}
            onChange={handleChange}
            required
            minLength={5}
            w={"95%"}
          />
          {!inputValidate && (
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
            value={customerSignUp.LastName}
            minLength={5}
            required
            onChange={handleChange}
            w={"95%"}
          />
          {!ValidateLastName && (
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
            value={customerSignUp.Email}
            required
            onChange={handleChange}
            w={"95%"}
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
              placeholder="Select option"
              name="CountryCode"
              value={customerSignUp.CountryCode}
              onChange={handleChange}
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
              value={customerSignUp.Mobile}
              required
              maxLength={10}
              onChange={handleChange}

            />
          </Flex>
          {!customerSignUp.CountryCode && (
            <FormHelperText color={'red'}>select Country Code</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel color={'grey'}>Address1</FormLabel>
          <Input
            type="text"
            name="Adress1"
            value={customerSignUp.Adress1}
            required
            onChange={handleChange}
            w={"95%"}
          />
          {!validAddress1 && (
            <FormHelperText color={'red'}>Mernditary to fill</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel color={'grey'}>Adress2</FormLabel>
          <Input
            type="text"
            name="Adress2"
            value={customerSignUp.Adress2}
            onChange={handleChange}
            w={"95%"}
          />
        </FormControl>

        <FormControl>
          <FormLabel color={'grey'}>Country</FormLabel>

          <Multiselect
            isObject={false}
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
            options={StateData?.map((item) => {
              return item.state_name;
            })}
            onSelect={(event) => {
              handleSelectState(event);
            }}
            onRemove={(event) => handleSelectState(event)}
          />
        </FormControl>

        <FormLabel color={'grey'}>Zipcode</FormLabel>
        <Input
          type="number"
          name="ZipCode"
          value={customerSignUp.ZipCode}
          required
          onChange={handleChange}
          w={"95%"}
        />
        <Button
        marginTop={"20px"}
        colorScheme='teal' variant='outline'
          isDisabled={
            !inputValidate ||
            !ValidateLastName ||
            !showValidEmail ||
            !validAddress1 ||
            !selectedCountry ||
            !selectedState ||
            !customerSignUp.ZipCode ||
            !customerSignUp.CountryCode
          }
          onClick={registerUserHandle}
        >
          Register User
        </Button>
      </Box>
    </Flex>
    </Box>
  );
};

export default NewCreate;
