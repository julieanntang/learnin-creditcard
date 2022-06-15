import axios from 'axios';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Divider, CopyOutlined } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import { Link } from 'react-router-dom';




const Wallet = () => {

  const [billingAddress, setBillingAddress] = useState(null);
  const [billingCity, setBillingCity] = useState(null);
  const [billingPostalCode, setBillingPostalCode] = useState(null);
  const [billingState, setBillingState] = useState(null);
  const [cardHolder, setCardHolder] = useState(null);
  const [last4, setLast4] = useState(null);
  const [remainingBalance, setRemainingBalance] = useState(null);
  const [cardNumber, setCardNumber] = useState(null);
  const [expiration, setExpiration] = useState(null);
  const [cvc, setCvc] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchOverviewData = async () => {
    try {
      const data = await axios
      .get(`https://run.mocky.io/v3/9761bf82-c85e-4435-a97e-20888cec9b9f`)
      .then(res =>  {
        console.log(res);
        setBillingAddress(res.data.billingAddress);
        setBillingCity(res.data.billingCity);
        setBillingPostalCode(res.data.billingPostalCode);
        setBillingState(res.data.billingState);
        setCardHolder(res.data.cardHolder);
        setLast4(res.data.last4);
        setRemainingBalance(res.data.remainingBalance);
      });
      setLoading(true)
    } catch (err) {
      console.log(err)
    }
  };

  const fetchInfo = async () => {
    try {
      const info = await axios
      .get(` https://run.mocky.io/v3/d50e1b3b-017b-4f52-abc5-51fdde133048`)
      .then(res => {
        console.log(res);
        setCardNumber(res.data.cardNumber);
        setExpiration(res.data.expiration);
        setCvc(res.data.cvc);
      });
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() =>  {
    fetchOverviewData();
    fetchInfo();
  }, []);




  return (
    <>
    <div>
      <h3>Your Card</h3>
      <p>Use this card to pay for your programs in your plan. Purchases will be visible by your manager.</p>
      <Divider />
    </div>
    <div className='bodyHorizontal'>
    <div className='bodyVertical'>
    <div className='card'>
        <h1 className='balance'>REMAINING BALANCE</h1>
          <h2 className='balanceNumber'>${remainingBalance}</h2>
          <br />
            {
              show && <p className='cardInfo'>{cardNumber}<br />
              CVC: {cvc} EXP: {expiration}</p>
            }
            <button type="button" onClick={() => setShow(!show)}>SHOW/HIDE CARD INFORMATION</button>
      </div>
      <div className='text'>  
        <p>Program doesn't accept cards? We can help. <a href="https://www.learnin.com/">Contact us.</a></p>
      </div>
      </div>
      <div className='sideInfo'>
        <h1 className='sideHeaders'>CARD HOLDER</h1>
        <p className='sideBody'>{cardHolder}</p>
        <br />
        <h2 className='sideHeaders'>BILLING ADDRESS</h2>
        <p className='sideBody'>{billingAddress}<br />
        {billingCity}, {billingState} {billingPostalCode}</p>
      </div>
      </div>
      </>
        



  );
}

export default Wallet;
