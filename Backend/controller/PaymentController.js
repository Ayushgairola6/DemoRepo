 const fetch = require("node-fetch")
  require("dotenv").config();


// Function to get PayPal Access Token
const getPayPalAccessToken = async () => {
    const auth = Buffer.from(`${process.env.PaypalclientId}:${process.env.Paypalsecret}`).toString('base64');

    const response = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    return data.access_token;
};




// Webhook Handler Function
const paypalWebhookHandler = async (req, res) => {
    const webhookEvent = req.body;

    // Extract necessary headers for verification
    const transmissionId = req.headers['paypal-transmission-id'];
    const transmissionTime = req.headers['paypal-transmission-time'];
    const certUrl = req.headers['paypal-cert-url'];
    const authAlgo = req.headers['paypal-auth-algo'];
    const transmissionSig = req.headers['paypal-transmission-sig'];

    try {
        // Get PayPal Access Token
        const accessToken = await getPayPalAccessToken();
   console.log(accessToken);
        // Verify the webhook signature
        const verifyResponse = await fetch('https://api-m.sandbox.paypal.com/v1/notifications/verify-webhook-signature', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                transmission_id: transmissionId,
                transmission_time: transmissionTime,
                cert_url: certUrl,
                auth_algo: authAlgo,
                transmission_sig: transmissionSig,
                webhook_id: webhookId,
                webhook_event: webhookEvent
            })
        });

        const verificationResult = await verifyResponse.json();

        if (verificationResult.verification_status !== 'SUCCESS') {
            console.error(' Webhook verification failed:', verificationResult);
            return res.sendStatus(400);
        }
       console.log(verificationResult);
       console.log(webhookEvent);
        // Process the verified webhook event
        switch (webhookEvent.event_type) {
            case 'PAYMENT.SALE.COMPLETED':
                console.log(' Payment completed:', webhookEvent.resource.id);
                // TODO: Update database to mark payment as successful
                break;

            case 'PAYMENT.SALE.DENIED':
                console.log(' Payment denied:', webhookEvent.resource.id);
                // TODO: Handle payment failure logic
                break;

            case 'BILLING.SUBSCRIPTION.CANCELLED':
                console.log(' Subscription cancelled:', webhookEvent.resource.id);
                // TODO: Handle subscription cancellation
                break;

            default:
                console.log(' Unhandled webhook event type:', webhookEvent.event_type);
        }

        res.sendStatus(200); // Acknowledge the webhook event
    } catch (error) {
        console.error(' Error processing webhook:', error);
        res.sendStatus(500);
    }
};

module.exports = {
    paypalWebhookHandler
};