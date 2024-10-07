import {FaCopy} from "react-icons/fa";
import "./Payment.css";
import {MdDownloading} from "react-icons/md";
import { useParams } from "react-router";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { updateDepositData } from "../../Components/store/FeaturesSlice";

const Payment = () => {
    const {paymentname, id} = useParams()
    const [pay, setpay] = useState(false)
    let amount = JSON.parse(localStorage.getItem("amount"))
    const [isButtonDisabled, setButtonDisabled] = useState(false);



    const nav = useNavigate()
    console.log(paymentname);

    const depositDatas = 
        {
            amount: amount,
            paymentMode: paymentname,
            status: "success",
            dateCreated: new Date().toDateString(),
        }
    const dispatch = useDispatch()

    const [state, setState] = useState({
        value: `${paymentname === "BTC"? ("bc1qw6fpawrsedzq4krtatqgys5rg3tuhf0z9a5us3"): paymentname === "ETH"? ("0x667059e187772fEfF757EF248cAe8661B7806b3D"): paymentname === "USDT"? ("TAVg9mm8vV51rwoGFR2Vp7PJVRJ3o5jGEU"): paymentname === "BNB"? ("0x667059e187772fEfF757EF248cAe8661B7806b3D"):"Chosse a Payment Method"}`,
        copied: false,
      });

      const url = `https://slimnewsitebackend.onrender.com/api/sendpayment/${id}`
      const url2 = `https://slim-new-site-back-end.vercel.app/api/deposit/${id}`

      const data = {
        amount:amount
      }
      const data2 = {
        amount: amount,
        coin: paymentname
      }
      
      const SendPayMenttoadmin = ()=> {
        axios.post(url2, data2)
        .then(res => {
          console.log(res)
        //   setpay(true)
        }).catch((err)=>{
          console.log(err)
        })
      }
      const payNow = ()=> {
        setButtonDisabled(true)
        axios.post(url, data)
        .then(res => {
            SendPayMenttoadmin()
          console.log(res)
          setpay(true)
        }).catch((err)=>{
          console.log(err)
        })
      }

    return (
        <>
            <div className="DepPaymentBody">
                <h1>Make Payment</h1>
                <div className="DepPaymentContent">
                    <div className="DepPaymentContentWrap">
                        <div className="DepPaymentContentA">
                            <div>Your payment method</div>
                            <p>
                                {paymentname}{" "}
                                <span>
                                    <MdDownloading />
                                </span>
                            </p>
                        </div>
                        <p className="DepPaymentContentB">
                            You are to make payment of ${amount} using your selected
                            payment method.
                        </p>
                        <div className="DepPaymentContentC">
                            <p>{paymentname} Address:</p>
                            <div className="DepPaymentContentCTopReferUsDivBox">
                                <input
                                    type="text"
                                    value={state.value}
                                    readOnly
                                />
                                <CopyToClipboard
                                 text={state.value}
                                 onCopy={() => setState({ copied: true })}
                                 >
                                <div className="DepPaymentContentCTopReferUsDivBoxCopy">
                                    <FaCopy />
                                </div>
                                 </CopyToClipboard>
                            </div>
                            <h5>Network Type:<span>{paymentname=== "BTC"? "BTC" : paymentname=== "ETH"? "ETH" :  paymentname === "USDT" ? "USDT(TRX)" : paymentname === "BNB" ? "BNB": null}</span></h5>
                        </div>
                        <div className="DepPaymentContentD">
                            <p>Upload Payment proof after payment.</p>
                            <div className="DepPaymentContentDUpload">
                                <input type="file" />
                            </div>
                            <button onClick={payNow}
                            disabled={isButtonDisabled}
                            >
                                {
                                    isButtonDisabled ?  "Submitting..." : 'Submit Payment'
                                }
                                </button>
                        </div>
                    </div>
                </div>

          {pay?
          <div className='SuccessPaid'>
                <div className='PayCon'>
                    <h3>Thanks for deposit. We will check your transaction. </h3>
                    <button style={{width: "50%", height: "40px", background:"#0e4152", border:"none", color:"white", fontSize:"15px"}} onClick={()=>{setpay(false); nav(`/${id}`); dispatch(updateDepositData(depositDatas))}}>Ok</button>
                </div>
            </div>: 
            null}
            </div>
        </>
    );
};

export default Payment;
