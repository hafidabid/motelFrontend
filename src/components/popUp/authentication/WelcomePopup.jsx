/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { API } from "../../../backend";
import {Web3AuthContext} from "../../Web3/Web3AuthProvider.jsx";

const WelcomePopup = ({
                        setDefaultPopup,
                        setShowLoginPopup,
                        setShowCreateUserPopup,
                        setLoginEmail,
                        setNonce
                      }) => {
  const { handleSubmit, register, reset } = useForm();
  const { account, isLoading, error, connectWallet, signMessage } = useContext(Web3AuthContext);
  const [inputFocused, setInputFocused] = useState(false);
  const handleMetamaskLogin = async () => {
    try {
      await connectWallet();

      if(account){
          const response = await axios.post(
              `${API}auth/check_eth`,
              { ethAddress: account },
              { headers: { "Content-Type": "application/json" } }
          );

          const responseData = response?.data;
          if (responseData?.success === 1) {
              setDefaultPopup(false);
              setShowLoginPopup(true);
              setNonce(responseData?.nonce);
          } else if (responseData?.success === 0) {
              setDefaultPopup(false);
              setShowCreateUserPopup(true);
              setNonce(responseData?.nonce);
          }
      }else{
          alert("account not available")
      }


    } catch (error) {
      console.error(error);
    }
  };

  return (
      <div className="flex flex-col gap-4">
        <div className="px-8 pt-4">
          <h2 className="font-medium text-[22px] text-[#222222]">
            Welcome to Motel
          </h2>
        </div>
        <div className="flex flex-col gap-4 px-8 pb-7">
          <div
              className="w-full flex flex-row items-center border border-[#222222] rounded-lg py-[10px] bg-[#ffffff] hover:bg-[#f7f7f7] transition-colors cursor-pointer"
              onClick={handleMetamaskLogin}
          >
            <p className="text-sm mx-auto font-medium text-[#222222]">
              Login with MetaMask
            </p>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
  );
};

export default WelcomePopup;

