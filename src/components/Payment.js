import React from 'react'
import Timer from './Timer';

import PaymentImg from '../images/qr_promtpay.jpg';

function Payment() {

    const totalPrice = JSON.parse(localStorage.getItem("totalPrice"));

    return (
        <div className="payment-container">
            <img className="img-payment" src={PaymentImg} />
            <div>
                <span className="sum-payment">ยอดเงินที่ต้องโอน : {totalPrice} บาท</span>
                <div className="timer">
                    <Timer />
                </div>
                <br />
                <div>
                    <span >สแกน QR เพื่อโอนเงินเข้าบัญชี</span>
                    <br />
                    <span>รหัส QR นี้จะแสดงบนหน้าเว็บไซต์เท่านั้น หากบุคคลทั่วไปส่งรหัส QR นี้เพื่อขอรับการชำระเงิน โปรดระวังการฉ้อโกง</span>
                </div>
            </div>

        </div>
    )
}

export default Payment
