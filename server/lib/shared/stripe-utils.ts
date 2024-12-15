import { Stripe } from 'stripe';

let stripeInstance = null;

export const getStripeInstance = async (): Promise<Stripe> => {
    return new Stripe(process.env.STRIPE_TEST_KEY ? process.env.STRIPE_TEST_KEY : "sk_test_51MnF9gAYGIxuGJ1XAPR1GOgQdaBrFgiLMOQD5Wo50BPbqB7XahzbFJpJqffAEmrPLixdG4vYmYWam8mpNnrIWqfX00iPVNqbnK", { apiVersion: '2022-11-15' });
}