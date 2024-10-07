import {FaCopy, FaNotesMedical} from "react-icons/fa";
import "./DashHome.css";
import lineChart from "../../assets/linechart.webp";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import axios, {all} from "axios";
import vid from "../../assets/crypt.mp4";
import {FaArrowRight, FaChevronRight} from "react-icons/fa6";
import {getSinglePlan} from "../../Components/store/FeaturesSlice";
import "../MyPlans/MyPlans.css";
import { useParams } from "react-router";

const DashHome = ({
    homechange,
    planchange,
    Transactions,
    handleShowDetailPlan,
}) => {
    const [exchangeRate, setExchangeRate] = useState(null);
    const userData = useSelector((state) => state.persisitedReducer.user);
    // console.log(userData);

    useEffect(() => {
        // Fetch the current exchange rate from an API (replace with a reliable API)
        axios
            .get("https://api.coindesk.com/v1/bpi/currentprice.json")
            .then((response) => {
                const rate = response.data.bpi.USD.rate.replace(",", ""); // assuming USD rate
                setExchangeRate(parseFloat(rate));
            })
            .catch((error) => {
                console.error("Error fetching exchange rate:", error);
            });
    }, []); // Empty dependency array ensures useEffect runs only once on component mount

    const bitcoinValue = userData?.accountBalance / exchangeRate;
    const bitcoinValue2 = userData?.totalProfit / exchangeRate;
    const bitcoinValue3 = userData?.bonus / exchangeRate;
    const bitcoinValue4 = userData?.ref / exchangeRate;
    const bitcoinValue5 = userData?.totalDeposit / exchangeRate;
    const bitcoinValue6 = userData?.totalWithdrawal / exchangeRate;
    const bitcoinValue7 = userData?.totalInvestment / exchangeRate;
    const roundedNumber = parseFloat(bitcoinValue.toFixed(8));
    const roundedNumber2 = parseFloat(bitcoinValue2.toFixed(8));
    const roundedNumber3 = parseFloat(bitcoinValue3.toFixed(8));
    const roundedNumber4 = parseFloat(bitcoinValue4.toFixed(8));
    const roundedNumber5 = parseFloat(bitcoinValue5.toFixed(8));
    const roundedNumber6 = parseFloat(bitcoinValue6.toFixed(8));
    const roundedNumber7 = parseFloat(bitcoinValue7.toFixed(8));
    // console.log("this is it", roundedNumber);

    const allPlans = useSelector((state) => state.persisitedReducer.plans);

    // console.log(allPlans);
    const dispatch = useDispatch();

    const handleViewMoreSinglePlan = (item) => {
        dispatch(getSinglePlan(item));
        handleShowDetailPlan();
    };

    const {id} = useParams()
    const [others, setOthers] = useState();
    const [alluserplan, setAlluserplan] = useState();

    const url3 = `https://slim-new-site-back-end.vercel.app/api/getalltransactions/${id}`
    const url4 = `https://slim-new-site-back-end.vercel.app/api/getallinvestmentplan/${id}`

    const getAllOthers = ()=>{
        axios.get(url3)
            .then(res=>{
            // console.log(res.data)
            setOthers(res.data)
        })
         .catch((err)=>{
            console.log(err)
        })
}
    const getalluserplan = ()=>{
        axios.get(url4)
            .then(res=>{
            console.log("getalluserplan",res)
            setAlluserplan(res.data)
        })
         .catch((err)=>{
            console.log(err)
        })
}


useEffect(()=>{
 getAllOthers()
 getalluserplan()
},[])
    // const calculateTotalInvestment = (array) => {
    //     if (array.length === 0) {
    //         return 0;
    //     }

    //     const total = array.reduce((accumulator, currentValue) => {
    //         const currentValueNumber = parseFloat(currentValue.currentInvAmt);
    //         return accumulator + currentValueNumber;
    //     }, 0);

    //     return total;
    // };

    // const totalInvestment = calculateTotalInvestment(allPlans);
    // console.log("Total Investment:", totalInvestment);
    // const bitcoinValue7 = totalInvestment / exchangeRate;
    // const roundedNumber7 = parseFloat(bitcoinValue7.toFixed(8));

    return (
        <>
            <div className="DashHomeBody">
                <h2 className="DashHomeHeaderText">
                    Welcome, <span>{userData?.userName}</span>
                </h2>
                {/* <div className="DashHomeInfoBox1">
                    <p>Welcome to Okx-Assets, You set the level.</p>
                </div> */}
                <div className="DashHomeInfoBox2">
                    <p>Welcome to Trade Bitpay</p>
                </div>
                <div className="DashHomeMainContent">
                    <div className="DashHomeMainContentAccSummaryDiv">
                        {/* <h3 className="DashHomeMainContentAccSummaryDivH3Text">
                            Account Summary
                        </h3> */}
                        <div className="DashHomeMainContentAccSummary">
                            <div className="DashHomeMainContentAccSummaryRow1">
                                <div className="DashHomeMainContentAccSummaryRow1Box">
                                    <div className="DashHomeMainContentAccSummaryRow1BoxL">
                                        <h4>Account Balance</h4>
                                        <h3>
                                        $ &nbsp; {userData?.accountBalance}
                                            .00
                                        </h3>
                                        <span style={{fontWeight: "700"}}> 
                                        </span>
                                        <p className="lineChart"></p>
                                    </div>
                                    <div className="DashHomeMainContentAccSummaryRow1BoxR">
                                        <img src={lineChart} alt="" />
                                    </div>
                                </div>
                                <div className="DashHomeMainContentAccSummaryRow1Box">
                                    <div className="DashHomeMainContentAccSummaryRow1BoxL">
                                        <h4>Total Profit</h4>
                                        <h3>
                                            $ &nbsp;{userData?.totalProfit}.00
                                        </h3>
                                        <span style={{fontWeight: "700"}}>
                                            
                                        </span>
                                    </div>
                                    <div className="DashHomeMainContentAccSummaryRow1BoxR">
                                        <img src={lineChart} alt="" />
                                    </div>
                                </div>
                                <div className="DashHomeMainContentAccSummaryRow1Box">
                                    <div className="DashHomeMainContentAccSummaryRow1BoxL">
                                        <h4>Bonus</h4>
                                        <h3>$ &nbsp;{userData?.bonus}.00</h3>
                                        <span style={{fontWeight: "700"}}>
                                        </span>
                                    </div>
                                    <div className="DashHomeMainContentAccSummaryRow1BoxR">
                                        <img src={lineChart} alt="" />
                                    </div>
                                </div>
                                {/* <div className="DashHomeMainContentAccSummaryRow2"> */}
                                <div className="DashHomeMainContentAccSummaryRow2Box">
                                    <div className="DashHomeMainContentAccSummaryRow2BoxL">
                                        <h4>Referral Bonus</h4>
                                        <h3>$ &nbsp;{userData?.ref}.00</h3>
                                        <span style={{fontWeight: "700"}}>
                                        </span>
                                    </div>
                                    <div className="DashHomeMainContentAccSummaryRow1BoxR">
                                        <img src={lineChart} alt="" />
                                    </div>
                                </div>
                                <div className="DashHomeMainContentAccSummaryRow2Box">
                                    <div className="DashHomeMainContentAccSummaryRow2BoxL">
                                        <h4>Total Deposits</h4>
                                        <h3>
                                            $ &nbsp;{userData?.totalDeposit}.00
                                        </h3>
                                        <span style={{fontWeight: "700"}}>
                                        </span>
                                    </div>
                                    <div className="DashHomeMainContentAccSummaryRow1BoxR">
                                        <img src={lineChart} alt="" />
                                    </div>
                                </div>
                                <div className="DashHomeMainContentAccSummaryRow2Box">
                                    <div className="DashHomeMainContentAccSummaryRow2BoxL">
                                        <h4>Total Withdrawal</h4>
                                        <h3>
                                            $ &nbsp;{userData?.totalWithdrawal}
                                            .00
                                        </h3>
                                        <span style={{fontWeight: "700"}}>
                                        </span>
                                    </div>
                                    <div className="DashHomeMainContentAccSummaryRow1BoxR">
                                        <img src={lineChart} alt="" />
                                    </div>
                                </div>
                                <div className="DashHomeMainContentAccSummaryRow2Box">
                                    <div className="DashHomeMainContentAccSummaryRow2BoxL">
                                        <h4>Total Investment</h4>
                                        <h3>
                                            $ {userData?.totalInvestment}
                                            .00
                                        </h3>
                                        <span style={{fontWeight: "700"}}>
                                        </span>
                                    </div>
                                    <div className="DashHomeMainContentAccSummaryRow1BoxR">
                                        <img src={lineChart} alt="" />
                                    </div>
                                </div>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="DashHomeMainContentActiveDiv">
                        <h3>
                            Active Plans(s){" "}
                            <span>
                                {alluserplan?.data?.length}
                            </span>
                        </h3>
                        <div className="DashHomeMainContentActiveDivBox">
                            {alluserplan?.data?.length > 0 ? (
                                <>
                                    <div className="DashHomeMainContentActiveDivBoxPlans">
                                        {alluserplan.data.map((item, index) => (
                                            <div
                                                className="DashHomeMainContentActiveDivBoxPlansItem"
                                                key={index}
                                            >
                                                <div className="MyPlansActiveDivItem1A">
                                                    <p>{item?.plan.planName}</p>
                                                    <p>
                                                        Amount - $
                                                        {item?.amount}
                                                    </p>
                                                </div>
                                                <div className="MyPlansActiveDivItem1B">
                                                    <p>
                                                        {item?.Date}
                                                        <FaArrowRight className="FaArrowRight" />
                                                    </p>
                                                    <p>Start Date</p>
                                                </div>
                                                <div className="MyPlansActiveDivItem1C">
                                                    <p>{item?.endDate}</p>
                                                    <p>End Date</p>
                                                </div>
                                                <div className="MyPlansActiveDivItem1D">
                                                    <button>Active</button>
                                                    <p>Status</p>
                                                </div>
                                                <div className="MyPlansActiveDivItem1E">
                                                    <FaChevronRight
                                                        className="FaChevronRight"
                                                        onClick={() =>
                                                            handleViewMoreSinglePlan(
                                                                item
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p>
                                        You do not have an active investment
                                        plan at the moment.
                                    </p>
                                    <button
                                        onClick={() => {
                                            homechange(false);
                                            planchange(true);
                                        }}
                                    >
                                        Buy Plan
                                    </button>
                                </>
                            )}
                            {/* <button>Buy a plan</button> */}
                        </div>
                    </div>
                    <div className="DashHomeMainContenRecentTransactionDiv">
                        <h3>
                            Recent Transaction <span>({others?.length})</span>
                        </h3>
                        <div className="DashHomeMainContenRecentTransactionDivBox">
                            <p
                                className="DashHomeMainContenRecentTransactionDivBoxEndText"
                                onClick={() => {
                                    homechange(false);
                                    Transactions(true);
                                }}
                            >
                                <span>
                                    <FaNotesMedical />
                                </span>
                                View all transactions
                            </p>
                            <div className="DashHomeMainContenRecentTransactionDivBoxTop">
                                <p className="DashHomeMainContenRecentTransactionDivBoxTopDate">
                                    Date
                                </p>
                                <p className="DashHomeMainContenRecentTransactionDivBoxTopType">
                                    Type
                                </p>
                                <p className="DashHomeMainContenRecentTransactionDivBoxTopAmount">
                                    Amount
                                </p>
                            </div>
                            <div className="DashHomeMainContenRecentTransactionDivBoxDown">
                                {
                                    others?.length < 0 ?
                                    <div className="DashHomeMainContenRecentTransactionDivBoxDownItem1">
                                        No record yet
                                    </div>
                                
                                    :

                                    <>
                                        {
                                            others?.map((props) => (
                                    <div className="DashHomeMainContenRecentTransactionDivBoxDownItem1" key={props._id}>
                                    <p className="DashHomeMainContenRecentTransactionDivBoxDownItem1Date">
                                        {props.date}
                                    </p>
                                    <p className="DashHomeMainContenRecentTransactionDivBoxDownItem1Type">
                                        {props.transactionType}
                                    </p>
                                    <p className="DashHomeMainContenRecentTransactionDivBoxDownItem1Amount">
                                        {props.amount}
                                    </p>
                                </div>
                                            ))
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="DashHomeMainContenReferUsDiv">
                        <h3>Refer us & Earn</h3>
                        <p>Use the link below to invite your firends.</p>
                        <div className="DashHomeMainContenReferUsDivBox">
                            <input
                                type="text"
                                value={`https://tradebitpay.vercel.app/`}
                                readOnly
                            />
                            <div className="DashHomeMainContenReferUsDivBoxCopy">
                                <FaCopy />
                            </div>
                        </div>
                    </div>
                    <div className="DashHomeMainContenVidDiv">
                        <video src={vid} muted autoPlay loop></video>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashHome;
