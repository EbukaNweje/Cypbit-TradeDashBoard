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
        value: `${paymentname === "BTC"? ("bc1qe4kxl390g9mwxy0r0tzq3t66234hjc5gttyvy4"): paymentname === "ETH"? ("0xDd9C473a2F6F11C095a1bD54Dd1d6c4c5588b0D1"): paymentname === "USDT"? ("TKmt8UGpj3H28V923b1xcPwLcDEE48KBC5"):"Chosse a Payment Method"}`,
        copied: false,
      });

      const url = `https://cypbit-tradebackend.onrender.com/api/sendpayment/${id}`
      const url2 = `https://cypbit-trade-back-e-nd.vercel.app/api/deposit/${id}`

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
