"use client"
import WizardStepper from "@/components/WizardStepper";
import { useUser } from "@clerk/nextjs";
import React from "react";
import CheckoutDetailsPage from "./details";
import { useCheckoutNavigation } from "@/hooks/useCheckoutNavigation";
import PaymentPage from "./payment";

//FOr checkout page the url would look like:
// ` ./checkout?step={stepno}&id={courseid}&showSignUp={boolean}`
//showSignup basically means the should we show the user signin component or sign up component.
const CheckOutPage = () => {
  const { isLoaded } = useUser();
  const { checkoutStep } = useCheckoutNavigation();

  const renderStep = () => {
    switch (checkoutStep) {
      case 1:
        return <CheckoutDetailsPage />;
      case 2:
        return <PaymentPage/>;
      case 3:
        return "<CompletionPage />";
      default:
        return <CheckoutDetailsPage />;
    }
  };

  return (
    <div className="checkout">
      <WizardStepper currentStep={checkoutStep} />
      <div className="checkout__content">{renderStep()}</div>
    </div>
  );
};

export default CheckOutPage;
