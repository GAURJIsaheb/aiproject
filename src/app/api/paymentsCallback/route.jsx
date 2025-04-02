// app/api/paymentsCallback/route.js

import PaytmChecksum from 'paytmchecksum';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const receivedData = await request.json();

    const paytmChecksum = receivedData.head.signature;
    const isVerifySignature = PaytmChecksum.verifySignature(
      receivedData.body,
      process.env.PAYTM_MERCHANT_KEY,
      paytmChecksum
    );

    if (isVerifySignature) {
      // Process the payment response
      // Update order status in your database
      return NextResponse.json({ message: 'Payment Successful' });
    } else {
      return NextResponse.json({ error: 'Checksum Mismatched' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Callback processing failed' }, { status: 500 });
  }
}
