import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  try {
    const stripe = Stripe(
      'pk_test_51JmdGMSBG4P2WYdgAb5uTy5DWPWaVzT88duHOYkKq0G99fK0rNZcB6pFGwQdJUoFniZ6GXeCLHg97Zi7FmOjdieQ00PknbLiKU'
    );
    // 1) Get checkout session from API
    const session = await axios(
      `http://localhost:5000/api/v1/booking/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
