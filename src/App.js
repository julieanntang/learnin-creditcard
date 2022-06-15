import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Divider } from 'antd';
import 'antd/dist/antd.css';
import './App.css';


const App = () => {

  const [billingAddress, setBillingAddress] = useState(null);
  const [billingCity, setBillingCity] = useState(null);
  const [billingPostalCode, setBillingPostalCode] = useState(null);
  const [billingState, setBillingState] = useState(null);
  const [cardHolder, setCardHolder] = useState(null);
  const [last4, setLast4] = useState(null);
  const [remainingBalance, setRemainingBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const overviewData = [billingAddress, billingCity, billingPostalCode, billingState, cardHolder, last4, remainingBalance]

  const fetchData = async () => {
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

  useEffect(() =>  {
    fetchData()
  }, []);



  return (
    <div>
      <h3>Your Card</h3>
      <p>Use this card to pay for your programs in your plan. Purchases will be visible by your manager.</p>
      <Divider />
      {loading ? (overviewData) : (<Spinner animation="border" />)}
    </div>
  );
}

export default App;
