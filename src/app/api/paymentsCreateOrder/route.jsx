// app/api/paymentsCreateOrder/route.js

import PaytmChecksum from 'paytmchecksum';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { amount, orderId, customerId } = await request.json();

    const paytmParams = {
      body: {
        requestType: 'Payment',
        mid: process.env.PAYTM_MID,
        websiteName: process.env.PAYTM_WEBSITE,
        orderId: orderId,
        callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/paymentsCallback`,
        txnAmount: {
          value: amount,
          currency: 'INR',
        },
        userInfo: {
          custId: customerId,
        },
      },
    };

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.PAYTM_MERCHANT_KEY
    );

    paytmParams.head = {
      signature: checksum,
    };

    const { data } = await axios.post(
      `${process.env.PAYTM_HOSTNAME}/theia/api/v1/initiateTransaction?mid=${process.env.PAYTM_MID}&orderId=${orderId}`,
      paytmParams,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Payment initiation failed' }, { status: 500 });
  }
}
