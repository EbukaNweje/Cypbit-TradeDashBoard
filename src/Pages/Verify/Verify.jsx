
import './VerifyStyle.css'
import Logo from '../../assets/Swift-Earn-Logo.png'


const Verify = () => {
  return (
    <div className='Verifybody'>
            <div className="VerifyRight">
                <div className="verifyRightHeader">
                   <div className="verifyRightHeaderImg">
                    <img src={Logo} alt="" />
                   </div>
                </div>
                <div className="verifyRightContent">
                <div className="RightContentHeader">
                    <h2>Verification in Process....</h2>
                    <p>Your account is under review 
                        Kindly waiting for Admin Approval
                    </p>
                </div>
                 </div>
                 </div>
            <div className="VerifyLeft"></div>
        
    </div>
  )
}

export default Verify
