import "./WithdrawFunds.css";

import {IoMdMail} from "react-icons/io";
import {FaCheck} from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updatewithdraw } from "../../Components/store/FeaturesSlice";
import { BiMoneyWithdraw } from "react-icons/bi";

const WithdrawFunds = () => {
    const {id} = useParams()
    const [withdrawalWallet, setWithdrawalWallet] = useState()
    const [withdrawalWalleteroo, setWithdrawalWalletEroo] = useState()
    const [withdrawCodesEroo, setWithdrawCodesEroo] = useState()
    const [amount, setAmount] = useState("0.00")
    const [amountError, setAmountError] = useState("")
    const [withdrawCodes, setWithdrawCodes] = useState("")
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [isButtonDisabled2, setButtonDisabled2] = useState(false);
    const [clickMe, setClickMe] = useState(false)
    const dispatch = useDispatch()
    const [addprofit, setAddProfit] = useState()
    const [pay, setpay] = useState(false)

    const userData = useSelector((state) => state.persisitedReducer.user)
    console.log(userData);

    const url = `https://slimnewsitebackend.onrender.com/api/requestwithdrawcode/${id}`
    const urlll = `https://slimnewsitebackend.onrender.com/api/withdraw/${id}`
    const urlprofit = `https://slimnewsitebackend.onrender.com/api/transferprofittoaccount/${id}`
    const urlemail = `https://slimnewsitebackend.onrender.com/api/withdrawalemailsend/${id}`

    let userName = userData?.userName
    let email = userData?.email

    const datas = {walletAddress: withdrawalWallet, amount, coin: "BTC"}

    const datasend = {
        withdrawalWallet, userName, email, amount, dateCreated: new Date().toDateString(),
    }

    const datasa = {amount}

    const sendSignUpEmail = async () => {
         axios.post(urlemail, datasa)
            .then(response => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        };

    // const SandData = () => {
    //     dispatch(updatewithdraw(datasend))
    // }

    const sendWallet = () => {
        if(userData.withdrawCode !== withdrawCodes) {
            setWithdrawCodesEroo("Invalid Code")
        }else if(!withdrawalWallet){
            setWithdrawalWalletEroo("You can not leave this Field Empty")
        }else if (!amount){
            setAmountError("You can not leave this Field Empty")
        }
        else{
            setClickMe(true);
            axios.post(urlll, datas)
            .then(res => {console.log(res.data.message), 
                sendSignUpEmail()
                alert(res.data.message)
                window.location.reload()
            })
            .catch((err)=>{
                setClickMe(false)
                console.log(err)
            })
        }
    }


// const sendWithdrawcode = ()=>{
//          setButtonDisabled(true)
//             axios.post(url)
//                 .then(res=>{
//                 console.log(res)
//             })
//              .catch((err)=>{
//                 setButtonDisabled(false)
//                 console.log(err)
//             })
// }

const addProfitToAccount = ()=>{
         setButtonDisabled2(true)
            axios.post(urlprofit)
                .then(res=>{
                    setpay(true)
                console.log(res.data.message)
                setAddProfit(res.data.message)
            })
             .catch((err)=>{
                setButtonDisabled2(false)
                console.log(err)
                setAddProfit(err.data.message)
                setpay(true)
            })
}


    const handleAmountVal = (e) => {
        const newAmounts = e.target.value;
        setAmount(newAmounts);
        // Validate the email
        if(newAmounts.trim() === '') {
            setAmountError('Amount is required');
        }else {
            setAmountError('');
        }
      };
    const handleWithdrawCodes = (e) => {
        const newAmounts = e.target.value;
        setWithdrawCodes(newAmounts);
        // Validate the email
        if(newAmounts.trim() === '') {
            setWithdrawCodesEroo('WithdrawCodes is required');
        }else {
            setWithdrawCodesEroo('');
        }
      };

      const handlewallt = (e) => {
        const newAmounts = e.target.value;
        setWithdrawalWallet(newAmounts);
        // Validate the email
        if(newAmounts.trim() === '') {
            setWithdrawalWalletEroo('Wallet is required');
        }else {
            setWithdrawalWalletEroo('');
        }
      };


    return (
        <>
            <div className="WithdrawFundsBody">
                <h1 className="WithdrawFundsBodyHeaderText">
                    Withdraw Details
                </h1>
                <div className="WithdrawFundsContent">
                    <div className="WithdrawFundsContentBox">
                        <div className="WithdrawFundsContentBox1">
                            <div className="WithdrawFundsContentBox1Method">
                                <div>Your payment method</div>
                                <p>
                                    BITCOIN PAYMENT{" "}
                                    <span>
                                        <FaCheck />
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="WithdrawFundsContentBox2">
                            <p>Enter amount to withdraw($)</p>
                            <input type="number" placeholder="Enter Amount" onChange={handleAmountVal}/>
                            <p style={{marginTop: "3%", marginLeft: "2%", color: "red", fontSize: "12px"}}>{amountError}</p>
                        </div>
                        {/* <div className="WithdrawFundsContentBox3">
                            <div className="WithdrawFundsContentBox3A">
                                <p>Enter OTP</p>
                                <button onClick={sendWithdrawcode}
                                 disabled={isButtonDisabled}
                                 style={{background: `${isButtonDisabled ? "#E0E0E5" : "#0E4152"}`}}
                                >
                                    <span>
                                        <IoMdMail />
                                    </span>
                                    Request OTP
                                </button>
                            </div>
                            <div className="WithdrawFundsContentBox3B">
                                <input type="text" placeholder="Enter OTP" onChange={handleWithdrawCodes} />
                                <p style={{marginTop: "3%", marginLeft: "2%", color: "red", fontSize: "12px"}}>{withdrawCodesEroo}</p>
                                <p>
                                    OTP will be sent to your email when you
                                    request{" "}
                                </p>
                            </div>
                        </div> */}
                        <div className="WithdrawFundsContentBox4">
                            {/* <div className="WithdrawFundsContentBox3A">
                                <p>Do you want to withdraw bonus and profit to account balance?</p>
                                <button onClick={addProfitToAccount}
                                 disabled={isButtonDisabled2}
                                 style={{background: `${isButtonDisabled2 ? "#E0E0E5" : "#0E4152"}`}}
                                >
                                    <span>
                                        <BiMoneyWithdraw />
                                    </span>
                                    withdrawal
                                </button>
                            </div> */}
                            <h3>Enter BITCOIN PAYMENT Address</h3>
                            <input
                                type="text"
                                placeholder="Enter BITCOIN PAYMENT Address"
                                onChange={handlewallt}
                            />
                            <p style={{marginTop: "3%", marginLeft: "2%", color: "red", fontSize: "12px"}}>{withdrawalWalleteroo}</p>
                            <p>
                                BITCOIN PAYMENT is not a default withdrawal
                                option in your account, please enter the correct
                                wallet address to recieve your funds.
                            </p>
                        </div>
                        <div className="WithdrawFundsContentBox5">
                            <button onClick={sendWallet}>{
                                clickMe? "Loading..."  : "Complete Request"
                            }</button>
                        </div>
                    </div>
                </div>

            {
                pay ? <div className='SuccessPaid'>
                <div className='PayCon'>
                    <h3>{addprofit}</h3>
                    <button style={{width: "50%", height: "40px", background:"#0e4152", border:"none", color:"white", fontSize:"15px"}} onClick={()=>{setpay(false); nav(`/${id}`); dispatch(updateDepositData(depositDatas))}}>Ok</button>
                </div>
            </div>: null
            }
            </div>
        </>
    );
};

export default WithdrawFunds;
